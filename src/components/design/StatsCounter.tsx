import { useRef, useState, useEffect } from 'react';
import { Users, Megaphone, IndianRupee, Clock } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Happy Clients' },
  { icon: Megaphone, value: 1000, suffix: '+', label: 'Campaigns Run' },
  { icon: IndianRupee, value: 10, suffix: ' Cr+', label: 'Revenue Generated' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years Experience' },
];

const StatItem = ({ icon: Icon, value, suffix, label, animate }: {
  icon: typeof Users; value: number; suffix: string; label: string; animate: boolean;
}) => {
  const count = useAnimatedCounter(value, 2000, animate);
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <Icon className="w-8 h-8 text-primary" />
      <span className="text-3xl md:text-4xl font-bold text-foreground">
        {count}{suffix}
      </span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
      <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatItem key={i} {...s} animate={visible} />
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
