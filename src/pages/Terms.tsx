import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
            <p className="text-center text-muted-foreground">Last updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Service Agreement</h2>
              <p className="text-muted-foreground">
                By using Salixo's services, you agree to these terms. We provide professional photography, design, and marketing services as outlined in our packages.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Payment Terms</h2>
              <p className="text-muted-foreground">
                Payment is required as per the agreed package terms. Early-bird discounts are valid for bookings made before the specified dates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All work created by Salixo becomes the property of the client upon full payment. We retain the right to showcase work in our portfolio unless otherwise agreed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at hello@salixo.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;