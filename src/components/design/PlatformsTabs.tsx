import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Zap } from 'lucide-react';

const domestic = [
  { name: 'Amazon India', services: ['A+ Content', 'FBA Setup', 'Sponsored Ads', 'Brand Registry'] },
  { name: 'Flipkart', services: ['Catalog Mgmt', 'Flipkart Ads', 'Brand Store', 'Pricing Strategy'] },
  { name: 'Myntra', services: ['Brand Onboarding', 'Catalog Upload', 'Campaign Mgmt', 'Returns Mgmt'] },
  { name: 'AJIO', services: ['Seller Onboarding', 'Catalog Optimization', 'Promotions', 'Inventory Sync'] },
  { name: 'Meesho', services: ['Supplier Dashboard', 'Catalog Upload', 'Pricing', 'Returns Mgmt'] },
  { name: 'JioMart', services: ['Seller Registration', 'Catalog Mgmt', 'Promotions', 'Fulfillment'] },
  { name: 'Tata CLiQ', services: ['Brand Listing', 'Content Creation', 'Ad Campaigns', 'Analytics'] },
  { name: 'Nykaa', services: ['Brand Store', 'Product Listing', 'Ad Campaigns', 'Review Mgmt'] },
  { name: 'FirstCry', services: ['Vendor Onboarding', 'Catalog Setup', 'Pricing', 'Promotions'] },
  { name: 'GlowRoad', services: ['Reseller Network', 'Catalog Upload', 'Pricing', 'Logistics'] },
];

const global = [
  { name: 'Amazon Global', services: ['US/UK/UAE Expansion', 'FBA International', 'Global Ads', 'Compliance'] },
  { name: 'eBay', services: ['Listing Templates', 'Promoted Listings', 'Store Design', 'Global Shipping'] },
  { name: 'Walmart', services: ['WFS Setup', 'Listing Quality', 'Sponsored Search', 'Catalog Sync'] },
  { name: 'Etsy', services: ['Shop Optimization', 'SEO Tags', 'Photography', 'Ad Campaigns'] },
  { name: 'Shopify', services: ['Store Design', 'App Integrations', 'Checkout Optimization', 'SEO'] },
  { name: 'WooCommerce', services: ['Plugin Setup', 'Payment Gateways', 'Theme Customization', 'SEO'] },
  { name: 'Lazada', services: ['Seller Center', 'Product Listing', 'Promotions', 'Logistics'] },
  { name: 'Alibaba', services: ['Storefront Setup', 'RFQ Management', 'Trade Assurance', 'Keywords'] },
  { name: 'Shopee', services: ['Shop Setup', 'Product Listing', 'Shopee Ads', 'Vouchers'] },
  { name: 'Shein', services: ['Product Onboarding', 'Image Guidelines', 'Category Mapping', 'Trends'] },
];

const quickCommerce = [
  { name: 'Blinkit', services: ['Vendor Onboarding', 'Catalog Setup', 'Pricing Strategy', 'Stock Mgmt'] },
  { name: 'Zepto', services: ['Seller Registration', 'Product Listing', 'Promotions', 'Inventory'] },
  { name: 'Swiggy Instamart', services: ['Onboarding', 'Catalog Upload', 'Pricing', 'Availability Mgmt'] },
];

type Platform = { name: string; services: string[] };

const PlatformGrid = ({ items }: { items: Platform[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((p, i) => (
      <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-base">{p.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {p.services.map((s, j) => (
              <span key={j} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                <Zap className="w-3 h-3" /> {s}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const PlatformsTabs = () => (
  <section className="py-20 px-4 bg-muted/30">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Platforms We Master</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          25+ marketplaces across domestic, international & quick commerce — each with tailored strategies.
        </p>
      </div>
      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="domestic">Domestic</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="quick">Quick Commerce</TabsTrigger>
        </TabsList>
        <TabsContent value="domestic"><PlatformGrid items={domestic} /></TabsContent>
        <TabsContent value="global"><PlatformGrid items={global} /></TabsContent>
        <TabsContent value="quick"><PlatformGrid items={quickCommerce} /></TabsContent>
      </Tabs>
    </div>
  </section>
);

export default PlatformsTabs;
