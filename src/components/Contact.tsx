import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [form, setForm] = useState({
    name: '', company: '', email: '', whatsapp: '',
    country: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      className="relative py-20 md:py-28 overflow-hidden bg-background"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, hsl(var(--primary) / 0.04) 0%, transparent 70%)' }}
      />

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
                'Free listing audit — no commitment',
                'Response within 24 hours',
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

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-7 h-7 text-green-600 dark:text-green-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">We've got your message!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    We'll review your details and get back to you within 24 hours with a tailored plan.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-1">Start a Project</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form and we'll be in touch within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        <label className="block text-xs font-semibold text-foreground mb-1.5">WhatsApp (optional)</label>
                        <input type="tel" className={inputCls} placeholder="+91 98765 43210" value={form.whatsapp} onChange={set('whatsapp')} />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Country of Operation <span className="text-red-500">*</span></label>
                      <input required className={inputCls} placeholder="India" value={form.country} onChange={set('country')} />
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
                        required rows={4} className={inputCls}
                        placeholder="Tell us about your products, marketplace, and what you're trying to achieve..."
                        value={form.message} onChange={set('message')}
                        style={{ resize: 'none' }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                      style={{ background: 'hsl(var(--primary))', color: '#fff' }}
                    >
                      {loading ? 'Sending…' : (<>Send Message <ArrowRight className="w-4 h-4" /></>)}
                    </button>
                  </form>
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
