import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import Blog from "./pages/Blog";
import Categories from "./pages/Categories";
import Design from "./pages/Design";
import Services from "./pages/Services";
import Visibility from "./pages/services/Visibility";
import Professional from "./pages/services/Professional";
import Enterprise from "./pages/services/Enterprise";
import CustomPricing from "./pages/CustomPricing";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHomepage from "./pages/admin/Homepage";
import AdminServices from "./pages/admin/Services";
import AdminPortfolio from "./pages/admin/Portfolio";
import AdminBlog from "./pages/admin/Blog";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminFAQ from "./pages/admin/FAQ";
import AdminTeam from "./pages/admin/Team";
import AdminLeads from "./pages/admin/Leads";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/design" element={<Design />} />
                        <Route path="/blog" element={<Blog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/visibility" element={<Visibility />} />
            <Route path="/services/professional" element={<Professional />} />
            <Route path="/services/enterprise" element={<Enterprise />} />
            <Route path="/custom-pricing" element={<CustomPricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Admin Login - No authentication required */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* TEMP: Admin Routes - Authentication DISABLED for setup */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="homepage" element={<AdminHomepage />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;