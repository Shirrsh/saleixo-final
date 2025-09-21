import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const QRCodePlaceholder = () => (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="mx-auto"
    >
      <rect width="200" height="200" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="30" height="30" fill="black"/>
      <rect x="160" y="10" width="30" height="30" fill="black"/>
      <rect x="10" y="160" width="30" height="30" fill="black"/>
      
      <rect x="50" y="50" width="10" height="10" fill="black"/>
      <rect x="70" y="50" width="10" height="10" fill="black"/>
      <rect x="90" y="50" width="10" height="10" fill="black"/>
      <rect x="110" y="50" width="10" height="10" fill="black"/>
      <rect x="130" y="50" width="10" height="10" fill="black"/>
      <rect x="150" y="50" width="10" height="10" fill="black"/>
      
      <rect x="50" y="70" width="10" height="10" fill="black"/>
      <rect x="90" y="70" width="10" height="10" fill="black"/>
      <rect x="130" y="70" width="10" height="10" fill="black"/>
      
      <rect x="50" y="90" width="10" height="10" fill="black"/>
      <rect x="70" y="90" width="10" height="10" fill="black"/>
      <rect x="110" y="90" width="10" height="10" fill="black"/>
      <rect x="150" y="90" width="10" height="10" fill="black"/>
      
      <rect x="50" y="110" width="10" height="10" fill="black"/>
      <rect x="90" y="110" width="10" height="10" fill="black"/>
      <rect x="110" y="110" width="10" height="10" fill="black"/>
      <rect x="150" y="110" width="10" height="10" fill="black"/>
      
      <rect x="50" y="130" width="10" height="10" fill="black"/>
      <rect x="70" y="130" width="10" height="10" fill="black"/>
      <rect x="90" y="130" width="10" height="10" fill="black"/>
      <rect x="130" y="130" width="10" height="10" fill="black"/>
      
      <rect x="70" y="150" width="10" height="10" fill="black"/>
      <rect x="90" y="150" width="10" height="10" fill="black"/>
      <rect x="110" y="150" width="10" height="10" fill="black"/>
      <rect x="150" y="150" width="10" height="10" fill="black"/>
      
      <text x="100" y="185" textAnchor="middle" className="text-xs fill-muted-foreground">
        Scan for Demo
      </text>
    </svg>
  );

  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your QR Code & Start Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your craft into a digital success? Contact us for a free consultation and custom QR code solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* QR Code Section */}
          <Card className="border-border">
            <CardHeader className="text-center">
              <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Custom QR Code Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <QRCodePlaceholder />
              <p className="text-muted-foreground mt-6 mb-6">
                Connect your physical products to your digital store with custom QR codes. 
                Customers can instantly access product information, reviews, and purchase options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="success" size="lg">
                  Get Custom QR Code
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your craft business and how we can help..."
                  />
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;