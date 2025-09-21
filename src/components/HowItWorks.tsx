import { Camera, Settings, Rocket, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <Camera className="w-8 h-8" />,
      title: "Product Photography",
      description: "We photograph your products with professional equipment and lighting to create stunning, sales-ready images."
    },
    {
      number: "02", 
      icon: <Settings className="w-8 h-8" />,
      title: "E-commerce Setup",
      description: "Complete online store setup with payment processing, inventory management, and customer support systems."
    },
    {
      number: "03",
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch & QR Codes", 
      description: "Launch your online presence with custom QR codes that connect your physical products to your digital store."
    },
    {
      number: "04",
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth & Marketing",
      description: "Ongoing marketing support and analytics to help you grow your customer base and increase sales."
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our proven 4-step process to transform your craft into a thriving online business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>
                
                {/* Icon Container */}
                <div className="w-20 h-20 mx-auto bg-background border-2 border-border rounded-full flex items-center justify-center text-primary group-hover:border-primary transition-all duration-300">
                  {step.icon}
                </div>
                
                {/* Connection Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -z-10"></div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;