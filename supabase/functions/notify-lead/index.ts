import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer@6.9.13";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

// NOTE: This is the PRODUCTION version (deployed live, verified working 2026-07-04).
// It sends via Zoho SMTP using ZOHO_EMAIL / ZOHO_PASSWORD edge-function secrets.
// Do NOT replace with a Resend implementation — no Resend account is configured.

const ZOHO_EMAIL    = Deno.env.get('ZOHO_EMAIL');    // authenticated mailbox
const ZOHO_PASSWORD = Deno.env.get('ZOHO_PASSWORD'); // Zoho app password
const NOTIFY_EMAIL  = 'info@saleixo.com';

const SUPABASE_URL              = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── Rate limiting ────────────────────────────────────────────────────────────
// Basic sliding-window limit backed by public.lead_rate_limit_events (see the
// matching migration). Checked per client IP (from x-forwarded-for) AND per
// submitted email address — whichever identifier is available — so a spammer
// can't dodge the limit by only controlling one of the two. Fails OPEN: if the
// rate-limit check itself errors (e.g. table missing locally, DB hiccup), the
// email is still sent rather than blocking a legitimate lead over an
// unrelated infra problem.
const RATE_LIMIT_MAX_REQUESTS   = 3;
const RATE_LIMIT_WINDOW_MINUTES = 10;

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get('x-real-ip') ?? req.headers.get('cf-connecting-ip');
  return realIp || null;
}

/**
 * Returns `true` if the request should be rejected as rate-limited.
 * Fails open (returns `false`) on any internal error.
 */
async function isRateLimited(req: Request, email: unknown): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Rate limiting skipped: Supabase service credentials not configured');
    return false;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const identifiers: string[] = [];
    const ip = getClientIp(req);
    if (ip) identifiers.push(`ip:${ip}`);
    if (typeof email === 'string' && email.trim()) identifiers.push(`email:${email.trim().toLowerCase()}`);

    if (identifiers.length === 0) {
      // No usable identifier at all — nothing to key the limit on, let it through.
      return false;
    }

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
      .from('lead_rate_limit_events')
      .select('id', { count: 'exact', head: true })
      .in('identifier', identifiers)
      .gte('created_at', windowStart);

    if (countError) {
      console.error('Rate limit check failed:', countError.message);
      return false; // fail open
    }

    if ((count ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
      return true;
    }

    // Record this attempt (one row per identifier) before proceeding.
    await supabase
      .from('lead_rate_limit_events')
      .insert(identifiers.map((identifier) => ({ identifier })));

    // Best-effort, low-frequency cleanup so the table doesn't grow unbounded.
    // Not load-bearing for correctness — safe to skip if it fails.
    if (Math.random() < 0.02) {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      supabase
        .from('lead_rate_limit_events')
        .delete()
        .lt('created_at', cutoff)
        .then(({ error }) => { if (error) console.error('Rate limit cleanup failed:', error.message); });
    }

    return false;
  } catch (err: unknown) {
    console.error('Rate limit check threw:', err instanceof Error ? err.message : String(err));
    return false; // fail open
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!ZOHO_EMAIL || !ZOHO_PASSWORD) {
    console.error('Zoho credentials not configured');
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let lead: Record<string, unknown>;
  try {
    lead = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const {
    name, email, phone, business, product,
    services, marketplaces, budget_range, timeline, message, source,
  } = lead as Record<string, unknown>;

  if (await isRateLimited(req, email)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const svcList = Array.isArray(services) ? services.join(', ') : (services ?? '—');
  const mktList = Array.isArray(marketplaces) ? marketplaces.join(', ') : (marketplaces ?? '—');
  const subject = `New Lead: ${name ?? 'Unknown'} — ${Array.isArray(services) && services.length ? services[0] : 'General Enquiry'}`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0d6e6e;border-bottom:2px solid #0d6e6e;padding-bottom:8px">
        New Lead — Saleixo
      </h2>
      <p style="color:#666;font-size:13px">Source: <strong>${source ?? 'website'}</strong></p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:600;width:140px">Name</td>
          <td style="padding:8px 12px">${name ?? '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600">Email</td>
          <td style="padding:8px 12px"><a href="mailto:${email}">${email ?? '—'}</a></td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:600">Phone / WhatsApp</td>
          <td style="padding:8px 12px">${phone ?? '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600">Business</td>
          <td style="padding:8px 12px">${business ?? '—'}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:600">Product</td>
          <td style="padding:8px 12px">${product ?? '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600">Services</td>
          <td style="padding:8px 12px">${svcList}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:600">Marketplaces</td>
          <td style="padding:8px 12px">${mktList}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600">Budget</td>
          <td style="padding:8px 12px">${budget_range ?? '—'}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:600">Timeline</td>
          <td style="padding:8px 12px">${timeline ?? '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600">Message</td>
          <td style="padding:8px 12px">${message ?? '—'}</td>
        </tr>
      </table>
      <p style="margin-top:20px;font-size:12px;color:#999">
        Saleixo CRM — reply to this email to contact the lead directly.
      </p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: { user: ZOHO_EMAIL, pass: ZOHO_PASSWORD },
  });

  try {
    const info = await transporter.sendMail({
      from: `Saleixo Leads <${ZOHO_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: typeof email === 'string' ? email : undefined,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return new Response(JSON.stringify({ ok: true, id: info.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Zoho SMTP error:', msg);
    return new Response(JSON.stringify({ error: 'Failed to send email', detail: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
