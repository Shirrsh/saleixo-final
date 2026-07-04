import { useEffect, useState } from 'react';
import { usePageMeta, buildBreadcrumbSchema, ORG_ID } from '@/hooks/usePageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import {
  type BlogPost,
  FALLBACK_POSTS,
  CATEGORY_ICONS,
  readingTime,
  getExcerpt,
  getDate,
  getISODate,
  getSlug,
  getCover,
  toAbsoluteUrl,
  getCategoryColor,
} from '@/lib/blog';

const CATEGORIES = ['All', 'Photography', 'Ecommerce', 'Strategy', 'Marketing'];

// Blog listing schema: a Blog containing one Article per real post, built only from
// fields that exist on BlogPost — no invented fields (no separate "updated" timestamp
// exists in the data model, so dateModified mirrors datePublished).
const buildBlogSchema = (posts: BlogPost[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://saleixo.com/blog#blog',
  name: 'The Saleixo Journal',
  url: 'https://saleixo.com/blog',
  publisher: { '@id': ORG_ID },
  blogPost: posts.map((post, idx) => ({
    '@type': 'Article',
    headline: post.title,
    description: getExcerpt(post),
    image: toAbsoluteUrl(getCover(post, idx)),
    datePublished: getISODate(post),
    dateModified: getISODate(post),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  })),
});

