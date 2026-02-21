import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart, Globe, Zap, Monitor, BarChart3,
  Store, Camera, Film, Palette
} from 'lucide-react';

const services = [
  { icon: ShoppingCart, title: 'E-Commerce Account Management', desc: 'End-to-end seller account management on Amazon, Flipkart & more for sustained sales growth.' },
  { icon: Globe, title: 'Global Seller Management', desc: 'International expansion across Amazon US/UK/UAE, eBay, Walmart & cross-border marketplaces.' },
  { icon: Zap, title: 'Quick Commerce Onboarding', desc: 'Launch on Blinkit, Zepto & Swiggy Instamart with optimized catalogs and pricing.' },
  { icon: Monitor, title: 'Website Design & Development', desc: 'Custom ecommerce websites on Shopify, WooCommerce & WordPress with conversion-focused UX.' },
  { icon: BarChart3, title: 'Digital Marketing', desc: 'SEO, Google Ads, Meta Ads, social media marketing & lead generation campaigns.' },
  { icon: Store, title: 'Shopify Store Management', desc: 'Complete Shopify setup, theme customization, app integrations & checkout optimization.' },
  { icon: Camera, title: 'Product Photography', desc: 'Studio-grade catalog, lifestyle & 360° product photography that converts browsers to buyers.' },
  { icon: Film, title: 'Video Editing & Reels', desc: 'Product videos, brand reels, unboxing content & short-form video for social & listings.' },
  { icon: Palette, title: 'Branding & Packaging', desc: 'Complete brand identity — logo design, packaging, brand guidelines & marketing collateral.' },
];

const CoreServices = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to launch, grow & scale your ecommerce business — under one roof.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default CoreServices;
