import { Camera, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: <Camera className="w-12 h-12 text-primary" />,
      title: "Product Photography",
      description: "Professional product photos that showcase your crafts in the best light. High-quality images optimized for online sales and social media.",
      features: [
        "Studio-quality lighting setup",
        "Multiple angles and lifestyle shots", 
        "Image editing and enhancement",
        "Web-optimized file formats"
      ]
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-accent" />,
      title: "E-commerce Onboarding", 
      description: "Complete setup of your online store with integrated payment systems, inventory management, and customer support tools.",
      features: [
        "Platform setup (Shopify, Etsy, etc.)",
        "Payment gateway integration",
        "Inventory management system",
        "Customer support automation"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-success" />,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to grow your online presence and reach more customers who appreciate handcrafted quality.",
      features: [
        "Social media strategy",
        "Content calendar creation",
        "SEO optimization",
        "Performance analytics"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your craft into a successful online business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;