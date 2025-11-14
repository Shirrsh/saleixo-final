import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: any) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
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
        <Button onClick={openNewPostDialog} className="bg-[#d4af37] hover:bg-[#c19d2f]">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#ecf0f1]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(post.created_at), 'MMM d, yyyy')}</TableCell>
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
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
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
