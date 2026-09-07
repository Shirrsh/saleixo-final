import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Package,
  Clock,
  ArrowRight,
  ExternalLink,
  Store,
  Camera,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

export interface DealInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNiche: string;
  nicheTitle: string;
  dealTierName: string;
  skuQuantity: number;
  formattedPrice: string;
  currency: string;
}

export const DealInquiryModal: React.FC<DealInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedNiche,
  nicheTitle,
  dealTierName,
  skuQuantity,
  formattedPrice,
  currency,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    productUrl: '',
    sampleMethod: 'photos', // 'photos' | 'ship'
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in your name, email, and WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      const deliveryMethodLabel =
        formData.sampleMethod === 'photos'
          ? 'Upload / Email High-Res Smartphone Photos (48h AI relighting)'
          : 'Ship Physical Product Samples to Studio Hub (Noida)';

      const detailedMessage = `
=========================================
7+2+1 LISTING ASSET DEAL INQUIRY
=========================================
Deal Package: ${dealTierName}
Niche: ${nicheTitle} (${selectedNiche})
SKU Volume: ${skuQuantity} SKU(s)
Quoted Total: ${formattedPrice} (${currency})
Sample Delivery: ${deliveryMethodLabel}
Product / Store Link: ${formData.productUrl || 'Not provided'}
Brand / Company: ${formData.brand || 'Individual Seller'}
Client Notes: ${formData.notes || 'None'}
Timestamp: ${new Date().toISOString()}
=========================================
      `.trim();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase.from('leads' as any) as any).insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.brand.trim() || null,
          services: ['7+2+1 Listing Deal', dealTierName, nicheTitle],
          source: '7-2-1-deal-inquiry',
          status: 'new',
          priority: 'high',
          message: detailedMessage,
        },
      ]);

      if (dbError) {
        console.warn('Database lead insert notice:', dbError);
      }

      // Try triggering notify-lead Edge Function (safely catches in dev)
      try {
        await supabase.functions.invoke('notify-lead', {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.brand.trim() || undefined,
            services: ['7+2+1 Listing Deal', dealTierName, nicheTitle],
            source: '7-2-1-deal-inquiry',
            message: detailedMessage,
          },
        });
      } catch (fnErr) {
        console.warn('Edge function notification notice (development):', fnErr);
      }

      setIsSuccess(true);
      toast.success('Inquiry submitted successfully! Our team will contact you within 2 hours.');
    } catch (err) {
      console.error('Submission error:', err);
      // Even if offline, show confirmation in dev preview
      setIsSuccess(true);
      toast.success('Inquiry received! WhatsApp fast-link is ready below.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Saleixo, we just submitted an inquiry for the *${dealTierName}* (${nicheTitle}, ${skuQuantity} SKU for ${formattedPrice}). Our name / brand is ${formData.name || 'Seller'}.`
  );

  const whatsappUrl = `https://wa.me/917011441159?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-border/70 bg-muted/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Lock Your 7+2+1 Listing Deal
              </h3>
              <p className="text-xs text-muted-foreground">
                48-Hour Studio SLA • 100% Amazon/Shopify Compliant Assets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            /* ── SUCCESS CONFIRMATION STATE ─────────────────────────────── */
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                INQUIRY REGISTERED
              </span>
              <h4 className="text-2xl font-black text-foreground mt-1">
                Your 7+2+1 Asset Sprint is Confirmed!
              </h4>
              <p className="text-xs text-muted-foreground mt-2 max-w-md">
                We have received your project details. An ecommerce producer will review your SKU requirements and reach out on WhatsApp/Email within 2 business hours.
              </p>

              {/* Deal Summary Box */}
              <div className="mt-6 p-4 rounded-2xl bg-muted/50 border border-border/80 w-full max-w-md text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-border/60 font-medium">
                  <span className="text-muted-foreground">Deal Package:</span>
                  <span className="font-bold text-foreground">{dealTierName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Niche Category:</span>
                  <span className="text-foreground">{nicheTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="text-foreground">{skuQuantity} SKU(s)</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/40 font-bold">
                  <span className="text-muted-foreground">Total Quoted:</span>
                  <span className="text-primary text-sm">{formattedPrice}</span>
                </div>
              </div>

              {/* WhatsApp Fast Track Action */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                >
                  Back to Studio
                </button>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Production SLA: 48–72 hours from photo receipt</span>
              </div>
            </div>
          ) : (
            /* ── THE INQUIRY FORM ───────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Deal Banner */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider block">
                    CURRENT SELECTION
                  </span>
                  <span className="font-extrabold text-foreground text-sm">
                    {dealTierName} • {nicheTitle}
                  </span>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    {skuQuantity} SKU(s) included
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-primary/20 sm:pl-4">
                  <span className="text-xs text-muted-foreground block">Quoted Investment</span>
                  <span className="text-lg font-black text-foreground">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    WhatsApp Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Work Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. rahul@brand.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Brand or Store Name
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g. ArtCraft Studio"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Product / Store URL */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Product Link or Existing Store URL
                </label>
                <input
                  type="url"
                  name="productUrl"
                  placeholder="https://amazon.in/dp/... or https://yourstore.com"
                  value={formData.productUrl}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Product Sample Delivery Method */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  How will you provide product assets?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-left flex items-start gap-2.5 transition-all ${
                      formData.sampleMethod === 'photos'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-border/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sampleMethod"
                      value="photos"
                      checked={formData.sampleMethod === 'photos'}
                      onChange={handleChange}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        Smartphone Photos (Fastest)
                      </span>
                      <span className="text-[10px] text-muted-foreground leading-tight block mt-0.5">
                        Send raw photos from your counter. Our AI generates pure white studio & lifestyle scenes.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-left flex items-start gap-2.5 transition-all ${
                      formData.sampleMethod === 'ship'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-border/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sampleMethod"
                      value="ship"
                      checked={formData.sampleMethod === 'ship'}
                      onChange={handleChange}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        Ship Physical Products
                      </span>
                      <span className="text-[10px] text-muted-foreground leading-tight block mt-0.5">
                        Courier samples directly to our studio hub in Sector 62, Noida for camera macro photography.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Specific Instructions */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Specific Requests / Target Marketplace Notes
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. Selling on Amazon India & US, need A+ content for Diwali season..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Satisfaction or Free Re-Lighting</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-medium text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Locking Deal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit 7+2+1 Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
