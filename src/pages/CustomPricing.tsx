import { Check, MessageSquare, Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CustomPricing = () => {
  const factors = [
    'Your growth goals (50% growth ≠ 200% growth)',
    'Your current revenue (startup ≠ enterprise)',
    'Your market competition (luxury ≠ commodity)',
    'Your timeline (ASAP ≠ 6 months from now)',
    'Your scope (photography only ≠ full transformation)',
    'Your industry specifics (fashion ≠ manufacturing)'
  ];

  const investmentRanges = [
    {
      title: 'Professional Photography Services',
      range: 'Starting from $1,000 to $10,000+',
      factors: 'Volume of products, number of locations, editing depth, timeline'
    },
    {
      title: 'Website Design & E-commerce',
      range: 'Starting from $5,000 to $30,000+',
      factors: 'Complexity, custom features, integrations, customization level'
    },
    {
      title: 'Digital Marketing Services',
      range: 'Starting from $2,000 to $20,000/month',
      factors: 'Number of channels, scale of campaigns, competition level, business goals'
    },
    {
      title: 'Complete Transformation Package',
      range: 'Starting from $25,000 to $100,000+',
      factors: 'Everything above + dedicated support level + timeline'
    }
  ];

  const pricingBased = [
    'Your business impact',
    'Your growth potential',
    'Your market position',
    'Your competitive advantage'
  ];

  const notBasedOn = [
    'How many hours we work',
    'Our operating costs',
    'Industry averages',
    'What competitors charge'
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center">
                Custom Pricing - Built For Your Business
              </h1>

              <div className="space-y-12 mt-16">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Why We Don't Show Fixed Prices</h2>
                    <div className="space-y-4 text-lg text-muted-foreground">
                      <p>Your business is unique.</p>
                      <p>Your photography needs are unique.</p>
                      <p>Your marketing goals are specific to YOUR market.</p>
                      <p>Your timeline is your own.</p>
                      <p>Your budget constraints are individual.</p>
                      <p className="font-semibold text-foreground pt-4">So why would your pricing be generic?</p>
                      <p>At Salixo, we don't believe in one-size-fits-all pricing. We believe in custom solutions that match YOUR specific situation.</p>
                      <p>That's why we take time to understand your business before we quote a price.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6">What Affects Your Pricing</h2>
                    <ul className="space-y-4">
                      {factors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                          <span className="text-lg text-foreground">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/20">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Typical Investment Ranges</h2>
                    <div className="space-y-6">
                      {investmentRanges.map((item, index) => (
                        <div key={index} className="border-l-4 border-primary pl-6">
                          <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                          <p className="text-lg font-semibold text-primary mb-2">{item.range}</p>
                          <p className="text-base text-muted-foreground">
                            <strong>Depends on:</strong> {item.factors}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6 text-center">The Real Question</h2>
                    <div className="space-y-6 text-center">
                      <p className="text-xl text-muted-foreground">
                        The real question isn't <span className="line-through">"How much does it cost?"</span>
                      </p>
                      <p className="text-2xl font-bold text-foreground">The real question is:</p>
                      <p className="text-3xl font-bold text-primary">
                        "What's the ROI worth to YOUR business?"
                      </p>
                      <div className="pt-6 space-y-4 text-lg text-muted-foreground">
                        <p>A $10,000 investment that generates $100,000 in new revenue is a bargain.</p>
                        <p>A $5,000 investment that generates nothing is a waste.</p>
                        <p className="font-semibold text-foreground pt-4">
                          We price based on the value we create, not the hours we work.
                        </p>
                        <p className="font-semibold text-foreground">
                          That's why results matter more than cost.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Our Pricing Philosophy</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">We charge based on:</h3>
                        <ul className="space-y-3">
                          {pricingBased.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">NOT based on:</h3>
                        <ul className="space-y-3">
                          {notBasedOn.map((item, index) => (
                            <li key={index} className="flex items-start text-muted-foreground">
                              <span className="mr-3">✗</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">The Next Step</h2>
                    <p className="text-xl text-center text-muted-foreground mb-8">
                      Interested in learning if we're a fit? Let's have a conversation.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      <Button size="lg" className="h-auto py-4" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        <MessageSquare className="mr-2 w-5 h-5" />
                        Chat With Specialist
                      </Button>
                      <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => window.location.href = 'mailto:contact@salixo.com'}>
                        <Mail className="mr-2 w-5 h-5" />
                        Email Your Project
                      </Button>
                      <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Calendar className="mr-2 w-5 h-5" />
                        Book Strategy Call
                      </Button>
                      <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => window.location.href = 'tel:+918638887790'}>
                        <Phone className="mr-2 w-5 h-5" />
                        Schedule Phone Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CustomPricing;
