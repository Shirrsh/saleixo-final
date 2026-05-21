import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Camera, ShoppingCart, BookOpen, Grid,
  Mail, MessageCircle, ArrowRight, Star, HelpCircle,
  Users, LogIn, Sun, Moon, Palette, Video, TrendingUp, BarChart2, ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import imgPhotography from '@/assets/photography-service.jpg';
import SaleixoLogo from '@/components/SaleixoLogo';

const BAR_H = 40;

// ─── Mega menu services ───────────────────────────────────────────────────────
const MEGA_SERVICES = [
  {
    icon: Camera, color: '#3b82f6',
    title: 'Product Photography',
    desc: 'Studio-grade shoots for every marketplace',
    href: '/services/photography',
  },
  {
    icon: ShoppingCart, color: '#10b981',
    title: 'Ecommerce Management',
    desc: 'Full store operations & account management',
    href: '/services/ecommerce-management',
  },
  {
    icon: BarChart2, color: '#8b5cf6',
    title: 'Social Ads',
    desc: 'Google & Meta ads with 250% avg. ROI',
    href: '/services/social-ads',
  },
  {
    icon: Palette, color: '#f97316',
    title: 'Amazon Selling',
    desc: 'Listings, A+ content & account management',
    href: '/services/amazon',
  },
  {
    icon: Video, color: '#ec4899',
    title: 'Shopify Stores',
    desc: 'Custom stores, products & promotions',
    href: '/services/shopify',
  },
  {
    icon: TrendingUp, color: 'hsl(var(--primary))',
    title: 'Ecommerce Design',
    desc: 'Brand identity, listings & storefronts',
    href: '/design',
  },
];

// ─── Desktop nav ──────────────────────────────────────────────────────────────
const desktopNav = [
  { name: 'Services',    href: '/services',        type: 'mega'    as const },
  { name: 'Pricing',     href: '/custom-pricing',  type: 'route'   as const },
  { name: 'Blog',        href: '/blog',            type: 'route'   as const },
  { name: 'Contact',     href: '#contact',         type: 'scroll'  as const },
];

// ─── Mobile menu sections ─────────────────────────────────────────────────────
const menuSections = [
  {
    label: 'Services',
    items: [
      { icon: Camera,       name: 'Product Photography',   desc: 'Studio-grade shoots',       href: '/services/photography',          type: 'route'  as const },
      { icon: ShoppingCart, name: 'Ecommerce Management',  desc: 'Full store operations',      href: '/services/ecommerce-management', type: 'route'  as const },
      { icon: BarChart2,    name: 'Social Ads',            desc: 'Google & Meta campaigns',    href: '/services/social-ads',           type: 'route'  as const },
      { icon: Palette,      name: 'Amazon Selling',        desc: 'Listings & A+ content',      href: '/services/amazon',              type: 'route'  as const },
      { icon: Video,        name: 'Shopify Stores',        desc: 'Custom store management',    href: '/services/shopify',             type: 'route'  as const },
      { icon: Grid,         name: 'All Services',          desc: 'Full service overview',      href: '/services',                     type: 'route'  as const },
    ],
  },
  {
    label: 'Explore',
    items: [
      { icon: Star,       name: 'Portfolio',    desc: 'Our work & results', href: '#portfolio',            type: 'scroll' as const },
      { icon: BookOpen,   name: 'Blog',         desc: 'Tips & insights',    href: '/blog',                 type: 'route'  as const },
      { icon: HelpCircle, name: 'Pricing',      desc: 'Transparent plans',  href: '/custom-pricing',       type: 'route'  as const },
      { icon: Users,      name: 'How It Works', desc: '6-step process',     href: '#how-it-works-section', type: 'scroll' as const },
    ],
  },
];

// ─── Announcement Bar ─────────────────────────────────────────────────────────
const BAR_TEXT = (
  <>
    Free brand audit for ecommerce sellers — tell us about your store.{' '}
    <Link to="/get-started" className="underline underline-offset-2 hover:opacity-75 transition-opacity">
      Get started →
    </Link>
    <span className="mx-12 opacity-50">✦</span>
  </>
);

