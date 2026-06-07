import { usePageMeta } from '@/hooks/usePageMeta';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, CreditCard, FileText, Scale, AlertCircle, CheckCircle2, XCircle, Mail } from 'lucide-react';

// ── Sub-components ──────────────────────────────────────────────────────────

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
      <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
    </div>
    <h2 className="text-base font-semibold text-foreground">{title}</h2>
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-surface p-6 mb-6 ${className}`}>
    {children}
  </div>
);

const List = ({ items, type = 'bullet' }: { items: React.ReactNode[]; type?: 'bullet' | 'check' | 'cross' }) => {
  const Icon = type === 'check' ? CheckCircle2 : type === 'cross' ? XCircle : null;
  const color = type === 'check' ? 'text-green-600 dark:text-green-400' : type === 'cross' ? 'text-red-500' : '';

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] text-muted-foreground leading-relaxed">
          {Icon
            ? <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} strokeWidth={1.5} />
            : <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
          }
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const Callout = ({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) => {
  const styles = {
    info:    'bg-primary/5 border-primary/20 text-foreground',
    warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200',
    success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200',
  };
  return (
    <div className={`rounded-xl border p-4 text-sm leading-relaxed ${styles[variant]}`}>
      {children}
    </div>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const Refund = () => {
  usePageMeta({
    title: 'Refund & Service Policy — Saleixo',
    description: "Saleixo's complete refund, cancellation, service delivery, and dispute resolution policy. Clear, fair, and transparent.",
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">

          {/* ── Page header ── */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Legal</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Refund &amp; Service Policy</h1>
            <p className="text-sm text-muted-foreground">Effective date: 1 May 2026 &nbsp;·&nbsp; Last updated: 7 June 2026 &nbsp;·&nbsp; Governed by the laws of India</p>
          </div>

          {/* ── Trust callout ── */}
          <Callout variant="success">
            <strong className="font-semibold">Our commitment:</strong> We aim to be fair and transparent in every engagement. If something isn't right, reach us at{' '}
            <a href="mailto:info@saleixo.com" className="underline underline-offset-2">info@saleixo.com</a>{' '}
            — we will always work in good faith to find a resolution.
          </Callout>

          <div className="mt-8 space-y-6">

            {/* ── 1. Payment Terms ── */}
            <Card>
              <SectionHeader icon={CreditCard} title="1. Payment Terms" />
              <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                <p>All projects require an advance payment before work commences. Payment terms vary by service:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { label: 'One-time projects', value: '50% advance · 50% on delivery' },
                    { label: 'Monthly retainers', value: '100% due at the start of each month' },
                    { label: 'Rush / priority work', value: '100% advance required' },
                    { label: 'Enterprise packages', value: 'Custom milestones as agreed' },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-surface-elevated p-3 border border-border">
                      <div className="text-xs font-semibold text-foreground mb-0.5">{label}</div>
                      <div className="text-xs text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-3">Late payments may attract a delay charge of 2% per month and may result in temporary suspension of active services until the outstanding amount is cleared.</p>
              </div>
            </Card>

            {/* ── 2. Service Delivery ── */}
            <Card>
              <SectionHeader icon={CheckCircle2} title="2. Service Delivery Commitments" />
              <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                <p>Specific deliverables, timelines, and scope are agreed upon before each project commences and documented in your proposal or service agreement.</p>
                <List items={[
                  'Saleixo will notify you in writing if a delay is expected — we will never miss a deadline without prior communication.',
                  'Review and approval of deliverables must be completed within 5 business days; delays on your end may affect the project timeline.',
                  'You are responsible for providing accurate information, brand assets, and content in a timely manner.',
                  'Saleixo does not guarantee specific outcomes such as search rankings, ad performance, or revenue growth — these depend on market conditions outside our control.',
                ]} />
              </div>
            </Card>

            {/* ── 3. Cancellation ── */}
            <Card>
              <SectionHeader icon={Clock} title="3. Cancellation Policy" />
              <div className="space-y-5 text-[15px] text-muted-foreground leading-relaxed">

                <div>
                  <p className="font-medium text-foreground text-sm mb-2">Before work starts</p>
                  <List items={[
                    'Cancel within 48 hours of signing a proposal, before any work has begun — full refund.',
                    'Cancel after 48 hours but before project commencement — 20% administration fee applies; remainder refunded.',
                  ]} />
                </div>

                <div>
                  <p className="font-medium text-foreground text-sm mb-2">After work has started</p>
                  <List items={[
                    'Either party may terminate ongoing services with 15 days\' written notice via email.',
                    'You are required to pay for all work completed up to the cancellation date.',
                    'Final deliverables will be released upon settlement of any outstanding payments.',
                    'Unused portions of a prepaid retainer (for work not yet started) will be refunded within 14 business days.',
                  ]} />
                </div>

              </div>
            </Card>

            {/* ── 4. Refund Eligibility ── */}
            <Card>
              <SectionHeader icon={ShieldCheck} title="4. Refund Eligibility" />
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Refunds are available when:</p>
                  <List type="check" items={[
                    'Saleixo fails to deliver the agreed scope within the agreed timeframe without prior notice.',
                    'A technical error or duplicate payment occurs on our end.',
                    'Both parties mutually agree to terminate the agreement before work commences.',
                    'A deliverable is materially different from the agreed brief and cannot be corrected after two revision rounds.',
                  ]} />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Refunds are not available for:</p>
                  <List type="cross" items={[
                    'Completed and delivered work (copy, designs, ad campaigns, photography, listing management).',
                    'Third-party costs incurred on your behalf — ad spend, software subscriptions, domain registrations, courier fees.',
                    'Rush or priority service fees, once work has commenced.',
                    'Change of mind, change of business direction, or dissatisfaction with results that fall within industry norms.',
                    'Work paused or delayed due to your failure to provide required approvals, assets, or feedback.',
                  ]} />
                </div>
              </div>
            </Card>

            {/* ── 5. Intellectual Property ── */}
            <Card>
              <SectionHeader icon={FileText} title="5. Intellectual Property" />
              <List items={[
                <>You receive full ownership of final deliverables — websites, designs, photography, copy, and videos — specifically created for your project, <strong className="text-foreground">upon receipt of full payment</strong>.</>,
                'Saleixo retains the right to display completed work in our portfolio and marketing materials unless you request otherwise in writing before project completion.',
                'Any proprietary tools, templates, frameworks, or processes used to produce your deliverables remain the intellectual property of Saleixo.',
                'You warrant that all content, images, and assets you provide are owned by you or properly licensed, and are free from third-party claims.',
              ]} />
            </Card>

            {/* ── 6. Limitation of Liability ── */}
            <Card>
              <SectionHeader icon={AlertCircle} title="6. Limitation of Liability" />
              <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
                <p>Saleixo's maximum liability in relation to any service or project is limited to the total fees paid by you for that specific service.</p>
                <p>Saleixo is not liable for indirect, incidental, or consequential damages including but not limited to loss of profits, loss of data, loss of business opportunities, or reputational harm arising from the use of our services.</p>
                <Callout variant="warning">
                  Third-party platforms (Amazon, Shopify, Meta, Google) may change their policies, algorithms, or terms at any time. Saleixo is not responsible for the impact of such changes on your business.
                </Callout>
              </div>
            </Card>

            {/* ── 7. Dispute Resolution ── */}
            <Card>
              <SectionHeader icon={Scale} title="7. Dispute Resolution" />
              <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
                <p>If you are dissatisfied with our services, please contact us at <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a> before taking any further action. We commit to responding within 3 business days and working in good faith toward a resolution within 14 days.</p>
                <p>If a resolution cannot be reached, disputes will be subject to the exclusive jurisdiction of the courts in <strong className="text-foreground">Bihar, India</strong>, in accordance with the laws of India.</p>
              </div>
            </Card>

            {/* ── 8. How to Request ── */}
            <Card className="bg-primary/5 border-primary/20">
              <SectionHeader icon={Mail} title="8. How to Request a Refund or Cancellation" />
              <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
                <p>Email us at <a href="mailto:info@saleixo.com" className="text-primary font-medium hover:underline">info@saleixo.com</a> with the subject line:</p>
                <div className="bg-background border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground">
                  "Cancellation / Refund Request — [Your Name]"
                </div>
                <p>Please include:</p>
                <List items={[
                  'Your full name and registered email address',
                  'Project name / service type',
                  'Invoice number or payment reference (if applicable)',
                  'Reason for the request',
                ]} />
                <p className="text-sm">We will acknowledge within <strong className="text-foreground">1 business day</strong> and resolve within <strong className="text-foreground">14 business days</strong>. Approved refunds are processed via the original payment method.</p>
              </div>
            </Card>

          </div>

          {/* ── Footer links ── */}
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to Home</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Refund;
