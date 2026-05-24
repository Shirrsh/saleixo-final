import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface SiteImage {
  id: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
  section: string;
  display_order: number;
  is_active: boolean;
}

const SECTIONS = ['hero', 'portfolio', 'services', 'categories', 'blog', 'team', 'general'];

// ── Supabase project ref (used to call edge function) ─────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

const AdminImages = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Manual add/edit dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);
  const [formData, setFormData] = useState({
    image_key: '',
    image_url: '',
    alt_text: '',
    section: 'hero',
    display_order: 0,
  });

  // AI generate dialog
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPreviewUrl, setAiPreviewUrl] = useState<string | null>(null);
  const [aiForm, setAiForm] = useState({
    prompt: '',
    image_key: '',
    section: 'hero',
    alt_text: '',
    display_order: 0,
  });

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
    } catch (error: unknown) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // ── File upload ───────────────────────────────────────────────────────────
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
      toast({ title: 'Uploaded', description: 'Image uploaded to storage.' });
    } catch (error: unknown) {
      toast({ title: 'Upload Error', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // ── Save (manual) ─────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.image_key || !formData.image_url || !formData.section) {
      toast({ title: 'Error', description: 'Fill in all required fields.', variant: 'destructive' });
      return;
    }
    try {
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
      toast({ title: 'Saved', description: `Image ${editingImage ? 'updated' : 'added'}.` });
      setDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: unknown) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image record?')) return;
    try {
      const { error } = await supabase.from('site_images').delete().eq('id', id);
      if (error) throw error;
      await supabase.from('activity_log').insert({
        action: 'Deleted site image',
        item_type: 'image',
        item_id: id,
      });
      toast({ title: 'Deleted' });
      fetchImages();
    } catch (error: unknown) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  // ── AI Generate ───────────────────────────────────────────────────────────
  const handleAiGenerate = async () => {
    if (!aiForm.prompt || !aiForm.image_key || !aiForm.section) {
      toast({ title: 'Error', description: 'Prompt, image key, and section are required.', variant: 'destructive' });
      return;
    }
    setAiGenerating(true);
    setAiPreviewUrl(null);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          prompt: aiForm.prompt,
          image_key: aiForm.image_key,
          section: aiForm.section,
          alt_text: aiForm.alt_text || aiForm.prompt.slice(0, 120),
          display_order: aiForm.display_order,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        const msg = result.retry
          ? result.error + ' (The model was cold — click Generate again, it should be ready now.)'
          : result.error || 'Generation failed';
        throw new Error(msg);
      }

      setAiPreviewUrl(result.image_url);
      toast({
        title: '✨ Image generated',
        description: `Saved as "${result.image_key}" in the ${result.section} section.`,
      });
      fetchImages();
    } catch (error: unknown) {
      toast({ title: 'Generation failed', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setAiGenerating(false);
    }
  };

  const resetAiForm = () => {
    setAiForm({ prompt: '', image_key: '', section: 'hero', alt_text: '', display_order: 0 });
    setAiPreviewUrl(null);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
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
    setFormData({ image_key: '', image_url: '', alt_text: '', section: 'hero', display_order: 0 });
  };

  const getImagesBySection = (section: string) =>
    images.filter((img) => img.section === section);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading images…</div>;
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Image Manager</h1>
          <p className="text-muted-foreground mt-1">Manage all website images from one place</p>
        </div>
        <div className="flex gap-2">
          {/* AI Generate dialog */}
          <Dialog
            open={aiDialogOpen}
            onOpenChange={(v) => {
              setAiDialogOpen(v);
              if (!v) resetAiForm();
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Generate Image with FLUX.1
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>Prompt *</Label>
                  <Textarea
                    rows={4}
                    value={aiForm.prompt}
                    onChange={(e) => setAiForm({ ...aiForm, prompt: e.target.value })}
                    placeholder="e.g. Studio product photo of diamond stud earrings on black velvet, soft diffused lighting, 4:5 aspect ratio, white background"
                    className="mt-1 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific — describe lighting, surface, style, and aspect ratio.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Image Key *</Label>
                    <Input
                      value={aiForm.image_key}
                      onChange={(e) => setAiForm({ ...aiForm, image_key: e.target.value })}
                      placeholder="e.g. hero_showcase_1"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Section *</Label>
                    <select
                      value={aiForm.section}
                      onChange={(e) => setAiForm({ ...aiForm, section: e.target.value })}
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      {SECTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={aiForm.alt_text}
                    onChange={(e) => setAiForm({ ...aiForm, alt_text: e.target.value })}
                    placeholder="Defaults to prompt if left blank"
                    className="mt-1"
                  />
                </div>

                {/* Preview */}
                {aiGenerating && (
                  <div className="flex flex-col items-center justify-center gap-3 py-8 border rounded-xl bg-muted/30">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Generating with Nano Banana…</p>
                    <p className="text-xs text-muted-foreground">This usually takes 10–30 seconds</p>
                  </div>
                )}

                {aiPreviewUrl && !aiGenerating && (
                  <div className="space-y-2">
                    <Label>Generated Preview</Label>
                    <div className="border rounded-xl overflow-hidden">
                      <img
                        src={aiPreviewUrl}
                        alt="AI generated preview"
                        className="w-full max-h-64 object-contain bg-muted/20"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Saved to {aiForm.section}/{aiForm.image_key}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Uploaded to Supabase Storage ✓
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-1">
                  <Button variant="outline" onClick={() => setAiDialogOpen(false)}>
                    {aiPreviewUrl ? 'Done' : 'Cancel'}
                  </Button>
                  {aiPreviewUrl && (
                    <Button
                      variant="outline"
                      onClick={resetAiForm}
                    >
                      Generate Another
                    </Button>
                  )}
                  {!aiPreviewUrl && (
                    <Button
                      onClick={handleAiGenerate}
                      disabled={aiGenerating || !aiForm.prompt || !aiForm.image_key}
                      className="bg-primary hover:bg-primary/90 gap-2"
                    >
                      {aiGenerating ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Generate</>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Manual add dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Image Key (unique identifier) *</Label>
                  <Input
                    value={formData.image_key}
                    onChange={(e) => setFormData({ ...formData, image_key: e.target.value })}
                    placeholder="e.g. hero_showcase_1"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Section *</Label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {SECTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Upload Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="mt-1"
                  />
                  {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading…</p>}
                </div>
                <div>
                  <Label>Or Enter Image URL *</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://…"
                    className="mt-1"
                  />
                </div>
                {formData.image_url && (
                  <div className="border rounded-xl overflow-hidden">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                )}
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    placeholder="Describe the image for accessibility"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    {editingImage ? 'Update' : 'Add'} Image
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="hero">
        <TabsList className="flex-wrap">
          {SECTIONS.map((section) => (
            <TabsTrigger key={section} value={section} className="capitalize">
              {section} ({getImagesBySection(section).length})
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map((section) => (
          <TabsContent key={section} value={section}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getImagesBySection(section).length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-40" />
                    <p className="mb-4">No images in this section yet</p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="gap-2 border-primary/40 text-primary hover:bg-primary/5"
                        onClick={() => {
                          setAiForm({ ...aiForm, section });
                          setAiDialogOpen(true);
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate with AI
                      </Button>
                      <Button variant="outline" onClick={openNewDialog}>
                        Add Manually
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                getImagesBySection(section).map((image) => (
                  <Card key={image.id} className="overflow-hidden group">
                    <div className="aspect-video relative bg-muted/30">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || image.image_key}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(image)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm truncate">{image.image_key}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {image.alt_text || 'No alt text'}
                      </p>
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
