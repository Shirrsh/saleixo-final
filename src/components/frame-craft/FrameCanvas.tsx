import React, { useRef } from 'react';
import { FrameFinish, FrameSize, MatStyle, MatWidth, WallEnvironment } from './types';
import { FRAME_MATERIALS, WALL_ENVIRONMENTS } from './frameConstants';
import { Maximize2, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';

interface FrameCanvasProps {
  currentImage: string;
  selectedFinish: FrameFinish;
  selectedSize: FrameSize;
  matStyle: MatStyle;
  matWidth: MatWidth;
  wallEnv: WallEnvironment;
  showGlare: boolean;
  showDimensions: boolean;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
  currentImage,
  selectedFinish,
  selectedSize,
  matStyle,
  matWidth,
  wallEnv,
  showGlare,
  showDimensions,
  zoomLevel,
  onZoomChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wallConfig = WALL_ENVIRONMENTS.find((w) => w.id === wallEnv) || WALL_ENVIRONMENTS[0];
  const material = FRAME_MATERIALS.find((m) => m.id === selectedFinish) || FRAME_MATERIALS[0];

  // Calculate dynamic mat padding in pixels
  const getMatPadding = (): number => {
    if (matStyle === 'none') return 0;
    switch (matWidth) {
      case 'slim':
        return 20;
      case 'wide':
        return 48;
      case 'classic':
      default:
        return 32;
    }
  };

  const matPadding = getMatPadding();

  // Determine frame styling based on finish
  const getFrameStyles = (): React.CSSProperties => {
    switch (selectedFinish) {
      case 'oak':
        return {
          background: 'linear-gradient(135deg, #c79257 0%, #a46d32 40%, #85531f 75%, #b68249 100%)',
          padding: '22px',
          boxShadow: `
            0 32px 64px -16px rgba(0, 0, 0, 0.4),
            0 16px 32px -8px rgba(0, 0, 0, 0.25),
            inset 2px 2px 4px rgba(255, 255, 255, 0.35),
            inset -2px -2px 6px rgba(0, 0, 0, 0.5)
          `,
          borderRadius: '4px',
        };

      case 'black':
        return {
          background: 'linear-gradient(135deg, #262629 0%, #121214 60%, #1c1c1f 100%)',
          padding: '18px',
          boxShadow: `
            0 35px 70px -18px rgba(0, 0, 0, 0.45),
            0 15px 30px -6px rgba(0, 0, 0, 0.3),
            inset 1px 1px 2px rgba(255, 255, 255, 0.2),
            inset -1px -1px 3px rgba(0, 0, 0, 0.8)
          `,
          borderRadius: '3px',
        };

      case 'gold':
        return {
          background: 'linear-gradient(135deg, #edd08e 0%, #c59d4c 28%, #ffd98d 50%, #af8433 75%, #e2be72 100%)',
          padding: '20px',
          boxShadow: `
            0 35px 65px -15px rgba(0, 0, 0, 0.4),
            0 15px 25px -8px rgba(160, 120, 40, 0.3),
            inset 1px 1px 3px rgba(255, 255, 255, 0.7),
            inset -1px -1px 4px rgba(90, 60, 15, 0.7)
          `,
          borderRadius: '3px',
        };

      case 'acrylic':
        return {
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.65)',
          padding: '30px',
          boxShadow: `
            0 35px 70px -15px rgba(0, 0, 0, 0.3),
            0 12px 24px -5px rgba(0, 0, 0, 0.15),
            inset 0 0 20px rgba(255, 255, 255, 0.4)
          `,
          borderRadius: '12px',
        };

      case 'canvas':
        return {
          background: '#ece7dd',
          padding: '0px',
          border: 'none',
          boxShadow: `
            -18px 24px 45px -8px rgba(0, 0, 0, 0.4),
            4px 8px 18px -4px rgba(0, 0, 0, 0.25)
          `,
          borderRadius: '2px',
          transform: 'rotateY(-2deg)',
          transformStyle: 'preserve-3d',
        };

      case 'white':
      default:
        return {
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f4f7 100%)',
          padding: '20px',
          boxShadow: `
            0 30px 60px -15px rgba(0, 0, 0, 0.28),
            0 12px 24px -6px rgba(0, 0, 0, 0.15),
            inset 1px 1px 2px rgba(255, 255, 255, 0.9),
            inset -1px -1px 3px rgba(0, 0, 0, 0.1)
          `,
          borderRadius: '3px',
        };
    }
  };

  // Base canvas sizing based on aspect ratio
  const getCanvasDimensions = () => {
    const baseHeight = 440;
    const computedWidth = Math.round(baseHeight * selectedSize.aspectRatio);
    return {
      width: `${computedWidth}px`,
      height: `${baseHeight}px`,
      maxWidth: '85vw',
    };
  };

  const canvasDims = getCanvasDimensions();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[620px] lg:h-[720px] overflow-hidden rounded-2xl select-none flex items-center justify-center transition-all duration-700 shadow-inner"
      style={{
        background: wallConfig.wallBackground,
      }}
    >
      {/* Wall Texture / Ambient Lighting Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(255,255,255,0.7) 0%, transparent 60%)',
        }}
      />

      {/* Subtle Room Depth Accents (Baseboard / Floor Horizon) */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none flex flex-col justify-end">
        {/* Shadow under credenza / floor */}
        <div className="w-full h-10 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
        {/* Architectural Baseboard line */}
        <div className="w-full h-[3px] bg-black/10 shadow-sm" />
        <div className="w-full h-14 bg-gradient-to-b from-black/10 to-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Human-Scale Element (Minimalist Wall Accent) */}
      <div className="absolute bottom-8 left-10 pointer-events-none hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md border border-white/50 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Room Scale: 1:1 Realistic Simulation</span>
      </div>

      {/* Viewport Zoom & Glare Controls Floating Ribbon */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md p-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-lg">
        <button
          onClick={() => onZoomChange(Math.max(0.7, Number((zoomLevel - 0.1).toFixed(1))))}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono font-medium px-1 text-zinc-700 dark:text-zinc-300">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => onZoomChange(Math.min(1.4, Number((zoomLevel + 0.1).toFixed(1))))}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-5 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />
        <button
          onClick={() => onZoomChange(1.0)}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
          title="Reset Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* THE MAIN 3D FRAMED ARTWORK CONTAINER */}
      <div
        id="preview-frame-artwork"
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `scale(${zoomLevel})`,
          ...canvasDims,
        }}
      >
        {/* Outer Frame Structure */}
        <div
          className="relative w-full h-full flex flex-col transition-all duration-500"
          style={getFrameStyles()}
        >
          {/* Acrylic Standoff Bolts (Only on Floating Acrylic finish) */}
          {selectedFinish === 'acrylic' && (
            <>
              {/* Top-Left Standoff */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-600 shadow-md border border-white/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              {/* Top-Right Standoff */}
              <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-600 shadow-md border border-white/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              {/* Bottom-Left Standoff */}
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-600 shadow-md border border-white/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              {/* Bottom-Right Standoff */}
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-600 shadow-md border border-white/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
            </>
          )}

          {/* MATBOARD (PASSE-PARTOUT) CONTAINER */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-all duration-300 overflow-hidden"
            style={{
              padding: selectedFinish === 'canvas' ? 0 : `${matPadding}px`,
              backgroundColor:
                matStyle === 'ivory'
                  ? '#fbf9f4'
                  : matStyle === 'black'
                  ? '#17171a'
                  : 'transparent',
              boxShadow:
                matStyle !== 'none' && selectedFinish !== 'canvas'
                  ? 'inset 1px 1px 3px rgba(0,0,0,0.12), inset -1px -1px 3px rgba(255,255,255,0.7)'
                  : 'none',
            }}
          >
            {/* INNER MAT BEVELED CUT OPENING */}
            <div
              className="relative w-full h-full overflow-hidden transition-all duration-300"
              style={{
                boxShadow:
                  matStyle === 'ivory'
                    ? 'inset 2px 2px 4px rgba(0,0,0,0.22), inset -1px -1px 2px rgba(255,255,255,0.7)'
                    : matStyle === 'black'
                    ? 'inset 2px 2px 4px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(255,255,255,0.15)'
                    : 'inset 0 0 4px rgba(0,0,0,0.15)',
              }}
            >
              {/* Canvas Texture Overlay (if Canvas selected) */}
              {selectedFinish === 'canvas' && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage: `
                      radial-gradient(#000 1px, transparent 1px),
                      radial-gradient(#fff 1px, transparent 1px)
                    `,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                />
              )}

              {/* THE ARTWORK IMAGE */}
              <img
                src={currentImage}
                alt="Framed preview"
                className="w-full h-full object-cover select-none transition-all duration-300"
                crossOrigin="anonymous"
                loading="eager"
              />

              {/* MUSEUM GLASS REFLECTION GLARE OVERLAY */}
              {showGlare && selectedFinish !== 'canvas' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
                  style={{
                    background:
                      'linear-gradient(130deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 26%, rgba(255,255,255,0) 42%, rgba(255,255,255,0.08) 68%, rgba(255,255,255,0) 100%)',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* DIMENSION & SPECS BADGE (FLOATING) */}
        {showDimensions && (
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-zinc-900/90 text-white text-[11px] font-mono tracking-wide shadow-md backdrop-blur-md flex items-center gap-1.5 border border-zinc-700/60 z-20">
            <span className="text-primary font-semibold">{selectedSize.name}</span>
            <span className="text-zinc-400">({selectedSize.cm})</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300 capitalize">{material.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
