import React, { useState } from 'react';
import { ListingDealStudio } from '@/components/frame-craft/ListingDealStudio';
import { FrameCanvas } from '@/components/frame-craft/FrameCanvas';
import { FrameControls } from '@/components/frame-craft/FrameControls';
import {
  FrameFinish,
  FrameSize,
  MatStyle,
  MatWidth,
  WallEnvironment,
} from '@/components/frame-craft/types';
import {
  FRAME_SIZES,
  PHOTO_PRESETS,
} from '@/components/frame-craft/frameConstants';
import CurrencyToggle from '@/components/CurrencyToggle';
import ThemeToggle from '@/components/ThemeToggle';
import {
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Layers,
  Video,
  Eye,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FrameCraftDemo() {
  // Main View Mode: 'deal-studio' (7+2+1) vs '3d-visualizer'
  const [activeTab, setActiveTab] = useState<'deal-studio' | '3d-visualizer'>(
    'deal-studio'
  );

  // State for 3D Visualizer
  const [currentImage, setCurrentImage] = useState<string>(
    PHOTO_PRESETS[0].imageUrl
  );
  const [selectedFinish, setSelectedFinish] = useState<FrameFinish>('oak');
  const [selectedSize, setSelectedSize] = useState<FrameSize>(FRAME_SIZES[1]);
  const [matStyle, setMatStyle] = useState<MatStyle>('ivory');
  const [matWidth, setMatWidth] = useState<MatWidth>('classic');
  const [wallEnv, setWallEnv] = useState<WallEnvironment>('living-room');
  const [showGlare, setShowGlare] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* ── TOP STICKY QC & SANDBOX BANNER ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/30 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold tracking-wide uppercase">
              Internal QC Sandbox
            </span>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span className="text-muted-foreground hidden sm:inline">
              Saleixo 7+2+1 Listing Asset Engine & Studio (Local Staging — Not Live)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CurrencyToggle className="scale-90" />
            <ThemeToggle />
            <Link
              to="/"
              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 font-medium transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Exit to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── HEADER & NAVIGATION TABS ────────────────────────────────────────── */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                ECOMMERCE AGENCY SERVICE ARCHITECTURE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                7 + 2 + 1 Deal Formula
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Marketplace SKU Asset Deal Studio
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              7 Core Marketplace Images + 2 Premium A+ Visual Modules + 1 High-Converting Video Reel for sellers and brands.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-muted border border-border shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('deal-studio')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'deal-studio'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Package className="w-4 h-4 text-primary" />
              <span>7+2+1 Deal Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('3d-visualizer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === '3d-visualizer'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-4 h-4 text-purple-500" />
              <span>3D Frame Visualizer</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'deal-studio' ? (
          <ListingDealStudio />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 7 COLS: THE 3D PHOTOREALISTIC CANVAS STAGE */}
            <div className="lg:col-span-7 flex flex-col gap-4 sticky lg:top-20">
              <FrameCanvas
                currentImage={currentImage}
                selectedFinish={selectedFinish}
                selectedSize={selectedSize}
                matStyle={matStyle}
                matWidth={matWidth}
                wallEnv={wallEnv}
                showGlare={showGlare}
                showDimensions={showDimensions}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
              />
            </div>

            {/* RIGHT 5 COLS: CONTROLS, MATS, FINISHES & PRICING */}
            <div className="lg:col-span-5">
              <FrameControls
                currentImage={currentImage}
                onImageChange={setCurrentImage}
                selectedFinish={selectedFinish}
                onFinishChange={setSelectedFinish}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                matStyle={matStyle}
                onMatStyleChange={setMatStyle}
                matWidth={matWidth}
                onMatWidthChange={setMatWidth}
                wallEnv={wallEnv}
                onWallEnvChange={setWallEnv}
                showGlare={showGlare}
                onToggleGlare={() => setShowGlare(!showGlare)}
                showDimensions={showDimensions}
                onToggleDimensions={() => setShowDimensions(!showDimensions)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
