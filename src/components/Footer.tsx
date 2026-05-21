import { Mail, MessageCircle, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import SaleixoLogo from '@/components/SaleixoLogo';

// Collapsible section for mobile footer
const FooterAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30 md:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default"
        aria-expanded={open}
      >
        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground md:mb-5">
          {title}
        </h4>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-muted-foreground transition-transform duration-200 md:hidden',
            open && 'rotate-180'
          )}
        />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300 md:block', open ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none')}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  

  const services = [
    { label: 'Product Photography',    href: '/services/photography'         },
    { label: 'Amazon Listing & FBA',   href: '/services/amazon'              },
    { label: 'Ecommerce Management',   href: '/services/ecommerce-management'},
    { label: 'Shopify Setup & Design', href: '/services/shopify'             },
    { label: 'Social & Paid Ads',      href: '/services/social-ads'          },
    { label: 'Ecommerce Design',       href: '/design'                       },
    { label: 'All Services',           href: '/services'                     },
    { label: 'Pricing',                href: '/custom-pricing'               },
  ];

  const studio = [
    { label: 'About',      href: null, action: () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Process',    href: null, action: () => document.querySelector('#how-it-works-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Portfolio',  href: null, action: () => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Blog',       href: '/blog',         action: undefined },
    { label: 'Get Started',href: '/get-started',  action: undefined },
    { label: 'Contact',    href: null, action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const legal = [
    { label: 'Privacy Policy',           href: '/privacy'  },
    { label: 'Terms of Service',          href: '/terms'    },
    { label: 'Cookie Policy',             href: '/cookies'  },
    { label: 'Cancellation & Refund',     href: '/refund'   },
  ];

  const openCookieSettings = () =>
    window.dispatchEvent(new Event('saleixo:open-cookie-settings'));

  return (
    <footer className="relative overflow-hidden border-t border-border/40">

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent-violet) / 0.4), transparent)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">

        {/* ── Top grid ── */}
        <div className="pb-4 md:pb-12 border-b border-border/30">

          {/* Brand — always visible, full width on mobile */}
          <div className="pb-6 mb-2 border-b border-border/30 md:border-none md:mb-0 md:pb-0">
            <div className="mb-4"><SaleixoLogo size="text-3xl" /></div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-1">
              The diagnostic-first ecommerce studio.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Photography · Design · Listings · Marketing.
            </p>
          </div>

          {/* Link columns — accordion on mobile, grid on desktop */}
          <div className="md:grid md:grid-cols-4 md:gap-8 md:pt-8">

            {/* Services */}
            <FooterAccordion title="Services">
              <ul className="space-y-3">
                {services.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Studio */}
            <FooterAccordion title="Studio">
              <ul className="space-y-3">
                {studio.map(item => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {item.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {item.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Legal */}
            <FooterAccordion title="Legal">
              <ul className="space-y-3">
                {legal.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={openCookieSettings}
                    className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    Cookie Settings
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                  </button>
                </li>
              </ul>
            </FooterAccordion>

            {/* Contact */}
            <FooterAccordion title="Contact">
              <ul className="space-y-3 mb-5">
                {[
                  { icon: <Mail className="w-3.5 h-3.5" />,          label: 'info@saleixo.com',  href: 'mailto:info@saleixo.com'    },
                  { icon: <MessageCircle className="w-3.5 h-3.5" />, label: 'WhatsApp Us',        href: 'https://wa.me/917011441159' },
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-foreground/70 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border/30">
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2">Free resources</p>
                <ul className="space-y-2">
                  {['Free Listing Audit', 'Amazon Image Checklist', 'Multi-Marketplace Spec Sheet'].map(r => (
                    <li key={r}>
                      <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs text-foreground/50 hover:text-white transition-colors duration-200"
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Markets */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2">Markets</p>
                <p className="text-xs text-muted-foreground/70">US · UK · FR · DE · AU · CA · IN</p>
              </div>
            </FooterAccordion>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-muted-foreground/50">
          <span>© {currentYear} Saleixo Studio · saleixo.com · info@saleixo.com</span>
          <span>Photography · Design · Listings · Marketing</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
