import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyAlvaio from '@/components/WhyAlvaio';
import Packages from '@/components/Packages';
import Portfolio from '@/components/Portfolio';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyAlvaio />
        <Portfolio />
        <HowItWorks />
        <Packages />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;