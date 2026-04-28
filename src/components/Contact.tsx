import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())  e.name  = 'Required';
    if (!formData.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await supabase.from('leads' as any).insert({
        name: formData.name, email: formData.email,
        phone: formData.phone, message: formData.message,
        source: 'website_contact_form', status: 'new', priority: 'medium',
      });
    } catch {
      await supabase.from('activity_log').insert({
        action: JSON.stringify({ type: 'contact_form', ...formData, submitted_at: new Date().toISOString() }),
        item_type: 'contact_submission', user_email: formData.email,
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
      toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'hsl(var(--surface))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT — headline + info ── */}
            <div
              className="p-8 md:p-10 flex flex-col justify-between"
              style={{ borderRight: '1px solid hsl(var(--border))' }}
            >
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-4">
                  Get In Touch
                </p>
                <h2
                  className="font-bold leading-tight tracking-tight mb-4 text-foreground"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                >
                  Let's Build<br />Something Great
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
                  Book a free consultation. No commitment — just a conversation about your goals.
                </p>

                {/* What you get */}
                <div className="space-y-3 mb-8">
                  {[
                    'Full listing quality audit',
                    'Competitor benchmarking',
                    'Custom growth roadmap',
                    'No obligation, ever',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact links */}
              <div className="space-y-3">
                <a
                  href="mailto:info@saleixo.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  info@saleixo.com
                </a>
              </div>
            </div>

            {/* ── RIGHT — form ── */}
            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                      className="text-xs text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`h-10 rounded-xl text-sm bg-background border-border focus:border-primary/50 ${errors.name ? 'border-red-500/60' : ''}`}
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={`h-10 rounded-xl text-sm bg-background border-border focus:border-primary/50 ${errors.email ? 'border-red-500/60' : ''}`}
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className={`h-10 rounded-xl text-sm bg-background border-border focus:border-primary/50 ${errors.phone ? 'border-red-500/60' : ''}`}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Tell us about your project
                      </label>
                      <Textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Products, marketplaces, goals..."
                        className="rounded-xl text-sm bg-background border-border focus:border-primary/50 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group"
                      style={{
                        background: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? 'Sending...' : 'Book Free Consultation'}
                      {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <p className="text-center text-xs text-muted-foreground/50">
                      No spam. No commitment. Response within 24 hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
