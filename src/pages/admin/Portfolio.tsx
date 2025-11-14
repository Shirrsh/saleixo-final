import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const AdminPortfolio = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
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

  const handleSaveProject = async () => {
    try {
      if (editingProject.id) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(editingProject)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_projects').insert([editingProject]);
        if (error) throw error;
      }

      await supabase.from('activity_log').insert({
        action: editingProject.id ? 'Updated portfolio project' : 'Created portfolio project',
        item_type: 'portfolio',
        item_id: editingProject.id,
      });

      toast({
        title: 'Success',
        description: `Project ${editingProject.id ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
      if (error) throw error;

      await supabase.from('activity_log').insert({
        action: 'Deleted portfolio project',
        item_type: 'portfolio',
        item_id: id,
      });

      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openNewProjectDialog = () => {
    setEditingProject({
      title: '',
      description: '',
      image_url: '',
      category: '',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: any) => {
    setEditingProject({ ...project });
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-[#7f8c8d]">Loading portfolio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Portfolio Gallery</h1>
          <p className="text-[#7f8c8d] mt-2">Manage your portfolio projects</p>
        </div>
        <Button onClick={openNewProjectDialog} className="bg-[#d4af37] hover:bg-[#c19d2f]">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg border border-[#ecf0f1] overflow-hidden">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-[#2c3e50] mb-2">{project.title}</h3>
              <p className="text-sm text-[#7f8c8d] mb-2 line-clamp-2">{project.description}</p>
              {project.category && (
                <span className="text-xs bg-[#ecf0f1] text-[#2c3e50] px-2 py-1 rounded">
                  {project.category}
                </span>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(project)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
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
              {editingProject?.id ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Title</label>
                <Input
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  placeholder="Project title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Description</label>
                <Textarea
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="Project description"
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Image URL</label>
                <Input
                  value={editingProject.image_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2c3e50]">Category</label>
                <Input
                  value={editingProject.category || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, category: e.target.value })
                  }
                  placeholder="e.g., Photography, Design, Marketing"
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProject}
                  className="bg-[#d4af37] hover:bg-[#c19d2f]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolio;
