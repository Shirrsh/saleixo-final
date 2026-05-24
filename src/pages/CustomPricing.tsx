import { usePageMeta } from '@/hooks/usePageMeta';
import { Check, ArrowRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyToggle from '@/components/CurrencyToggle';

// ── Data ──────────────────────────────────────────────────────────────────────

const tiers = [
  {
    name: 'Starter',
    badge: null,
    priceUSD: 299,
    priceINR: 24999,
    setupUSD: 99,
    setupINR: 7999,
    contract: 'Month-to-month · 14-day notice',
    bestFor: 'Artisans, new sellers, under 50 SKUs',
    features: [
      '10 product photos / month',
      '5 listing optimizations / month',
      '1 social media platform managed',
      '1 A+ Content ASIN / month',
      'Monthly performance report',
      'Email support (48h response)',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    priceUSD: 699,
    priceINR: 59999,
    setupUSD: 149,
    setupINR: 12999,
    contract: '3-month minimum, then monthly',
    bestFor: 'Small Amazon sellers, $1–10k/mo revenue',
    features: [
      'Everything in Starter, plus:',
      '25 product photos / month',
      '15 listing optimizations / month',
      '2 social platforms managed',
      '3 A+ Content ASINs / month',
      'PPC management (up to $2,000 ad spend)',
      '2 SEO / content pieces / month',
      'Bi-weekly check-ins',
      'Priority support (24h response)',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Pro',
    badge: null,
    priceUSD: 1499,
    priceINR: 124999,
    setupUSD: 299,
    setupINR: 24999,
    contract: '6-month minimum, then monthly',
    bestFor: 'Mid-size brands, $10–100k/mo revenue',
    features: [
      'Everything in Growth, plus:',
      'Unlimited product photos & listings',
      'All social platforms managed',
      'Unlimited A+ Content',
      'PPC management (up to $10k ad spend)',
      'Brand identity refresh (1×/year)',
      'Storefront design (1×/year)',
      '4 SEO / content pieces / month',
      'Dedicated account manager',
      'Weekly strategy calls',
      'Same-day support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Enterprise',
    badge: null,
    priceUSD: null,
    priceINR: null,
    setupUSD: null,
    setupINR: null,
    startingUSD: 2999,
    startingINR: 249999,
    contract: '12-month minimum',
    bestFor: 'Established brands, aggregators, multi-marketplace',
    features: [
      'Custom scope tailored to client',
      'Multi-marketplace support (US/UK/EU/JP)',
      'Dedicated team (not just one manager)',
      'Custom SLAs',
      'Quarterly business reviews',
      'White-glove onboarding',
      'Custom setup fee (typically $499–$1,499)',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const photography = [
  { name: 'Single product photo',   usd: 15,  inr: 1299  },
  { name: 'Lifestyle photo',        usd: 35,  inr: 2999  },
  { name: '360° spin shot',         usd: 75,  inr: 6499  },
  { name: 'Product video (15–30s)', usd: 149, inr: 12999 },
];

const design = [
  { name: 'Logo design',            usd: 199, inr: 16999 },
  { name: 'Brand identity package', usd: 599, inr: 49999 },
  { name: 'A+ Content (per ASIN)',  usd: 99,  inr: 8499  },
  { name: 'Storefront design',      usd: 499, inr: 41999 },
  { name: 'Single infographic',     usd: 49,  inr: 4199  },
];

const amazon = [
  { name: 'Listing optimization (per SKU)', usd: 39,  inr: 3299  },
  { name: 'Keyword research report',        usd: 79,  inr: 6599  },
  { name: 'Account audit',                  usd: 149, inr: 12999 },
  { name: 'Suspension appeal',              usd: 299, inr: 24999 },
];

const marketing = [
  { name: 'Blog post (1,000 words)',  usd: 79,  inr: 6599  },
  { name: 'Email campaign setup',     usd: 199, inr: 16999 },
  { name: 'Single social post',       usd: 19,  inr: 1599  },
];

const notIncluded = [
  { item: 'Amazon ad spend',           desc: 'PPC and Sponsored Ads budget',                  paidTo: 'Amazon' },
  { item: 'Amazon FBA fees',           desc: 'Fulfillment, storage, referral fees',            paidTo: 'Amazon' },
  { item: 'Third-party software',      desc: 'External SaaS (e.g., Helium 10)',                paidTo: 'Software vendor' },
  { item: 'Photography props/models',  desc: 'Physical props, model fees',                     paidTo: 'Vendor' },
  { item: 'International translation', desc: 'Multi-language listing translation',             paidTo: 'Vendor' },
  { item: 'Legal / trademark fees',    desc: 'USPTO filings, IP disputes',                     paidTo: 'Government / lawyer' },
  { item: 'Shipping samples',          desc: 'Cost to send products for photography',          paidTo: 'Carrier' },
];

const faq = [
  {
    q: 'Are there any setup fees?',
    a: 'Yes — Starter: $99 / ₹7,999, Growth: $149 / ₹12,999, Pro: $299 / ₹24,999. Enterprise setup fees are custom (typically $499–$1,499). Setup fees are one-time and cover onboarding, account configuration, and initial strategy.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Starter plans require 14 days written notice. Growth requires 3-month minimum then monthly. Pro requires 6-month minimum then monthly. Enterprise requires 12-month minimum.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer pro-rated refunds for unused service days when cancellation notice is provided per the terms above. See our Cancellation & Refund Policy for full details.',
  },
  {
    q: 'How am I billed?',
    a: 'Monthly via credit card or bank transfer. Invoices are issued on the 1st of each month for the upcoming service period.',
  },
  {
    q: 'Do you require access to my Seller Central account?',
    a: "Yes — for most services we request limited user permissions via Amazon's User Permissions tool. We never ask for your login credentials, and access can be revoked by you at any time.",
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes. Mutual NDAs are signed before any client onboarding.',
  },
  {
    q: 'What currencies do you accept?',
    a: 'We display prices in 15 currencies — use the currency selector at the top of the page to switch. USD is the primary billing currency for international clients; INR for Indian clients. Displayed amounts in other currencies are indicative and invoices are issued in USD or INR.',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const ServiceTable = ({ title, rows }: { title: string; rows: { name: string; usd: number; inr: number }[] }) => {
  const { currency, fmt } = useCurrency();
  return (
    <div>
      <h3 className="text-base font-bold text-foreground mb-3 uppercase tracking-wider">{title}</h3>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-2.5 font-semibold text-foreground">Service</th>
              <th className="text-right px-4 py-2.5 font-semibold text-foreground">
                {currency}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={cn('border-t border-border', i % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                <td className="px-4 py-2.5 text-foreground">{r.name}</td>
                <td className="px-4 py-2.5 text-right font-medium text-foreground">{fmt(r.usd, r.inr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const CustomPricing = () => {
  usePageMeta({
    title: 'Transparent Pricing — Saleixo',
    description: 'Starter at $299, Growth at $699, Pro at $1,499. Full à-la-carte pricing for photography, design, Amazon, Shopify, and marketing.',
  });
  const { fmt } = useCurrency();

  const localAddOns = [
    { name: '48-hr express photo delivery*', price: '+25% of service price' },
    { name: 'Extra revision (beyond 2 included)', price: fmt(29, 2499) },
    { name: 'Weekend support', price: `${fmt(99, 8499)}/mo` },
    { name: 'Additional marketplace (per region)', price: `${fmt(199, 16999)}/mo` },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {/* ── Hero ── */}
        <section className="pt-28 pb-16 px-4 text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Transparent Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            No surprises. No hidden fees.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-5">
            Choose the plan that fits your business.
          </p>
          <div className="flex justify-center mb-4">
            <CurrencyToggle />
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: May 2026 · Prices may be updated with 30 days' notice to existing clients.
          </p>
        </section>

        {/* ── Tier cards ── */}
        <section className="px-4 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'relative rounded-2xl border p-6 flex flex-col',
                  tier.highlight
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border bg-card',
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-primary-foreground">
                      <Star className="w-3 h-3" /> {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-xl font-bold text-foreground mb-1">{tier.name}</h2>
                  <p className="text-xs text-muted-foreground">{tier.bestFor}</p>
                </div>

                {/* Price */}
                <div className="mb-1">
                  {tier.priceUSD != null ? (
                    <>
                      <span className="text-4xl font-extrabold text-foreground">
                        {fmt(tier.priceUSD, tier.priceINR)}
                      </span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-extrabold text-foreground">
                        From {fmt(tier.startingUSD, tier.startingINR)}
                      </span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </>
                  )}
                </div>

                {/* Setup fee */}
                <p className="text-xs text-muted-foreground mb-4">
                  {tier.setupUSD != null
                    ? `Setup fee: ${fmt(tier.setupUSD, tier.setupINR)} one-time`
                    : 'Setup fee: Custom'}
                </p>

                {/* Contract */}
                <p className="text-xs font-medium text-foreground mb-5 pb-5 border-b border-border">
                  {tier.contract}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.features.map((f, i) => (
                    <li
                      key={i}
                      className={cn(
                        'flex items-start gap-2 text-sm',
                        f.endsWith(':') ? 'font-semibold text-foreground mt-2' : 'text-muted-foreground',
                      )}
                    >
                      {!f.endsWith(':') && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/get-started"
                  className={cn(
                    'w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90',
                    tier.highlight
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-foreground text-background',
                  )}
                >
                  {tier.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── À-la-carte ── */}
        <section className="px-4 pb-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">À-La-Carte</p>
            <h2 className="text-3xl font-bold text-foreground">Individual Services</h2>
            <p className="text-muted-foreground mt-2">One-time or per-unit pricing. Mix and match with any plan.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ServiceTable title="📸 Photography" rows={photography} />
              <p className="text-xs text-muted-foreground mt-2 pl-1">
                * Standard delivery: 3–5 business days. 48-hr express delivery available — add +25% (see Add-Ons below).
              </p>
            </div>
            <ServiceTable title="🎨 Design" rows={design} />
            <ServiceTable title="🛍️ Amazon-Specific" rows={amazon} />
            <ServiceTable title="📣 Marketing" rows={marketing} />
          </div>
        </section>

        {/* ── Add-ons ── */}
        <section className="px-4 pb-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Extras</p>
            <h2 className="text-3xl font-bold text-foreground">Add-Ons</h2>
            <p className="text-muted-foreground mt-2">Optional extras that attach to any plan or service.</p>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Add-On</th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground">Price</th>
                </tr>
              </thead>
              <tbody>
                {localAddOns.map((a, i) => (
                  <tr key={i} className={cn('border-t border-border', i % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                    <td className="px-5 py-3 text-foreground">{a.name}</td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">{a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Not included ── */}
        <section className="px-4 pb-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Transparency</p>
            <h2 className="text-3xl font-bold text-foreground">What's Not Included</h2>
            <p className="text-muted-foreground mt-2">
              These costs are paid directly by you to the relevant provider — not billed through Saleixo.
            </p>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Item</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Description</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Paid To</th>
                </tr>
              </thead>
              <tbody>
                {notIncluded.map((n, i) => (
                  <tr key={i} className={cn('border-t border-border', i % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                    <td className="px-5 py-3 font-medium text-foreground">{n.item}</td>
                    <td className="px-5 py-3 text-muted-foreground">{n.desc}</td>
                    <td className="px-5 py-3 text-muted-foreground">{n.paidTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 pb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-foreground">Pricing Questions</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-24 max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-border bg-card p-10">
            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6">
              Book a free discovery call — we'll recommend the right plan for your business and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/get-started"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 bg-primary text-primary-foreground"
              >
                Get Started Free <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <a
                href="mailto:info@saleixo.com"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold border border-border text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Email Us
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              All pricing is subject to our{' '}
              <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default CustomPricing;
