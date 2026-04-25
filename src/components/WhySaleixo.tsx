import { CheckCircle, Clock, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useValuePropositions } from '@/hooks/useHomepageContent';

type IconRenderer = () => React.ReactNode;

const iconMap: Record<string, IconRenderer> = {
  CheckCircle: () => <CheckCircle className="w-8 h-8 text-success" />,
  Clock: () => <Clock className="w-8 h-8 text-primary" />,
  Zap: () => <Zap className="w-8 h-8 text-accent" />,
  Users: () => <Users className="w-8 h-8 text-success" />,
};

const defaultIconRenderers = Object.values(iconMap);

const WhySaleixo = () => {
  const { valueProps } = useValuePropositions();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
            Why Saleixo?
          </h2>
          <div className="space-y-4 text-left md:text-center">
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-200 leading-relaxed">
              <strong className="text-foreground">Saleixo</strong> is a team of master photographers, editors & stylists, each bringing over <strong className="text-primary">two decades of specialized expertise</strong> in luxury product photography.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-300 leading-relaxed">
              Our international training from prestigious <strong className="text-accent">Australian universities</strong>, combined with extensive startup consulting experience, positions us as <strong className="text-foreground">India's premier digital photography studio</strong>.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-400 leading-relaxed">
              We've helped establish photography departments for major brands like <strong className="text-success">Pottery Barn, FNP, and Pepperfry</strong>, and continue to set industry standards through our innovative approach and meticulous attention to detail.
            </p>
          </div>
          <p className="text-xl text-accent font-medium mt-8 animate-fade-in animate-delay-500">
            From Lens to Launch – We handle everything: photography, design, and marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {valueProps.map((benefit, index) => {
            const renderIcon = (benefit.icon && iconMap[benefit.icon])
              ? iconMap[benefit.icon]
              : defaultIconRenderers[index % defaultIconRenderers.length];
            return (
            <Card key={benefit.id} className="border-border hover:shadow-lg transition-all duration-500 hover-lift animate-scale-in group" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {renderIcon()}
                  </div>
                  <CardTitle className="text-xl animate-slide-in-right animate-delay-400">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground animate-fade-in animate-delay-500">{benefit.description}</p>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySaleixo;
