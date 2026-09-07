import { useEffect, useState } from 'react';
import { Calendar, MessageCircle, X, Video, ArrowRight, Clock } from 'lucide-react';
import { openCalendarBooking } from '@/lib/booking';

const WhatsAppButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/917011441159?text=${encodeURIComponent('Hi! I would like to schedule a strategy call or get more details about your ecommerce services.')}`;

  if (menuOpen || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Popover Card */}
      {popoverOpen && (
        <div className="absolute bottom-14 right-0 w-72 sm:w-80 rounded-2xl bg-card border border-border p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-foreground">Studio Active (EST Overlap)</span>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Close booking menu"
            >
              <X size={14} />
            </button>
          </div>

          <div className="py-3 space-y-2.5">
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Daily US Overlap & Same-Day Response</span>
            </div>

            {/* Primary Action: Video Call */}
            <button
              type="button"
              onClick={() => {
                setPopoverOpen(false);
                openCalendarBooking();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-primary text-primary-foreground font-medium text-xs hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4" />
                <span>Book 15-Min Strategy Call</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Secondary Action: WhatsApp / Direct Line */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setPopoverOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl border border-border hover:border-border/80 text-foreground text-xs transition-colors bg-muted/30"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp / Slack</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Quick Chat</span>
            </a>
          </div>

          <p className="text-[10px] text-muted-foreground text-center pt-2 border-t border-border">
            Direct access to lead ecommerce architects.
          </p>
        </div>
      )}

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss booking launcher"
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-opacity hover:opacity-80 active:scale-90"
      >
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        >
          <X size={8} className="text-muted-foreground" strokeWidth={2.5} />
        </span>
      </button>

      {/* Main Trigger Button: High-trust Call Booking Icon */}
      <button
        onClick={() => setPopoverOpen((v) => !v)}
        aria-label="Book a strategy call or chat"
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl bg-foreground text-background border border-border"
      >
        <Calendar className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold hidden sm:inline">Book Strategy Call</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
