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
      
      {/* Cosmic outer frame — top sections */}
      <div className="mx-4 mt-4 lg:mx-8 lg:mt-6">
        <div className="rounded-[2rem] border border-border-glow/40 overflow-hidden bg-surface/20 backdrop-blur-sm">
          <Header />
          <main>
            <Hero />
            <MarketplaceLogos />
            <FeaturedServices />
            <WhySaleixo />
            <Portfolio />
          </main>
        </div>
      </div>

      {/* HowItWorks — outside overflow-hidden so sticky scroll works */}
      <HowItWorks />

      {/* Cosmic outer frame — bottom sections */}
      <div className="mx-4 mb-4 lg:mx-8 lg:mb-6">
        <div className="rounded-[2rem] border border-border-glow/40 overflow-hidden bg-surface/20 backdrop-blur-sm">
          <main>
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      
      <ScrollToTop />
      <WhatsAppButton />
      <FloatingCTA />
    </>
  );
};

export default Index;
