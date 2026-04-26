import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import cat1 from '@/assets/categories/jewelry-earrings.jpg';
import cat2 from '@/assets/categories/jewelry-necklace.jpg';
import cat3 from '@/assets/categories/incense-packaging.jpg';
import cat4 from '@/assets/categories/rudraksha-bracelet.jpg';
import cat5 from '@/assets/categories/aquamarine-bracelet.jpg';
import cat6 from '@/assets/categories/spiritual-products.jpg';

// ── Bento cells — explicit pixel heights, no auto-rows ──────────────────────
// Layout (desktop):
//  [ A: tall 2-col ]  [ B: square ]  [ C: square ]
//  [ A continues   ]  [ D: wide 2-col             ]
//  [ E: wide 2-col ]  [ F: square ]  (gap filler)

const Card = ({
  img, title, tag, result, className, height,
  delay = 0,
}: {
  img: string; title: string; tag: string; result: string;
  className?: string; height: number; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.015, zIndex: 20 }}
    className={`relative overflow-hidden rounded-2xl cursor-pointer group flex-shrink-0 ${className ?? ''}`}
    style={{
      height,
      border: '1px solid hsl(260 45% 20% / 0.5)',
    }}
  >
    <img
      src={img}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
      loading="lazy"
    />

    {/* Permanent bottom gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

    {/* Hover tint */}
    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

    {/* Tag — slides in on hover */}
    <motion.div
      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
      style={{
        background: 'hsl(265 65% 9% / 0.85)',
        border: '1px solid hsl(271 91% 65% / 0.4)',
        color: '#C084FC',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 0 }}
      whileHover={{ opacity: 1, y: 0 }}
    >
      {tag}
    </motion.div>

    {/* Arrow */}
    <div
      className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
      style={{ background: 'hsl(0 0% 100% / 0.15)', backdropFilter: 'blur(8px)', border: '1px solid hsl(0 0% 100% / 0.2)' }}
    >
      <ArrowUpRight className="w-4 h-4 text-white" />
    </div>

    {/* Bottom info */}
    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
      <h3 className="text-white font-medium text-sm leading-tight">{title}</h3>
      <span
        className="px-2.5 py-1 rounded-full text-[10px] font-bold ml-3 flex-shrink-0"
        style={{
          background: 'hsl(271 91% 65% / 0.2)',
          border: '1px solid hsl(271 91% 65% / 0.35)',
          color: '#C084FC',
          backdropFilter: 'blur(8px)',
        }}
      >
        {result}
      </span>
    </div>

    {/* Hover glow border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ boxShadow: 'inset 0 0 0 1px hsl(271 91% 65% / 0.35)' }}
    />
  </motion.div>
);

const Portfolio = () => (
  <section id="portfolio" className="py-20 md:py-28 bg-transparent">
    <div className="container mx-auto px-4 max-w-6xl">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-violet mb-3">Our Work</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Products We've<br className="hidden md:block" /> Made Famous
          </h2>
        </div>
        <Link
          to="/categories"
          className="flex items-center gap-2 text-sm font-medium text-accent-violet hover:text-white transition-colors group self-start md:self-end"
        >
          View all work
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* ── Desktop bento (hidden on mobile) ── */}
      <div className="hidden md:grid grid-cols-3 gap-4">

        {/* Row 1 */}
        <Card img={cat1} title="Diamond Earrings"     tag="Studio Photography" result="+312% CTR"    height={280} delay={0}    />
        <Card img={cat2} title="Necklace Collection"  tag="Product Photography" result="Top Seller"  height={280} delay={0.07} />
        <Card img={cat3} title="Incense Packaging"    tag="Brand Design"        result="3× Sales"    height={280} delay={0.14} />

        {/* Row 2 — first card is tall (spans 2 rows visually via larger height) */}
        <div className="row-span-1">
          <Card img={cat4} title="Rudraksha Collection" tag="Lifestyle Shoot"   result="+180% Rev"   height={340} delay={0.21} className="w-full" />
        </div>
        <Card img={cat5} title="Aquamarine Bracelet"  tag="Product Photography" result="5★ Reviews"  height={340} delay={0.28} />
        <Card img={cat6} title="Spiritual Products"   tag="Full Service"        result="2× Orders"   height={340} delay={0.35} />

      </div>

      {/* ── Mobile: 2-col simple grid ── */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {[
          { img: cat1, title: 'Diamond Earrings',    tag: 'Photography',  result: '+312% CTR',  h: 200 },
          { img: cat2, title: 'Necklace Collection', tag: 'Photography',  result: 'Top Seller', h: 200 },
          { img: cat3, title: 'Incense Packaging',   tag: 'Brand Design', result: '3× Sales',   h: 200 },
          { img: cat4, title: 'Rudraksha',           tag: 'Lifestyle',    result: '+180% Rev',  h: 200 },
          { img: cat5, title: 'Aquamarine Bracelet', tag: 'Photography',  result: '5★ Reviews', h: 200 },
          { img: cat6, title: 'Spiritual Products',  tag: 'Full Service', result: '2× Orders',  h: 200 },
        ].map((item, i) => (
          <Card key={i} img={item.img} title={item.title} tag={item.tag} result={item.result} height={item.h} delay={i * 0.06} />
        ))}
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
      >
        {[
          { value: '500+', label: 'Products Shot'       },
          { value: '9',    label: 'Marketplaces'        },
          { value: '3×',   label: 'Avg Sales Lift'      },
          { value: '98%',  label: 'Client Satisfaction' },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 text-center"
            style={{
              background: 'hsl(265 65% 9% / 0.5)',
              border: '1px solid hsl(260 45% 20% / 0.4)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="text-2xl font-light text-white mb-0.5">{s.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default Portfolio;
