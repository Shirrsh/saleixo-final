import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import saleixoLogo from '@/assets/saleixo-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
    { icon: <Facebook className="w-4 h-4" />,  href: '#', label: 'Facebook'  },
    { icon: <Linkedin className="w-4 h-4" />,  href: '#', label: 'LinkedIn'  },
    { icon: <Twitter className="w-4 h-4" />,   href: '#', label: 'Twitter'   },
  ];

  const services = [
    { label: 'Product Photography', href: '/categories' },
    { label: 'Ecommerce Design',    href: '/design'      },
    { label: 'A+ Content',          href: '/services'    },
    { label: 'Social Marketing',    href: '/design'      },
    { label: 'Brand Strategy',      href: '/services'    },
    { label: 'Custom Pricing',      href: '/custom-pricing' },
  ];

  const company = [
    { label: 'Portfolio',    action: () => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'How It Works', action: () => document.querySelector('#how-it-works-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Blog',         href: '/blog'    },
    { label: 'Privacy',      href: '/privacy' },
    { label: 'Terms',        href: '/terms'   },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/40">

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent-violet) / 0.4), transparent)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">

        {/* ── Top grid: logo+desc | services | company | contact ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-border/30">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={saleixoLogo} alt="Saleixo" className="h-10 w-auto mb-5" loading="lazy" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Studio-grade photography, ecommerce design, and digital marketing — from lens to launch, fully managed.
            </p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-surface border border-border/60 text-muted-foreground hover:border-accent-violet/60 hover:text-foreground"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map(item => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map(item => (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="text-sm text-foreground/70 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: <Mail className="w-3.5 h-3.5" />,          label: 'info@saleixo.com',  href: 'mailto:info@saleixo.com'        },
                { icon: <MessageCircle className="w-3.5 h-3.5" />, label: 'WhatsApp Us',       href: 'https://wa.me/917011441159'     },
                { icon: <Clock className="w-3.5 h-3.5" />,         label: '2 PM – 10 PM IST',  href: null                            },
              ].map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm text-foreground/70 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
                      {item.label}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 text-sm text-foreground/50">
                      <span className="text-muted-foreground">{item.icon}</span>
                      {item.label}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Markets */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2">Markets</p>
              <p className="text-xs text-muted-foreground/70">US · UK · FR · DE · AU · CA · IN</p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 py-5 border-t border-border/30 text-xs text-muted-foreground/50"
        >
          <span>© {currentYear} Saleixo. All rights reserved.</span>
          <span>Made with ♥ for modern brands worldwide</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
