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
      department: '',
      display_order: 0,
      is_active: true,
      linkedin_url: '',
      instagram_url: '',
      twitter_url: '',
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
          <p className="text-[#7f8c8d] mt-2">
            {members.filter(m => m.is_active !== false).length} visible / {members.length} total members
          </p>
        </div>
        <Button onClick={openNewMemberDialog} className="bg-gold hover:bg-gold-hover text-[#1a3a3a]">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 && (
          <div className="col-span-3 py-16 text-center text-[#7f8c8d]">
            <p className="text-lg font-medium mb-1">No team members yet</p>
            <p className="text-sm">Click "Add Member" to introduce your team to visitors.</p>
          </div>
        )}
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg border border-[#ecf0f1] overflow-hidden relative">
            {member.is_active === false && (
              <span className="absolute top-2 right-2 text-xs bg-gray-800/70 text-white px-2 py-0.5 rounded">
                Hidden
              </span>
            )}
            {member.image_url && (
              <img
                src={member.image_url}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-[#2c3e50] mb-1">{member.name}</h3>
              <p className="text-sm text-gold mb-2">{member.role}</p>
              {member.department && (
                <span className="inline-block text-xs bg-[#ecf0f1] text-[#2c3e50] px-2 py-0.5 rounded mb-2">
                  {member.department}
                </span>
              )}
              <p className="text-sm text-[#7f8c8d] mb-4 line-clamp-3">{member.bio}</p>
              {(member.linkedin_url || member.instagram_url || member.twitter_url) && (
                <div className="flex gap-2 mb-3">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#3498db] hover:underline">LinkedIn</a>
                  )}
                  {member.instagram_url && (
                    <a href={member.instagram_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#3498db] hover:underline">Instagram</a>
                  )}
                  {member.twitter_url && (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#3498db] hover:underline">Twitter/X</a>
                  )}
                </div>
              )}
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
                <label className="text-sm font-medium text-[#2c3e50]">Department</label>
                <select
                  value={editingMember.department || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                  className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">No department</option>
                  <option value="Photography">Photography</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Ecommerce">Ecommerce</option>
                  <option value="Operations">Operations</option>
                  <option value="Leadership">Leadership</option>
                </select>
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
                {editingMember.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-[#ecf0f1] h-40 w-40">
                    <img
                      src={editingMember.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50] mb-2 block">Social Links</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7f8c8d] w-20 flex-shrink-0">LinkedIn</span>
                    <Input
                      value={editingMember.linkedin_url || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7f8c8d] w-20 flex-shrink-0">Instagram</span>
                    <Input
                      value={editingMember.instagram_url || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, instagram_url: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7f8c8d] w-20 flex-shrink-0">Twitter/X</span>
                    <Input
                      value={editingMember.twitter_url || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, twitter_url: e.target.value })}
                      placeholder="https://x.com/..."
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <label className="text-sm font-medium text-[#2c3e50]">
                    Display Order
                    <span className="ml-2 text-xs font-normal text-[#7f8c8d]">(lower = first)</span>
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={editingMember.display_order ?? 0}
                    onChange={(e) => setEditingMember({ ...editingMember, display_order: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-28"
                  />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    id="member-active"
                    checked={editingMember.is_active !== false}
                    onChange={(e) => setEditingMember({ ...editingMember, is_active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="member-active" className="text-sm text-[#2c3e50]">Visible on website</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveMember}
                  className="bg-gold hover:bg-gold-hover text-[#1a3a3a]"
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
