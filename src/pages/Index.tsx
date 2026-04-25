import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WaveDivider from '@/components/WaveDivider';
import MarketplaceLogos from '@/components/MarketplaceLogos';
import FeaturedServices from '@/components/FeaturedServices';
import WhySalixo from '@/components/WhyIndistores';
import Portfolio from '@/components/Portfolio';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
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
      
      <Header />
      <main>
        <Hero />
        <div className="bg-secondary/30">
          <WaveDivider />
        </div>
        <MarketplaceLogos />
        <WaveDivider flip />
        <FeaturedServices />
        <WaveDivider />
        <WhySalixo />
        <Portfolio />
        <HowItWorks />
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
