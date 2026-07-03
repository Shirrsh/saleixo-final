import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_API_URL = "https://api.resend.com/emails";

// Where new-lead notifications are sent.
const NOTIFY_TO = "info@saleixo.com";
// Must be an address on a domain verified in Resend. Until saleixo.com is
// verified, Resend's shared "onboarding@resend.dev" sender can be used instead.
const NOTIFY_FROM = "Saleixo Leads <leads@saleixo.com>";

interface LeadPayload {
  name: string;
  email: string;
  phone?: string | null;
  business?: string | null;
  country?: string | null;
  product?: string | null;
  marketplaces?: string[] | null;
  revenue?: string | null;
  services?: string[] | null;
  budget_range?: string | null;
  timeline?: string | null;
  message?: string | null;
  source: string;
}

function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function formatRow(label: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  const display = Array.isArray(value) ? value.join(", ") : String(value);
  if (!display) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top;"><strong>${esc(label)}</strong></td><td style="padding:6px 0;font-size:13px;color:#111;">${esc(display)}</td></tr>`;
}

function buildEmailHtml(lead: LeadPayload): string {
  const rows = [
    formatRow("Name", lead.name),
    formatRow("Email", lead.email),
    formatRow("Phone", lead.phone),
    formatRow("Business", lead.business),
    formatRow("Country", lead.country),
    formatRow("Product", lead.product),
    formatRow("Marketplaces", lead.marketplaces),
    formatRow("Revenue", lead.revenue),
    formatRow("Services", lead.services),
    formatRow("Budget", lead.budget_range),
    formatRow("Timeline", lead.timeline),
    formatRow("Source", lead.source),
  ].join("");

  const message = lead.message
    ? `<div style="margin-top:16px;"><strong style="font-size:13px;color:#666;">Message</strong><p style="white-space:pre-wrap;font-size:13px;color:#111;margin:6px 0 0;">${esc(lead.message)}</p></div>`
    : "";

  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="font-size:16px;margin:0 0 12px;">New lead — ${esc(lead.source)}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      ${message}
    </div>
  `;
}

function buildEmailText(lead: LeadPayload): string {
  const fields: Array<[string, unknown]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Business", lead.business],
    ["Country", lead.country],
    ["Product", lead.product],
    ["Marketplaces", lead.marketplaces],
    ["Revenue", lead.revenue],
    ["Services", lead.services],
    ["Budget", lead.budget_range],
    ["Timeline", lead.timeline],
    ["Source", lead.source],
  ];
  const lines = fields
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([label, v]) => `${label}: ${Array.isArray(v) ? v.join(", ") : v}`);
  if (lead.message) lines.push("", "Message:", lead.message);
  return lines.join("\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error(
        "RESEND_API_KEY is not set. Add it to Supabase edge function secrets.",
      );
    }

    const lead = (await req.json()) as LeadPayload;

    if (!lead.name || !lead.email || !lead.source) {
      return new Response(
        JSON.stringify({ error: "name, email, and source are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`Notifying new lead — source: ${lead.source}, email: ${lead.email}`);

    const resendRes = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: lead.email,
        subject: `New lead: ${lead.name} (${lead.source})`,
        html: buildEmailHtml(lead),
        text: buildEmailText(lead),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      throw new Error(`Resend API error ${resendRes.status}: ${errText}`);
    }

    const result = await resendRes.json();

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("notify-lead error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
