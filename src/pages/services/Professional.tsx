import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Professional = () => {
  const features = [
    'All from Visibility tier, PLUS:',
    'Advanced product photography (50-80 images with lifestyle shots)',
    'Complete website design + conversion optimization',
    'Competitor analysis & strategy',
    'Email capture system setup',
    'Monthly performance reports',
    '2 strategy calls per month (unlimited follow-up)',
    'Unlimited revisions',
    'Phone + email + WhatsApp support',
    '60-day results guarantee'
  ];

  const outcomes = [
    '3x more qualified leads each month',
    'Conversion rate increase: 50%+ (1.5% → 3.8% typical)',
    'Monthly revenue: +$50K-$100K on average',
    'Customer confidence: Builds immediately',
    'Market position: Establishes you as premium choice',
    'Competitive advantage: Leave competitors behind'
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-4 text-base px-4 py-1">
                <Star className="w-4 h-4 mr-2 fill-current" />
                MOST POPULAR
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Turn Website Traffic Into Paying Customers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Most websites convert at 1-2%. We get them to 3-4%. Here's how:
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
                  <h2 className="text-2xl font-bold text-foreground mb-6">Your Results Within 6 Months</h2>
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
                  <h2 className="text-2xl font-bold text-foreground mb-4">Real Example</h2>
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-foreground">Fashion E-commerce Client Results:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Before:</strong> $2M annual revenue, 1.5% conversion</li>
                      <li><strong>After:</strong> $4M annual revenue (6 months), 3.8% conversion</li>
                      <li><strong>Additional revenue:</strong> +$2M annually</li>
                    </ul>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                      "Best investment we made. ROI within 60 days."
                    </blockquote>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Who This Is For</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Growing e-commerce brands that want to scale profitably without heavy spending on ads.
                  </p>
                  <p className="text-base text-muted-foreground">
                    Most clients choose this tier because it's the sweet spot:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>• Not entry-level (doesn't feel cheap)</li>
                    <li>• Not enterprise (doesn't break budget)</li>
                    <li>• Clear ROI (easy to justify spend)</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" className="text-lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/services/visibility">
                  <Button variant="outline" size="lg" className="text-lg w-full">
                    Compare to Visibility Tier
                  </Button>
                </Link>
                <Link to="/services/enterprise">
                  <Button variant="outline" size="lg" className="text-lg w-full">
                    Compare to Enterprise Tier
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

export default Professional;
