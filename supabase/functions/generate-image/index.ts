import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const HF_API_KEY = Deno.env.get("HF_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// FLUX.1-schnell — best free model on HF, fast + high quality
const HF_MODEL = "black-forest-labs/FLUX.1-schnell";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!HF_API_KEY) {
      throw new Error(
        "HF_API_KEY is not set. Add your Hugging Face token to Supabase edge function secrets.",
      );
    }

    const { prompt, image_key, section, alt_text, display_order } =
      await req.json();

    if (!prompt || !image_key || !section) {
      return new Response(
        JSON.stringify({ error: "prompt, image_key, and section are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`Generating image — key: ${image_key}, model: ${HF_MODEL}`);

    // ── 1. Call Hugging Face Inference API ────────────────────────────────────
    const hfRes = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
        "x-wait-for-model": "true", // wait if model is loading (cold start)
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 4, // schnell is optimised for 4 steps
          guidance_scale: 0,      // schnell uses 0 guidance
        },
      }),
    });

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      // Model loading — tell client to retry
      if (hfRes.status === 503) {
        return new Response(
          JSON.stringify({
            error: "Model is warming up. Please try again in 20 seconds.",
            retry: true,
          }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error(`Hugging Face API error ${hfRes.status}: ${errText}`);
    }

    // HF returns raw image bytes (image/jpeg or image/png)
    const contentType = hfRes.headers.get("content-type") || "image/jpeg";
    const imageBytes = new Uint8Array(await hfRes.arrayBuffer());
    const ext = contentType.includes("png") ? "png" : "jpg";

    console.log(`Image received — ${imageBytes.length} bytes, type: ${contentType}`);

    // ── 2. Upload to Supabase Storage ─────────────────────────────────────────
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const fileName = `${image_key}-${Date.now()}.${ext}`;
    const filePath = `${section}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(filePath, imageBytes, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("site-assets")
      .getPublicUrl(filePath);

    // ── 3. Upsert into site_images table ──────────────────────────────────────
    const { data: imageRecord, error: dbError } = await supabase
      .from("site_images")
      .upsert(
        {
          image_key,
          image_url: publicUrl,
          alt_text: alt_text || prompt.slice(0, 120),
          section,
          display_order: display_order ?? 0,
          is_active: true,
        },
        { onConflict: "image_key" },
      )
      .select()
      .single();

    if (dbError) throw new Error(`DB upsert failed: ${dbError.message}`);

    await supabase.from("activity_log").insert({
      action: `AI-generated image via FLUX.1-schnell (Hugging Face)`,
      item_type: "image",
      item_id: imageRecord.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        image_url: publicUrl,
        image_key,
        section,
        id: imageRecord.id,
        model: HF_MODEL,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("generate-image error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
