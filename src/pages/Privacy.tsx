import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const Privacy = () => (
  <>
    <Header />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: 1 May 2026 &nbsp;·&nbsp; Last updated: 12 May 2026</p>
        </div>

        <div className="prose-container text-[15px]">
          <Section title="Overview">
            <p>This Privacy Policy explains how Saleixo ("we", "us", "our"), operating at saleixo.com, collects, uses, stores, and protects the personal information of visitors and clients. By using our website or services, you agree to the practices described here.</p>
          </Section>

          <Section title="1. Information We Collect">
            <p><strong className="text-foreground">Information you provide directly:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name, email address, phone/WhatsApp number</li>
              <li>Business name, product or service details</li>
              <li>Payment information - processed securely via our payment provider; we do not store card details</li>
              <li>Communications sent via forms, email, or messaging apps</li>
            </ul>
            <p className="mt-3"><strong className="text-foreground">Information collected automatically:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>IP address, browser type, operating system</li>
              <li>Pages visited, session duration, referring URLs (via Google Analytics)</li>
              <li>Cookies and tracking technologies - see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link></li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To provide, manage, and improve our services</li>
              <li>To respond to inquiries and communicate about your project</li>
              <li>To send invoices, proposals, and service-related documents</li>
              <li>To send marketing emails - only with your consent; unsubscribe at any time</li>
              <li>To analyse website usage and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. Sharing Your Information">
            <p>We do not sell, trade, or rent your personal information. We may share data with trusted third-party service providers (email platforms, payment processors, cloud storage) under strict confidentiality agreements. We may disclose information if required by law.</p>
          </Section>

          <Section title="4. Data Retention">
            <p>We retain personal data for as long as necessary to provide services and comply with legal obligations. Client project data is retained for 3 years after the end of an engagement. You may request deletion at any time by emailing <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a>.</p>
          </Section>

          <Section title="5. Your Rights">
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent to marketing at any time</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
          </Section>

          <Section title="6. Cookies">
            <p>We use cookies to enhance your browsing experience. See our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for full details.</p>
          </Section>

          <Section title="7. Security">
            <p>We implement industry-standard security measures including SSL encryption, access controls, and regular security reviews. No system is 100% secure - we encourage clients to keep access credentials private.</p>
          </Section>

          {/* ── Amazon SP-API sections (required for Amazon SPN application) ── */}
          <Section title="9. Amazon Selling Partner Data">
            <p>In connection with services provided through the Amazon Solution Provider Network (SPN), Saleixo may access certain data from Amazon's Selling Partner API (SP-API) on behalf of Selling Partners who have explicitly authorised such access. This data may include, but is not limited to: order information, inventory data, shipment details, financial reports, and account performance metrics.</p>
          </Section>

          <Section title="10. How We Use Amazon SP-API Data">
            <p>We use data obtained through the Amazon SP-API solely for the purpose of delivering the specific services requested by the authorising Selling Partner. We do not use this data for:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Building or augmenting independent user profiles</li>
              <li>Advertising or marketing to third parties</li>
              <li>Selling, licensing, or sharing with unauthorised parties</li>
              <li>Any purpose beyond the scope of the authorised service</li>
            </ul>
          </Section>

          <Section title="11. Amazon SP-API Data Sharing & Disclosure">
            <p>We do not sell, rent, or trade Amazon Selling Partner data to third parties. We may share data only with sub-processors or service providers who are contractually bound to handle such data in accordance with Amazon's policies and applicable law. Any such sharing is limited to what is strictly necessary to provide the requested service.</p>
          </Section>

          <Section title="12. Amazon SP-API Data Retention">
            <p>Amazon SP-API data is retained only for as long as necessary to fulfil the service for which it was collected, or as required by applicable law. Upon termination of services or upon a Selling Partner's written request, we will securely delete or anonymise all associated Amazon SP-API data within 30 days, unless a longer retention period is required by law.</p>
            <p className="mt-3"><strong className="text-foreground">Specific retention periods:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Order &amp; transaction data — 90 days post-service</li>
              <li>Inventory &amp; catalog data — duration of active service</li>
              <li>Financial reports — 1 year (legal/audit purposes)</li>
              <li>Account performance data — 90 days post-service</li>
            </ul>
          </Section>

          <Section title="13. Your Rights as a Selling Partner">
            <p>As an authorised Selling Partner, you may at any time:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Revoke Saleixo's access to your Amazon data via your Seller Central account</li>
              <li>Request confirmation of what data we hold on your behalf</li>
              <li>Request deletion of your data by contacting us at <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a></li>
            </ul>
          </Section>

          <Section title="14. Changes to This Policy">
            <p>We will notify Amazon and update this Privacy Policy within 30 days of any material organisational or operational changes that affect how Amazon SP-API data is handled. Continued use of our services after updates constitutes acceptance of the revised policy.</p>
          </Section>

          <Section title="8. Contact">
            <p>For privacy-related questions or requests, contact us at:<br />
              <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a> &nbsp;·&nbsp; <a href="https://saleixo.com" className="text-primary hover:underline">saleixo.com</a>
            </p>
          </Section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex gap-6 text-sm">
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
          <Link to="/refund" className="text-primary hover:underline">Cancellation & Refund</Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Privacy;
