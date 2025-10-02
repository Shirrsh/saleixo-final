import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyAlvaio from '@/components/WhyAlvaio';
import AIFeatures from '@/components/AIFeatures';
import Packages from '@/components/Packages';
import Portfolio from '@/components/Portfolio';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';
import ThemeToggle from '@/components/ThemeToggle';
import LoadingScreen from '@/components/LoadingScreen';
import CursorFollower from '@/components/CursorFollower';
import AIChatbot from '@/components/AIChatbot';

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <ScrollProgress />
      <ThemeToggle />
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyAlvaio />
        <AIFeatures />
        <Portfolio />
        <HowItWorks />
        <Packages />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <AIChatbot />
    </>
  );
};

export default Index;