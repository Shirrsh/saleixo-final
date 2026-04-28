import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MarketplaceLogos from '@/components/MarketplaceLogos';
import FeaturedServices from '@/components/FeaturedServices';
import WhySaleixo from '@/components/WhySaleixo';
import Portfolio from '@/components/Portfolio';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import ThemeToggle from '@/components/ThemeToggle';
import LoadingScreen from '@/components/LoadingScreen';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingCTA from '@/components/FloatingCTA';

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ThemeToggle />
      
      {/* No frame wrapper — clean full-width layout */}
      <Header />
      <main>
        <Hero />
        <MarketplaceLogos />
        <FeaturedServices />
        <WhySaleixo />
        <Portfolio />
      </main>

      {/* HowItWorks — outside overflow-hidden so sticky scroll works */}
      <HowItWorks />

      {/* Bottom sections — no frame */}
      <main>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      <ScrollToTop />
      <WhatsAppButton />
      <FloatingCTA />
    </>
  );
};

export default Index;
