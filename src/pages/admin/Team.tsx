import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const AdminTeam = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('about_team')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
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

  const handleSaveMember = async () => {
    try {
      if (editingMember.id) {
        const { error } = await supabase
          .from('about_team')
          .update(editingMember)
          .eq('id', editingMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('about_team').insert([editingMember]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingMember.id ? 'Updated team member' : 'Added team member',
        item_type: 'team',
        item_id: editingMember.id,
      });

      toast({
        title: 'Success',
        description: `Team member ${editingMember.id ? 'updated' : 'added'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingMember(null);
      fetchMembers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const { error } = await supabase.from('about_team').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Removed team member',
        item_type: 'team',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Team member removed successfully',
      });
      fetchMembers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewMemberDialog = () => {
    setEditingMember({
      name: '',
      role: '',
      bio: '',
      image_url: '',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: any) => {
    setEditingMember({ ...member });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading team members...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Team Members</h1>
          <p className="text-[#7f8c8d] mt-2">Manage your team</p>
        </div>
        <Button onClick={openNewMemberDialog} className="bg-[#d4af37] hover:bg-[#c19d2f]">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg border border-[#ecf0f1] overflow-hidden">
            {member.image_url && (
              <img
                src={member.image_url}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-[#2c3e50] mb-1">{member.name}</h3>
              <p className="text-sm text-[#d4af37] mb-2">{member.role}</p>
              <p className="text-sm text-[#7f8c8d] mb-4 line-clamp-3">{member.bio}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(member)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingMember?.id ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Name</label>
                <Input
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  placeholder="Full name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Role</label>
                <Input
                  value={editingMember.role || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, role: e.target.value })
                  }
                  placeholder="e.g., Creative Director"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Bio</label>
                <Textarea
                  value={editingMember.bio || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, bio: e.target.value })
                  }
                  placeholder="Short bio..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Image URL</label>
                <Input
                  value={editingMember.image_url || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveMember}
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Member
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
