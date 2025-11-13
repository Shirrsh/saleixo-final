import { ArrowRight, Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Enterprise = () => {
  const features = [
    'All from Professional tier, PLUS:',
    'Studio + on-location photography (200+ images)',
    'Video content & lifestyle cinematography',
    'Complete brand strategy & market positioning',
    'Advanced digital marketing setup (all channels)',
    'CRM + automation implementation',
    'Dedicated account manager (yours alone)',
    'Weekly strategy calls',
    'Quarterly business reviews',
    'Priority support (24-hour response)',
    'Unlimited everything: revisions, support, strategy'
  ];

  const outcomes = [
    '3-5x revenue growth within 12 months (typical)',
    'Market leader positioning in your category',
    'Customers see you as the ONLY choice',
    'Scalable systems that run themselves',
    'Team of specialists working just for you',
    'Quarterly strategy adjustment = always improving'
  ];

  const successMetrics = [
    'Revenue multiplied (3-5x typical)',
    'Team expanded (you need more people to handle demand)',
    'Brand recognized (customers seek YOU, not competitors)',
    'Systems in place (runs without CEO involvement)',
    'Valuation increased (10x business value increase common)'
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-4 text-base px-4 py-1 bg-gradient-to-r from-primary to-accent">
                <Crown className="w-4 h-4 mr-2 fill-current" />
                PREMIUM TRANSFORMATION
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Complete Business Transformation - 3x Revenue Growth
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Reserved for brands serious about market domination
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

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Transform Your Business Completely</h2>
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

              <Card className="border-primary">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Guarantee</h2>
                  <p className="text-lg text-muted-foreground">
                    If we don't achieve 3x improvement in qualified leads within 12 months, we'll continue working with you at no additional cost until we do.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Who This Is For</h2>
                  <p className="text-lg text-muted-foreground">
                    Enterprise brands, manufacturers, or premium services that want complete market transformation and have the commitment to match.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">What Success Looks Like</h2>
                  <ul className="space-y-4">
                    {successMetrics.map((metric, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-lg text-foreground">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" className="text-lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Let's Discuss Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/services/professional">
                  <Button variant="outline" size="lg" className="text-lg w-full">
                    Compare to Professional Tier
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

export default Enterprise;