const AnnouncementBar = ({ onDismiss }: { onDismiss: () => void }) => (
  <motion.div
    initial={{ y: -BAR_H }}
    animate={{ y: 0 }}
    exit={{ y: -BAR_H }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 left-0 right-0 z-[60] flex items-center overflow-hidden"
    style={{ height: BAR_H, background: '#dc2626' }}
  >
    {/* Scrolling ticker */}
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      className="flex items-center whitespace-nowrap text-[11px] font-bold tracking-wide flex-shrink-0"
      style={{ color: '#ffffff' }}
    >
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
    </motion.div>

    {/* Dismiss button — fixed on right */}
    <button
      onClick={onDismiss}
      aria-label="Dismiss announcement"
      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity z-10 flex-shrink-0"
      style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <X size={11} strokeWidth={2.5} style={{ color: '#ffffff' }} />
    </button>
  </motion.div>
);

// ─── Mega Menu ────────────────────────────────────────────────────────────────
const MegaMenu = ({ isLight, onClose, onEnter, onLeave, topOffset }: {
  isLight: boolean;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
  topOffset: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="fixed left-0 right-0 z-40"
    style={{ top: topOffset }}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    <div
      className="w-full shadow-2xl border-b"
      style={{
        background: isLight ? 'rgba(255,255,255,0.98)' : 'hsl(220 30% 8% / 0.98)',
        borderColor: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-10 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* ── Left: service grid ── */}
          <div className="col-span-8">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: isLight ? 'hsl(0 0% 50%)' : 'hsl(215 20% 50%)' }}>
              What We Do
            </p>
            <div className="grid grid-cols-3 gap-3">
              {MEGA_SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <Link key={i} to={svc.href} onClick={onClose}
                    className="group flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200"
                    style={{ background: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.background = isLight ? 'hsl(0 0% 96%)' : 'hsl(220 28% 13%)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                      <Icon className="w-4 h-4" style={{ color: svc.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-0.5"
                        style={{ color: isLight ? '#0a0a0a' : '#fff' }}>
                        {svc.title}
                      </div>
                      <div className="text-xs leading-relaxed"
                        style={{ color: isLight ? 'hsl(0 0% 45%)' : 'hsl(215 20% 55%)' }}>
                        {svc.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Stats strip */}
            <div className="mt-5 pt-4 grid grid-cols-3 gap-4"
              style={{ borderTop: `1px solid ${isLight ? 'hsl(0 0% 92%)' : 'hsl(220 25% 16%)'}` }}>
              {[
                { value: '3.1×', label: 'Avg. ROAS' },
                { value: '+187%', label: 'Avg. CTR Lift' },
                { value: '0', label: 'Compliance Rejections' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-base font-extrabold" style={{ color: 'hsl(var(--primary))' }}>{stat.value}</div>
                  <div className="text-[10px] font-medium mt-0.5"
                    style={{ color: isLight ? 'hsl(0 0% 50%)' : 'hsl(215 20% 50%)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-4 pt-3"
              style={{ borderTop: `1px solid ${isLight ? 'hsl(0 0% 92%)' : 'hsl(220 25% 16%)'}` }}>
              <Link to="/services" onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                style={{ color: 'hsl(var(--primary))' }}>
                View all services & pricing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ── Right: featured CTA ── */}
          <div className="col-span-4">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[240px]">
              <img src={imgPhotography} alt="Saleixo Studio" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'hsl(var(--primary))' }}>
                  Free Consultation
                </div>
                <p className="text-white text-sm font-semibold leading-snug mb-4">
                  Get a free brand audit & custom growth plan
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/get-started" onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:opacity-90"
                    style={{ background: 'hsl(var(--primary))', color: '#000' }}>
                    Get Started Free <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:opacity-90"
                    style={{ background: '#25D366', color: '#fff' }}>
                    <MessageCircle className="w-3 h-3" strokeWidth={2} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isLight, setIsLight]       = useState(false);
  const [megaOpen, setMegaOpen]     = useState(false);
  const [showBar, setShowBar]       = useState(() => {
    try { return localStorage.getItem('saleixo_bar_dismissed') !== '1'; }
    catch { return true; }
  });
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissBar = () => {
    setShowBar(false);
    try { localStorage.setItem('saleixo_bar_dismissed', '1'); } catch {} // eslint-disable-line no-empty
  };

  const headerTop = showBar ? BAR_H : 0;
  const megaTop   = headerTop + 64;

  // Track theme class on <html>
  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Scroll-triggered glass background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href: string, closeMobile = false) => {
    if (closeMobile) setMobileOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), closeMobile ? 300 : 50);
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = !isLight;
    html.classList.toggle('light', next);
    html.classList.toggle('dark', !next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  // ── Derived tokens ────────────────────────────────────────────────────────
  const navColor   = isLight ? 'hsl(0 0% 20%)'  : 'hsl(215 15% 68%)';
  const navHover   = isLight ? '#000'            : '#fff';
  const ctaBg      = isLight ? '#0d0d0d'         : '#ffffff';
  const ctaFg      = isLight ? '#ffffff'         : '#0d0d0d';
  const menuBg     = isLight ? '#ffffff'         : 'hsl(220 30% 8%)';
  const menuText   = isLight ? '#0a0a0a'         : '#ffffff';
  const menuMuted  = isLight ? 'hsl(0 0% 45%)'  : 'hsl(215 20% 60%)';
  const menuBorder = isLight ? 'hsl(0 0% 90%)'  : 'hsl(220 25% 18%)';
  const menuCard   = isLight ? 'hsl(0 0% 97%)'  : 'hsl(220 28% 12%)';

  const glassBg = isLight
    ? (scrolled ? 'rgba(255,255,255,0.95)' : 'transparent')
    : (scrolled ? 'hsl(220 30% 7% / 0.92)' : 'transparent');
  const glassBorder = scrolled
    ? (isLight ? '1px solid hsl(0 0% 90%)' : '1px solid hsl(220 25% 16% / 0.6)')
    : '1px solid transparent';

  const navColorFinal = scrolled ? navColor : (isLight ? 'hsl(0 0% 20%)' : 'hsl(215 15% 80%)');
  const navHoverFinal = scrolled ? navHover : (isLight ? '#000' : '#fff');

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBar && <AnnouncementBar onDismiss={dismissBar} />}
      </AnimatePresence>

      {/* ── Fixed bar ──────────────────────────────────────────────────────── */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: headerTop,
          background: glassBg,
          borderBottom: glassBorder,
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <div style={{ width: '100%', padding: '0 clamp(24px, 7vw, 140px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* ── Logo ─────────────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200 flex items-center"
              aria-label="Saleixo home"
              onClick={() => setMobileOpen(false)}
            >
              <SaleixoLogo />
            </Link>

            {/* ── Desktop center nav ────────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              {desktopNav.map(link => {
                if (link.type === 'mega') {
                  return (
                    <div key={link.name} className="relative"
                      onMouseEnter={() => {
                        if (megaTimeout.current) clearTimeout(megaTimeout.current);
                        setMegaOpen(true);
                      }}
                      onMouseLeave={() => {
                        megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
                      }}
                    >
                      <button
                        className="flex items-center gap-1 text-sm transition-colors duration-150"
                        style={{ color: megaOpen ? navHoverFinal : navColorFinal }}
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                          style={{ transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                      </button>
                    </div>
                  );
                }
                if (link.type === 'route') {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: navColorFinal }}
                      onMouseEnter={e => (e.currentTarget.style.color = navHoverFinal)}
                      onMouseLeave={e => (e.currentTarget.style.color = navColorFinal)}
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-150"
                    style={{ color: navColorFinal }}
                    onMouseEnter={e => (e.currentTarget.style.color = navHoverFinal)}
                    onMouseLeave={e => (e.currentTarget.style.color = navColorFinal)}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* ── Desktop right ─────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2">

              {/* Get Started CTA */}
              <Link
                to="/get-started"
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80 active:scale-95 whitespace-nowrap"
                style={{ background: ctaBg, color: ctaFg }}
              >
                Get Started Free
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 active:scale-95"
                style={{
                  background: isLight ? 'hsl(0 0% 93%)' : 'hsl(220 25% 16%)',
                  border: isLight ? '1px solid hsl(0 0% 84%)' : '1px solid hsl(220 25% 24%)',
                  color: isLight ? 'hsl(0 0% 35%)' : 'hsl(215 20% 65%)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLight ? (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.18 }}>
                      <Moon size={14} />
                    </motion.span>
                  ) : (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.18 }}>
                      <Sun size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* ── Mobile hamburger ─────────────────────────────────────────── */}
            <button
              className="md:hidden flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95"
              style={{
                width: 44, height: 44,
                color: isLight ? '#111' : (scrolled ? 'hsl(215 20% 70%)' : '#ffffff'),
                background: mobileOpen ? (isLight ? 'hsl(0 0% 94%)' : 'hsl(220 28% 14%)') : 'transparent',
              }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

        </div>
      </header>

      {/* ── Mega menu ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <MegaMenu
            isLight={isLight}
            topOffset={megaTop}
            onClose={() => setMegaOpen(false)}
            onEnter={() => {
              if (megaTimeout.current) clearTimeout(megaTimeout.current);
            }}
            onLeave={() => {
              megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Full-screen mobile menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: menuBg, paddingTop: headerTop + 64 }}
          >
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6">

              {menuSections.map((section, si) => (
                <div key={si}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: menuMuted }}>
                    {section.label}
                  </p>
                  <div className="space-y-2">
                    {section.items.map((item, ii) => {
                      const Icon = item.icon;
                      const row = (
                        <motion.div
                          key={ii}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: si * 0.08 + ii * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-2xl active:scale-[0.98] transition-transform"
                          style={{ background: menuCard, minHeight: 64 }}
                          onClick={() => {
                            if (item.type === 'scroll') scrollTo(item.href, true);
                            else setMobileOpen(false);
                          }}
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 28% 18%)' }}>
                            <Icon size={18} style={{ color: isLight ? '#0a0a0a' : '#93c5fd' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm" style={{ color: menuText }}>{item.name}</div>
                            <div className="text-xs mt-0.5" style={{ color: menuMuted }}>{item.desc}</div>
                          </div>
                          <ArrowRight size={16} style={{ color: menuMuted, flexShrink: 0 }} />
                        </motion.div>
                      );
                      return item.type === 'route'
                        ? <Link key={ii} to={item.href} onClick={() => setMobileOpen(false)}>{row}</Link>
                        : <div key={ii} className="cursor-pointer">{row}</div>;
                    })}
                  </div>
                </div>
              ))}

              <div style={{ height: 1, background: menuBorder }} />

              {/* Sign In */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: menuMuted }}>Account</p>
                <Link to="/admin/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl active:opacity-70"
                  style={{ background: menuCard }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 28% 18%)' }}>
                    <LogIn size={18} style={{ color: isLight ? '#0a0a0a' : '#93c5fd' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: menuText }}>Sign In</div>
                    <div className="text-xs mt-0.5" style={{ color: menuMuted }}>Admin panel access</div>
                  </div>
                  <ArrowRight size={16} style={{ color: menuMuted, flexShrink: 0 }} />
                </Link>
              </div>

              <div style={{ height: 1, background: menuBorder }} />

              {/* Contact */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: menuMuted }}>Get In Touch</p>
                <div className="space-y-2">
                  <a href="mailto:info@saleixo.com" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl active:opacity-70"
                    style={{ background: menuCard }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 28% 18%)' }}>
                      <Mail size={18} style={{ color: isLight ? '#0a0a0a' : '#93c5fd' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: menuText }}>Email Us</div>
                      <div className="text-xs mt-0.5" style={{ color: menuMuted }}>info@saleixo.com</div>
                    </div>
                  </a>
                  <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl active:opacity-70"
                    style={{ background: menuCard }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#25D36622' }}>
                      <MessageCircle size={18} style={{ color: '#25D366' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: menuText }}>WhatsApp</div>
                      <div className="text-xs mt-0.5" style={{ color: menuMuted }}>Chat with us directly</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: menuCard }}>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: menuMuted }}>Serving Clients In</p>
                <p className="text-sm font-medium" style={{ color: menuText }}>US · UK · FR · DE · AU · CA · IN</p>
              </div>
            </div>

            {/* Sticky bottom: theme toggle + CTA */}
            <div className="px-5 py-4 border-t space-y-3" style={{ borderColor: menuBorder, background: menuBg }}>
              {/* Theme row */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ background: menuCard }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isLight ? 'hsl(48 96% 53% / 0.15)' : 'hsl(220 28% 18%)' }}>
                    {isLight
                      ? <Sun size={18} style={{ color: '#f59e0b' }} />
                      : <Moon size={18} style={{ color: '#93c5fd' }} />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: menuText }}>{isLight ? 'Light Mode' : 'Dark Mode'}</div>
                    <div className="text-xs mt-0.5" style={{ color: menuMuted }}>Tap to switch</div>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="relative flex-shrink-0 active:scale-95 transition-transform"
                  style={{
                    width: 48, height: 28, borderRadius: 999,
                    background: isLight ? '#f59e0b' : 'hsl(220 28% 22%)',
                    border: `1px solid ${isLight ? '#d97706' : 'hsl(220 25% 30%)'}`,
                  }}
                >
                  <motion.span
                    className="absolute top-[3px] w-5 h-5 rounded-full bg-white"
                    animate={{ left: isLight ? 24 : 3 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Get Started CTA */}
              <Link
                to="/get-started"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-transform"
                style={{ background: ctaBg, color: ctaFg, minHeight: 56 }}
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
