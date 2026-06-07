import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Search } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminFAQ = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

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
      sort_order: 0,
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
          <p className="text-[#7f8c8d] mt-2">
            {faqs.filter(f => f.is_active).length} active / {faqs.length} total FAQs
          </p>
        </div>
        <Button onClick={openNewFaqDialog} className="bg-gold hover:bg-gold-hover text-[#1a3a3a]">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f8c8d]" />
          <Input
            placeholder="Search questions..."
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
          <option value="General">General</option>
          <option value="Services">Services</option>
          <option value="Pricing">Pricing</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Photography">Photography</option>
          <option value="Getting Started">Getting Started</option>
        </select>
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
            {faqs
              .filter(f =>
                (categoryFilter === 'all' || f.category === categoryFilter) &&
                (search === '' || f.question?.toLowerCase().includes(search.toLowerCase()))
              )
              .map((faq) => (
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
            {faqs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-[#7f8c8d]">
                  No FAQs yet — click "Add FAQ" to create your first.
                </TableCell>
              </TableRow>
            )}
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
                <select
                  value={editingFaq.category || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">No category</option>
                  <option value="General">General</option>
                  <option value="Services">Services</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Ecommerce">Ecommerce</option>
                  <option value="Photography">Photography</option>
                  <option value="Getting Started">Getting Started</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">
                  Display Order
                  <span className="ml-2 text-xs font-normal text-[#7f8c8d]">(lower = shown first)</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={editingFaq.sort_order ?? 0}
                  onChange={(e) => setEditingFaq({ ...editingFaq, sort_order: parseInt(e.target.value) || 0 })}
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
                  className="bg-gold hover:bg-gold-hover text-[#1a3a3a]"
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
