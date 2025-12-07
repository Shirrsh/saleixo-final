import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  published_date: string | null;
  slug: string | null;
  status: string | null;
  created_at: string | null;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, content, excerpt, featured_image_url, published_date, slug, status, created_at')
        .eq('status', 'published')
        .order('published_date', { ascending: false, nullsFirst: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Generate excerpt from content if not available
  const getExcerpt = (post: BlogPost) => {
    if (post.excerpt) return post.excerpt;
    if (post.content) return post.content.substring(0, 150) + '...';
    return 'Read more about this topic...';
  };

  // Get display date
  const getDisplayDate = (post: BlogPost) => {
    const dateString = post.published_date || post.created_at;
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get slug for URL
  const getSlug = (post: BlogPost) => {
    return post.slug || post.id;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl opacity-90">Insights on photography, design, and digital marketing</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading blog posts...</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {!loading && posts.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  {post.featured_image_url && (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {getDisplayDate(post)}
                    </p>
                    <p className="text-card-foreground/80 mb-4 line-clamp-3">{getExcerpt(post)}</p>
                    <Link
                      to={`/blog/${getSlug(post)}`}
                      className="inline-block text-accent hover:text-accent/80 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
