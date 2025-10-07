import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Photography', href: '/categories', type: 'route' },
    { name: 'Design', href: '#services', type: 'scroll' },
    { name: 'Marketing', href: '#services', type: 'scroll' },
    { name: 'Portfolio', href: '#portfolio', type: 'scroll' },
    { name: 'Contact', href: '#contact', type: 'scroll' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full shadow-md" role="img" aria-label="Alvaio logo"></div>
            <span className="text-xl md:text-2xl font-bold text-foreground">Alvaio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              link.type === 'route' ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-1 relative group"
                  aria-label={`Navigate to ${link.name} page`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-1 relative group"
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </button>
              )
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:+917011441159"
              className="flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium border border-primary/20 rounded-lg hover:bg-primary/5"
              aria-label="Call us at +91 7011441159"
            >
              <Phone className="w-4 h-4" />
              <span>+91 7011441159</span>
            </a>
            
            {user ? (
              <>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user.email || user.phone}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button variant="success" onClick={() => scrollToSection('#contact')} className="hover-lift">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 hover:bg-accent/10 rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-3 pt-4" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                link.type === 'route' ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 px-1 font-medium animate-slide-in-left animate-delay-${index * 100}`}
                    aria-label={`Navigate to ${link.name} page`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left text-foreground hover:text-primary transition-colors duration-200 py-2 px-1 font-medium animate-slide-in-left animate-delay-${index * 100}`}
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    {link.name}
                  </button>
                )
              ))}
              <div className="pt-2">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground flex items-center gap-2 px-1">
                      <User className="w-4 h-4" />
                      {user.email || user.phone}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full mb-3">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Button variant="success" onClick={() => scrollToSection('#contact')} className="w-full animate-scale-in animate-delay-500">
                  Book Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;