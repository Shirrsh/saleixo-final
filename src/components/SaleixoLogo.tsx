import { useState, useEffect } from 'react';

const IXO_COLORS = [
  '#1a73e8', // blue (primary)
  '#FF5C8A', // pink (accent-pink)
  '#8B5CF6', // purple (accent-purple)
  '#1a9e52', // green (success)
  '#f97316', // orange
  '#e53e3e', // red (matches SALE)
];

interface SaleixoLogoProps {
  /** Tailwind text-size class, e.g. "text-2xl" */
  size?: string;
  /** Whether to show the animated glow */
  glow?: boolean;
  className?: string;
}

const SaleixoLogo = ({ size = 'text-2xl md:text-3xl', glow = true, className = '' }: SaleixoLogoProps) => {
  const [ixoColorIdx, setIxoColorIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIxoColorIdx(i => (i + 1) % IXO_COLORS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`font-bold tracking-tight leading-none ${size} ${className}`}
      style={glow ? {
        filter:
          'drop-shadow(0 0 8px rgba(229,62,62,0.55)) drop-shadow(0 0 18px rgba(26,115,232,0.4))',
      } : undefined}
    >
      <span style={{ color: '#e53e3e' }}>SALE</span>
      <span style={{ color: IXO_COLORS[ixoColorIdx], transition: 'color 0.8s ease' }}>IXO</span>
    </span>
  );
};

export default SaleixoLogo;
