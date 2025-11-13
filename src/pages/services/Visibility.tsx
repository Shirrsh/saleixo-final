import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Visibility = () => {
  const features = [
    'Professional product photography (20-30 images)',
    'Website optimization for search engines',
    'Social media asset creation',
    'Basic brand positioning',
    'Initial consultation included',
    '1 revision round',
    'Email support included'
  ];

  const outcomes = [
    '2-3x increase in online visibility',
    'Customers actually find you when searching',
    'Professional brand presence established',
    'Ready for growth',
    'Foundation for future expansion'
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Get Found By Your Ideal Customers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                More visibility = More customers finding you
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">What You Get</h2>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-lg text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Your Results After This Tier</h2>
                  <ul className="space-y-4">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-lg text-foreground font-medium">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Who This Is For</h2>
                  <p className="text-lg text-muted-foreground">
                    E-commerce brands just going online or wanting to establish their presence online for the first time.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" className="text-lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/services/professional">
                  <Button variant="outline" size="lg" className="text-lg w-full">
                    Learn About Professional Tier
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Visibility;
