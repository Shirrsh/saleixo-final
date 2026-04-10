import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    id: '',
    site_title: '',
    logo_url: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings({
          id: data.id,
          site_title: data.site_title || '',
          logo_url: data.logo_url || '',
          phone: data.phone || '',
          email: data.email || '',
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = settings.id
        ? await supabase
            .from('site_settings')
            .update(settings)
            .eq('id', settings.id)
        : await supabase.from('site_settings').insert([settings]);

      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Updated site settings',
        item_type: 'settings',
        item_id: settings.id,
      });

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
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

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Site Settings</h1>
        <p className="text-[#7f8c8d] mt-2">Configure your website settings</p>
      </div>

      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#2c3e50]">Site Title</label>
            <Input
              value={settings.site_title}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              placeholder="Indistores"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#2c3e50]">Logo URL</label>
            <Input
              value={settings.logo_url}
              onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#2c3e50]">Phone Number</label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#2c3e50]">Email Address</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="info@indistores.com"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#d4af37] hover:bg-[#c19d2f]"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
