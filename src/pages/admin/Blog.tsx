import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Search, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [importing, setImporting] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    try {
      if (editingPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(editingPost)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert([editingPost]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingPost.id ? 'Updated blog post' : 'Created blog post',
        item_type: 'blog',
        item_id: editingPost.id,
      });

      toast({
        title: 'Success',
        description: `Post ${editingPost.id ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted blog post',
        item_type: 'blog',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewPostDialog = () => {
    setEditingPost({
      title: '',
      content: '',
      featured_image_url: '',
      status: 'draft',
      slug: '',
      excerpt: '',
      category: '',
      published_date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: any) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(l => l.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const rows = lines.slice(1).map(line => {
        const vals = line.match(/(".*?"|[^,]+|(?<=,)(?=,))/g) || [];
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
          obj[h] = (vals[i] || '').trim().replace(/^"|"$/g, '');
        });
        return obj;
      });
      const posts = rows
        .filter(r => r.title)
        .map(r => ({
          title: r.title,
          excerpt: r.excerpt || null,
          content: r.content || null,
          category: r.category || null,
          slug: r.slug || r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          featured_image_url: r.featured_image_url || null,
          status: r.status === 'published' ? 'published' : 'draft',
          published_date: r.published_date || null,
        }));
      if (posts.length === 0) throw new Error('No valid rows found in CSV');
      const { error } = await supabase.from('blog_posts').insert(posts);
      if (error) throw error;
      toast({ title: 'Imported!', description: `${posts.length} posts imported successfully` });
      fetchPosts();
    } catch (err: any) {
      toast({ title: 'Import failed', description: err.message, variant: 'destructive' });
    } finally {
      setImporting(false);
      if (csvInputRef.current) csvInputRef.current.value = '';
    }
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Blog Posts</h1>
          <p className="text-[#7f8c8d] mt-2">Manage your blog content</p>
        </div>
        <>
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCsvImport}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => csvInputRef.current?.click()}
              disabled={importing}
            >
              <Upload className="w-4 h-4 mr-2" />
              {importing ? 'Importing…' : 'Import CSV'}
            </Button>
            <Button onClick={openNewPostDialog} className="bg-gold hover:bg-gold-hover text-[#1a3a3a]">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f8c8d]" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="all">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Strategy">Strategy</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-[#ecf0f1]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts
              .filter(p =>
                (statusFilter === 'all' || p.status === statusFilter) &&
                (categoryFilter === 'all' || p.category === categoryFilter) &&
                (search === '' || p.title?.toLowerCase().includes(search.toLowerCase()))
              )
              .map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.category || '—'}</TableCell>
                  <TableCell>
                    {post.published_date
                      ? format(new Date(post.published_date), 'MMM d, yyyy')
                      : format(new Date(post.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-[#7f8c8d] mt-2">
        CSV import format: <code>title, excerpt, content, category, status, published_date, featured_image_url, slug</code>
      </p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost?.id ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Title</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  placeholder="Post title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Excerpt</label>
                <Textarea
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Short description shown in the blog listing..."
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Category</label>
                  <select
                    value={editingPost.category || ''}
                    onChange={(e) => {
                      const slug = editingPost.slug || editingPost.title
                        ?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
                      setEditingPost({ ...editingPost, category: e.target.value });
                    }}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">No category</option>
                    <option value="Photography">Photography</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Publish Date</label>
                  <Input
                    type="date"
                    value={editingPost.published_date ? editingPost.published_date.split('T')[0] : ''}
                    onChange={(e) => setEditingPost({ ...editingPost, published_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">
                  Slug
                  <span className="ml-2 text-xs font-normal text-[#7f8c8d]">(auto-generated from title)</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="post-url-slug"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const slug = (editingPost.title || '')
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                      setEditingPost({ ...editingPost, slug });
                    }}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Content</label>
                <Textarea
                  value={editingPost.content || ''}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  placeholder="Write your post content..."
                  rows={10}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Featured Image URL</label>
                <Input
                  value={editingPost.featured_image_url || ''}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, featured_image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Status</label>
                <select
                  value={editingPost.status}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, status: e.target.value })
                  }
                  className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePost}
                  className="bg-gold hover:bg-gold-hover text-[#1a3a3a]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingPost.status === 'published' ? 'Publish' : 'Save Draft'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
