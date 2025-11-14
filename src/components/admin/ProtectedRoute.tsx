import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          // Add a timeout promise to prevent infinite loading
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Query timeout after 5 seconds')), 5000)
          );
          
          const queryPromise = supabase
            .from("admin_users")
            .select("role")
            .eq("id", user.id)
            .single();

          const { data: profile, error } = await Promise.race([
            queryPromise,
            timeoutPromise
          ]);

          console.log('Admin check result:', { profile, error, role: profile?.role });

          if (error) {
            console.error('Error checking admin role:', error);
            setIsAdmin(false);
            setCheckingAdmin(false);
            return;
          }

          setIsAdmin(profile?.role === "admin");
          setCheckingAdmin(false);
        } catch (err) {
          console.error('Timeout or unexpected error:', err);
          // On timeout or error, assume not admin and redirect to login
          setIsAdmin(false);
          setCheckingAdmin(false);
        }
      } else if (!loading) {
        // Only set isAdmin to false when we're done loading AND there's no user
        setIsAdmin(false);
        setCheckingAdmin(false);
      }
    };        
        
                setIsAdmin(profile?.role === "admin");
        setCheckingAdmin(false);
      } else if (!loading) {
        // Only set isAdmin to false when we're done loading AND there's no user
        setIsAdmin(false);
        setCheckingAdmin(false);
      }
    };
    checkAdmin();
  }, [user, loading]);

  // Show loading state while checking authentication
  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
