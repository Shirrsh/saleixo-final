import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Megaphone, Globe } from 'lucide-react';

const steps = [
  { icon: TrendingUp, num: '01', title: 'Sales Plan', desc: 'We audit your catalog, analyze competition & build a data-driven sales plan with realistic revenue targets and timelines.' },
  { icon: Megaphone, num: '02', title: 'Marketing Strategy', desc: 'PPC campaigns, social media ads, influencer collaborations & deal strategies tailored to each platform\'s algorithm.' },
  { icon: Globe, num: '03', title: 'Marketplace Expansion', desc: 'Once your core platforms are profitable, we expand to new domestic & international marketplaces for maximum reach.' },
];

const StrategySection = () => (
  <section className="py-20 px-4 bg-muted/30">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Strategy</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A proven 3-phase approach to take your products from zero to profitable at scale.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <Card key={i} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="absolute top-4 right-4 text-6xl font-black text-primary/5">{s.num}</div>
            <CardHeader className="items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm text-center">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default StrategySection;
