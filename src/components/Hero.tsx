import { Button } from '@/components/ui/button';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import { useSiteImages } from '@/hooks/useSiteImages';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

import showcase1Fallback from '@/assets/hero/showcase-1.jpg';
import showcase2Fallback from '@/assets/hero/showcase-2.jpg';

const Hero = () => {
  const { content } = useHomepageContent();
  const { getImageUrl } = useSiteImages('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const blobY    = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const showcase1 = getImageUrl('hero_showcase_1', showcase1Fallback);
  const showcase2 = getImageUrl('hero_showcase_2', showcase2Fallback);

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  const title = 'saleixo';

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* ── THE AURA — single large centered radial glow, exactly like reference ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Primary center aura — large violet sphere */}
        <motion.div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(271 91% 65% / 0.7) 0%, hsl(262 83% 58% / 0.45) 30%, hsl(250 70% 30% / 0.2) 60%, transparent 75%)',
            filter: 'blur(40px)',
            x: mousePos.x * -15,
            y: mousePos.y * -10,
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Outer dark vignette — corners stay near-black */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 40%, transparent 40%, hsl(262 70% 6% / 0.85) 100%)',
          }}
        />
      </motion.div>

      {/* ── HEADER — centered glass pill ── */}
      {/* (handled by Header.tsx — just ensure pt spacing) */}

      {/* ── GIANT HEADLINE — sits behind the blob ── */}
      <motion.div
        className="relative z-10 text-center pt-28 px-2"
        style={{ y: titleY }}
      >
        <h1
          className="font-extralight leading-none text-white select-none"
          style={{
            fontFamily: '"Inter Tight", Inter, sans-serif',
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
            letterSpacing: '-0.04em',
          }}
        >
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-3 text-base md:text-xl text-white/60 tracking-[0.18em] lowercase"
        >
          design · photography · marketing
        </motion.p>
      </motion.div>

      {/* ── BLOB + PRODUCT — the centerpiece ── */}
      <motion.div
        className="relative z-20 flex-1 flex items-center justify-center -mt-16 md:-mt-24"
        style={{ y: blobY }}
      >
        <div className="relative w-[340px] md:w-[480px] lg:w-[560px] aspect-square">

          {/* The liquid blob — iridescent morphing shape */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 35% 35%, hsl(271 91% 75% / 0.9) 0%, transparent 50%),
                radial-gradient(circle at 65% 65%, hsl(239 84% 65% / 0.8) 0%, transparent 50%),
                radial-gradient(circle at 50% 20%, hsl(280 80% 80% / 0.6) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, hsl(262 83% 58% / 0.95) 0%, hsl(250 70% 40% / 0.8) 50%, transparent 70%)
              `,
              filter: 'blur(2px)',
            }}
            animate={{
              borderRadius: [
                '60% 40% 55% 45% / 50% 60% 40% 50%',
                '45% 55% 40% 60% / 60% 40% 55% 45%',
                '55% 45% 60% 40% / 45% 55% 50% 50%',
                '60% 40% 55% 45% / 50% 60% 40% 50%',
              ],
              rotate: [0, 8, -5, 0],
              scale: [1, 1.04, 0.98, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Inner highlight — gives the metallic/chrome look */}
            <div
              className="absolute inset-[8%] rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.5) 0%, transparent 45%)',
              }}
            />
            {/* Dot texture overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, hsl(0 0% 100% / 0.8) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />
          </motion.div>

          {/* Product image — tilted, sitting in front of blob */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -12 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10"
            style={{
              width: '65%',
              bottom: '-5%',
              left: '10%',
              x: mousePos.x * -8,
              y: mousePos.y * -5,
            }}
          >
            <div
              className="relative overflow-hidden shadow-[0_40px_100px_hsl(262_70%_6%/0.9)]"
              style={{ borderRadius: '20px' }}
            >
              <img
                src={showcase1}
                alt="Product photography showcase"
                className="w-full aspect-[3/4] object-cover"
                loading="eager"
              />
              {/* Screen-like overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, transparent 50%, hsl(262 83% 58% / 0.15) 100%)',
                  borderRadius: '20px',
                }}
              />
              {/* Reflection highlight on top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.4), transparent)' }}
              />
            </div>
          </motion.div>

          {/* Second product — peeking from behind/right */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 14 }}
            transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10"
            style={{
              width: '50%',
              bottom: '-2%',
              right: '5%',
              x: mousePos.x * 6,
              y: mousePos.y * -3,
            }}
          >
            <div
              className="relative overflow-hidden shadow-[0_30px_80px_hsl(262_70%_6%/0.8)]"
              style={{ borderRadius: '16px' }}
            >
              <img
                src={showcase2}
                alt="Brand design showcase"
                className="w-full aspect-[3/4] object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, transparent 50%, hsl(271 91% 65% / 0.2) 100%)',
                  borderRadius: '16px',
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.3), transparent)' }}
              />
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Bottom CTA card — glass pill, bottom right like reference ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-10 right-6 md:right-12 z-30 glass-purple rounded-2xl p-5 max-w-[220px]"
      >
        <p className="text-xs text-muted-foreground mb-1">Limited slots available</p>
        <p className="text-sm font-semibold text-white mb-3">Free Brand Audit · Book a Call</p>
        <Button
          size="sm"
          onClick={scrollToContact}
          className="w-full rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold hover:shadow-[0_0_20px_hsl(271_91%_65%/0.5)] transition-all"
        >
          Claim Yours
        </Button>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
