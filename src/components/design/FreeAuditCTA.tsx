import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

const FreeAuditCTA = () => (
  <section className="py-16 px-4">
    <div className="container mx-auto max-w-4xl">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-8 md:p-12 text-center text-primary-foreground">
        <Search className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Get Your Free Seller Account Audit
        </h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Our experts will analyze your listings, ads & account health — and show you exactly where you're losing sales.
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => { window.location.href = '/#contact'; }}
          className="hover-scale"
        >
          Claim Free Audit <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  </section>
);

export default FreeAuditCTA;
