import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Briefcase, Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    portfolioItems: 0,
    activeServices: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogCount, portfolioCount, servicesCount, activityData] = await Promise.all([
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }).eq('active', true),
          supabase
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10),
        ]);

        setStats({
          blogPosts: blogCount.count || 0,
          portfolioItems: portfolioCount.count || 0,
          activeServices: servicesCount.count || 0,
        });

        setRecentActivity(activityData.data || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Dashboard</h1>
        <p className="text-[#7f8c8d] mt-2">Welcome to your admin panel</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
