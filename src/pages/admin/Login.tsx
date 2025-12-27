import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Shield, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      // Check if user is admin by email (admin_users.id is not the same as auth.uid)
      const checkAdmin = async () => {
        const { data: profile } = await supabase
          .from('admin_users')
          .select('role')
          .eq('email', user.email)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          toast({
            title: 'Access Denied',
            description: 'You are not an admin.',
            variant: 'destructive',
          });
          await supabase.auth.signOut();
        }
      };
      checkAdmin();
    }
  }, [user, authLoading, navigate, toast]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send magic link - admin verification happens after login via useEffect
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send magic link',
        variant: 'destructive',
      });
    } else {
      setMagicLinkSent(true);
      toast({
        title: 'Magic Link Sent!',
        description: 'Check your email for the login link.',
      });
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a3a3a] to-[#0d1f1f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3a3a] to-[#0d1f1f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a3a3a] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2c3e50]">Alvaio Admin</h1>
            <p className="text-[#7f8c8d] mt-2">Sign in to manage your content</p>
          </div>

          {magicLinkSent ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#2c3e50] mb-2">Check Your Email</h2>
              <p className="text-[#7f8c8d] mb-4">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-[#7f8c8d] mb-4">
                Click the link in the email to sign in. The link expires in 1 hour.
              </p>
              <Button
                variant="outline"
                onClick={() => setMagicLinkSent(false)}
                className="mt-4"
              >
                Try a different email
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2c3e50] mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7f8c8d]" />
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="admin@alvaio.com" required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#ecf0f1]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#7f8c8d]">Or continue with</span>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full mt-4" onClick={signInWithGoogle}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
