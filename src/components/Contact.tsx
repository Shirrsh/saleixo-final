import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const services = [
  'Product Photography',
  'Ecommerce Design',
  'A+ Content',
  'Social Media Marketing',
  'Brand Strategy',
  'Marketplace Setup',
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    newsletter: true,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s: string) =>
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Required';
    if (!formData.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Save to leads table
      const { error } = await supabase.from('leads' as any).insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        services: selectedServices,
        newsletter: formData.newsletter,
        source: 'website_contact_form',
        status: 'new',
        priority: 'medium',
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." });
    } catch (err) {
      console.error('Form submission error:', err);
      // Still show success — fallback to activity_log
      await supabase.from('activity_log').insert({
        action: JSON.stringify({
          type: 'contact_form',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          services: selectedServices,
          newsletter: formData.newsletter,
          submitted_at: new Date().toISOString(),
        }),
        item_type: 'contact_submission',
        user_email: formData.email,
      });
      setSubmitted(true);
      toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' } }),
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-3">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
            Ready to Transform<br />Your Brand?
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
            Book a free consultation — no commitment, just a conversation about your goals.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* What you get */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'hsl(158 55% 8% / 0.6)',
                border: '1px solid hsl(158 40% 16% / 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent-violet" />
                <span className="text-sm font-semibold text-white">What you get for free</span>
              </div>
              {[
                'Full listing quality audit',
                'Competitor benchmarking',
                'Photography assessment',
                'Custom growth roadmap',
                'No obligation, ever',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 py-2.5 border-b last:border-0"
                  style={{ borderColor: 'hsl(158 40% 16% / 0.4)' }}
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#a3e635' }} />
                  <span className="text-sm text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact details */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'hsl(158 55% 8% / 0.6)',
                border: '1px solid hsl(158 40% 16% / 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {[
                { icon: <Mail className="w-4 h-4" />, label: 'info@saleixo.com' },
                { icon: <Phone className="w-4 h-4" />, label: '+91 98765 43210' },
                { icon: <MapPin className="w-4 h-4" />, label: 'Mumbai · Delhi · Bangalore' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(78 85% 52% / 0.15)', color: '#a3e635' }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm text-foreground/70">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'hsl(158 55% 8% / 0.7)',
                border: '1px solid hsl(158 40% 16% / 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'hsl(78 85% 52% / 0.15)' }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-accent-violet" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent-violet hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`bg-surface/50 border-border-glow/30 focus:border-accent-violet/60 focus:ring-accent-violet/20 rounded-xl h-12 ${errors.name ? 'border-red-500/60' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`bg-surface/50 border-border-glow/30 focus:border-accent-violet/60 focus:ring-accent-violet/20 rounded-xl h-12 ${errors.email ? 'border-red-500/60' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`bg-surface/50 border-border-glow/30 focus:border-accent-violet/60 focus:ring-accent-violet/20 rounded-xl h-12 ${errors.phone ? 'border-red-500/60' : ''}`}
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Services selector */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Services Interested In
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map(s => {
                        const sel = selectedServices.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                            style={{
                              background: sel ? 'hsl(78 85% 52% / 0.15)' : 'hsl(158 40% 16% / 0.5)',
                              border: `1px solid ${sel ? 'hsl(78 85% 52% / 0.5)' : 'hsl(158 40% 16%)'}`,
                              color: sel ? '#a3e635' : 'hsl(155 20% 60%)',
                            }}
                          >
                            {sel && '✓ '}{s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Project Details
                    </label>
                    <Textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your products, marketplaces, and goals..."
                      className="bg-surface/50 border-border-glow/30 focus:border-accent-violet/60 focus:ring-accent-violet/20 rounded-xl resize-none"
                    />
                  </div>

                  {/* Newsletter checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={e => setFormData(p => ({ ...p, newsletter: e.target.checked }))}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                        style={{
                          background: formData.newsletter ? 'hsl(78 85% 52% / 0.25)' : 'hsl(158 40% 16% / 0.5)',
                          border: `1.5px solid ${formData.newsletter ? '#a3e635' : 'hsl(158 40% 20%)'}`,
                        }}
                      >
                        {formData.newsletter && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            width="10" height="8" viewBox="0 0 10 8" fill="none"
                          >
                            <path d="M1 4L3.5 6.5L9 1" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Subscribe to our newsletter for ecommerce tips, photography insights, and exclusive offers.
                    </span>
                  </label>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full h-13 text-base font-semibold bg-primary text-black hover:bg-primary-hover hover:shadow-[0_0_40px_hsl(78_85%_52%/0.5)] transition-all duration-300 group"
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground/60">
                    No spam. No commitment. We respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
