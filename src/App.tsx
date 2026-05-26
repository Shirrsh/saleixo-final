import { lazy, Suspense, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CookieBanner from "@/components/CookieBanner";
import { CurrencyProvider } from "@/context/CurrencyContext";

// ── Lazy-loaded public pages ──────────────────────────────────────────────────
const Privacy            = lazy(() => import('./pages/Privacy'));
const Terms              = lazy(() => import('./pages/Terms'));
const Cookies            = lazy(() => import('./pages/Cookies'));
const Refund             = lazy(() => import('./pages/Refund'));
const GetStarted         = lazy(() => import('./pages/GetStarted'));
const Contact            = lazy(() => import('./pages/Contact'));
const About              = lazy(() => import('./pages/About'));
const Blog               = lazy(() => import('./pages/Blog'));
const Categories         = lazy(() => import('./pages/Categories'));
const Design             = lazy(() => import('./pages/Design'));
const Services           = lazy(() => import('./pages/Services'));
const CustomPricing      = lazy(() => import('./pages/CustomPricing'));

// ── Lazy-loaded service sub-pages ─────────────────────────────────────────────
const Visibility          = lazy(() => import('./pages/services/Visibility'));
const Professional        = lazy(() => import('./pages/services/Professional'));
const Enterprise          = lazy(() => import('./pages/services/Enterprise'));
const Photography         = lazy(() => import('./pages/services/Photography'));
const Amazon              = lazy(() => import('./pages/services/Amazon'));
const Shopify             = lazy(() => import('./pages/services/Shopify'));
const SocialAds           = lazy(() => import('./pages/services/SocialAds'));
const EcommerceManagement = lazy(() => import('./pages/services/EcommerceManagement'));

// ── Lazy-loaded admin pages ───────────────────────────────────────────────────
const AdminLogin       = lazy(() => import('./pages/admin/Login'));
const AdminLayout      = lazy(() => import('@/components/admin/AdminLayout'));
const AdminDashboard   = lazy(() => import('./pages/admin/Dashboard'));
const AdminHomepage    = lazy(() => import('./pages/admin/Homepage'));
const AdminServices    = lazy(() => import('./pages/admin/Services'));
const AdminPortfolio   = lazy(() => import('./pages/admin/Portfolio'));
const AdminBlog        = lazy(() => import('./pages/admin/Blog'));
const AdminTestimonials= lazy(() => import('./pages/admin/Testimonials'));
const AdminFAQ         = lazy(() => import('./pages/admin/FAQ'));
const AdminTeam        = lazy(() => import('./pages/admin/Team'));
const AdminLeads       = lazy(() => import('./pages/admin/Leads'));
const AdminAnalytics   = lazy(() => import('./pages/admin/Analytics'));
const AdminSettings    = lazy(() => import('./pages/admin/Settings'));
const AdminImages      = lazy(() => import('./pages/admin/Images'));
const AdminVideos      = lazy(() => import('./pages/admin/Videos'));
const AdminCategories  = lazy(() => import('./pages/admin/Categories'));

const queryClient = new QueryClient();

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTopOnNavigate />
        <Suspense fallback={null}>
          <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/design" element={<Design />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/visibility" element={<Visibility />} />
              <Route path="/services/professional" element={<Professional />} />
              <Route path="/services/enterprise" element={<Enterprise />} />
              <Route path="/services/photography" element={<Photography />} />
              <Route path="/services/amazon" element={<Amazon />} />
              <Route path="/services/shopify" element={<Shopify />} />
              <Route path="/services/social-ads" element={<SocialAds />} />
              <Route path="/services/ecommerce-management" element={<EcommerceManagement />} />
              <Route path="/custom-pricing" element={<CustomPricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/contact" element={<Contact />} />

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
                <Route path="images" element={<AdminImages />} />
                <Route path="videos" element={<AdminVideos />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <CookieBanner />
      <Analytics />
    </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
