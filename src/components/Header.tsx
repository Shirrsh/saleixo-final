import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Camera, ShoppingCart, BookOpen, Grid,
  Mail, MessageCircle, ArrowRight, Star, HelpCircle,
  Users, Sun, Moon, Palette, Video, TrendingUp, BarChart2, ChevronDown,
  Globe, Sparkles, Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SaleixoLogo from '@/components/SaleixoLogo';
import { toggleThemeWithTransition } from '@/lib/theme';
import { openCalendarBooking } from '@/lib/booking';

const BAR_H = 40;

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
    label: 'Flagship Platforms',
    items: [
      {
        icon: Palette,
        color: '#f97316',
        name: 'Amazon SPN Flagship Hub',
        desc: '8 SPN Categories: Imaging, A++, PPC, FBA & Global',
        href: '/services/amazon',
        badge: 'Flagship · SPN Standards',
        type: 'route' as const,
        quicklinks: [
          { name: 'Imaging', href: '/services/amazon#imaging' },
          { name: 'Cataloging', href: '/services/amazon#cataloging' },
          { name: 'A+ Content', href: '/services/amazon#a-plus' },
          { name: 'Advertising', href: '/services/amazon#advertising' },
          { name: 'Account Health', href: '/services/amazon#account-health' },
          { name: 'Storefronts', href: '/services/amazon#storefronts' },
          { name: 'FBA Logistics', href: '/services/amazon#fba-logistics' },
          { name: 'Global Selling', href: '/services/amazon#global-expansion' },
        ],
      },
      {
        icon: Globe,
        color: '#8b5cf6',
        name: 'Shopify & Shopify Plus',
        desc: 'Flow Automations, Analytics, CRO & Plus Scale',
        href: '/services/shopify',
        badge: 'Enterprise',
        type: 'route' as const,
        quicklinks: [
          { name: 'Flow Automations', href: '/services/shopify#automations' },
          { name: 'Shopify Plus', href: '/services/shopify#plus' },
          { name: 'Analytics & CRO', href: '/services/shopify#analytics' },
        ],
      },
    ],
  },
  {
    label: 'Studio Disciplines',
    items: [
      {
        icon: Camera,
        color: '#3b82f6',
        name: 'Product Photography',
        desc: 'Studio, lifestyle & 48-hr delivery',
        href: '/services/photography',
        type: 'route' as const,
      },
      {
        icon: ShoppingCart,
        color: '#10b981',
        name: 'Ecommerce Management',
        desc: 'Operations across 20+ marketplaces',
        href: '/services/ecommerce-management',
        type: 'route' as const,
      },
      {
        icon: BarChart2,
        color: '#ec4899',
        name: 'Social & Paid Ads',
        desc: 'Meta, Google & ROAS campaigns',
        href: '/services/social-ads',
        type: 'route' as const,
      },
      {
        icon: TrendingUp,
        color: 'hsl(var(--primary))',
        name: 'Ecommerce Design',
        desc: 'Brand identity, listings & packaging',
        href: '/design',
        type: 'route' as const,
      },
      {
        icon: Sparkles,
        color: '#c2410c',
        name: 'Handmade & Artisan Brands',
        desc: 'Macro photos & craft marketplace specs',
        href: '/handmade',
        type: 'route' as const,
      },
      {
        icon: Grid,
        color: 'hsl(var(--primary))',
        name: 'All Services Overview',
        desc: 'Compare full service catalog',
        href: '/services',
        type: 'route' as const,
      },
    ],
  },
  {
    label: 'Explore & Pricing',
    items: [
      {
        icon: HelpCircle,
        name: 'Transparent Pricing',
        desc: 'Retainers & on-demand deliverables',
        href: '/custom-pricing',
        type: 'route' as const,
      },
      {
        icon: Star,
        name: 'Portfolio & Results',
        desc: 'Our verified work',
        href: '#portfolio',
        type: 'scroll' as const,
      },
      {
        icon: BookOpen,
        name: 'Blog & Seller Guides',
        desc: 'Ecommerce insights',
        href: '/blog',
        type: 'route' as const,
      },
      {
        icon: Users,
        name: 'How It Works',
        desc: '4-step diagnostic process',
        href: '#how-it-works-section',
        type: 'scroll' as const,
      },
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
    <span className="mx-6 opacity-50">✦</span>
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
    {/* Mobile: single clean centered line — no ticker jank */}
    <div className="md:hidden flex-1 flex items-center justify-center px-10">
      <Link
        to="/get-started"
        onClick={onDismiss}
        className="text-[11px] font-bold tracking-[0.08em] text-white text-center whitespace-nowrap"
        style={{ letterSpacing: '0.06em' }}
      >
        ✦ Free brand audit — <span className="underline underline-offset-2">Get started →</span>
      </Link>
    </div>

    {/* Desktop: scrolling ticker */}
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      className="hidden md:flex items-center whitespace-nowrap text-[11px] font-bold tracking-wide flex-shrink-0"
      style={{ color: '#ffffff', willChange: 'transform' }}
    >
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
      <span className="flex items-center">{BAR_TEXT}</span>
    </motion.div>

    {/* Right fade — desktop only (hides text sliding under dismiss button) */}
    <div
      className="hidden md:block absolute right-0 top-0 bottom-0 pointer-events-none"
      style={{
        width: 56,
        background: 'linear-gradient(to right, transparent, #dc2626 60%)',
      }}
    />

    {/* Dismiss button — 36px tap area to meet mobile touch target guidelines */}
    <button
      onClick={onDismiss}
      aria-label="Dismiss announcement"
      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 flex items-center justify-center transition-opacity duration-150 hover:opacity-100 opacity-80 active:scale-95"
      style={{ width: 36, height: 36 }}
    >
      <span
        className="flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '50%', width: 24, height: 24 }}
      >
        <X size={11} strokeWidth={2.5} style={{ color: '#ffffff' }} />
      </span>
    </button>
  </motion.div>
);

// ─── Mega Menu (3-Pillar Hierarchy) ──────────────────────────────────────────
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
    className="fixed left-0 right-0 z-40 max-h-[calc(100vh-80px)] overflow-y-auto"
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
      <div className="max-w-7xl mx-auto px-8 py-7">
        {/* Top Header */}
        <div
          className="flex items-center justify-between mb-5 pb-3 border-b"
          style={{ borderColor: isLight ? 'hsl(0 0% 92%)' : 'hsl(220 25% 16%)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase"
              style={{ color: isLight ? 'hsl(0 0% 45%)' : 'hsl(215 20% 55%)' }}
            >
              Service Architecture
            </span>
            <span className="text-xs text-muted-foreground/40">/</span>
            <span className="text-xs font-medium text-muted-foreground">
              Dual Flagship Pillars & Creative Disciplines
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/custom-pricing"
              onClick={onClose}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Custom Pricing <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              to="/services"
              onClick={onClose}
              className="text-xs font-bold text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              All Services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* ── Pillar 1: Amazon SPN Flagship Hub (col-span-5) ── */}
          <div
            className="col-span-5 rounded-2xl p-5 flex flex-col justify-between transition-all"
            style={{
              background: isLight ? 'hsl(28 100% 98% / 0.7)' : 'hsl(28 35% 10% / 0.4)',
              border: `1px solid ${isLight ? 'hsl(28 80% 86%)' : 'hsl(28 60% 22% / 0.6)'}`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(249,115,22,0.15)',
                    color: '#f97316',
                    border: '1px solid rgba(249,115,22,0.35)',
                  }}
                >
                  Flagship · SPN Standards
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">8 Disciplines</span>
              </div>

              <Link
                to="/services/amazon"
                onClick={onClose}
                className="group flex items-center justify-between mt-1 mb-1.5"
              >
                <span
                  className="text-base font-bold transition-colors group-hover:text-[#f97316]"
                  style={{ color: isLight ? '#0a0a0a' : '#fff' }}
                >
                  Amazon SPN Flagship Hub
                </span>
                <ArrowRight className="w-4 h-4 text-[#f97316] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
              </Link>
              <p className="text-xs leading-relaxed text-muted-foreground mb-4">
                Full lifecycle seller operations aligned with official Amazon Service Provider Network standards.
              </p>

              {/* 8 SPN Quicklinks Grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: 'Imaging & 3D Video', href: '/services/amazon#imaging' },
                  { name: 'Cataloging & A9 SEO', href: '/services/amazon#cataloging' },
                  { name: 'A+ & Premium A++', href: '/services/amazon#a-plus' },
                  { name: 'Advertising & PPC', href: '/services/amazon#advertising' },
                  { name: 'Account Health & Appeals', href: '/services/amazon#account-health' },
                  { name: 'Brand Storefronts', href: '/services/amazon#storefronts' },
                  { name: 'FBA & Logistics', href: '/services/amazon#fba-logistics' },
                  { name: 'Global Expansion', href: '/services/amazon#global-expansion' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group"
                    style={{
                      background: isLight ? 'rgba(255,255,255,0.85)' : 'hsl(220 28% 13% / 0.8)',
                      border: `1px solid ${isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)'}`,
                      color: isLight ? 'hsl(0 0% 25%)' : 'hsl(215 20% 75%)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)';
                      e.currentTarget.style.color = '#f97316';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)';
                      e.currentTarget.style.color = isLight ? 'hsl(0 0% 25%)' : 'hsl(215 20% 75%)';
                    }}
                  >
                    <span className="truncate">{item.name}</span>
                    <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#f97316]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t" style={{ borderColor: isLight ? 'hsl(28 60% 90%)' : 'hsl(28 40% 18%)' }}>
              <Link
                to="/services/amazon"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:underline"
              >
                Explore Amazon SPN Flagship Hub <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* ── Pillar 2: Shopify & Shopify Plus Enterprise (col-span-3) ── */}
          <div
            className="col-span-3 rounded-2xl p-5 flex flex-col justify-between transition-all"
            style={{
              background: isLight ? 'hsl(260 100% 99% / 0.7)' : 'hsl(260 30% 10% / 0.4)',
              border: `1px solid ${isLight ? 'hsl(260 80% 90%)' : 'hsl(260 50% 22% / 0.6)'}`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(139,92,246,0.15)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139,92,246,0.35)',
                  }}
                >
                  Enterprise
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">OS 2.0 & Plus</span>
              </div>

              <Link
                to="/services/shopify"
                onClick={onClose}
                className="group flex items-center justify-between mt-1 mb-1.5"
              >
                <span
                  className="text-base font-bold transition-colors group-hover:text-[#8b5cf6]"
                  style={{ color: isLight ? '#0a0a0a' : '#fff' }}
                >
                  Shopify & Plus
                </span>
                <ArrowRight className="w-4 h-4 text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
              </Link>
              <p className="text-xs leading-relaxed text-muted-foreground mb-4">
                High-conversion DTC storefronts, Flow automations, and enterprise scale.
              </p>

              {/* Shopify Quicklinks List */}
              <div className="space-y-1.5">
                {[
                  { name: 'Flow Automations Engine', href: '/services/shopify#automations' },
                  { name: 'Shopify Plus Extensibility', href: '/services/shopify#plus' },
                  { name: 'Advanced Analytics & CRO', href: '/services/shopify#analytics' },
                  { name: '14-Day Launch Roadmap', href: '/services/shopify' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all group"
                    style={{
                      background: isLight ? 'rgba(255,255,255,0.85)' : 'hsl(220 28% 13% / 0.8)',
                      border: `1px solid ${isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)'}`,
                      color: isLight ? 'hsl(0 0% 25%)' : 'hsl(215 20% 75%)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                      e.currentTarget.style.color = '#8b5cf6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)';
                      e.currentTarget.style.color = isLight ? 'hsl(0 0% 25%)' : 'hsl(215 20% 75%)';
                    }}
                  >
                    <span className="truncate">{item.name}</span>
                    <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#8b5cf6]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t" style={{ borderColor: isLight ? 'hsl(260 50% 90%)' : 'hsl(260 30% 18%)' }}>
              <Link
                to="/services/shopify"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b5cf6] hover:underline"
              >
                Explore Shopify Studio <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* ── Column 3: Multi-Channel Studio Disciplines (col-span-4) ── */}
          <div
            className="col-span-4 rounded-2xl p-5 flex flex-col justify-between"
            style={{
              background: isLight ? 'hsl(0 0% 98%)' : 'hsl(220 28% 11%)',
              border: `1px solid ${isLight ? 'hsl(0 0% 89%)' : 'hsl(220 25% 18%)'}`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'hsl(var(--primary) / 0.12)',
                    color: 'hsl(var(--primary))',
                    border: '1px solid hsl(var(--primary) / 0.3)',
                  }}
                >
                  Studio Disciplines
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">Multi-Channel</span>
              </div>

              <Link
                to="/services"
                onClick={onClose}
                className="group flex items-center justify-between mt-1 mb-1.5"
              >
                <span
                  className="text-base font-bold transition-colors group-hover:text-primary"
                  style={{ color: isLight ? '#0a0a0a' : '#fff' }}
                >
                  Multi-Channel Studio
                </span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
              </Link>
              <p className="text-xs leading-relaxed text-muted-foreground mb-3">
                High-impact creative production & multi-channel commerce management.
              </p>

              {/* 5 Studio Services */}
              <div className="space-y-1.5">
                {[
                  {
                    icon: Camera,
                    color: '#3b82f6',
                    name: 'Product Photography',
                    desc: 'Studio, lifestyle & 48-hr turnaround',
                    href: '/services/photography',
                  },
                  {
                    icon: ShoppingCart,
                    color: '#10b981',
                    name: 'Ecommerce Management',
                    desc: 'Full operations for 20+ marketplaces',
                    href: '/services/ecommerce-management',
                  },
                  {
                    icon: BarChart2,
                    color: '#ec4899',
                    name: 'Social & Paid Ads',
                    desc: 'Meta & Google ROAS campaigns',
                    href: '/services/social-ads',
                  },
                  {
                    icon: TrendingUp,
                    color: 'hsl(var(--primary))',
                    name: 'Ecommerce Design',
                    desc: 'Packaging, dielines & brand identity',
                    href: '/design',
                  },
                  {
                    icon: Sparkles,
                    color: '#c2410c',
                    name: 'Handmade & Artisan Brands',
                    desc: 'Macro craft shoots & Etsy specs',
                    href: '/handmade',
                  },
                ].map((svc) => {
                  const SvcIcon = svc.icon;
                  return (
                    <Link
                      key={svc.name}
                      to={svc.href}
                      onClick={onClose}
                      className="group flex items-center gap-2.5 p-2 rounded-xl transition-all"
                      style={{ background: 'transparent' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = isLight ? 'hsl(0 0% 93%)' : 'hsl(220 28% 15%)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}
                      >
                        <SvcIcon className="w-3.5 h-3.5" style={{ color: svc.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="text-xs font-semibold leading-tight truncate group-hover:text-primary transition-colors"
                          style={{ color: isLight ? '#0a0a0a' : '#fff' }}
                        >
                          {svc.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">{svc.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t" style={{ borderColor: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)' }}>
              <Link
                to="/services"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                Browse All Studio Services <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credibility Strip */}
        <div
          className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${isLight ? 'hsl(0 0% 92%)' : 'hsl(220 25% 16%)'}` }}
        >
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f97316]" />
              Official Amazon SPN Categories
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
              Shopify Plus Architecture
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              48-hr Delivery Guarantee
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              20+ Marketplaces Supported
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">Transparent pricing model:</span>
            <Link
              to="/custom-pricing"
              onClick={onClose}
              className="font-bold text-primary hover:underline flex items-center gap-1"
            >
              Explore Pricing Calculator <ArrowRight className="w-3 h-3" />
            </Link>
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
    window.dispatchEvent(new Event('bar-dismissed'));
  };

  const headerTop = showBar ? BAR_H : 0;
  const megaTop   = headerTop + 64;

  // Track theme class on <html>
  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      if (customEvent.detail) {
        setIsLight(!customEvent.detail.isDark);
      } else {
        sync();
      }
    };
    window.addEventListener('saleixo-theme-changed', onThemeChange);
    return () => {
      obs.disconnect();
      window.removeEventListener('saleixo-theme-changed', onThemeChange);
    };
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
    toggleThemeWithTransition((isDark) => {
      setIsLight(!isDark);
    });
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
        <div style={{ width: '100%', padding: '0 clamp(24px, 7vw, 140px)', height: '64px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>

            {/* ── Logo ─────────────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200 flex items-center"
              aria-label="Saleixo home"
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <SaleixoLogo />
            </Link>

            {/* ── Desktop center nav ────────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-7 justify-self-center" aria-label="Main navigation">
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
            <div className="hidden md:flex items-center gap-2 justify-self-end">

              {/* Book 1-on-1 Call Button */}
              <button
                type="button"
                onClick={() => openCalendarBooking()}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-85 active:scale-95 whitespace-nowrap border"
                style={{
                  background: isLight ? 'hsl(0 0% 96%)' : 'hsl(220 25% 15%)',
                  color: isLight ? 'hsl(0 0% 20%)' : 'hsl(215 20% 85%)',
                  borderColor: isLight ? 'hsl(0 0% 86%)' : 'hsl(220 25% 24%)',
                }}
              >
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Book Call</span>
              </button>

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
              className="md:hidden flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 justify-self-end"
              style={{
                width: 44, height: 44,
                gridColumn: 3,
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
                      const hasQuicklinks = Boolean(item.quicklinks && item.quicklinks.length > 0);
                      const iconColor = item.color || (isLight ? '#0a0a0a' : '#93c5fd');
                      const badgeIsFlagship = item.badge?.includes('Flagship');

                      const content = (
                        <motion.div
                          key={ii}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: si * 0.08 + ii * 0.05 }}
                          className="p-4 rounded-2xl transition-all"
                          style={{ background: menuCard }}
                        >
                          <div
                            className="flex items-center gap-4 cursor-pointer"
                            style={{ minHeight: 48 }}
                            onClick={() => {
                              if (item.type === 'scroll') scrollTo(item.href, true);
                              else {
                                setMobileOpen(false);
                                if (hasQuicklinks) {
                                  window.location.href = item.href;
                                }
                              }
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: item.color
                                  ? `${item.color}18`
                                  : isLight ? 'hsl(0 0% 90%)' : 'hsl(220 28% 18%)',
                                border: item.color ? `1px solid ${item.color}35` : 'none',
                              }}
                            >
                              <Icon size={18} style={{ color: iconColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="font-semibold text-sm" style={{ color: menuText }}>
                                  {item.name}
                                </div>
                                {item.badge && (
                                  <span
                                    className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                    style={{
                                      background: badgeIsFlagship ? 'rgba(249,115,22,0.15)' : 'rgba(139,92,246,0.15)',
                                      color: badgeIsFlagship ? '#f97316' : '#8b5cf6',
                                      border: `1px solid ${badgeIsFlagship ? 'rgba(249,115,22,0.35)' : 'rgba(139,92,246,0.35)'}`,
                                    }}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs mt-0.5 leading-relaxed" style={{ color: menuMuted }}>
                                {item.desc}
                              </div>
                            </div>
                            {item.type === 'route' ? (
                              <Link
                                to={item.href}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMobileOpen(false);
                                }}
                                className="p-2 -mr-2 rounded-lg flex items-center justify-center hover:opacity-80"
                                aria-label={`Navigate to ${item.name}`}
                              >
                                <ArrowRight size={16} style={{ color: menuMuted, flexShrink: 0 }} />
                              </Link>
                            ) : (
                              <ArrowRight size={16} style={{ color: menuMuted, flexShrink: 0 }} />
                            )}
                          </div>

                          {/* Sub-category quick links */}
                          {hasQuicklinks && item.quicklinks && (
                            <div
                              className="mt-3 pt-3 flex flex-wrap gap-1.5"
                              style={{ borderTop: `1px solid ${isLight ? 'hsl(0 0% 90%)' : 'hsl(220 25% 18%)'}` }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.quicklinks.map((ql, qli) => (
                                <Link
                                  key={qli}
                                  to={ql.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 flex items-center justify-center"
                                  style={{
                                    background: isLight ? 'rgba(255,255,255,0.9)' : 'hsl(220 28% 16%)',
                                    color: isLight ? 'hsl(0 0% 25%)' : 'hsl(215 20% 80%)',
                                    border: `1px solid ${isLight ? 'hsl(0 0% 86%)' : 'hsl(220 25% 24%)'}`,
                                    minHeight: '36px',
                                  }}
                                >
                                  {ql.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );

                      if (!hasQuicklinks && item.type === 'route') {
                        return (
                          <Link key={ii} to={item.href} onClick={() => setMobileOpen(false)} className="block">
                            {content}
                          </Link>
                        );
                      }
                      return <div key={ii}>{content}</div>;
                    })}
                  </div>
                </div>
              ))}



              <div style={{ height: 1, background: menuBorder }} />

              {/* Contact */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: menuMuted }}>Get In Touch</p>
                <div className="space-y-2">
                  <Link to="/get-started" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl active:opacity-70 border border-primary/30"
                    style={{ background: isLight ? 'hsl(217 91% 60% / 0.08)' : 'hsl(217 91% 60% / 0.12)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--primary))' }}>
                      <Video size={18} style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: menuText }}>Book Strategy Call</div>
                      <div className="text-xs mt-0.5" style={{ color: menuMuted }}>15-min Google Meet / Zoom (EST/PST)</div>
                    </div>
                  </Link>
                  <a href="mailto:info@saleixo.com" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl active:opacity-70"
                    style={{ background: menuCard }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isLight ? 'hsl(0 0% 90%)' : 'hsl(220 28% 18%)' }}>
                      <Mail size={18} style={{ color: isLight ? '#0a0a0a' : '#93c5fd' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: menuText }}>Email Studio</div>
                      <div className="text-xs mt-0.5" style={{ color: menuMuted }}>info@saleixo.com</div>
                    </div>
                  </a>
                  <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-3.5 rounded-2xl active:opacity-70"
                    style={{ background: menuCard }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#25D36622' }}>
                      <MessageCircle size={16} style={{ color: '#25D366' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs" style={{ color: menuText }}>Quick Chat</div>
                      <div className="text-[11px]" style={{ color: menuMuted }}>WhatsApp / Slack Connect</div>
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
              {/* Theme row — "Dark Mode" toggle: ON = dark, OFF = light */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ background: menuCard }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isLight ? 'hsl(220 28% 14% / 0.10)' : 'hsl(220 28% 18%)' }}>
                    <Moon size={18} style={{ color: isLight ? 'hsl(220 30% 40%)' : '#93c5fd' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: menuText }}>Dark Mode</div>
                    <div className="text-xs mt-0.5" style={{ color: menuMuted }}>{isLight ? 'Tap to enable' : 'Tap to disable'}</div>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="relative flex-shrink-0 active:scale-95 transition-transform"
                  style={{
                    width: 48, height: 28, borderRadius: 999,
                    background: isLight ? 'hsl(220 15% 80%)' : '#7c3aed',
                    border: `1px solid ${isLight ? 'hsl(220 15% 70%)' : '#6d28d9'}`,
                  }}
                >
                  <motion.span
                    className="absolute top-[3px] w-5 h-5 rounded-full bg-white"
                    animate={{ left: isLight ? 3 : 24 }}
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
