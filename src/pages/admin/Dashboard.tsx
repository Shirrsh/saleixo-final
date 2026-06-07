import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Briefcase, Plus, Clock, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    portfolioItems: 0,
    activeServices: 0,
    totalLeads: 0,
    newLeads: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string;
    action: string | null;
    item_type: string | null;
    user_email: string | null;
    created_at: string;
  }>>([]);
  const [recentLeads, setRecentLeads] = useState<Array<{
    id: string;
    name: string;
    email: string;
    services: string[] | null;
    status: string;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show dashboard after 1 second max, even if data hasn't loaded
    const forceLoadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const fetchStats = async () => {
      try {
        const [blogCount, portfolioCount, servicesCount, activityData, totalLeads, newLeads] = await Promise.all([
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase
            .from('activity_log')
            .select('id, action, item_type, user_email, created_at')
            .order('created_at', { ascending: false })
            .limit(10),
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        ]);

        setStats({
          blogPosts: blogCount.count || 0,
          portfolioItems: portfolioCount.count || 0,
          activeServices: servicesCount.count || 0,
          totalLeads: totalLeads.count || 0,
          newLeads: newLeads.count || 0,
        });

        setRecentActivity(activityData.data || []);

        const { data: leadsData } = await supabase
          .from('leads')
          .select('id, name, email, services, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        setRecentLeads((leadsData as any) || []);

        clearTimeout(forceLoadTimeout);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        clearTimeout(forceLoadTimeout);
        setLoading(false);
      }
    };

    fetchStats();

    return () => clearTimeout(forceLoadTimeout);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Dashboard</h1>
        <p className="text-[#7f8c8d] mt-2">Welcome to your admin panel</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white border-[#ecf0f1]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#7f8c8d]">
              Total Blog Posts
            </CardTitle>
            <FileText className="w-5 h-5 text-[#1a3a3a]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2c3e50]">
              {loading ? '...' : stats.blogPosts}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#ecf0f1]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#7f8c8d]">
              Portfolio Items
            </CardTitle>
            <FolderOpen className="w-5 h-5 text-[#1a3a3a]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2c3e50]">
              {loading ? '...' : stats.portfolioItems}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#ecf0f1]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#7f8c8d]">
              Active Services
            </CardTitle>
            <Briefcase className="w-5 h-5 text-[#1a3a3a]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2c3e50]">
              {loading ? '...' : stats.activeServices}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#ecf0f1]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#7f8c8d]">
              Total Leads
            </CardTitle>
            <Users className="w-5 h-5 text-[#1a3a3a]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2c3e50]">
              {loading ? '...' : stats.totalLeads}
            </div>
            <p className="text-xs text-[#7f8c8d] mt-1">all time</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#ecf0f1]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#7f8c8d]">
              New Leads
            </CardTitle>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {loading ? '...' : stats.newLeads}
            </div>
            <p className="text-xs text-[#7f8c8d] mt-1">awaiting response</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link to="/admin/blog">
            <Button className="bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Blog Post
            </Button>
          </Link>
          <Link to="/admin/testimonials">
            <Button className="bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </Link>
          <Link to="/admin/portfolio">
            <Button className="bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio
            </Button>
          </Link>
          <Link to="/admin/leads">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View Leads
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#2c3e50]">Recent Leads</CardTitle>
          <Link to="/admin/leads">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#7f8c8d]">Loading leads...</p>
          ) : recentLeads.length === 0 ? (
            <p className="text-[#7f8c8d]">No leads yet — share your Get Started page!</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-[#ecf0f1] last:border-0">
                  <div>
                    <p className="font-medium text-[#2c3e50] text-sm">{lead.name}</p>
                    <p className="text-xs text-[#7f8c8d]">{lead.email} · {lead.services?.[0] || 'General'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={lead.status === 'new' ? 'default' : 'secondary'}
                      className={lead.status === 'new' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-[#7f8c8d]">
                      {format(new Date(lead.created_at), 'MMM d')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border-[#ecf0f1]">
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[#7f8c8d]">Loading activity...</p>
          ) : recentActivity.length === 0 ? (
            <p className="text-[#7f8c8d]">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-[#ecf0f1] last:border-0"
                >
                  <Clock className="w-5 h-5 text-[#7f8c8d] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[#2c3e50] font-medium">{activity.action}</p>
                    <p className="text-sm text-[#7f8c8d]">
                      {activity.item_type} • {activity.user_email}
                    </p>
                  </div>
                  <span className="text-sm text-[#7f8c8d]">
                    {format(new Date(activity.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
