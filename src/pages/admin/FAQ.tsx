import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminFAQ = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFaqs(data || []);
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

  const handleSaveFaq = async () => {
    try {
      if (editingFaq.id) {
        const { error } = await supabase
          .from('faq_items')
          .update(editingFaq)
          .eq('id', editingFaq.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('faq_items').insert([editingFaq]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingFaq.id ? 'Updated FAQ' : 'Created FAQ',
        item_type: 'faq',
        item_id: editingFaq.id,
      });

      toast({
        title: 'Success',
        description: `FAQ ${editingFaq.id ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingFaq(null);
      fetchFaqs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await supabase.from('faq_items').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted FAQ',
        item_type: 'faq',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'FAQ deleted successfully',
      });
      fetchFaqs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (faq: any) => {
    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_active: !faq.is_active })
        .eq('id', faq.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `FAQ ${!faq.is_active ? 'activated' : 'deactivated'}`,
      });
      fetchFaqs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewFaqDialog = () => {
    setEditingFaq({
      question: '',
      answer: '',
      category: '',
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (faq: any) => {
    setEditingFaq({ ...faq });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading FAQs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">FAQ Manager</h1>
          <p className="text-[#7f8c8d] mt-2">Manage frequently asked questions</p>
        </div>
        <Button onClick={openNewFaqDialog} className="bg-[#d4af37] hover:bg-[#c19d2f]">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#ecf0f1]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="max-w-md font-medium">{faq.question}</TableCell>
                <TableCell>{faq.category || 'General'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={faq.is_active}
                      onCheckedChange={() => handleToggleActive(faq)}
                    />
                    <span className="text-sm text-[#7f8c8d]">
                      {faq.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(faq)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteFaq(faq.id)}
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
              {editingFaq?.id ? 'Edit FAQ' : 'Add New FAQ'}
            </DialogTitle>
          </DialogHeader>
          {editingFaq && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Question</label>
                <Input
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  placeholder="What is your question?"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Answer</label>
                <Textarea
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  placeholder="Your answer here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Category</label>
                <Input
                  value={editingFaq.category || ''}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, category: e.target.value })
                  }
                  placeholder="e.g., General, Services, Pricing"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingFaq.is_active}
                  onCheckedChange={(checked) =>
                    setEditingFaq({ ...editingFaq, is_active: checked })
                  }
                />
                <label className="text-sm text-[#2c3e50]">Active</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveFaq}
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save FAQ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
