import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ThemeToggle from '@/components/ThemeToggle';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Globe, Phone, Users, Camera, Search,
  BarChart3, Megaphone, Target, Headphones, Shield,
  CheckCircle2, TrendingUp, Film, UserCheck, Palette,
  Store, Star, ArrowRight
} from 'lucide-react';


import CoreServices from '@/components/design/CoreServices';
import StrategySection from '@/components/design/StrategySection';
import WhyChooseUs from '@/components/design/WhyChooseUs';
import SocialMediaMarketing from '@/components/design/SocialMediaMarketing';
import FreeAuditCTA from '@/components/design/FreeAuditCTA';
import PlatformsTabs from '@/components/design/PlatformsTabs';

const processSteps = [
  {
    icon: Phone,
    title: 'Onboarding Call',
    bullets: ['Understand your products & brand vision', 'Market research & competitor analysis', 'Define target platforms & pricing strategy'],
  },
  {
    icon: Camera,
    title: 'Product Photography',
    bullets: ['Studio-grade catalog shots', 'Lifestyle & contextual imagery', 'Short-form video content for listings'],
  },
  {
    icon: Search,
    title: 'Listing Creation & Optimization',
    bullets: ['SEO-optimized titles & descriptions', 'A+ / A++ content for Amazon & Flipkart', 'Backend keyword optimization'],
  },
  {
    icon: Store,
    title: 'Store Setup & Launch',
    bullets: ['Multi-platform account setup', 'Brand storefront design', 'Payment & shipping configuration'],
  },
  {
    icon: Megaphone,
    title: 'Marketing & Ads',
    bullets: ['PPC campaign management', 'Social media promotions', 'Deal & coupon strategy'],
  },
  {
    icon: BarChart3,
    title: 'Growth & Reporting',
    bullets: ['Weekly sales analytics dashboard', 'Inventory & pricing optimization', 'Ongoing listing improvements'],
  },
];

const teamRoles = [
  { icon: Camera, title: 'Product Photographers', desc: 'Studio-grade product & lifestyle photography that sells.' },
  { icon: Film, title: 'Photo & Video Editors', desc: 'Professional retouching, infographics & short-form video.' },
  { icon: Search, title: 'Listing & SEO Specialists', desc: 'Keyword research, A+ content & conversion-focused copy.' },
  { icon: Target, title: 'PPC & Marketing Managers', desc: 'Ad campaigns, social media & promotional strategy.' },
  { icon: Palette, title: 'Brand Designers', desc: 'Logos, packaging, storefronts & marketing collateral.' },
  { icon: UserCheck, title: 'Dedicated Account Managers', desc: 'Single point of contact for seamless communication.' },
];

const resultsColumns = [
  {
    icon: TrendingUp,
    title: 'Sales Growth',
    points: ['Optimized, conversion-ready listings', 'Targeted PPC ad campaigns', 'Dynamic pricing strategy', 'Cross-platform sales channels'],
  },
  {
    icon: Globe,
    title: 'Brand Visibility',
    points: ['Professional brand storefronts', 'A+ / Enhanced brand content', 'Social-proof & review strategy', 'Multi-marketplace presence'],
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    points: ['Weekly performance reports', 'Direct WhatsApp access', 'Dedicated account manager', 'Continuous listing improvements'],
  },
];

const Design = () => {
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <ThemeToggle />
      <Header />

      <main className="min-h-screen bg-background">
        {/* ───── HERO ───── */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background -z-10" />
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">25+ Marketplaces · 7 Countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Products. Our Expertise. Global Sales.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              End-to-end ecommerce management — from product photography to marketplace ads — so you can focus on your craft while we drive revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToContact} className="hover-scale">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
                See Our Process
              </Button>
            </div>
          </div>
        </section>

        {/* ───── CORE SERVICES ───── */}
        <CoreServices />

        {/* ───── HOW IT WORKS ───── */}
        <section id="process" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A transparent 6-step process — you'll know exactly what's happening at every stage.
              </p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div className="space-y-12 md:space-y-16">
                {processSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className="relative md:flex md:items-start md:gap-8">
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center text-primary-foreground font-bold text-lg shadow-lg z-10">
                        {i + 1}
                      </div>
                      <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardHeader className="flex flex-row items-center gap-4 md:hidden">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shrink-0">
                              {i + 1}
                            </div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                          </CardHeader>
                          <CardHeader className="hidden md:block">
                            <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 ${isLeft ? 'ml-auto' : ''}`}>
                              <step.icon className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                              {step.bullets.map((b, j) => (
                                <li key={j} className={`flex items-start gap-2 text-muted-foreground text-sm ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───── STRATEGY ───── */}
        <StrategySection />

        {/* ───── EXPERT TEAM ───── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expert Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every client gets a dedicated team of specialists — not a single freelancer.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamRoles.map((role, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  <CardHeader className="items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <role.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{role.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-center gap-3 text-primary font-semibold">
              <Users className="w-5 h-5" />
              <span>Dedicated team assigned from Day 1</span>
            </div>
          </div>
        </section>

        {/* ───── PLATFORMS ───── */}
        <PlatformsTabs />

        {/* ───── WHY CHOOSE US ───── */}
        <WhyChooseUs />

        {/* ───── SOCIAL MEDIA MARKETING ───── */}
        <SocialMediaMarketing />

        {/* ───── WHAT YOU GET ───── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Measurable results backed by a satisfaction guarantee.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {resultsColumns.map((col, i) => (
                <Card key={i} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2">
                      <col.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{col.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {col.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
              {[
                { icon: Shield, label: '100% Satisfaction' },
                { icon: Star, label: 'Unlimited Revisions' },
                { icon: UserCheck, label: 'Dedicated Manager' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 font-semibold text-foreground">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FREE AUDIT CTA ───── */}
        <FreeAuditCTA />

        {/* ───── FINAL CTA ───── */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Sell Globally?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free consultation and let our team build your ecommerce success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToContact} className="hover-scale">
                Book Free Consultation
              </Button>
              <a href="tel:+917011441159">
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" /> Call +91 7011441159
                </Button>
              </a>
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

export default Design;