// ── Featured hero card ────────────────────────────────────────────────────────
const FeaturedCard = ({ post }: { post: BlogPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-3xl overflow-hidden group cursor-pointer"
    style={{ height: 'clamp(300px, 55vw, 520px)' }}
  >
    <img
      src={getCover(post, 0)}
      alt={post.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

    {/* Category pill */}
    <div className="absolute top-6 left-6">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
        style={{ background: getCategoryColor(post.category) }}
      >
        {CATEGORY_ICONS[post.category || ''] || <BookOpen className="w-3.5 h-3.5" />}
        {post.category || 'Insights'}
      </span>
    </div>

    {/* Featured badge */}
    <div className="absolute top-6 right-6">
      <span className="px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
        ✦ Featured
      </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="flex items-center gap-4 mb-4 text-white/60 text-xs">
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{getDate(post)}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{readingTime(post)} min read</span>
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 max-w-2xl">
        {post.title}
      </h2>
      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xl line-clamp-2">
        {getExcerpt(post)}
      </p>
      <Link
        to={`/blog/${getSlug(post)}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:gap-3"
        style={{ background: '#fff', color: '#000' }}
      >
        Read Article <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

// ── Standard card ─────────────────────────────────────────────────────────────
const PostCard = ({ post, idx, delay = 0 }: { post: BlogPost; idx: number; delay?: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
    style={{
      background: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }}
  >
    {/* Cover */}
    <div className="relative overflow-hidden" style={{ height: '220px' }}>
      <img
        src={getCover(post, idx)}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      {/* Category */}
      <div className="absolute top-4 left-4">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
          style={{ background: getCategoryColor(post.category) }}
        >
          {CATEGORY_ICONS[post.category || ''] || <BookOpen className="w-3 h-3" />}
          {post.category || 'Insights'}
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-5">
      <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{getDate(post)}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime(post)} min</span>
      </div>

      <h3 className="text-base font-bold text-foreground leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
        {getExcerpt(post)}
      </p>

      <Link
        to={`/blog/${getSlug(post)}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/link"
        style={{ color: getCategoryColor(post.category) }}
      >
        Read More
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
      </Link>
    </div>
  </motion.article>
);

// ── Wide horizontal card (for 2nd row) ───────────────────────────────────────
const WideCard = ({ post, idx, delay = 0 }: { post: BlogPost; idx: number; delay?: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
    className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
    style={{
      background: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }}
  >
    <div className="relative overflow-hidden sm:w-48 flex-shrink-0" style={{ minHeight: '160px' }}>
      <img
        src={getCover(post, idx)}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute top-3 left-3">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
          style={{ background: getCategoryColor(post.category) }}
        >
          {post.category || 'Insights'}
        </span>
      </div>
    </div>
    <div className="flex flex-col justify-center p-5 flex-1">
      <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
        <span>{getDate(post)}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
        <span>{readingTime(post)} min read</span>
      </div>
      <h3 className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{getExcerpt(post)}</p>
      <Link
        to={`/blog/${getSlug(post)}`}
        className="inline-flex items-center gap-1 text-xs font-semibold"
        style={{ color: getCategoryColor(post.category) }}
      >
        Read More <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  </motion.article>
);

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Blog() {
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 8;

  usePageMeta({
    title: 'Blog — Saleixo',
    description: 'Amazon tips, Shopify growth guides, ecommerce marketing strategies, and product photography insights from the Saleixo team.',
    ogImage: 'https://saleixo.com/og/blog-og.jpg',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'Home', url: 'https://saleixo.com/' },
        { name: 'Blog', url: 'https://saleixo.com/blog' },
      ]),
      buildBlogSchema(posts),
    ],
  });

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, title, content, excerpt, featured_image_url, published_date, slug, status, created_at')
      .eq('status', 'published')
      .order('published_date', { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        setPosts(data && data.length > 0 ? data : FALLBACK_POSTS);
        setLoading(false);
      })
      .catch(() => {
        setPosts(FALLBACK_POSTS);
        setLoading(false);
      });
  }, []);

  const displayed = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(displayed.length / POSTS_PER_PAGE);
  const paginated = displayed.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const featured = paginated[0];
  const grid     = paginated.slice(1, 4);
  const rest     = paginated.slice(4);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <Header />

      {/* ── Hero header ── */}
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
              style={{ background: 'hsl(43 65% 52% / 0.1)', border: '1px solid hsl(43 65% 52% / 0.3)', color: '#b8922a' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              The Saleixo Journal
            </div>
            <h1
              className="font-bold tracking-tight text-foreground mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
            >
              Insights on Photography,<br />
              <span style={{ color: 'hsl(174 37% 45%)' }}>Design & Growth.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Practical guides, case studies, and strategies for ecommerce sellers who want to stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="px-4 mb-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={activeCategory === cat
                  ? { background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }
                  : { background: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(var(--border))' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                  style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                  <div className="h-52 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && displayed.length === 0 && (
            <div className="text-center py-24">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No posts in this category yet.</p>
            </div>
          )}

          {!loading && featured && (
            <>
              {/* Featured post */}
              <div className="mb-10">
                <FeaturedCard post={featured} />
              </div>

              {/* 3-column grid */}
              {grid.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {grid.map((post, i) => (
                    <PostCard key={post.id} post={post} idx={i + 1} delay={i * 0.08} />
                  ))}
                </div>
              )}

              {/* Divider with stats */}
              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-6 my-10">
                    <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
                    <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
                      <span>{displayed.length} articles</span>
                      <span>·</span>
                      <span>{displayed.reduce((a, p) => a + readingTime(p), 0)} min total reading</span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
                  </div>

                  {/* Wide cards for remaining posts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rest.map((post, i) => (
                      <WideCard key={post.id} post={post} idx={i + 4} delay={i * 0.06} />
                    ))}
                  </div>
                </>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    type="button"
                    onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page === 1}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' }}
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page === totalPages}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(174 37% 14%) 0%, hsl(220 30% 10%) 100%)',
              border: '1px solid hsl(174 30% 22% / 0.6)',
            }}
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, hsl(43 65% 52% / 0.15), transparent 70%)' }} />

            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
              style={{ background: 'hsl(43 65% 52% / 0.15)', border: '1px solid hsl(43 65% 52% / 0.4)', color: '#d4af37' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              Stay Ahead
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get the latest insights<br />delivered to your inbox.
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Weekly tips on product photography, listing optimization, and marketplace growth. No spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'hsl(220 28% 14%)',
                  border: '1px solid hsl(220 25% 25%)',
                  color: '#fff',
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (!email || !email.includes('@')) return;
                  setEmail('');
                  toast.success('You\'re subscribed! We\'ll be in touch soon.');
                }}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 whitespace-nowrap"
                style={{ background: '#d4af37', color: '#000' }}
              >
                Subscribe Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
