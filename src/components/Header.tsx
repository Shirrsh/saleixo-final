import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full shadow-md" role="img" aria-label="Salixo logo"></div>
            <span className="text-xl md:text-2xl font-bold text-foreground">Salixo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavItem
                key={link.name}
                link={link}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-1 relative group"
                onClick={() => handleNavClick(link)}
              />
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="success" onClick={() => scrollToSection('#contact')} className="hover-lift">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 hover:bg-accent/10 rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-3 pt-4" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <NavItem
                  key={link.name}
                  link={link}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 px-1 font-medium animate-slide-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleNavClick(link)}
                />
              ))}
              <div className="pt-2">
                <Button
                  variant="success"
                  onClick={() => scrollToSection('#contact')}
                  className="w-full animate-scale-in"
                  style={{ animationDelay: '500ms' }}
                >
                  Book Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
