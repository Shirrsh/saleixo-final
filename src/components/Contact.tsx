import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Sparkles, FileText, Calendar, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { openCalendarBooking } from '@/lib/booking';
import { ParallaxBlob } from '@/components/Parallax';
import { cn } from '@/lib/utils';

const services = [
  'Product Photography',
  'Amazon Listing & FBA',
  'Ecommerce Management',
  'Shopify Setup & Design',
  'Social & Paid Ads',
  'Ecommerce Design',
  'Full-Service Package',
  'Other / Not Sure',
];

const Contact = () => {
  const [tab, setTab] = useState<'audit' | 'rfp'>('audit');

  // Fast Audit Form
  const [auditForm, setAuditForm] = useState({
    url: '',
    email: '',
    whatsapp: '',
    marketplace: 'Amazon',
  });

  // Detailed RFP Form
  const [form, setForm] = useState({
    name: '', company: '', email: '', whatsapp: '',
    country: '', service: '', message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const setAudit = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAuditForm(f => ({ ...f, [k]: e.target.value }));

  // Handle Fast Audit Submission
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('leads' as any).insert([{
        name:     'Listing Audit Request',
        email:    auditForm.email,
        phone:    auditForm.whatsapp || null,
        message:  `Product / Store Link: ${auditForm.url}\nPlatform: ${auditForm.marketplace}\nRequested via Homepage Contact Audit Tab`,
        services: ['Free Listing Audit'],
        source:   'contact-audit-tab',
        status:   'new',
        priority: 'high',
      }]);

      await supabase.from('activity_log').insert({
        action:    `New Free Listing Audit requested: ${auditForm.url}`,
        item_type: 'lead',
      });

      await supabase.functions.invoke('notify-lead', {
        body: {
          name: 'Listing Audit Request',
          email: auditForm.email,
          phone: auditForm.whatsapp || null,
          services: ['Free Listing Audit'],
          message: `Free Listing Audit requested for: ${auditForm.url} (${auditForm.marketplace})`,
          source: 'contact-audit-tab',
        },
      });
    } catch (_) {
      // silently fail — still show success to user
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  // Handle Detailed RFP Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from('leads' as any).insert([{
        name:     form.name,
        email:    form.email,
        phone:    form.whatsapp || null,
        business: form.company  || null,
        country:  form.country  || null,
        message:  form.message  || null,
        services: form.service ? [form.service] : [],
        source:   'contact-section',
        status:   'new',
        priority: 'medium',
      }]);
      await supabase.from('activity_log').insert({
        action:    'New enquiry via homepage Contact form',
        item_type: 'lead',
      });
      await supabase.functions.invoke('notify-lead', {
        body: {
          name: form.name,
          email: form.email,
          phone: form.whatsapp || null,
          services: form.service ? [form.service] : [],
          message: form.message,
          source: 'contact-section',
        },
      });
    } catch (_) {
      // silently fail — still show success to user
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const inputCls = `w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-12 lg:py-18"
      style={{ background: 'hsl(var(--surface-sunken))' }}
    >
      {/* Background blobs */}
      <ParallaxBlob hue="217 91% 52%" opacity={0.05} size={560} speed={0.35} style={{ top: '-15%', left: '-10%' }} />
      <ParallaxBlob hue="258 90% 66%" opacity={0.045} size={480} speed={-0.25} style={{ bottom: '-12%', right: '-8%' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-4">Get in Touch</p>
            <h2
              className="font-extrabold tracking-tight leading-[1.05] text-foreground mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontFamily: '"Inter Tight", Inter, sans-serif' }}
            >
              Let's grow<br />your brand.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm" style={{ fontSize: '1rem' }}>
              Tell us what you sell and where. We'll come back within 24 hours with a clear plan — what to fix first and how we'd do it.
            </p>

            {/* Proof points */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Free 3-point listing audit — no commitment',
                'Response within 24 hours guaranteed',
                'Serving 20+ global marketplaces',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">Direct Enquiry</p>
                  <a href="mailto:info@saleixo.com" className="text-sm text-primary hover:underline">
                    info@saleixo.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — Form with Fast Audit / Detailed RFP Switcher ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Check className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">We've got your request!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Our lead strategist will review your product and send your diagnosis within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full">
                    <a
                      href="https://wa.me/917011441159?text=Hi%2C%20we%20just%20submitted%20an%20enquiry%20on%20Saleixo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Message on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => openCalendarBooking()}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
                    >
                      <Calendar className="w-4 h-4" /> Book Strategy Call
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tab Selector: Fast Audit vs Detailed RFP */}
                  <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border mb-6">
                    <button
                      type="button"
                      onClick={() => setTab('audit')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200',
                        tab === 'audit'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>Free Listing Audit (30s)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('rfp')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200',
                        tab === 'rfp'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Custom Project Brief</span>
                    </button>
                  </div>

                  {tab === 'audit' ? (
                    /* ── FAST AUDIT FORM (Zero Friction) ── */
                    <form onSubmit={handleAuditSubmit} className="flex flex-col gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-bold text-foreground">Get Your Free 3-Point Teardown</h3>
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            100% Free
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Drop your product link and email. We'll diagnose your images, keywords, and Buy Box score.
                        </p>
                      </div>

                      {/* Product URL or ASIN */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Amazon ASIN, Product Link, or Store URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          className={inputCls}
                          placeholder="e.g. B08XYZ1234 or https://amazon.com/dp/..."
                          value={auditForm.url}
                          onChange={setAudit('url')}
                        />
                      </div>

                      {/* Marketplace Platform */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Marketplace</label>
                        <select className={inputCls} value={auditForm.marketplace} onChange={setAudit('marketplace')}>
                          <option value="Amazon US / Global">Amazon (US / Global)</option>
                          <option value="Walmart Marketplace">Walmart Marketplace</option>
                          <option value="Shopify Plus / DTC">Shopify Store</option>
                          <option value="Etsy / Other">Etsy / Other</option>
                        </select>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Where to send your audit video? (Email) <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          className={inputCls}
                          placeholder="name@yourcompany.com"
                          value={auditForm.email}
                          onChange={setAudit('email')}
                        />
                      </div>

                      {/* WhatsApp (optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          WhatsApp (Optional — for instant delivery)
                        </label>
                        <input
                          type="tel"
                          className={inputCls}
                          placeholder="+1 (555) 000-0000 or +91..."
                          value={auditForm.whatsapp}
                          onChange={setAudit('whatsapp')}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 bg-primary text-primary-foreground shadow-md"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Preparing Audit Request…</span>
                          </>
                        ) : (
                          <>
                            <span>Send Our Free 3-Point Audit</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* ── DETAILED RFP FORM ── */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-0.5">Start a Custom Project</h3>
                        <p className="text-xs text-muted-foreground">Fill out your project requirements for an in-depth proposal.</p>
                      </div>

                      {/* Row 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name <span className="text-red-500">*</span></label>
                          <input required className={inputCls} placeholder="John Doe" value={form.name} onChange={set('name')} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Company / Brand <span className="text-red-500">*</span></label>
                          <input required className={inputCls} placeholder="Acme Corp" value={form.company} onChange={set('company')} />
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Business Email <span className="text-red-500">*</span></label>
                          <input required type="email" className={inputCls} placeholder="name@company.com" value={form.email} onChange={set('email')} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">WhatsApp / Phone</label>
                          <input type="tel" className={inputCls} placeholder="+1 (555) 000-0000" value={form.whatsapp} onChange={set('whatsapp')} />
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Country of Operation <span className="text-red-500">*</span></label>
                        <input required className={inputCls} placeholder="United States, India, UK..." value={form.country} onChange={set('country')} />
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Service Required <span className="text-red-500">*</span></label>
                        <select required className={inputCls} value={form.service} onChange={set('service')}>
                          <option value="">Select Service Type</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Project Details <span className="text-red-500">*</span></label>
                        <textarea
                          required rows={3} className={inputCls}
                          placeholder="Tell us about your products, marketplaces, and goals..."
                          value={form.message} onChange={set('message')}
                          style={{ resize: 'none' }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 bg-primary text-primary-foreground"
                      >
                        {loading ? 'Sending…' : (<>Submit Project Brief <ArrowRight className="w-4 h-4" /></>)}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
