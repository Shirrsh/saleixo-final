import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// -- Schema --------------------------------------------------------------------
const SERVICES = [
  { id: 'amazon',    label: 'Amazon FBA & Listing' },
  { id: 'shopify',   label: 'Shopify Setup & Design' },
  { id: 'ads',       label: 'Social Media & Paid Ads' },
  { id: 'photos',    label: 'Product Photography' },
  { id: 'ecommerce', label: 'Ecommerce Management' },
  { id: 'unsure',    label: "Not sure - advise me" },
] as const;

const schema = z.object({
  name:      z.string().min(2, 'Please enter your full name'),
  email:     z.string().email('Please enter a valid email address'),
  phone:     z.string().min(7, 'Please enter a phone or WhatsApp number'),
  product:   z.string().min(3, 'Tell us a bit about what you sell'),
  services:  z.array(z.string()).min(1, 'Select at least one service'),
  challenge: z.string().min(10, 'Give us a little detail - we\'ll come prepared'),
});

type FormValues = z.infer<typeof schema>;

// -- Component -----------------------------------------------------------------
const GetStarted = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const selectedServices = watch('services');

  const toggleService = (id: string) => {
    const current = watch('services');
    const updated  = current.includes(id)
      ? current.filter(s => s !== id)
      : [...current, id];
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    // TODO: wire to your backend / Supabase / email service
    await new Promise(r => setTimeout(r, 1200)); // simulate network
    console.log('Form submission:', data);
    setLoading(false);
    setSubmitted(true);
  };

  // -- Thank-you state ------------------------------------------------------
  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">You're in\!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for reaching out to Saleixo. A member of our team will be in touch within <strong className="text-foreground">24 hours</strong> to schedule your free discovery call.
            </p>
            <p className="text-sm text-muted-foreground mb-8">Check your inbox - a confirmation email is on its way.</p>
            <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors">
              Back to Home <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // -- Form -----------------------------------------------------------------
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Free Consultation</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
              Let's get your <span className="gradient-text">ecommerce</span> growing.
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Fill in the form below - takes 2 minutes. We'll review your answers and reach out within 24 hours to book your free discovery call.
            </p>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-4 mb-8 text-xs text-muted-foreground">
            {['Free, no obligation', 'Reply within 24 hours', 'No spam, ever'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-primary">*</span></label>
              <input
                {...register('name')}
                type="text"
                placeholder="Jane Smith"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                  errors.name ? "border-destructive" : "border-border"
                )}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address <span className="text-primary">*</span></label>
              <input
                {...register('email')}
                type="email"
                placeholder="jane@yourbrand.com"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                  errors.email ? "border-destructive" : "border-border"
                )}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp / Phone <span className="text-primary">*</span></label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+1 555 000 0000"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                  errors.phone ? "border-destructive" : "border-border"
                )}
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">What are you selling? <span className="text-primary">*</span></label>
              <input
                {...register('product')}
                type="text"
                placeholder="e.g. Handmade leather wallets on Amazon UK"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                  errors.product ? "border-destructive" : "border-border"
                )}
              />
              {errors.product && <p className="mt-1 text-xs text-destructive">{errors.product.message}</p>}
            </div>

            {/* Services multi-select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Which service(s) are you interested in? <span className="text-primary">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map(svc => {
                  const active = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all",
                        active
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all",
                        active ? "bg-primary border-primary" : "border-border-strong"
                      )}>
                        {active && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      {svc.label}
                    </button>
                  );
                })}
              </div>
              {errors.services && <p className="mt-1 text-xs text-destructive">{errors.services.message}</p>}
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                What's your biggest challenge right now? <span className="text-primary">*</span>
              </label>
              <textarea
                {...register('challenge')}
                rows={4}
                placeholder="e.g. My Amazon listing has low click-through rate and I don't know why. Sales have been flat for 3 months."
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-surface text-foreground placeholder:text-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none",
                  errors.challenge ? "border-destructive" : "border-border"
                )}
              />
              {errors.challenge && <p className="mt-1 text-xs text-destructive">{errors.challenge.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm btn-primary-glow transition-all hover:bg-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                <>Send My Request <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{' '}
              and{' '}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
              We'll never spam you.
            </p>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GetStarted;
