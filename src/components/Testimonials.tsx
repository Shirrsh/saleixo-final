import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Martinez",
      business: "Martinez Pottery Studio",
      text: "Alvaio transformed my pottery business completely. The professional photos and e-commerce setup helped me increase sales by 300% in just 3 months. The QR code system is genius!",
      rating: 5
    },
    {
      name: "David Chen", 
      business: "Handcrafted Wood Co.",
      text: "The team's attention to detail is incredible. They understood my vision and created a beautiful online presence that truly represents my craftsmanship. Highly recommend!",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      business: "Artisan Textiles",
      text: "From zero online presence to a thriving e-commerce store in just two weeks. The marketing support and QR code integration have been game-changers for my textile business.",
      rating: 5
    },
    {
      name: "Maya Patel",
      business: "Golden Threads Jewelry",
      text: "The product photography made my handmade jewelry look absolutely stunning. Sales doubled within the first month, and customers constantly compliment the professional presentation.",
      rating: 5
    },
    {
      name: "James O'Connor",
      business: "Artisan Roasters Coffee",
      text: "Their e-commerce solution and branding work elevated my specialty coffee business. The seamless ordering system and beautiful packaging designs have customers coming back for more.",
      rating: 4
    },
    {
      name: "Sophia Kim",
      business: "Natural Glow Skincare",
      text: "The complete package - stunning product photos, user-friendly website, and smart marketing. My natural skincare line reached customers I never thought possible. Worth every penny!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Don't just take our word for it - hear from artisans who've transformed their businesses with Alvaio
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-border hover:shadow-xl transition-all duration-500 hover-lift group h-full bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 transition-all ${
                              i < testimonial.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'fill-muted text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="border-t border-border pt-4">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;