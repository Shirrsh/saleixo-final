import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Import category images
import jewelryNecklace from '@/assets/categories/jewelry-necklace.jpg';
import jewelryEarrings from '@/assets/categories/jewelry-earrings.jpg';
import incensePackaging from '@/assets/categories/incense-packaging.jpg';
import spiritualProducts from '@/assets/categories/spiritual-products.jpg';
import rudrakshaB from '@/assets/categories/rudraksha-bracelet.jpg';
import aquamarineB from '@/assets/categories/aquamarine-bracelet.jpg';

const Categories = () => {
  useEffect(() => {
    document.title = 'Photography Categories | Visual Phactory - Professional Product Photography';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our specialized photography categories: Jewelry, Spiritual & Wellness Products, Fashion Accessories, and Lifestyle Photography. Professional product photography with decades of experience.');
    }
  }, []);

  const categories = [
    {
      id: 1,
      title: 'Jewelry Photography',
      description: 'Exquisite gold, silver, and gemstone jewelry captured with precision and elegance. We showcase the brilliance, craftsmanship, and intricate details of your precious pieces.',
      image: jewelryNecklace,
      alt: 'Ornate gold necklace jewelry photography showcasing intricate craftsmanship',
    },
    {
      id: 2,
      title: 'Pearl & Fine Jewelry',
      description: 'Stunning pearl earrings and fine jewelry photography that highlights luster, texture, and sophistication. Perfect for luxury brands and boutique collections.',
      image: jewelryEarrings,
      alt: 'Elegant pearl drop earrings on white background professional jewelry photography',
    },
    {
      id: 3,
      title: 'Spiritual & Wellness Products',
      description: 'Sacred incense, spiritual artifacts, and wellness products photographed with reverence and authenticity. We capture the essence and cultural significance of each item.',
      image: spiritualProducts,
      alt: 'Spiritual wellness products and incense sticks product photography',
    },
    {
      id: 4,
      title: 'Premium Incense & Packaging',
      description: 'Packaging and product photography for premium incense brands. We highlight the heritage, quality, and visual appeal of your spiritual product lines.',
      image: incensePackaging,
      alt: 'Premium incense stick packaging photography with traditional design',
    },
    {
      id: 5,
      title: 'Fashion Accessories - Rudraksha',
      description: 'Sacred rudraksha beads and bracelets captured with respect for tradition and style. Perfect for spiritual jewelry and fashion accessory brands.',
      image: rudrakshaB,
      alt: 'Rudraksha bead bracelet fashion accessory photography',
    },
    {
      id: 6,
      title: 'Gemstone Accessories',
      description: 'Natural gemstone bracelets and accessories photographed to highlight their unique colors, textures, and healing properties. Ideal for lifestyle and wellness brands.',
      image: aquamarineB,
      alt: 'Aquamarine gemstone bracelet lifestyle photography',
    },
  ];

  const [heroRef, heroInView] = useIntersectionObserver();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5"
        >
          <div className="container mx-auto max-w-7xl">
            <div className={`text-center space-y-6 ${heroInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Photography Categories
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialized product photography services tailored to showcase your products in the best light. 
                With over two decades of experience, we bring perfection to every shot.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const [ref, inView] = useIntersectionObserver();
                
                return (
                  <div
                    key={category.id}
                    ref={ref}
                    className={`${inView ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="group overflow-hidden hover-lift border-border/50 bg-card/50 backdrop-blur-sm h-full">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={category.image}
                          alt={category.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                            }}
                          >
                            Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Ready to Showcase Your Products?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let our team of experienced photographers, editors, and stylists bring your products to life with stunning visuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book a Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => {
                  window.location.href = 'tel:+917011441159';
                }}
              >
                Call Us: +91 701 144 1159
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Categories;
