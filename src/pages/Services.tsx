import { Camera, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const tiers = [
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: 'Visibility Tier',
      description: 'Get found by your ideal customers with professional photography and SEO optimization.',
      outcomes: [
        '2-3x increase in online visibility',
        'Professional brand presence',
        'Foundation for growth'
      ],
      link: '/services/visibility',
      cta: 'Learn More'
    },
    {
      icon: <Camera className="w-12 h-12 text-accent" />,
      title: 'Professional Tier',
      badge: 'MOST POPULAR',
      description: 'Turn website traffic into paying customers with advanced photography, design, and conversion optimization.',
      outcomes: [
        '3x more qualified leads monthly',
        '50%+ conversion rate increase',
        '+$50K-$100K monthly revenue'
      ],
      link: '/services/professional',
      cta: 'View Details',
      featured: true
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-success" />,
      title: 'Enterprise Tier',
      description: 'Complete business transformation with dedicated team, video content, and full-service marketing.',
      outcomes: [
        '3-5x revenue growth in 12 months',
        'Market leader positioning',
        'Scalable systems that run themselves'
      ],
      link: '/services/enterprise',
      cta: 'Explore Enterprise'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Our Service Tiers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Choose the tier that matches your growth goals. Every tier is outcome-focused and customized to your business.
              </p>
              <div className="mt-8">
                <Link to="/custom-pricing">
                  <Button variant="outline" size="lg">
                    Learn About Our Pricing Philosophy
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier, index) => (
                <Card 
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 ${
                    tier.featured ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    {tier.badge && (
                      <div className="mb-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          {tier.badge}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {tier.icon}
                    </div>
                    <CardTitle className="text-2xl mb-3">{tier.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Key Outcomes:</h3>
                      <ul className="space-y-2">
                        {tier.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to={tier.link} className="block">
                      <Button 
                        variant={tier.featured ? "default" : "outline"}
                        size="lg" 
                        className="w-full group-hover:shadow-md transition-shadow"
                      >
                        {tier.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Card className="max-w-2xl mx-auto bg-secondary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Not Sure Which Tier Is Right?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Let's have a conversation about your business goals and find the perfect fit.
                  </p>
                  <Button size="lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get Custom Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
