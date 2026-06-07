import { useState, useEffect } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.976099139228!2d77.36786282093426!3d28.63047842179807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5580c89c2f7%3A0xfa34492e175774d2!2sAwfis!5e0!3m2!1sen!2sin!4v1779472368478!5m2!1sen!2sin';

const MAPS_LINK = 'https://maps.google.com/?q=Awfis,A-41+Sector+62,Noida,Uttar+Pradesh+201309,India';

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

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@saleixo.com',
    sub: 'We reply within 48 hours',
    href: 'mailto:info@saleixo.com',
    color: '#60a5fa',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 70114 41159',
    sub: 'Chat with us directly',
    href: 'https://wa.me/917011441159',
    color: '#4ade80',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Awfis, Sector 62',
    sub: 'Noida, Uttar Pradesh 201309',
    href: MAPS_LINK,
    color: '#f97316',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '24 / 7',
    sub: 'Written reply within 48 hrs',
    href: null,
    color: 'hsl(var(--gold))',
  },
];

const inputCls = `w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors`;

const Contact = () => {
  usePageMeta({
    title: 'Contact Saleixo | Noida, India',
    description: 'Get in touch with Saleixo. Free listing audit within 48 hours. Email, WhatsApp, or visit us at Awfis, Sector 62, Noida.',
  });

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
        message:  `Country: ${form.country}\n\n${form.message}`,
        services: form.service ? [form.service] : [],
        source:   'contact-page',
        status:   'new',
        priority: 'medium',
      }]);
      await supabase.from('activity_log').insert({
        action:    'New enquiry via Contact page form',
        item_type: 'lead',
      });
    } catch (_) {
      // silently fail — still show success to user
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'contact-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Saleixo',
      url: 'https://saleixo.com',
      email: 'info@saleixo.com',
      telephone: '+917011441159',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Awfis, A-41, A Block, Industrial Area, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201309',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.63047842179807,
        longitude: 77.36786282093426,
      },
      openingHours: 'Mo-Su 00:00-24:00',
      description:
        'Saleixo is a digital studio offering product photography, Amazon listing optimisation, Shopify store design, social ads, and ecommerce management for artisans and online sellers.',
      priceRange: '$$',
      image: 'https://saleixo.com/og-image.jpg',
    });

    const existing = document.getElementById('contact-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { document.getElementById('contact-jsonld')?.remove(); };
  }, []);

  return (
    <>
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: '#060d0a' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(26,74,58,0.5) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase mb-5 text-gold"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold tracking-tight leading-[1.08] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              color: '#ffffff',
              fontFamily: '"Inter Tight", Inter, sans-serif',
            }}
          >
            Let's fix your funnel.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '540px',
            }}
          >
            Send us your store URL or top three listings. We'll come back with a written
            diagnosis — what's leaking, what's working, what we'd fix first.
          </motion.p>
        </div>
      </section>

      {/* ── Contact cards ────────────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 h-full transition-shadow duration-200 hover:shadow-md"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-foreground text-sm leading-snug">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                  {item.href && (
                    <div className="mt-auto pt-2">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: item.color }}
                      >
                        {item.label === 'Office' ? 'Open in Maps' : item.label === 'WhatsApp' ? 'Message Us' : 'Send Email'}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </motion.div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="h-full">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Map + Form ───────────────────────────────────────────────────────── */}
      <section className="bg-background pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Map + address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-2xl overflow-hidden border border-border" style={{ height: 280 }}>
                <iframe
                  src={MAPS_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Saleixo office location — Awfis Coworking Space"
                />
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Our Location
                </p>
                <address className="not-italic space-y-1 text-sm text-foreground leading-relaxed">
                  <p className="font-semibold">Awfis</p>
                  <p className="text-muted-foreground">A-41, A Block, Industrial Area</p>
                  <p className="text-muted-foreground">Sector 62, Noida, UP 201309</p>
                  <p className="text-muted-foreground">India</p>
                </address>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  Get Directions <ExternalLink className="w-3 h-3" />
                </a>
                <div className="mt-4 pt-4 border-t border-border/40">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
                  >
                    🏛️ MSME Registered &nbsp;·&nbsp; Udyam No: UDYAM-BR-06-0036869
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
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

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Country of Operation <span className="text-red-500">*</span></label>
                        <input required className={inputCls} placeholder="India" value={form.country} onChange={set('country')} />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Service Required <span className="text-red-500">*</span></label>
                        <select required className={inputCls} value={form.service} onChange={set('service')}>
                          <option value="">Select Service Type</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Project Details <span className="text-red-500">*</span></label>
                        <textarea
                          required rows={4} className={inputCls}
                          placeholder="Tell us about your products, marketplace, and what you're trying to achieve..."
                          value={form.message} onChange={set('message')}
                          style={{ resize: 'none' }}
                        />
                      </div>

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

      <Footer />
    </>
  );
};

export default Contact;
