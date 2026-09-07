import React, { useState, useRef } from 'react';
import { NicheCategory, DealTier } from './dealTypes';
import { DEAL_PRICING, NICHE_PRESETS } from './dealConstants';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Sparkles,
  Layers,
  Video,
  CheckCircle2,
  Upload,
  Copy,
  Download,
  Info,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  Zap,
  TrendingUp,
  PackageCheck,
  Lock,
  ChevronRight,
  Eye,
  Check,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { DealInquiryModal } from './DealInquiryModal';

export const ListingDealStudio: React.FC = () => {
  const { fmt, currency } = useCurrency();

  // Niche & Tier State
  const [selectedNiche, setSelectedNiche] = useState<NicheCategory>('frames');
  const [includePlus2, setIncludePlus2] = useState<boolean>(true);
  const [includeReel, setIncludeReel] = useState<boolean>(true);
  const [skuQuantity, setSkuQuantity] = useState<number>(1);

  // Active Asset Inspection Modal
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);

  // Video Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Custom Upload for Slot 1
  const [customHeroImage, setCustomHeroImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Niche Meta
  const activeNiche =
    NICHE_PRESETS.find((n) => n.id === selectedNiche) || NICHE_PRESETS[0];

  // Pricing Calculations
  const baseCoreUsd = DEAL_PRICING.core7Usd;
  const baseCoreInr = DEAL_PRICING.core7Inr;

  const plus2Usd = includePlus2 ? DEAL_PRICING.plus2Usd : 0;
  const plus2Inr = includePlus2 ? DEAL_PRICING.plus2Inr : 0;

  const reelUsd = includeReel ? DEAL_PRICING.reelVideoUsd : 0;
  const reelInr = includeReel ? DEAL_PRICING.reelVideoInr : 0;

  // Single SKU Total
  const singleSkuUsd = baseCoreUsd + plus2Usd + reelUsd;
  const singleSkuInr = baseCoreInr + plus2Inr + reelInr;

  // Quantity Discount Rate
  const discountRate =
    skuQuantity >= 10 ? 0.25 : skuQuantity >= 5 ? 0.15 : skuQuantity >= 3 ? 0.1 : 0;

  const totalUsdPrice = Math.round(
    singleSkuUsd * skuQuantity * (1 - discountRate)
  );
  const totalInrPrice = Math.round(
    singleSkuInr * skuQuantity * (1 - discountRate)
  );

  // Handle Video Playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Custom File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomHeroImage(result);
        toast.success(`Custom raw product photo loaded for Hero slot!`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Copy Client Proposal Summary
  const handleCopyProposal = () => {
    const bundleName =
      includePlus2 && includeReel
        ? 'The Complete 7 + 2 + 1 Powerhouse Listing Bundle'
        : includePlus2
        ? 'The 7 + 2 Pro Listing Bundle'
        : 'The Core 7 Marketplace Bundle';

    const proposal = `=========================================
SALEIXO STUDIO — ECOMMERCE ASSET PROPOSAL
=========================================
Product Niche: ${activeNiche.name}
Package: ${bundleName}
Quantity: ${skuQuantity} SKU(s)
Total Investment: ${fmt(totalUsdPrice, totalInrPrice)} (${currency})

DELIVERABLES PER SKU:
• [7 Core Marketplace Images]: Amazon/Shopify/Etsy compliant (2000x2000px)
  - 1x Pure White RGB(255,255,255) Hero
  - 2x Dimension & Scale Infographics
  - 2x High-End Lifestyle Room Settings
  - 1x Craftsmanship & Macro Detail Close-Up
  - 1x Safe Transit & Gift-Ready Packaging Display
${
  includePlus2
    ? `• [+2 A+ Content Premium Modules]:
  - 1x Step-by-Step Installation / Curation Guide
  - 1x Brand Trust vs Cheap Generic Comparison Table\n`
    : ''
}${
      includeReel
        ? `• [+1 9:16 Vertical Video Reel]:
  - 15-30s 4K Short-Form Video for Amazon Video Ads, Instagram Reels & TikTok\n`
        : ''
    }
TURNAROUND TIME: 48-72 Hours from product receipt
FORMATS: High-res JPG, WebP + Raw Photoshop/Canva source files
GUARANTEE: 100% Amazon/Marketplace Image Compliance
=========================================`;

    navigator.clipboard.writeText(proposal);
    toast.success('Client proposal & spec sheet copied to clipboard!');
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* ── SECTION 1: NICHE & DEAL CONFIGURATOR BAR ───────────────────────── */}
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                AGENCY BUNDLE ARCHITECTURE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                7 + 2 + 1 Deal Formula
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Marketplace Listing Asset Deal Studio
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Configure and preview the 7 Core Images, 2 A+ Visual Modules, and 1 Video Reel engineered to lead and convert on Amazon, Shopify, and Etsy.
            </p>
          </div>

          {/* Quick Raw Product Photo Upload */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4 text-primary" />
              <span>{customHeroImage ? 'Change Test Photo' : 'Upload Client Photo'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            {customHeroImage && (
              <button
                onClick={() => setCustomHeroImage(null)}
                className="text-xs text-muted-foreground hover:text-destructive underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Niche Selector Tabs */}
        <div className="pt-6">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Select Product Niche:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {NICHE_PRESETS.map((niche) => {
              const isSelected = selectedNiche === niche.id;
              return (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNiche(niche.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                      : 'border-border/70 hover:border-border bg-card/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-semibold text-primary">
                        {niche.badge}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {niche.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {niche.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DEAL SLIDER & PRICING BREAKDOWN (7 < +2 <= 1) ────────────────── */}
        <div className="mt-8 pt-6 border-t border-border/70">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Configure Deal Components:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {/* 7 Core Images Pill */}
                <div className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>7 Core Marketplace Images (Base Deal)</span>
                  <span className="ml-1 opacity-90 font-mono">
                    {fmt(DEAL_PRICING.core7Usd, DEAL_PRICING.core7Inr)}
                  </span>
                </div>

                {/* +2 A+ Visuals Toggle */}
                <button
                  onClick={() => setIncludePlus2(!includePlus2)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    includePlus2
                      ? 'border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      includePlus2
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {includePlus2 && '✓'}
                  </div>
                  <span>+2 Premium A+ Modules</span>
                  <span className="font-mono text-[11px] opacity-80">
                    (+{fmt(DEAL_PRICING.plus2Usd, DEAL_PRICING.plus2Inr)})
                  </span>
                </button>

                {/* +1 Video Reel Toggle */}
                <button
                  onClick={() => setIncludeReel(!includeReel)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    includeReel
                      ? 'border-pink-500 bg-pink-500/10 text-pink-700 dark:text-pink-300 ring-2 ring-pink-500/20'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      includeReel
                        ? 'bg-pink-600 border-pink-600 text-white'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {includeReel && '✓'}
                  </div>
                  <span>+1 9:16 Video Reel (4K Motion)</span>
                  <span className="font-mono text-[11px] opacity-80">
                    (+{fmt(DEAL_PRICING.reelVideoUsd, DEAL_PRICING.reelVideoInr)})
                  </span>
                </button>
              </div>

              {/* SKU Quantity Selector */}
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">Catalog Volume:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 3, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setSkuQuantity(qty)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        skuQuantity === qty
                          ? 'bg-foreground text-background font-bold'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      {qty} {qty === 1 ? 'SKU' : 'SKUs'}
                      {qty >= 10 && ' (25% OFF)'}
                      {qty === 5 && ' (15% OFF)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Dynamic Price Box */}
            <div className="bg-muted/50 border border-border/80 rounded-2xl p-5 min-w-[260px] text-right flex flex-col justify-center">
              <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-1">
                <span>Deal Tier:</span>
                <span className="font-bold text-foreground">
                  {includePlus2 && includeReel
                    ? '7 + 2 + 1 Deal'
                    : includePlus2
                    ? '7 + 2 Deal'
                    : 'Core 7 Deal'}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {fmt(totalUsdPrice, totalInrPrice)}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                {skuQuantity > 1
                  ? `${fmt(singleSkuUsd, singleSkuInr)} / SKU with ${Math.round(discountRate * 100)}% volume savings`
                  : 'Complete ready-to-publish asset pack'}
              </p>
              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  onClick={handleCopyProposal}
                  className="px-3 py-1.5 rounded-lg bg-card hover:bg-card/80 border border-border text-xs font-medium flex items-center gap-1 text-foreground transition-colors shadow-sm"
                  title="Copy client proposal"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Copy Pitch</span>
                </button>
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lock Deal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: THE 7 CORE MARKETPLACE LISTING IMAGES ────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
              7
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                Core Marketplace Listing Images (Slots 1–7)
              </h3>
              <p className="text-xs text-muted-foreground">
                The 7 foundational images every Amazon & Shopify listing requires to drive clicks and eliminate buyer doubt.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
            Base Deal Included
          </span>
        </div>

        {/* 7-Slot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeNiche.slots
            .filter((s) => s.slotType === 'core')
            .map((slot, index) => {
              const isHero = index === 0;
              const displayImage =
                isHero && customHeroImage ? customHeroImage : slot.imageUrl;

              return (
                <div
                  key={slot.id}
                  className="group relative bg-card border border-border/80 rounded-xl overflow-hidden shadow-sm hover:border-primary/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Asset Container */}
                    <div className="relative aspect-square w-full bg-muted overflow-hidden border-b border-border/40">
                      <img
                        src={displayImage}
                        alt={slot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Slot Badge Pill */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono font-medium backdrop-blur-md">
                        {slot.slotNumber}
                      </div>

                      {/* CTR / Purpose Pill */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold shadow">
                        {slot.badge}
                      </div>

                      {isHero && customHeroImage && (
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-medium shadow">
                          Client Raw Photo Applied
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-3.5">
                      <h4 className="text-xs font-bold text-foreground leading-snug">
                        {slot.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {slot.tagline}
                      </p>

                      {/* Key Strategy Elements */}
                      <ul className="mt-2.5 space-y-1 text-[10px] text-muted-foreground border-t border-border/40 pt-2">
                        {slot.keyElements.map((elem, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-primary font-bold">•</span>
                            <span className="line-clamp-1">{elem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-3.5 pb-3 pt-1 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/30">
                    <span className="font-mono">{slot.dimensions}</span>
                    <span className="text-primary font-medium group-hover:underline flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ── SECTION 3: THE +2 PREMIUM A+ CONTENT VISUALS ───────────────────── */}
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          !includePlus2 ? 'opacity-50 grayscale' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-sm">
              +2
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <span>A+ Content & Trust Modules (Slots 8 & 9)</span>
                {!includePlus2 && (
                  <span className="text-xs font-normal text-amber-600 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> (Excluded from Current Quote)
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                High-converting conversion modules that justify premium pricing and answer technical objections.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIncludePlus2(!includePlus2)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
              includePlus2
                ? 'border-purple-500 bg-purple-500/10 text-purple-600'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {includePlus2 ? 'Included in Deal' : '+ Add to Deal'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeNiche.slots
            .filter((s) => s.slotType === 'plus2')
            .map((slot) => (
              <div
                key={slot.id}
                className="group relative bg-card border-2 border-purple-500/20 rounded-xl overflow-hidden shadow-sm hover:border-purple-500/50 transition-all flex flex-col sm:flex-row"
              >
                {/* Visual Asset Box */}
                <div className="relative sm:w-1/2 aspect-square bg-muted overflow-hidden">
                  <img
                    src={slot.imageUrl}
                    alt={slot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-purple-900/80 text-white text-[10px] font-mono font-medium backdrop-blur-md">
                    {slot.slotNumber}
                  </div>
                </div>

                {/* Metadata Side */}
                <div className="p-4 sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
                      {slot.categoryPurpose}
                    </span>
                    <h4 className="text-sm font-bold text-foreground">
                      {slot.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {slot.tagline}
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      {slot.keyElements.map((elem, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                          <span>{elem}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono">{slot.dimensions}</span>
                    <span className="text-purple-600 font-semibold">
                      A+ Standard
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ── SECTION 4: THE +1 9:16 VERTICAL VIDEO REEL ─────────────────────── */}
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ${
          !includeReel ? 'opacity-50 grayscale' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-pink-600 text-white font-bold flex items-center justify-center text-sm">
              +1
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <span>The 9:16 Vertical Video Reel (Slot 10)</span>
                {!includeReel && (
                  <span className="text-xs font-normal text-amber-600 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> (Excluded from Current Quote)
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                High-converting motion asset engineered for Amazon Product Video, Instagram Reels, and TikTok ads.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIncludeReel(!includeReel)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
              includeReel
                ? 'border-pink-500 bg-pink-500/10 text-pink-600'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {includeReel ? 'Included in Deal' : '+ Add Video Reel'}
          </button>
        </div>

        {/* Video Feature Card */}
        <div className="bg-card border-2 border-pink-500/20 rounded-2xl p-6 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Vertical Phone Mockup Screen */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-[220px] h-[390px] rounded-[32px] bg-black p-2.5 shadow-2xl border-4 border-zinc-800 flex flex-col justify-between overflow-hidden">
              {/* Dynamic Video Player */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={activeNiche.videoUrl}
                  poster={activeNiche.videoPoster}
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Floating Play/Pause Overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform shadow-lg z-10"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                {/* Top Phone Pill Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/80 z-20" />

                {/* Bottom Sound & Aspect Indicator */}
                <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between text-white text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md font-mono">
                    9:16 Vertical Reel
                  </span>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy & Video Specifications */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono text-xs font-bold">
                  HIGH CONVERTING VIDEO ASSET
                </span>
                <span className="text-xs text-muted-foreground">
                  Duration: {activeNiche.videoDuration}
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-foreground">
                {activeNiche.videoTitle}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Amazon algorithms actively boost listings with video content in search rankings. This 9:16 vertical cut gives clients a complete multi-platform asset they can upload to their Amazon product page, run as an Instagram Reel ad, and post on TikTok.
              </p>
            </div>

            {/* Video Shot List Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-muted/50 border border-border text-xs">
                <span className="font-mono font-bold text-pink-600 block mb-0.5">
                  01. The Hook (0–3s)
                </span>
                <p className="text-muted-foreground text-[11px]">
                  Fast cinematic unboxing / hanging reveal to stop the customer's feed scroll immediately.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/50 border border-border text-xs">
                <span className="font-mono font-bold text-pink-600 block mb-0.5">
                  02. Tactile Detail (4–10s)
                </span>
                <p className="text-muted-foreground text-[11px]">
                  Macro camera zoom into natural wood grain, ribbons, or hand-threw glaze textures.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/50 border border-border text-xs">
                <span className="font-mono font-bold text-pink-600 block mb-0.5">
                  03. The CTA (11–15s)
                </span>
                <p className="text-muted-foreground text-[11px]">
                  Final lifestyle hero shot with brand guarantee badge & clear buying impulse trigger.
                </p>
              </div>
            </div>

            {/* What's Delivered */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>4K 60fps MP4 Master</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Licensed Royalty-Free Audio Track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Amazon Video Upload Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: DEAL COMPARISON TABLE ─────────────────────────────────── */}
      <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-foreground mb-4">
          Compare the 3 Agency Deals (7 vs 7+2 vs 7+2+1)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/70 text-muted-foreground">
                <th className="pb-3 font-semibold">Deliverables</th>
                <th className="pb-3 font-semibold">Core 7 Deal</th>
                <th className="pb-3 font-semibold text-purple-600">Pro 7 + 2 Deal</th>
                <th className="pb-3 font-semibold text-pink-600">Ultimate 7 + 2 + 1 Deal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="py-2.5 font-medium">Pure White Amazon Hero</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Dimension & Scale Infographics</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Lifestyle In-Room Settings (2x)</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Craftsmanship & Packaging Macro</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
                <td className="py-2.5 text-emerald-600">✓ Included</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">+2 A+ Content Modules (Comparison & Guide)</td>
                <td className="py-2.5 text-muted-foreground">—</td>
                <td className="py-2.5 text-purple-600 font-bold">✓ Included</td>
                <td className="py-2.5 text-purple-600 font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">+1 9:16 Vertical Video Reel (4K Motion)</td>
                <td className="py-2.5 text-muted-foreground">—</td>
                <td className="py-2.5 text-muted-foreground">—</td>
                <td className="py-2.5 text-pink-600 font-bold">✓ Included (Flagship)</td>
              </tr>
              <tr className="border-t-2 border-border font-bold">
                <td className="py-3">Price per SKU</td>
                <td className="py-3 text-primary">
                  {fmt(DEAL_PRICING.core7Usd, DEAL_PRICING.core7Inr)}
                </td>
                <td className="py-3 text-purple-600">
                  {fmt(DEAL_PRICING.core7Usd + DEAL_PRICING.plus2Usd, DEAL_PRICING.core7Inr + DEAL_PRICING.plus2Inr)}
                </td>
                <td className="py-3 text-pink-600">
                  {fmt(singleSkuUsd, singleSkuInr)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION 6: READY TO TURN YOUR PRODUCTS INTO LISTING BUNDLES? ───── */}
      <div className="bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/25 rounded-3xl p-8 sm:p-10 shadow-lg text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
          FAST 48-HOUR ONBOARDING
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
          Ready to Launch Your 7+2+1 Asset Sprint?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg">
          Lock in your preferred deal tier for {activeNiche.name}. Send smartphone photos or ship samples to our studio hub in Noida.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              Submit{' '}
              {includePlus2 && includeReel
                ? '7+2+1 Deal'
                : includePlus2
                ? '7+2 Deal'
                : 'Core 7 Deal'}{' '}
              Inquiry
            </span>
          </button>
          <a
            href={`https://wa.me/917011441159?text=${encodeURIComponent(
              `Hi Saleixo, we are interested in the ${
                includePlus2 && includeReel
                  ? '7+2+1 Deal'
                  : includePlus2
                  ? '7+2 Deal'
                  : 'Core 7 Deal'
              } for ${activeNiche.name} (${skuQuantity} SKU, ${fmt(totalUsdPrice, totalInrPrice)}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ── DEAL INQUIRY MODAL ────────────────────────────────────────────── */}
      <DealInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedNiche={selectedNiche}
        nicheTitle={activeNiche.name}
        dealTierName={
          includePlus2 && includeReel
            ? 'Ultimate 7 + 2 + 1 Deal'
            : includePlus2
            ? 'Pro 7 + 2 Deal'
            : 'Core 7 Deal'
        }
        skuQuantity={skuQuantity}
        formattedPrice={fmt(totalUsdPrice, totalInrPrice)}
        currency={currency}
      />
    </div>
  );
};
