import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
            <p className="text-center text-muted-foreground">Last updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, including name, email, phone number, and project details through our contact forms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information to provide our photography, design, and marketing services, communicate with you about your projects, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at hello@indistores.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;