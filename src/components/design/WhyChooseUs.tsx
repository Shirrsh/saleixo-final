import { Card, CardContent } from '@/components/ui/card';
import {
  Users, TrendingUp, Award, UserCheck,
  Target, Clock, MessageCircle, Headphones
} from 'lucide-react';

const reasons = [
  { icon: Users, title: '500+ Clients', desc: 'Trusted by brands across India & globally' },
  { icon: TrendingUp, title: '91% Client Retention', desc: 'Clients stay because we deliver results' },
  { icon: Award, title: 'Amazon SPN Partner', desc: 'Certified Amazon Service Provider Network' },
  { icon: UserCheck, title: 'Expert Managers', desc: 'Category-specific marketplace specialists' },
  { icon: Target, title: 'Sales-First Focus', desc: 'Every strategy is tied to revenue growth' },
  { icon: Clock, title: '15+ Years Experience', desc: 'Deep ecommerce & digital marketing expertise' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Real-time communication, no ticket queues' },
  { icon: Headphones, title: 'Dedicated Manager', desc: 'Single point of contact for your account' },
];

const WhyChooseUs = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          What sets us apart from other ecommerce service providers.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {reasons.map((r, i) => (
          <Card key={i} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-sm md:text-base mb-1">{r.title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
