import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dismissed, setDismissed]     = useState(false);

  // Hide when the mobile nav menu is open (Header adds overflow:hidden to body)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  const phoneNumber = '917011441159';
  const message = 'Hi! I would like to know more about your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (menuOpen || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dismiss × badge */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss WhatsApp button"
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center z-10 transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{
          background: 'hsl(0 0% 18% / 0.85)',
          border: '1px solid hsl(0 0% 40% / 0.5)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <X size={10} style={{ color: 'hsl(0 0% 85%)' }} />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] text-white p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
        style={{ width: 44, height: 44 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 glass-purple text-foreground px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
