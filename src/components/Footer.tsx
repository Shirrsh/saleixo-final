import { Mail, MessageCircle, ArrowUpRight, ChevronDown, Video, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import SaleixoLogo from '@/components/SaleixoLogo';
import { openCalendarBooking, openQuickAudit } from '@/lib/booking';

// Collapsible section for mobile footer
const FooterAccordion = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/20 md:border-none last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default group text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground md:group-hover:text-muted-foreground transition-colors md:mb-5">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-muted-foreground transition-transform duration-200 md:hidden',
            open && 'rotate-180 text-foreground'
          )}
        />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300 md:block', open ? 'max-h-[1600px] pb-4' : 'max-h-0 md:max-h-none')}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const handleSectionClick = (targetId: string) => {
    if (location.pathname !== '/') {
      navigate(`/${targetId}`);
      return;
    }
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const amazonServices = [
    { label: 'Amazon SPN Flagship Hub', href: '/services/amazon' },
    { label: 'Imaging (RGB 255 & Video)', href: '/services/amazon#imaging' },
    { label: 'Cataloging & A9 SEO', href: '/services/amazon#cataloging' },
    { label: 'A+ & Premium A++ Content', href: '/services/amazon#a-plus' },
    { label: 'Amazon Advertising & PPC', href: '/services/amazon#advertising' },
    { label: 'Account Health & Appeals', href: '/services/amazon#account-health' },
    { label: 'Brand Storefront Design', href: '/services/amazon#storefronts' },
    { label: 'FBA & Logistics Consulting', href: '/services/amazon#fba-logistics' },
    { label: 'Global Marketplace Sync', href: '/services/amazon#global-expansion' },
  ];

  const shopifyServices = [
    { label: 'Shopify & Plus Enterprise', href: '/services/shopify' },
    { label: 'Shopify Flow Automations', href: '/services/shopify#automations' },
    { label: 'Plus Checkout Extensibility', href: '/services/shopify#plus' },
    { label: 'Analytics & CRO Flywheel', href: '/services/shopify#analytics' },
    { label: 'B2B Wholesale Portals', href: '/services/shopify#b2b' },
  ];

  const creativeServices = [
    { label: 'Product Photography (48hr)', href: '/services/photography' },
    { label: 'Ecommerce Management', href: '/services/ecommerce-management' },
    { label: 'Social & Paid Ads (Meta/Google)', href: '/services/social-ads' },
    { label: 'Ecommerce Design & Packaging', href: '/design' },
    { label: 'Handmade & Artisan Brands', href: '/handmade' },
    { label: 'All Services Overview', href: '/services' },
    { label: 'Transparent Pricing Plans', href: '/custom-pricing' },
  ];

  const companyLinks = [
    { label: 'About Studio',    href: '/about',       action: undefined },
    { label: 'How We Work',     href: null,           action: () => handleSectionClick('#how-it-works-section') },
    { label: 'Selected Work',   href: null,           action: () => handleSectionClick('#portfolio') },
    { label: 'Ecommerce Blog',  href: '/blog',        action: undefined },
    { label: 'Get Started Form',href: '/get-started', action: undefined },
    { label: 'Contact Team',    href: '/contact',     action: undefined },
  ];

  const legalLinks = [
    { label: 'Privacy Policy',       href: '/privacy' },
    { label: 'Terms of Service',      href: '/terms'   },
    { label: 'Cookie Policy',         href: '/cookies' },
    { label: 'Cancellation & Refund', href: '/refund'  },
  ];

  const openCookieSettings = () =>
    window.dispatchEvent(new Event('saleixo:open-cookie-settings'));

  const triggerAudit = () => {
    openQuickAudit();
  };

  const triggerBooking = () => {
    openCalendarBooking();
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-surface/40 to-surface border-t border-border/30">

      {/* Subtle ambient lighting accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)' }}
      />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[160px] bg-primary/5 blur-3xl pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── Seamless Pre-Footer Conversion Strip ── */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Production Studios Live · 48-Hour Turnaround Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Ready to scale your ecommerce revenue?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Receive a diagnostic audit of your live listings and ad account before spending a dollar on retainers. Serving US (EST & PST), UK, India, and global marketplace sellers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={triggerAudit}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                Instant Listing Audit
              </button>
              <button
                type="button"
                onClick={triggerBooking}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all"
              >
                <Video className="w-4 h-4 text-primary" />
                Book 15-Min Call
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Footer Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12">

          {/* Column 1: Brand & Operational Studio HQ (Span 4 on MD, Span 4 on LG) */}
          <div className="md:col-span-4 space-y-4">
            <SaleixoLogo size="text-3xl" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The diagnostic-first ecommerce services studio. Amazon SPN standards, Shopify Plus architecture, catalog imaging, and revenue engineering for high-growth brands.
            </p>

            {/* Studio Contact */}
            <div className="pt-2 text-xs space-y-2 text-foreground/80">
              <div className="flex items-center gap-2 text-muted-foreground pt-1">
                <a
                  href="mailto:info@saleixo.com"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  info@saleixo.com
                </a>
              </div>
            </div>

            {/* Quick Chat Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/917011441159"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Column 2: Amazon SPN Services (Span 2 on MD) */}
          <div className="md:col-span-2">
            <FooterAccordion title="Amazon SPN">
              <ul className="space-y-2">
                {amazonServices.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group py-0.5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 text-primary flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          {/* Column 3: Shopify & DTC Studio (Span 2 on MD) */}
          <div className="md:col-span-2">
            <FooterAccordion title="Shopify & DTC">
              <ul className="space-y-2">
                {shopifyServices.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group py-0.5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 text-primary flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-border/20 hidden md:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-2">
                  Marketplace Coverage
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  US, UK, Canada, Germany, France, Australia, India & 20+ global regions.
                </p>
              </div>
            </FooterAccordion>
          </div>

          {/* Column 4: Creative & Marketing (Span 2 on MD) */}
          <div className="md:col-span-2">
            <FooterAccordion title="Creative Studio">
              <ul className="space-y-2">
                {creativeServices.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group py-0.5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 text-primary flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          {/* Column 5: Company & Legal (Span 2 on MD) */}
          <div className="md:col-span-2">
            <FooterAccordion title="Company & Legal">
              <div className="space-y-4">
                <ul className="space-y-2">
                  {companyLinks.map(item => (
                    <li key={item.label}>
                      {item.action ? (
                        <button
                          onClick={item.action}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group py-0.5 text-left"
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 text-primary flex-shrink-0" />
                        </button>
                      ) : (
                        <Link
                          to={item.href!}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group py-0.5"
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 text-primary flex-shrink-0" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-border/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
                    Policies
                  </p>
                  <ul className="space-y-1.5">
                    {legalLinks.map(item => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          className="text-[11px] text-muted-foreground/80 hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={openCookieSettings}
                        className="text-[11px] text-muted-foreground/80 hover:text-foreground transition-colors"
                      >
                        Cookie Preferences
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </FooterAccordion>
          </div>

        </div>

        {/* ── Seamless Bottom Compliance Bar ── */}
        <div className="pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span>© {currentYear} Saleixo Studio (saleixo.com). All rights reserved.</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Canonical domain: saleixo.com</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 text-[11px] bg-card/40">
              🔒 100% Confidential (Mutual NDA)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
