import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const cookieTypes = [
  { type: 'Essential', purpose: 'Required for the website to function correctly', examples: 'Session management, security, form submissions', required: true },
  { type: 'Analytics', purpose: 'Help us understand how visitors use our site', examples: 'Google Analytics - page views, session duration, traffic source', required: false },
  { type: 'Marketing', purpose: 'Track ad campaign performance', examples: 'Meta Pixel, Google Ads conversion tracking', required: false },
  { type: 'Preferences', purpose: 'Remember your settings between visits', examples: 'Theme preference, cookie consent status', required: false },
];

const Cookies = () => (
  <>
    <Header />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: April 2026 &nbsp;·&nbsp; Last updated: April 2026</p>
        </div>

        <div className="text-[15px]">
          <Section title="What Are Cookies?">
            <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember your preferences, and collect analytics data to improve user experience.</p>
          </Section>

          <Section title="Types of Cookies We Use">
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-elevated">
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Examples</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTypes.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.examples}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${row.required ? 'bg-primary/10 text-primary' : 'bg-surface-elevated text-muted-foreground'}`}>
                          {row.required ? 'Yes' : 'Optional'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Third-Party Cookies">
            <p>We use Google Analytics and Meta Pixel. These third parties may place their own cookies on your device subject to their own privacy policies. We do not control these third-party cookies.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a></li>
              <li>Meta / Facebook: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">facebook.com/privacy/policy</a></li>
            </ul>
          </Section>

          <Section title="Managing Cookies">
            <p>You can control and delete cookies through your browser settings. Disabling certain cookies may affect website functionality. You can also opt out of specific tracking:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Google Analytics opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tools.google.com/dlpage/gaoptout</a></li>
              <li>Meta ad preferences: Your Facebook account → Settings → Ads</li>
            </ul>
          </Section>

          <Section title="Your Consent">
            <p>When you first visit saleixo.com, you will see a cookie consent banner. By accepting, you consent to our use of non-essential cookies. You can change your preference at any time by clicking 'Cookie Settings' in the footer.</p>
            <p>Essential cookies are always active as they are required for the site to function. They do not require your consent.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about our cookie use? Email <a href="mailto:info@saleixo.com" className="text-primary hover:underline">info@saleixo.com</a>.</p>
          </Section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex gap-6 text-sm">
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          <Link to="/refund" className="text-primary hover:underline">Cancellation & Refund</Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Cookies;
