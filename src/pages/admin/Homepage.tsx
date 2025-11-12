import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';

const AdminHomepage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [homepageData, setHomepageData] = useState({
    id: '',
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: '',
    hero_cta_link: '',
    hero_image_url: '',
    meta_title: '',
    meta_description: '',
  });

  const [valueProps, setValueProps] = useState<any[]>([]);

  useEffect(() => {
    fetchHomepageData();
    fetchValueProps();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('id, hero_title, hero_subtitle, hero_cta_text, hero_cta_link, hero_image_url, meta_title, meta_description, created_at')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setHomepageData({
          id: data.id,
          hero_title: (data.hero_title as string) || '',
          hero_subtitle: (data.hero_subtitle as string) || '',
          hero_cta_text: (data.hero_cta_text as string) || '',
          hero_cta_link: (data.hero_cta_link as string) || '',
          hero_image_url: (data.hero_image_url as string) || '',
          meta_title: (data.meta_title as string) || '',
          meta_description: (data.meta_description as string) || '',
        });
      }
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

  const fetchValueProps = async () => {
    try {
      const { data, error } = await supabase
        .from('value_propositions')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setValueProps(data || []);
    } catch (error: any) {
      console.error('Error fetching value props:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = homepageData.id
        ? await supabase
            .from('homepage_content')
            .update(homepageData)
            .eq('id', homepageData.id)
        : await supabase.from('homepage_content').insert([homepageData]);

      if (error) throw error;

      // Log activity
      await supabase.from('activity_log').insert({
        action: 'Updated homepage content',
        item_type: 'homepage',
        item_id: homepageData.id,
      });

      toast({
        title: 'Success',
        description: 'Homepage updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddValueProp = async () => {
    try {
      const { data, error } = await supabase
        .from('value_propositions')
        .insert([
          {
            title: 'New Value Proposition',
            description: 'Description here',
            display_order: valueProps.length,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setValueProps([...valueProps, data]);
      toast({
        title: 'Success',
        description: 'Value proposition added',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteValueProp = async (id: string) => {
    try {
      const { error } = await supabase
        .from('value_propositions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setValueProps(valueProps.filter((vp) => vp.id !== id));
      toast({
        title: 'Success',
        description: 'Value proposition deleted',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleUpdateValueProp = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('value_propositions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setValueProps(
        valueProps.map((vp) => (vp.id === id ? { ...vp, ...updates } : vp))
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="text-[#7f8c8d]">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Homepage Editor</h1>
        <p className="text-[#7f8c8d] mt-2">Manage your homepage content</p>
      </div>

      {/* Hero Section */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Hero Title
            </label>
            <Input
              value={homepageData.hero_title || ''}
              onChange={(e) =>
                setHomepageData({ ...homepageData, hero_title: e.target.value })
              }
              placeholder="Welcome to Alvaio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Hero Subtitle
            </label>
            <Input
              value={homepageData.hero_subtitle || ''}
              onChange={(e) =>
                setHomepageData({ ...homepageData, hero_subtitle: e.target.value })
              }
              placeholder="Your trusted partner..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                CTA Button Text
              </label>
              <Input
                value={homepageData.hero_cta_text || ''}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, hero_cta_text: e.target.value })
                }
                placeholder="Get Started"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                CTA Link
              </label>
              <Input
                value={homepageData.hero_cta_link || ''}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, hero_cta_link: e.target.value })
                }
                placeholder="/contact"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Hero Image URL
            </label>
            <Input
              value={homepageData.hero_image_url || ''}
              onChange={(e) =>
                setHomepageData({ ...homepageData, hero_image_url: e.target.value })
              }
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Value Propositions */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#2c3e50]">Value Propositions</CardTitle>
          <Button
            onClick={handleAddValueProp}
            size="sm"
            className="bg-[#1a3a3a] hover:bg-[#2a4a4a]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {valueProps.map((vp) => (
            <div key={vp.id} className="p-4 border border-[#ecf0f1] rounded-lg space-y-3">
              <Input
                value={vp.title}
                onChange={(e) =>
                  handleUpdateValueProp(vp.id, { title: e.target.value })
                }
                placeholder="Title"
                className="font-medium"
              />
              <Textarea
                value={vp.description || ''}
                onChange={(e) =>
                  handleUpdateValueProp(vp.id, { description: e.target.value })
                }
                placeholder="Description"
                rows={2}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteValueProp(vp.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Meta Title
            </label>
            <Input
              value={homepageData.meta_title || ''}
              onChange={(e) =>
                setHomepageData({ ...homepageData, meta_title: e.target.value })
              }
              placeholder="Alvaio - Digital Excellence"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Meta Description
            </label>
            <Textarea
              value={homepageData.meta_description || ''}
              onChange={(e) =>
                setHomepageData({ ...homepageData, meta_description: e.target.value })
              }
              placeholder="Professional digital services..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-[#d4af37] hover:bg-[#c49d2f] text-[#1a3a3a]"
      >
        <Save className="w-4 h-4 mr-2" />
        {saving ? 'Saving...' : 'Save All Changes'}
      </Button>
    </div>
  );
};

export default AdminHomepage;
