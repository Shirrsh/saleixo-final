import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Video as VideoIcon, Upload } from 'lucide-react';

interface SiteVideo {
  id: string;
  video_key: string;
  video_url: string;
  poster_url: string | null;
  alt_text: string | null;
  section: string;
  display_order: number;
  is_active: boolean;
}

const SECTIONS = ['hero', 'portfolio', 'services', 'testimonials', 'general'];

const AdminVideos = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<SiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<'video' | 'poster' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<SiteVideo | null>(null);
  const [formData, setFormData] = useState({
    video_key: '',
    video_url: '',
    poster_url: '',
    alt_text: '',
    section: 'general',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('site_videos')
        .select('*')
        .order('section')
        .order('display_order');

      if (error) throw error;
      setVideos(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'video' | 'poster'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(type);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const folder = type === 'video' ? 'videos' : 'video-posters';
      const filePath = `${folder}/${formData.section}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

      if (type === 'video') {
        setFormData(prev => ({ ...prev, video_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, poster_url: publicUrl }));
      }

      toast({ title: 'Uploaded', description: `${type === 'video' ? 'Video' : 'Poster'} uploaded successfully` });
    } catch (error: any) {
      toast({ title: 'Upload Error', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(null);
      // Reset the input so the same file can be re-selected if needed
      event.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!formData.video_key || !formData.video_url || !formData.section) {
      toast({
        title: 'Missing fields',
        description: 'Video Key, Video URL, and Section are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const payload = {
        video_key: formData.video_key,
        video_url: formData.video_url,
        poster_url: formData.poster_url || null,
        alt_text: formData.alt_text || null,
        section: formData.section,
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('site_videos')
          .update(payload)
          .eq('id', editingVideo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_videos')
          .insert([payload]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingVideo ? 'Updated site video' : 'Added new site video',
        item_type: 'video',
        item_id: editingVideo?.id,
      });

      toast({ title: 'Saved', description: `Video ${editingVideo ? 'updated' : 'added'} successfully` });
      setDialogOpen(false);
      resetForm();
      fetchVideos();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video entry? The file in storage will not be removed.')) return;
    try {
      const { error } = await supabase.from('site_videos').delete().eq('id', id);
      if (error) throw error;
      await supabase.from('activity_log').insert({
        action: 'Deleted site video',
        item_type: 'video',
        item_id: id,
      });
      toast({ title: 'Deleted', description: 'Video removed' });
      fetchVideos();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleActive = async (video: SiteVideo) => {
    try {
      const { error } = await supabase
        .from('site_videos')
        .update({ is_active: !video.is_active })
        .eq('id', video.id);
      if (error) throw error;
      fetchVideos();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const openEditDialog = (video: SiteVideo) => {
    setEditingVideo(video);
    setFormData({
      video_key: video.video_key,
      video_url: video.video_url,
      poster_url: video.poster_url || '',
      alt_text: video.alt_text || '',
      section: video.section,
      display_order: video.display_order,
      is_active: video.is_active,
    });
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingVideo(null);
    setFormData({
      video_key: '',
      video_url: '',
      poster_url: '',
      alt_text: '',
      section: 'general',
      display_order: 0,
      is_active: true,
    });
  };

  const getVideosBySection = (section: string) => videos.filter(v => v.section === section);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading videos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Video Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage all site videos — {videos.length} total, {videos.filter(v => v.is_active).length} active
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Video Key */}
              <div>
                <Label>Video Key (unique identifier) *</Label>
                <Input
                  value={formData.video_key}
                  onChange={e => setFormData(prev => ({ ...prev, video_key: e.target.value }))}
                  placeholder="e.g., testimonial_james_whitfield"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use snake_case. This is how components reference this video.
                </p>
              </div>

              {/* Section */}
              <div>
                <Label>Section *</Label>
                <select
                  value={formData.section}
                  onChange={e => setFormData(prev => ({ ...prev, section: e.target.value }))}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  {SECTIONS.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Video Upload */}
              <div>
                <Label>Upload Video File</Label>
                <Input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/mov"
                  onChange={e => handleFileUpload(e, 'video')}
                  disabled={uploading !== null}
                />
                {uploading === 'video' && (
                  <p className="text-xs text-muted-foreground mt-1 animate-pulse">Uploading video…</p>
                )}
              </div>

              {/* Video URL */}
              <div>
                <Label>Or paste Video URL *</Label>
                <Input
                  value={formData.video_url}
                  onChange={e => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              {/* Video preview */}
              {formData.video_url && (
                <div className="border rounded-lg overflow-hidden">
                  <video
                    src={formData.video_url}
                    poster={formData.poster_url || undefined}
                    controls
                    className="w-full max-h-48 object-cover"
                  />
                </div>
              )}

              {/* Poster Upload */}
              <div>
                <Label>Upload Poster / Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'poster')}
                  disabled={uploading !== null}
                />
                {uploading === 'poster' && (
                  <p className="text-xs text-muted-foreground mt-1 animate-pulse">Uploading poster…</p>
                )}
              </div>

              {/* Poster URL */}
              <div>
                <Label>Or paste Poster URL</Label>
                <Input
                  value={formData.poster_url}
                  onChange={e => setFormData(prev => ({ ...prev, poster_url: e.target.value }))}
                  placeholder="https://... (shown before video plays)"
                />
              </div>

              {/* Poster preview */}
              {formData.poster_url && (
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={formData.poster_url}
                    alt="Poster preview"
                    className="w-full h-32 object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
              )}

              {/* Alt text */}
              <div>
                <Label>Alt / Description Text</Label>
                <Input
                  value={formData.alt_text}
                  onChange={e => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="Describe the video for accessibility"
                />
              </div>

              {/* Display order */}
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={e => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                />
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_active">Active (visible on site)</Label>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingVideo ? 'Update' : 'Add'} Video
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs by section */}
      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          {SECTIONS.map(section => (
            <TabsTrigger key={section} value={section} className="capitalize">
              {section} ({getVideosBySection(section).length})
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map(section => (
          <TabsContent key={section} value={section}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getVideosBySection(section).length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <VideoIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No videos in this section yet</p>
                    <Button variant="outline" className="mt-4" onClick={openNewDialog}>
                      Add First Video
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                getVideosBySection(section).map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Thumbnail / poster */}
                    <div className="aspect-video relative bg-muted">
                      {video.poster_url ? (
                        <img
                          src={video.poster_url}
                          alt={video.alt_text || video.video_key}
                          className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <VideoIcon className="w-10 h-10 text-muted-foreground opacity-40" />
                        </div>
                      )}

                      {/* Status badge */}
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant={video.is_active ? 'default' : 'secondary'}
                          className="text-[10px] cursor-pointer"
                          onClick={() => toggleActive(video)}
                        >
                          {video.is_active ? 'Active' : 'Hidden'}
                        </Badge>
                      </div>

                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(video)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-3 space-y-1">
                      <p className="font-medium text-sm truncate">{video.video_key}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {video.alt_text || 'No description'}
                      </p>
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline truncate block"
                      >
                        View file ↗
                      </a>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminVideos;
