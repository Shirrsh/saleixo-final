import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/917011441159?text=${encodeURIComponent('Hi! I would like to know more about your services.')}`;

  if (menuOpen || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-50">
      {/* Dismiss — 32px tap area, visually small */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss WhatsApp button"
        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-opacity hover:opacity-80 active:scale-90"
        style={{ background: 'transparent' }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: 'hsl(0 0% 15%)', border: '1px solid hsl(0 0% 35%)' }}
        >
          <X size={9} style={{ color: 'hsl(0 0% 80%)' }} strokeWidth={2.5} />
        </span>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          width: 44,
          height: 44,
          background: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
        }}
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
