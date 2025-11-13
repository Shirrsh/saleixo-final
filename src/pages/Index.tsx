import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyAlvaio from '@/components/WhyAlvaio';
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

const Index = () => {
  return (
    <>
      <LoadingScreen />
      
      <ScrollProgress />
      <ThemeToggle />
      
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyAlvaio />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Index;