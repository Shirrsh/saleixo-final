import { TrendingUp, Eye, BarChart3, Target } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, value: '+250%', label: 'Lead Volume Growth' },
  { icon: BarChart3, value: '+122%', label: 'Organic Traffic Growth' },
  { icon: Eye, value: '70%', label: 'Brand Visibility Increase' },
  { icon: Target, value: '50%', label: 'Better ROAS' },
];

const SocialMediaMarketing = () => (
  <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital Marketing That Delivers</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our performance marketing campaigns consistently beat industry benchmarks.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
            <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl md:text-4xl font-black text-primary mb-1">{m.value}</div>
            <div className="text-sm text-muted-foreground font-medium">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialMediaMarketing;
