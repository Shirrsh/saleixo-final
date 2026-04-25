import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';

const marketplaces = [
  { name: 'Amazon',      color: '#FF9900', textColor: '#FF9900' },
  { name: 'eBay',        color: '#E53238', textColor: '#E53238' },
  { name: 'Walmart',     color: '#0071CE', textColor: '#0071CE' },
  { name: 'Shopify',     color: '#96BF48', textColor: '#96BF48' },
  { name: 'Etsy',        color: '#F56400', textColor: '#F56400' },
  { name: 'Flipkart',    color: '#2874F0', textColor: '#2874F0' },
  { name: 'Meesho',      color: '#9B2D8E', textColor: '#9B2D8E' },
  { name: 'WooCommerce', color: '#7F54B3', textColor: '#7F54B3' },
  { name: 'SHEIN',       color: '#E8192C', textColor: '#E8192C' },
];

const countries = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
];

// Deterministic orbit positions for each floating item
// angle in degrees, radius as % of container half-width, orbit speed multiplier
const floatingItems = [
  // Marketplaces — outer ring
  { type: 'marketplace', index: 0, angle: 0,   radius: 0.82, speed: 0.18, size: 'md' },
  { type: 'marketplace', index: 1, angle: 40,  radius: 0.78, speed: 0.14, size: 'sm' },
  { type: 'marketplace', index: 2, angle: 80,  radius: 0.85, speed: 0.20, size: 'md' },
  { type: 'marketplace', index: 3, angle: 130, radius: 0.80, speed: 0.16, size: 'sm' },
  { type: 'marketplace', index: 4, angle: 175, radius: 0.83, speed: 0.19, size: 'md' },
  { type: 'marketplace', index: 5, angle: 220, radius: 0.79, speed: 0.15, size: 'sm' },
  { type: 'marketplace', index: 6, angle: 265, radius: 0.84, speed: 0.21, size: 'md' },
  { type: 'marketplace', index: 7, angle: 305, radius: 0.77, speed: 0.13, size: 'sm' },
  { type: 'marketplace', index: 8, angle: 345, radius: 0.81, speed: 0.17, size: 'md' },
  // Countries — inner ring
  { type: 'country', index: 0, angle: 20,  radius: 0.52, speed: 0.25, size: 'flag' },
  { type: 'country', index: 1, angle: 72,  radius: 0.50, speed: 0.22, size: 'flag' },
  { type: 'country', index: 2, angle: 124, radius: 0.54, speed: 0.27, size: 'flag' },
  { type: 'country', index: 3, angle: 176, radius: 0.51, speed: 0.23, size: 'flag' },
  { type: 'country', index: 4, angle: 228, radius: 0.53, speed: 0.26, size: 'flag' },
  { type: 'country', index: 5, angle: 280, radius: 0.50, speed: 0.24, size: 'flag' },
  { type: 'country', index: 6, angle: 332, radius: 0.52, speed: 0.28, size: 'flag' },
];

const MarketplaceLogos = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.15 });
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isIntersecting) return;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isIntersecting]);

  return (
    <section
      className="relative overflow-hidden py-0"
      style={{ background: 'linear-gradient(135deg, #0a1a1a 0%, #0f2a2a 40%, #1a3a3a 70%, #0d1f1f 100%)' }}
      ref={ref}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: '50%',
            height: '60%',
            top: '20%',
            left: '25%',
            background: 'radial-gradient(circle, #d4af3740 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: '35%',
            height: '40%',
            top: '10%',
            left: '5%',
            background: 'radial-gradient(circle, #1a3a3a80 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: '35%',
            height: '40%',
            bottom: '10%',
            right: '5%',
            background: 'radial-gradient(circle, #d4af3730 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-16 md:py-24 px-4">
        {/* Heading */}
        <p
          className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-2"
          style={{ color: '#d4af37' }}
        >
          Trusted Globally
        </p>
        <h2
          className="text-2xl md:text-4xl font-bold text-white text-center mb-2"
        >
          Sell on Every Major Marketplace
        </h2>
        <p className="text-sm md:text-base text-white/50 text-center mb-12 max-w-md">
          We optimize your listings for every platform, in every market.
        </p>

        {/* Orbit arena */}
        <OrbitArena
          tick={tick}
          isIntersecting={isIntersecting}
        />
      </div>
    </section>
  );
};

/* ─── Orbit Arena ─────────────────────────────────────────────────────────── */

interface OrbitArenaProps {
  tick: number;
  isIntersecting: boolean;
}

const OrbitArena = ({ tick, isIntersecting }: OrbitArenaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(520);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize(Math.min(w, 560));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px]"
      style={{ height: size }}
    >
      {/* Orbit ring guides (decorative) */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
        aria-hidden="true"
      >
        {/* Outer orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={cx * 0.82}
          fill="none"
          stroke="#d4af3718"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        {/* Inner orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={cx * 0.52}
          fill="none"
          stroke="#ffffff10"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      </svg>

      {/* Phone mockup — center */}
      <PhoneMockup cx={cx} cy={cy} isIntersecting={isIntersecting} />

      {/* Floating items */}
      {floatingItems.map((item, i) => {
        const baseAngle = item.angle * (Math.PI / 180);
        const orbitAngle = baseAngle + (tick / 1000) * item.speed * (i % 2 === 0 ? 1 : -1);
        const r = cx * item.radius;
        const x = cx + r * Math.cos(orbitAngle);
        const y = cy + r * Math.sin(orbitAngle);

        if (item.type === 'marketplace') {
          const mp = marketplaces[item.index];
          return (
            <FloatingBadge
              key={`mp-${item.index}`}
              x={x}
              y={y}
              label={mp.name}
              color={mp.color}
              size={item.size}
              delay={i * 80}
              isIntersecting={isIntersecting}
            />
          );
        } else {
          const ct = countries[item.index];
          return (
            <FloatingFlag
              key={`ct-${item.index}`}
              x={x}
              y={y}
              flag={ct.flag}
              name={ct.name}
              delay={i * 80}
              isIntersecting={isIntersecting}
            />
          );
        }
      })}
    </div>
  );
};

