import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '917011441159';
  const message = 'Hi! I would like to know more about your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 glass-purple text-foreground px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
