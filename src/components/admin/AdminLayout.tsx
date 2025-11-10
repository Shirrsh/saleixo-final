import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Home,
  Briefcase,
  FolderOpen,
  FileText,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Users,
  Settings,
  Menu,
  LogOut,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminLayout = () => {
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin',
        });

        if (error) throw error;

        setIsAdmin(data || false);
        
        if (!data) {
          toast({
            title: 'Access Denied',
            description: 'You do not have admin privileges',
            variant: 'destructive',
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        navigate('/');
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminRole();
  }, [user, navigate, toast]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Homepage Editor', path: '/admin/homepage', icon: Home },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Portfolio', path: '/admin/portfolio', icon: FolderOpen },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'FAQ', path: '/admin/faq', icon: HelpCircle },
    { name: 'Pricing', path: '/admin/pricing', icon: DollarSign },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#1a3a3a] mx-auto mb-4 animate-pulse" />
          <p className="text-[#7f8c8d]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#1a3a3a]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Alvaio Admin</h1>
            <p className="text-xs text-white/70">Content Management</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-[#d4af37] text-[#1a3a3a] font-medium'
                    : 'text-white hover:bg-white/10'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a3a3a] border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 bg-[#1a3a3a] border-white/10">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/90 text-sm hidden sm:inline">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#1a3a3a] min-h-[calc(100vh-4rem)] sticky top-16">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
