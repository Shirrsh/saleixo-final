import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import saleixoLogo from '@/assets/saleixo-logo.png';

type NavLink = {
  name: string;
  href: string;
  type: 'route' | 'scroll';
};

const navLinks: NavLink[] = [
  { name: 'Photoshoots', href: '/categories', type: 'route' },
  { name: 'Ecommerce', href: '/design', type: 'route' },
  { name: 'Blog', href: '/blog', type: 'route' },
  { name: 'Portfolio', href: '#portfolio', type: 'scroll' },
  { name: 'Contact', href: '#contact', type: 'scroll' },
];

interface NavItemProps {
  link: NavLink;
  className: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const NavItem = ({ link, className, onClick, style }: NavItemProps) => {
  if (link.type === 'route') {
    return (
      <Link
        to={link.href}
        className={className}
        onClick={onClick}
        style={style}
        aria-label={`Navigate to ${link.name} page`}
      >
        {link.name}
      </Link>
    );
  }
  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
      aria-label={`Navigate to ${link.name} section`}
    >
      {link.name}
    </button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (link: NavLink) => {
    if (link.type === 'scroll') scrollToSection(link.href);
    else setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      {/* Glass pill navigation */}
      <div className="glass-purple rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Saleixo home">
          <img
            src={saleixoLogo}
            alt="Saleixo logo"
            width={1584}
            height={672}
            className="h-7 md:h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavItem
              key={link.name}
              link={link}
              className="text-foreground/90 hover:text-foreground transition-all duration-200 font-medium text-sm relative group"
              onClick={() => handleNavClick(link)}
            />
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center">
          <Button 
            size="sm"
            onClick={() => scrollToSection('#contact')} 
            className="rounded-full bg-primary hover:bg-primary-hover hover:shadow-[0_0_20px_hsl(262_83%_58%/0.4)] transition-all duration-300"
          >
            Book Call
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-surface-elevated/50 rounded-full transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 glass-purple rounded-2xl p-4 animate-fade-in">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            {navLinks.map((link, index) => (
              <NavItem
                key={link.name}
                link={link}
                className="text-left text-foreground/90 hover:text-foreground transition-colors duration-200 py-2 px-3 font-medium animate-slide-in-left rounded-lg hover:bg-surface-elevated/50"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleNavClick(link)}
              />
            ))}
            <div className="pt-2">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full rounded-full bg-primary hover:bg-primary-hover animate-scale-in"
                style={{ animationDelay: '250ms' }}
              >
                Book Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
