import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  client_name: string | null;
  quote: string;
  rating: number | null;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback testimonials
  const fallbackTestimonials: Testimonial[] = [
    {
      id: '1',
      client_name: "Sarah Martinez - Martinez Pottery Studio",
      quote: "Alvaio transformed my pottery business completely. The professional photos and e-commerce setup helped me increase sales by 300% in just 3 months.",
      rating: 5
    },
    {
      id: '2',
      client_name: "David Chen - Handcrafted Wood Co.",
      quote: "The team's attention to detail is incredible. They understood my vision and created a beautiful online presence that truly represents my craftsmanship.",
      rating: 5
    },
    {
      id: '3',
      client_name: "Elena Rodriguez - Artisan Textiles",
      quote: "From zero online presence to a thriving e-commerce store in just two weeks. The marketing support has been a game-changer for my textile business.",
      rating: 5
    },
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('id, client_name, quote, rating')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

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
              {displayTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-border hover:shadow-xl transition-all duration-500 hover-lift group h-full bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 transition-all ${
                              i < (testimonial.rating || 5) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'fill-muted text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="border-t border-border pt-4">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {testimonial.client_name || 'Happy Client'}
                        </div>
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