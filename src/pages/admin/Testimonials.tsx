import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
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

  const handleSaveTestimonial = async () => {
    try {
      if (editingTestimonial.id) {
        const { error } = await supabase
          .from('testimonials')
          .update(editingTestimonial)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').insert([editingTestimonial]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingTestimonial.id ? 'Updated testimonial' : 'Created testimonial',
        item_type: 'testimonial',
        item_id: editingTestimonial.id,
      });

      toast({
        title: 'Success',
        description: `Testimonial ${editingTestimonial.id ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted testimonial',
        item_type: 'testimonial',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (testimonial: any) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !testimonial.is_active })
        .eq('id', testimonial.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Testimonial ${!testimonial.is_active ? 'activated' : 'deactivated'}`,
      });
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewTestimonialDialog = () => {
    setEditingTestimonial({
      quote: '',
      client_name: '',
      rating: 5,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: any) => {
    setEditingTestimonial({ ...testimonial });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Testimonials</h1>
          <p className="text-[#7f8c8d] mt-2">Manage client testimonials</p>
        </div>
        <Button onClick={openNewTestimonialDialog} className="bg-[#d4af37] hover:bg-[#c19d2f]">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#ecf0f1]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="max-w-md truncate">{testimonial.quote}</TableCell>
                <TableCell>{testimonial.client_name}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={testimonial.is_active}
                      onCheckedChange={() => handleToggleActive(testimonial)}
                    />
                    <span className="text-sm text-[#7f8c8d]">
                      {testimonial.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(testimonial)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>
          {editingTestimonial && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Client Quote</label>
                <Textarea
                  value={editingTestimonial.quote}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                  }
                  placeholder="What did the client say?"
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Client Name</label>
                <Input
                  value={editingTestimonial.client_name || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Rating (1-5)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={editingTestimonial.rating || 5}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingTestimonial.is_active}
                  onCheckedChange={(checked) =>
                    setEditingTestimonial({ ...editingTestimonial, is_active: checked })
                  }
                />
                <label className="text-sm text-[#2c3e50]">Active</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveTestimonial}
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Testimonial
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
