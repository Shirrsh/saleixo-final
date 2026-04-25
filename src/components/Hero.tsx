import { Button } from '@/components/ui/button';
import { useSiteImages } from '@/hooks/useSiteImages';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Fallback images
import showcase1Fallback from '@/assets/hero/showcase-1.jpg';
import showcase2Fallback from '@/assets/hero/showcase-2.jpg';
import showcase3Fallback from '@/assets/hero/showcase-3.jpg';
import showcase4Fallback from '@/assets/hero/showcase-4.jpg';

/* ─── Marquee strip ─────────────────────────────────────────────────────── */

interface MarqueeStripProps {
  items: string[];
}

const MarqueeStrip = ({ items }: MarqueeStripProps) => {
  // Duplicate so the loop is seamless
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-border py-3 bg-muted/40"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-6 text-xs font-medium tracking-widest uppercase text-muted-foreground"
          >
            <span className="w-1 h-1 rounded-full bg-primary inline-block flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Hero ──────────────────────────────────────────────────────────────── */

const Hero = () => {
  const { getImageUrl, getAltText } = useSiteImages('hero');
  const { content } = useHomepageContent();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Images with fallbacks
  const showcase1 = getImageUrl('hero_showcase_1', showcase1Fallback);
  const showcase2 = getImageUrl('hero_showcase_2', showcase2Fallback);
  const showcase3 = getImageUrl('hero_showcase_3', showcase3Fallback);
  const showcase4 = getImageUrl('hero_showcase_4', showcase4Fallback);

  // Marquee items from trust_badges field (pipe-separated)
  const marqueeItems = content.trust_badges
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);

  // Split headline into 3 lines for the staggered reveal
  // Line 1: "Transform Your Brand"
  // Line 2: "Into" (italic accent)
  // Line 3: "Market-Winning Results"
  // Falls back gracefully if content is customised
  const titleWords = content.hero_title.split(' ');
  const midPoint = Math.floor(titleWords.length / 2);
  const line1 = titleWords.slice(0, midPoint - 1).join(' ');
  const line2 = titleWords[midPoint - 1]; // single italic accent word
  const line3 = titleWords.slice(midPoint).join(' ');

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* Radial gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, hsl(var(--secondary) / 0.35) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, hsl(var(--primary) / 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Noise overlay — reuses the token from tailwind.config */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-noise bg-repeat" />

      {/* ── Main content grid ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center pt-24 md:pt-28">
        <div className="w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_auto] gap-0 items-center">

              {/* Left — text content */}
              <div className="lg:pr-12 xl:pr-20 py-12 lg:py-20 max-w-2xl">

                {/* Eyebrow label */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-primary/30 bg-primary/8 mb-8 animate-fade-in"
                  style={{ animationDelay: '0ms' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-xs font-medium tracking-widest uppercase text-primary">
                    Ecommerce Visual Studio
                  </span>
                </div>

                {/* Headline — 3-line staggered reveal */}
                <h1 className="font-heading text-display-xl mb-6 text-foreground leading-[1.05]">
                  <span
                    className="block animate-fade-in"
                    style={{ animationDelay: '60ms' }}
                  >
                    {line1}
                  </span>
                  <span
                    className="block italic text-primary animate-fade-in"
                    style={{ animationDelay: '120ms' }}
                  >
                    {line2}
                  </span>
                  <span
                    className="block animate-fade-in"
                    style={{ animationDelay: '180ms' }}
                  >
                    {line3}
                  </span>
                </h1>

                {/* Sub-headline */}
                <p
                  className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 animate-fade-in"
                  style={{ animationDelay: '280ms' }}
                >
                  {content.hero_subtitle}
                </p>

                {/* CTAs */}
                <div
                  className="flex flex-col sm:flex-row gap-4 items-start animate-fade-in"
                  style={{ animationDelay: '360ms' }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    onClick={scrollToContact}
                    className="rounded-pill hover-lift hover-glow min-h-[52px] px-8 text-base font-semibold"
                    aria-label={content.hero_cta_text}
                  >
                    {content.hero_cta_text}
                  </Button>

                  <button
                    onClick={scrollToServices}
                    className="inline-flex items-center gap-2 text-base font-medium text-foreground/70 hover:text-primary transition-colors duration-200 min-h-[52px] group"
                    aria-label="View our work"
                  >
                    View our work
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {/* Stat pills */}
                <div
                  className="flex flex-wrap gap-6 mt-12 animate-fade-in"
                  style={{ animationDelay: '460ms' }}
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground font-heading-tight">500+</span>
                    <span className="text-xs text-muted-foreground tracking-wide">{content.badge_1_text}</span>
                  </div>
                  <div className="w-px bg-border self-stretch" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground font-heading-tight">98%</span>
                    <span className="text-xs text-muted-foreground tracking-wide">Client Satisfaction</span>
                  </div>
                  <div className="w-px bg-border self-stretch" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground font-heading-tight">24h</span>
                    <span className="text-xs text-muted-foreground tracking-wide">Turnaround</span>
                  </div>
                </div>
              </div>

              {/* Right — oversized image collage, bleeds off the right edge on desktop */}
              <div
                className="
                  relative
                  w-full lg:w-[520px] xl:w-[620px]
                  h-[420px] sm:h-[520px] lg:h-[680px]
                  lg:-mr-8 xl:-mr-16
                  animate-fade-in
                "
                style={{ animationDelay: '100ms' }}
              >
                {/* Scale-in on mount: 1.05 → 1 over 1.2s */}
                <div
                  className="absolute inset-0 rounded-2xl lg:rounded-r-none overflow-hidden"
                  style={{
                    animation: 'hero-image-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
                  }}
                >
                  {/* 2×2 grid of showcase images */}
                  <div className="grid grid-cols-2 h-full gap-1.5 p-1.5">
                    <div className="relative overflow-hidden rounded-xl group">
                      <img
                        src={showcase1}
                        alt={getAltText('hero_showcase_1', 'Product photography showcase')}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl group mt-8">
                      <img
                        src={showcase2}
                        alt={getAltText('hero_showcase_2', 'Brand design showcase')}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl group -mt-8">
                      <img
                        src={showcase3}
                        alt={getAltText('hero_showcase_3', 'Lifestyle photography showcase')}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl group">
                      <img
                        src={showcase4}
                        alt={getAltText('hero_showcase_4', 'Marketing content showcase')}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                  </div>

                  {/* Gold accent border on the left edge of the image block */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent" />
                </div>

                {/* Floating badge — bottom-left of image */}
                <div
                  className="absolute bottom-6 left-6 glass rounded-lg px-4 py-3 animate-fade-in shadow-card-dark"
                  style={{ animationDelay: '700ms' }}
                >
                  <p className="text-xs text-muted-foreground mb-0.5">Serving sellers on</p>
                  <p className="text-sm font-semibold text-foreground">{content.badge_2_text}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ─────────────────────────────────────────────── */}
      <div className="relative z-10 mt-auto">
        <MarqueeStrip items={marqueeItems} />
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-fade-in z-10"
        style={{ animationDelay: '900ms' }}
      >
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground/60">Scroll</span>
        <ChevronDown size={14} className="text-primary animate-bounce-scroll" />
      </div>

      {/* ── hero-image-reveal keyframe (inline — only needed here) ────── */}
      <style>{`
        @keyframes hero-image-reveal {
          0%   { transform: scale(1.05); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
