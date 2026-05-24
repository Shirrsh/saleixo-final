import { usePageMeta } from '@/hooks/usePageMeta';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const Refund = () => {
  usePageMeta({
    title: 'Cancellation & Refund Policy — Saleixo',
    description: "Saleixo's cancellation, refund, and service guarantee terms. Understand your rights before you buy.",
  });
  return (
  <>
    <Header />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Cancellation &amp; Refund Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: 1 May 2026 &nbsp;·&nbsp; Last updated: 1 May 2026</p>
        </div>

        {/* Trust callout */}
        <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground font-medium">We aim to be fair and transparent. If something isn't right, email us first - we will always work in good faith to find a resolution.</p>
        </div>

        <div className="text-[15px]">
          <Section title="1. Cancellation by Client">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Clients may cancel ongoing services with 30 days' written notice to <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a></li>
              <li>Work already completed and delivered is non-refundable</li>
              <li>If a retainer has been paid, the unused portion (for work not yet started) will be refunded within 14 business days</li>
              <li>One-time project fees (e.g., Shopify build, photography shoot) are non-refundable once work has commenced</li>
            </ul>
          </Section>

          <Section title="2. Cancellation Before Work Starts">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>If you cancel within 48 hours of signing a proposal and before any work has begun, you are entitled to a full refund</li>
              <li>Cancellations after 48 hours but before project commencement will incur a 20% administration fee</li>
            </ul>
          </Section>

          <Section title="3. Refund Eligibility">
            <p>Refunds may be considered in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Saleixo fails to deliver the agreed scope of work within the agreed timeframe without prior notice of delay</li>
              <li>A technical error or duplicate payment occurs on our end</li>
              <li>Both parties mutually agree to terminate the agreement before work commences</li>
            </ul>
          </Section>

          <Section title="4. Non-Refundable Items">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Completed and delivered work (copy, designs, campaigns, photography, ad management)</li>
              <li>Third-party costs incurred on your behalf (ad spend, software subscriptions, domain registrations)</li>
              <li>Rush or priority service fees</li>
            </ul>
          </Section>

          <Section title="5. Dispute Resolution">
            <p>If you are dissatisfied with our services, please contact us first at <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a>. We will work in good faith to resolve any issues within 14 days. If a resolution cannot be reached, either party may escalate using the dispute process outlined in our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.</p>
          </Section>

          <Section title="6. How to Request a Cancellation or Refund">
            <p>Email <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a> with the subject line <strong className="text-foreground">"Cancellation / Refund Request"</strong>. Include your name, project details, and the reason for your request. We will respond within 3 business days.</p>
          </Section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex gap-6 text-sm">
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
  );
};

export default Refund;
