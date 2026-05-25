import { useEffect } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.976099139228!2d77.36786282093426!3d28.63047842179807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5580c89c2f7%3A0xfa34492e175774d2!2sAwfis!5e0!3m2!1sen!2sin!4v1779472368478!5m2!1sen!2sin';

const MAPS_LINK = 'https://maps.google.com/?q=Awfis,A-41+Sector+62,Noida,Uttar+Pradesh+201309,India';

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
    color: '#d4af37',
  },
];

const Contact = () => {
  usePageMeta({
    title: 'Contact Saleixo | Noida, India',
    description: 'Get in touch with Saleixo. Free listing audit within 48 hours. Email, WhatsApp, or visit us at Awfis, Sector 62, Noida.',
  });

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
            className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#d4af37' }}
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

      {/* ── Map + CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-background pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3 rounded-2xl overflow-hidden border border-border"
              style={{ height: 400 }}
            >
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
            </motion.div>

            {/* CTA panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Address block */}
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{ background: 'hsl(var(--surface-elevated))', border: '1px solid hsl(var(--border))' , color: 'hsl(var(--muted-foreground))' }}>
                    🏛️ MSME Registered &nbsp;·&nbsp; Udyam No: UDYAM-BR-06-0036869
                  </span>
                </div>
              </div>

              {/* Free audit CTA */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#060d0a', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <p
                  className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                  style={{ color: '#d4af37' }}
                >
                  Free Listing Audit
                </p>
                <p className="text-white text-sm leading-relaxed mb-5">
                  Tell us about your store and we'll send back a free written diagnosis within 48 hours. No pitch. No commitment.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/get-started"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: '#d4af37', color: '#0a0a0a' }}
                  >
                    Start the Audit <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://wa.me/917011441159?text=Hi%2C%20I%27d%20like%20a%20free%20listing%20audit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: '#25d366', color: '#fff' }}
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Response promise */}
              <div className="rounded-2xl border border-border bg-card px-6 py-4 flex items-center gap-4">
                <Clock className="w-5 h-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-foreground">48-hour response guarantee</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Every inquiry gets a written reply, always.</p>
                </div>
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
