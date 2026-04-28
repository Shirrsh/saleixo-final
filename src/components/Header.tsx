import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import saleixoLogo from '@/assets/saleixo-logo.png';

type NavLink = { name: string; href: string; type: 'route' | 'scroll' };

const navLinks: NavLink[] = [
  { name: 'Photoshoots', href: '/categories', type: 'route'  },
  { name: 'Ecommerce',   href: '/design',     type: 'route'  },
  { name: 'Blog',        href: '/blog',        type: 'route'  },
  { name: 'Portfolio',   href: '#portfolio',   type: 'scroll' },
  { name: 'Contact',     href: '#contact',     type: 'scroll' },
];

const NavItem = ({ link, className, onClick, style }: {
  link: NavLink; className: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  if (link.type === 'route') {
    return <Link to={link.href} className={className} onClick={onClick} style={style}>{link.name}</Link>;
  }
  return <button className={className} onClick={onClick} style={style}>{link.name}</button>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsLight(document.documentElement.classList.contains('light'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (link: NavLink) => {
    if (link.type === 'scroll') scrollToSection(link.href);
    else setIsMenuOpen(false);
  };

  // Colors based on theme + scroll state
  const headerBg = scrolled
    ? (isLight ? 'rgba(255,255,255,0.96)' : 'hsl(220 30% 7% / 0.92)')
    : 'transparent';

  const headerBorder = scrolled
    ? (isLight ? '1px solid hsl(0 0% 90%)' : '1px solid hsl(220 25% 18% / 0.6)')
    : '1px solid transparent';

  const navColor    = isLight ? 'hsl(0 0% 35%)'  : 'hsl(215 20% 68%)';
  const navHoverBg  = isLight ? 'hsl(0 0% 95%)'  : 'hsl(220 25% 18%)';

  // CTA pill — black on light, white outline on dark
  const ctaBg     = isLight ? '#0a0a0a' : '#ffffff';
  const ctaColor  = isLight ? '#ffffff' : '#0a0a0a';
  const ctaBorder = isLight ? '#0a0a0a' : '#ffffff';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: headerBg,
        borderBottom: headerBorder,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — left */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0 hover:opacity-75 transition-opacity"
            aria-label="Saleixo home"
          >
            <img
              src={saleixoLogo}
              alt="Saleixo"
              width={1584}
              height={672}
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          {/* Nav — centered absolutely */}
          <nav
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <NavItem
                key={link.name}
                link={link}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{ color: navColor }}
                onClick={() => handleNavClick(link)}
              />
            ))}
          </nav>

          {/* Right side — CTA pill + mobile menu */}
          <div className="flex items-center gap-3">
            {/* CTA pill button */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden md:flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: ctaBg,
                color: ctaColor,
                border: `1.5px solid ${ctaBorder}`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.opacity = '0.82';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }}
            >
              Book Call
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isLight ? '#111' : 'hsl(215 20% 70%)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              background: isLight ? 'rgba(255,255,255,0.98)' : 'hsl(220 30% 7% / 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: isLight ? '1px solid hsl(0 0% 90%)' : '1px solid hsl(220 25% 18%)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavItem
                  key={link.name}
                  link={link}
                  className="text-left py-3 px-3 text-sm font-medium rounded-xl transition-colors"
                  style={{ color: isLight ? 'hsl(0 0% 20%)' : 'hsl(215 20% 72%)' }}
                  onClick={() => handleNavClick(link)}
                />
              ))}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full rounded-full py-3 text-sm font-semibold transition-all"
                  style={{ background: ctaBg, color: ctaColor }}
                >
                  Book Consultation
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
