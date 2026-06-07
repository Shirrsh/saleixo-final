import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Search } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
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

  const handleSaveService = async () => {
    try {
      if (editingService.id) {
        const { error } = await supabase
          .from('services')
          .update(editingService)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([editingService]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingService.id ? 'Updated service' : 'Created service',
        item_type: 'service',
        item_id: editingService.id,
      });

      toast({
        title: 'Success',
        description: `Service ${editingService.id ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted service',
        item_type: 'service',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      fetchServices();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (service: any) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Service ${!service.is_active ? 'activated' : 'deactivated'}`,
      });
      fetchServices();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewServiceDialog = () => {
    setEditingService({
      title: '',
      description: '',
      image_url: '',
      is_active: true,
      category: '',
      slug: '',
      price_from: '',
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: any) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Services Manager</h1>
          <p className="text-[#7f8c8d] mt-2">
            {services.filter(s => s.is_active).length} active / {services.length} total services
          </p>
        </div>
        <Button onClick={openNewServiceDialog} className="bg-gold hover:bg-gold-hover text-[#1a3a3a]">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f8c8d]" />
          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="all">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Amazon">Amazon</option>
        </select>
      </div>

      <Card className="bg-white border-[#ecf0f1]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services
                .filter(s =>
                  (categoryFilter === 'all' || s.category === categoryFilter) &&
                  (search === '' || s.title?.toLowerCase().includes(search.toLowerCase()))
                )
                .map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.category || '—'}</TableCell>
                  <TableCell className="max-w-md truncate">{service.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.is_active}
                        onCheckedChange={() => handleToggleActive(service)}
                      />
                      <span className="text-sm text-[#7f8c8d]">
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-[#7f8c8d]">
                    No services yet — click "Add Service" to add your first.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService?.id ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Title</label>
                <Input
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  placeholder="Service title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Description</label>
                <Textarea
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  placeholder="Service description"
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Category</label>
                  <select
                    value={editingService.category || ''}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">No category</option>
                    <option value="Photography">Photography</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Amazon">Amazon</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">Price From (USD)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editingService.price_from || ''}
                    onChange={(e) => setEditingService({ ...editingService, price_from: e.target.value })}
                    placeholder="e.g., 299"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">
                  Slug
                  <span className="ml-2 text-xs font-normal text-[#7f8c8d]">(URL path)</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editingService.slug || ''}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    placeholder="photography-service"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const slug = (editingService.title || '')
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                      setEditingService({ ...editingService, slug });
                    }}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Image URL</label>
                <Input
                  value={editingService.image_url || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
                {editingService.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-[#ecf0f1] h-36">
                    <img
                      src={editingService.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="service-featured"
                  checked={editingService.featured || false}
                  onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="service-featured" className="text-sm text-[#2c3e50]">Featured service</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingService.is_active}
                  onCheckedChange={(checked) =>
                    setEditingService({ ...editingService, is_active: checked })
                  }
                />
                <label className="text-sm text-[#2c3e50]">Active</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveService}
                  className="bg-gold hover:bg-gold-hover text-[#1a3a3a]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Service
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
