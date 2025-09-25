import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Don't just take our word for it - hear from artisans who've transformed their businesses with Alvaio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`border-border hover:shadow-lg transition-all duration-500 hover-lift animate-scale-in animate-delay-${(index + 2) * 100} group`}>
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 fill-current text-accent hover-scale animate-fade-in animate-delay-${(index * 100) + (i * 50)}`} />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className={`text-foreground mb-6 leading-relaxed animate-fade-in animate-delay-${(index + 3) * 100}`}>
                  "{testimonial.text}"
                </blockquote>
                
                {/* Author */}
                <div className={`border-t border-border pt-4 animate-slide-in-left animate-delay-${(index + 4) * 100}`}>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;