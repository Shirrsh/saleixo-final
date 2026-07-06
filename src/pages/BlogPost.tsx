import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta, buildBreadcrumbSchema, ORG_ID } from '@/hooks/usePageMeta';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import { ArrowLeft, Calendar, Clock, BookOpen, Sparkles, Camera, ArrowUpRight } from 'lucide-react';
import {
  type BlogPost as BlogPostRow,
  FALLBACK_POSTS,
  CATEGORY_ICONS,
  getExcerpt,
  getDate,
  getISODate,
  getSlug,
  getCover,
  getCategoryColor,
  readingTime,
  toAbsoluteUrl,
} from '@/lib/blog';

// Same column list Blog.tsx queries for the listing — kept identical so the two
// pages never diverge on shape. `slug` is looked up server-side; RLS on
// blog_posts already restricts anonymous reads to status = 'published'.
const SELECT_COLUMNS = 'id, title, content, excerpt, featured_image_url, published_date, slug, status, created_at';

// Content is authored exclusively through the admin panel's plain <Textarea> field
// (src/pages/admin/Blog.tsx) — verified against the live blog_posts table, the two
// real published posts contain plain text with blank-line-separated paragraphs and
// no HTML/markdown markup at all. We never use dangerouslySetInnerHTML: paragraphs
// are rendered as plain React text nodes (auto-escaped), which is both the safest
// option and a faithful rendering of what's actually stored.
const splitParagraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean);

type LoadState = BlogPostRow | null | undefined; // undefined = loading, null = not found

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<LoadState>(undefined);

  useEffect(() => {
    let active = true;
    setPost(undefined);

    if (!slug) {
      setPost(null);
      return;
    }

    const resolveFallback = () => FALLBACK_POSTS.find(p => getSlug(p) === slug) ?? null;

    supabase
      .from('blog_posts')
      .select(SELECT_COLUMNS)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setPost(data ?? resolveFallback());
      })
      .catch(() => {
        if (!active) return;
        setPost(resolveFallback());
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const isLoading = post === undefined;
  const isNotFound = post === null;

  usePageMeta({
    title: isLoading
      ? 'Loading… — Saleixo Blog'
      : isNotFound
      ? 'Post Not Found — Saleixo'
      : `${post.title} — Saleixo Blog`,
    description: isLoading || isNotFound
      ? 'Amazon tips, Shopify growth guides, ecommerce marketing strategies, and product photography insights from the Saleixo team.'
      : getExcerpt(post),
    canonical: !isLoading && !isNotFound ? `https://saleixo.com/blog/${getSlug(post)}` : undefined,
    ogImage: !isLoading && !isNotFound ? toAbsoluteUrl(getCover(post, 0)) : undefined,
    structuredData: !isLoading && !isNotFound
      ? [
          buildBreadcrumbSchema([
            { name: 'Home', url: 'https://saleixo.com/' },
            { name: 'Blog', url: 'https://saleixo.com/blog' },
            { name: post.title, url: `https://saleixo.com/blog/${getSlug(post)}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `https://saleixo.com/blog/${getSlug(post)}#article`,
            headline: post.title,
            description: getExcerpt(post),
            image: toAbsoluteUrl(getCover(post, 0)),
            datePublished: getISODate(post),
            dateModified: getISODate(post),
            author: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID },
            mainEntityOfPage: `https://saleixo.com/blog/${getSlug(post)}`,
          },
        ]
      : undefined,
  });

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <Header />

      {isLoading && (
        <section className="pt-28 pb-24 px-4">
          <div className="container mx-auto max-w-3xl animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-6" />
            <div className="h-10 bg-muted rounded w-3/4 mb-4" />
            <div className="h-10 bg-muted rounded w-1/2 mb-8" />
            <div className="h-72 bg-muted rounded-2xl mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </section>
      )}

      {!isLoading && post && (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <section className="pt-28 pb-10 px-4">
            <div className="container mx-auto max-w-3xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                Back to Blog
              </Link>

              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-5"
                style={{ background: getCategoryColor(post.category) }}
              >
                {CATEGORY_ICONS[post.category || ''] || <BookOpen className="w-3.5 h-3.5" />}
                {post.category || 'Insights'}
              </span>

              <h1
                className="font-bold tracking-tight text-foreground mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
              >
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  {getDate(post)}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  {readingTime(post)} min read
                </span>
              </div>
            </div>
          </section>

          <section className="px-4 mb-10">
            <div className="container mx-auto max-w-4xl">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ height: 'clamp(240px, 45vw, 460px)' }}
              >
                <img
                  src={getCover(post, 0)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="px-4 pb-24">
            <div className="container mx-auto max-w-3xl">
              <div className="space-y-5">
                {splitParagraphs(post.content || post.excerpt || getExcerpt(post)).map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-14 pt-8" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Related
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/handmade"
                    className="group flex items-start gap-4 rounded-2xl p-5 transition-colors duration-200"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}
                    >
                      <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 font-semibold text-foreground">
                        Ecommerce studio for handmade &amp; artisan brands
                        <ArrowUpRight
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          style={{ color: 'hsl(var(--muted-foreground))' }}
                        />
                      </span>
                      <span className="block text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Photography, listings &amp; growth built for makers.
                      </span>
                    </span>
                  </Link>

                  <Link
                    to="/services/photography"
                    className="group flex items-start gap-4 rounded-2xl p-5 transition-colors duration-200"
                    style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}
                    >
                      <Camera className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 font-semibold text-foreground">
                        Product photography services
                        <ArrowUpRight
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          style={{ color: 'hsl(var(--muted-foreground))' }}
                        />
                      </span>
                      <span className="block text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Studio-grade images that convert browsers to buyers.
                      </span>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-10 pt-8" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:gap-3"
                  style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  Back to all articles
                </Link>
              </div>
            </div>
          </section>
        </motion.article>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