/* ─── Phone Mockup ────────────────────────────────────────────────────────── */

interface PhoneMockupProps {
  cx: number;
  cy: number;
  isIntersecting: boolean;
}

const PhoneMockup = ({ cx, cy, isIntersecting }: PhoneMockupProps) => {
  const phoneW = 110;
  const phoneH = 200;
  const x = cx - phoneW / 2;
  const y = cy - phoneH / 2;

  return (
    <div
      className="absolute transition-all duration-700"
      style={{
        left: x,
        top: y,
        width: phoneW,
        height: phoneH,
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transitionDelay: '200ms',
      }}
    >
      {/* Phone shell */}
      <div
        className="relative w-full h-full rounded-[22px] shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1e3a3a 0%, #0d2020 100%)',
          border: '2px solid #d4af3760',
          boxShadow: '0 0 40px #d4af3730, 0 20px 60px #00000080',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 36, height: 8, background: '#0d2020' }}
        />

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-6 px-3">
          {/* Saleixo logo text */}
          <span
            className="text-[11px] font-bold tracking-widest"
            style={{ color: '#d4af37' }}
          >
            SALEIXO
          </span>

          {/* Mini stat card */}
          <div
            className="w-full rounded-xl p-2 mt-1"
            style={{ background: '#ffffff0d', border: '1px solid #d4af3730' }}
          >
            <div className="text-[8px] text-white/40 mb-1">Active Listings</div>
            <div className="text-[16px] font-bold text-white">2,400+</div>
            <div className="text-[7px] mt-1" style={{ color: '#96BF48' }}>↑ 18% this month</div>
          </div>

          {/* Mini bar chart */}
          <div className="flex items-end gap-1 w-full px-1 mt-1">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: h * 0.4,
                  background: i === 5
                    ? '#d4af37'
                    : `#d4af37${Math.round(30 + i * 10).toString(16)}`,
                }}
              />
            ))}
          </div>

          {/* Platform dots */}
          <div className="flex gap-1 mt-2">
            {['#FF9900', '#E53238', '#0071CE', '#96BF48', '#F56400'].map((c, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: 6, height: 6, background: c, opacity: 0.85 }}
              />
            ))}
          </div>
        </div>

        {/* Gold shimmer overlay */}
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #d4af3710 0%, transparent 50%, #d4af3708 100%)',
          }}
        />
      </div>

      {/* Glow under phone */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
        style={{ width: 80, height: 20, background: '#d4af3740' }}
      />
    </div>
  );
};

/* ─── Floating Badge (marketplace) ───────────────────────────────────────── */

interface FloatingBadgeProps {
  x: number;
  y: number;
  label: string;
  color: string;
  size: string;
  delay: number;
  isIntersecting: boolean;
}

const FloatingBadge = ({ x, y, label, color, size, delay, isIntersecting }: FloatingBadgeProps) => {
  const isLg = size === 'md';
  const px = isLg ? 'px-3 py-1.5' : 'px-2 py-1';
  const fontSize = isLg ? '11px' : '9px';

  return (
    <div
      className={`absolute ${px} rounded-full font-bold whitespace-nowrap transition-all duration-700 cursor-default select-none`}
      style={{
        left: x,
        top: y,
        transform: isIntersecting
          ? 'translate(-50%, -50%) scale(1)'
          : 'translate(-50%, -50%) scale(0)',
        opacity: isIntersecting ? 1 : 0,
        transitionDelay: `${delay}ms`,
        fontSize,
        color,
        background: `${color}18`,
        border: `1px solid ${color}50`,
        boxShadow: `0 0 12px ${color}30`,
        backdropFilter: 'blur(6px)',
      }}
    >
      {label}
    </div>
  );
};

/* ─── Floating Flag (country) ─────────────────────────────────────────────── */

interface FloatingFlagProps {
  x: number;
  y: number;
  flag: string;
  name: string;
  delay: number;
  isIntersecting: boolean;
}

const FloatingFlag = ({ x, y, flag, name, delay, isIntersecting }: FloatingFlagProps) => (
  <div
    className="absolute group transition-all duration-700 cursor-default select-none"
    style={{
      left: x,
      top: y,
      transform: isIntersecting
        ? 'translate(-50%, -50%) scale(1)'
        : 'translate(-50%, -50%) scale(0)',
      opacity: isIntersecting ? 1 : 0,
      transitionDelay: `${delay}ms`,
    }}
    title={name}
  >
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-lg"
      style={{
        background: '#ffffff0d',
        border: '1px solid #ffffff20',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 16px #00000040',
      }}
    >
      <span role="img" aria-label={name}>{flag}</span>
    </div>
    {/* Tooltip */}
    <span
      className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-medium text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
    >
      {name}
    </span>
  </div>
);

export default MarketplaceLogos;
