import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const Terms = () => (
  <>
    <Header />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Effective date: April 2026 &nbsp;·&nbsp; Last updated: April 2026</p>
        </div>

        <div className="text-[15px]">
          <Section title="1. Services">
            <p>Saleixo provides ecommerce services including Amazon listing optimisation, Shopify store setup and design, social media management, paid advertising, product photography, and ecommerce management. The specific scope of services for each client is defined in the individual Service Agreement or Proposal.</p>
          </Section>

          <Section title="2. Acceptance of Terms">
            <p>By submitting an inquiry form, signing a proposal, or paying an invoice, you confirm that you have read and agree to these Terms of Service.</p>
          </Section>

          <Section title="3. Client Responsibilities">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide accurate, complete, and timely information required for service delivery</li>
              <li>Grant necessary access to platforms, accounts, and assets</li>
              <li>Review and approve deliverables within agreed timeframes</li>
              <li>Ensure you have the legal right to sell the products described</li>
              <li>Comply with all applicable marketplace and advertising platform policies</li>
            </ul>
          </Section>

          <Section title="4. Fees and Payment">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Fees are outlined in the signed Proposal or Service Agreement</li>
              <li>Payment is due upon invoice issuance unless otherwise agreed in writing</li>
              <li>Late payments (more than 14 days overdue) may incur a 2% monthly late fee</li>
              <li>Saleixo reserves the right to pause services for accounts with outstanding invoices</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>All original content created by Saleixo (including listing copy, graphic designs, ad creatives) becomes the property of the client upon full payment. Saleixo retains the right to display completed work in its portfolio unless a confidentiality clause is agreed in writing.</p>
          </Section>

          <Section title="6. Confidentiality">
            <p>Both parties agree to keep confidential any proprietary information shared during the engagement. This includes business data, financials, product strategies, and account credentials.</p>
          </Section>

          <Section title="7. Results Disclaimer">
            <p>Saleixo applies industry best practices and expertise to every project. However, we do not guarantee specific sales outcomes, revenue increases, ad ROAS, or ranking positions, as these depend on factors outside our control including marketplace algorithm changes, market conditions, and product quality.</p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>Saleixo's liability to any client shall not exceed the total fees paid for the relevant service in the preceding 3 months. We are not liable for indirect, consequential, or incidental damages.</p>
          </Section>

          <Section title="9. Termination">
            <p>Either party may terminate the engagement with 30 days' written notice. See our <Link to="/refund" className="text-primary hover:underline">Cancellation & Refund Policy</Link> for details on refunds upon termination.</p>
          </Section>

          <Section title="10. Governing Law">
            <p>These Terms are governed by applicable law. Any disputes shall be resolved in good faith between the parties, and if unresolved, through applicable legal channels.</p>
          </Section>

          <Section title="11. Changes to These Terms">
            <p>We may update these Terms from time to time. Updated terms will be posted on saleixo.com with a new effective date. Continued use of our services constitutes acceptance.</p>
          </Section>

          <Section title="12. Contact">
            <p>For questions about these Terms: <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a></p>
          </Section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex gap-6 text-sm">
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
          <Link to="/refund" className="text-primary hover:underline">Cancellation & Refund</Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Terms;
