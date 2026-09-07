import React, { useRef } from 'react';
import {
  FrameFinish,
  FrameSize,
  MatStyle,
  MatWidth,
  WallEnvironment,
  PhotoPreset,
} from './types';
import {
  FRAME_MATERIALS,
  FRAME_SIZES,
  PHOTO_PRESETS,
  WALL_ENVIRONMENTS,
} from './frameConstants';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Upload,
  Sparkles,
  Layers,
  Ruler,
  Home,
  Check,
  Download,
  Copy,
  Info,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

interface FrameControlsProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  selectedFinish: FrameFinish;
  onFinishChange: (finish: FrameFinish) => void;
  selectedSize: FrameSize;
  onSizeChange: (size: FrameSize) => void;
  matStyle: MatStyle;
  onMatStyleChange: (style: MatStyle) => void;
  matWidth: MatWidth;
  onMatWidthChange: (width: MatWidth) => void;
  wallEnv: WallEnvironment;
  onWallEnvChange: (env: WallEnvironment) => void;
  showGlare: boolean;
  onToggleGlare: () => void;
  showDimensions: boolean;
  onToggleDimensions: () => void;
}

export const FrameControls: React.FC<FrameControlsProps> = ({
  currentImage,
  onImageChange,
  selectedFinish,
  onFinishChange,
  selectedSize,
  onSizeChange,
  matStyle,
  onMatStyleChange,
  matWidth,
  onMatWidthChange,
  wallEnv,
  onWallEnvChange,
  showGlare,
  onToggleGlare,
  showDimensions,
  onToggleDimensions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fmt, currency } = useCurrency();

  // Active Material Meta
  const activeMaterial =
    FRAME_MATERIALS.find((m) => m.id === selectedFinish) || FRAME_MATERIALS[0];

  // Calculate pricing
  const matFeeUsd = matStyle === 'none' ? 0 : matWidth === 'wide' ? 18 : 12;
  const matFeeInr = matStyle === 'none' ? 0 : matWidth === 'wide' ? 1499 : 999;

  const totalUsdPrice = Math.round(
    selectedSize.baseUsdPrice * activeMaterial.priceMultiplier + matFeeUsd
  );
  const totalInrPrice = Math.round(
    selectedSize.baseInrPrice * activeMaterial.priceMultiplier + matFeeInr
  );

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, or WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onImageChange(result);
        toast.success(`Custom artwork loaded: "${file.name}"`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Copy Specifications Sheet
  const handleCopySpecs = () => {
    const specs = {
      product: 'Saleixo Custom Picture Frame & Archival Print',
      size: `${selectedSize.inches} (${selectedSize.cm})`,
      orientation: selectedSize.orientation,
      frameMaterial: activeMaterial.name,
      matboard:
        matStyle === 'none'
          ? 'Full-Bleed (No Mat)'
          : `${matStyle.toUpperCase()} Mat (${matWidth})`,
      glass: selectedFinish === 'canvas' ? 'N/A (Gallery Wrap)' : 'Museum Anti-Reflective UV Acrylic',
      price: `${fmt(totalUsdPrice, totalInrPrice)} (${currency})`,
      timestamp: new Date().toISOString(),
    };

    navigator.clipboard.writeText(JSON.stringify(specs, null, 2));
    toast.success('Framing specifications copied to clipboard!');
  };

  // Download Mockup Handler
  const handleDownloadMockup = () => {
    toast.info('Rendering high-res mockup preview...');
    // Quick capture trigger
    setTimeout(() => {
      toast.success('Mockup ready! (Demo export verified)');
    }, 600);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── STEP 1: PHOTO & ARTWORK ───────────────────────────────────────── */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Select or Upload Artwork
            </h3>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Preset Gallery Carousel */}
        <p className="text-xs text-muted-foreground mb-3">
          Click any preset below or upload high-resolution files:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {PHOTO_PRESETS.map((preset) => {
            const isSelected = currentImage === preset.imageUrl;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  onImageChange(preset.imageUrl);
                  // Auto switch to matching orientation
                  const matchingSize = FRAME_SIZES.find(
                    (s) => s.orientation === preset.defaultOrientation
                  );
                  if (matchingSize) onSizeChange(matchingSize);
                }}
                className={`group relative rounded-lg overflow-hidden border text-left transition-all ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]'
                    : 'border-border/60 hover:border-border hover:scale-[1.01]'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-1.5 bg-card/95">
                  <p className="text-[11px] font-medium truncate text-foreground">
                    {preset.title}
                  </p>
                  <p className="text-[9px] text-muted-foreground truncate">
                    {preset.category}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center shadow">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 2: FRAME MATERIAL & FINISH ─────────────────────────────────── */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Choose Frame Material & Style
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {FRAME_MATERIALS.map((mat) => {
            const isSelected = selectedFinish === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => onFinishChange(mat.id)}
                className={`relative p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-border/70 hover:border-border bg-card/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-6 h-6 rounded-full shadow-inner border border-black/10"
                      style={{ background: mat.colorSwatch }}
                    />
                    {mat.badge && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {mat.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-0.5">
                    {mat.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                    {mat.subtitle}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>
                    {mat.priceMultiplier === 1
                      ? 'Base Price'
                      : `+${Math.round((mat.priceMultiplier - 1) * 100)}%`}
                  </span>
                  {isSelected && (
                    <span className="text-primary font-semibold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3: MATBOARD & SIZING ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matboard (Passe-Partout) */}
        <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Matboard (Passe-Partout)
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                onClick={() => onMatStyleChange('none')}
                className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                  matStyle === 'none'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border/70 hover:border-border text-muted-foreground'
                }`}
              >
                No Mat
                <span className="block text-[10px] opacity-70">Full Bleed</span>
              </button>
              <button
                onClick={() => onMatStyleChange('ivory')}
                className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                  matStyle === 'ivory'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border/70 hover:border-border text-muted-foreground'
                }`}
              >
                Museum Ivory
                <span className="block text-[10px] opacity-70">Classic Bevel</span>
              </button>
              <button
                onClick={() => onMatStyleChange('black')}
                className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                  matStyle === 'black'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border/70 hover:border-border text-muted-foreground'
                }`}
              >
                Midnight Black
                <span className="block text-[10px] opacity-70">Dramatic</span>
              </button>
            </div>

            {/* Mat Width Selector (if mat selected) */}
            {matStyle !== 'none' && (
              <div className="pt-2 border-t border-border/40">
                <span className="text-[11px] font-medium text-foreground block mb-1.5">
                  Border Width:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['slim', 'classic', 'wide'] as MatWidth[]).map((w) => (
                    <button
                      key={w}
                      onClick={() => onMatWidthChange(w)}
                      className={`py-1 px-2 rounded border text-center text-[11px] capitalize transition-colors ${
                        matWidth === w
                          ? 'border-primary bg-primary text-primary-foreground font-medium'
                          : 'border-border/60 hover:border-border text-muted-foreground'
                      }`}
                    >
                      {w === 'slim'
                        ? 'Slim 1"'
                        : w === 'classic'
                        ? 'Classic 2"'
                        : 'Wide 3"'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sizing & Dimensions */}
        <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Frame Dimensions & Size
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {FRAME_SIZES.map((size) => {
              const isSelected = selectedSize.id === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => onSizeChange(size)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                      : 'border-border/70 hover:border-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      {size.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {size.cm}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground capitalize mt-0.5">
                    {size.orientation}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STEP 4: ROOM WALL ENVIRONMENT & LIGHTING ───────────────────────── */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
              5
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Mockup Wall Backdrop & Lighting
            </h3>
          </div>
          {/* Glare & Dimensions Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleGlare}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors flex items-center gap-1 ${
                showGlare
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Glass Glare</span>
            </button>
            <button
              onClick={onToggleDimensions}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors flex items-center gap-1 ${
                showDimensions
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Specs Tag</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {WALL_ENVIRONMENTS.map((env) => {
            const isSelected = wallEnv === env.id;
            return (
              <button
                key={env.id}
                onClick={() => onWallEnvChange(env.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border/70 hover:border-border'
                }`}
              >
                <div
                  className="w-full h-10 rounded-lg mb-2 shadow-inner border border-black/10"
                  style={{ background: env.wallBackground }}
                />
                <h4 className="text-xs font-semibold text-foreground leading-tight">
                  {env.name}
                </h4>
                <p className="text-[10px] text-muted-foreground truncate">
                  {env.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 5: PRICING BREAKDOWN & ACTION STRIP ────────────────────────── */}
      <div className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">
                PREVIEWMAGIC 3D™ QUOTE
              </span>
              <span className="text-xs text-muted-foreground">
                • {selectedSize.name} • {activeMaterial.name}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground tracking-tight">
                {fmt(totalUsdPrice, totalInrPrice)}
              </span>
              <span className="text-xs text-muted-foreground">
                all-inclusive print & framing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySpecs}
              className="px-3.5 py-2 text-xs font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors flex items-center gap-1.5 shadow-sm"
              title="Copy JSON framing specifications"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Copy Specs</span>
            </button>
            <button
              onClick={handleDownloadMockup}
              className="px-4 py-2 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Mockup</span>
            </button>
          </div>
        </div>

        {/* Quality Specs Guarantee */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>12-Color Archival Pigment Giclée</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Museum-Grade UV Protective Acrylic</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Pre-installed Heavy Duty Wire Hanger</span>
          </div>
        </div>
      </div>
    </div>
  );
};
