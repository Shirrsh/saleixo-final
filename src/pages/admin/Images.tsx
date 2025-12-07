import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

interface SiteImage {
  id: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
  section: string;
  display_order: number;
  is_active: boolean;
}

const AdminImages = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);
  const [formData, setFormData] = useState({
    image_key: '',
    image_url: '',
    alt_text: '',
    section: 'hero',
    display_order: 0,
  });

  const sections = ['hero', 'portfolio', 'services', 'categories', 'blog', 'team', 'general'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .order('section')
        .order('display_order');

      if (error) throw error;
      setImages(data || []);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${formData.section}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Upload Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.image_key || !formData.image_url || !formData.section) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      if (editingImage) {
        const { error } = await supabase
          .from('site_images')
          .update({
            image_key: formData.image_key,
            image_url: formData.image_url,
            alt_text: formData.alt_text,
            section: formData.section,
            display_order: formData.display_order,
          })
          .eq('id', editingImage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_images')
          .insert([{
            image_key: formData.image_key,
            image_url: formData.image_url,
            alt_text: formData.alt_text,
            section: formData.section,
            display_order: formData.display_order,
          }]);

        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingImage ? 'Updated site image' : 'Added new site image',
        item_type: 'image',
        item_id: editingImage?.id,
      });

      toast({
        title: 'Success',
        description: `Image ${editingImage ? 'updated' : 'added'} successfully`,
      });

      setDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('site_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted site image',
        item_type: 'image',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (image: SiteImage) => {
    setEditingImage(image);
    setFormData({
      image_key: image.image_key,
      image_url: image.image_url,
      alt_text: image.alt_text || '',
      section: image.section,
      display_order: image.display_order,
    });
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingImage(null);
    setFormData({
      image_key: '',
      image_url: '',
      alt_text: '',
      section: 'hero',
      display_order: 0,
    });
  };

  const getImagesBySection = (section: string) => {
    return images.filter(img => img.section === section);
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading images...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Image Manager</h1>
          <p className="text-muted-foreground mt-2">Manage all website images from one place</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Image Key (unique identifier)*</Label>
                <Input
                  value={formData.image_key}
                  onChange={(e) => setFormData({ ...formData, image_key: e.target.value })}
                  placeholder="e.g., hero_showcase_1"
                />
              </div>

              <div>
                <Label>Section*</Label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                >
                  {sections.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Upload Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </div>
                {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
              </div>

              <div>
                <Label>Or Enter Image URL*</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {formData.image_url && (
                <div className="border rounded-lg p-2">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}

              <div>
                <Label>Alt Text</Label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingImage ? 'Update' : 'Add'} Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex-wrap">
          {sections.map(section => (
            <TabsTrigger key={section} value={section} className="capitalize">
              {section} ({getImagesBySection(section).length})
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map(section => (
          <TabsContent key={section} value={section}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getImagesBySection(section).length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No images in this section yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={openNewDialog}
                    >
                      Add First Image
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                getImagesBySection(section).map(image => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || image.image_key}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(image)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm truncate">{image.image_key}</p>
                      <p className="text-xs text-muted-foreground truncate">{image.alt_text || 'No alt text'}</p>
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

export default AdminImages;
