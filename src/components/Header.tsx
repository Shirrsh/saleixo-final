import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerCategories, setHeaderCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchHeaderCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .eq('show_in_header', true)
        .order('display_order', { ascending: true });
      
      if (data) setHeaderCategories(data);
    };
    fetchHeaderCategories();
  }, []);

  // Static nav links + dynamic categories from database
  const staticLinks = [
    { name: 'Photography', href: '/categories', type: 'route' as const },
    { name: 'Design', href: '/design', type: 'route' as const },
    { name: 'Services', href: '/services', type: 'route' as const },
  ];

  // Convert categories to nav links (only if they exist)
  const categoryLinks = headerCategories.map(cat => ({
    name: cat.name,
    href: `/categories/${cat.slug}`,
    type: 'route' as const,
  }));

  const scrollLinks = [
    { name: 'Portfolio', href: '#portfolio', type: 'scroll' as const },
    { name: 'Contact', href: '#contact', type: 'scroll' as const },
  ];

  // Use static links if no categories in DB, otherwise use categories
  const navLinks = headerCategories.length > 0 
    ? [...categoryLinks, ...scrollLinks]
    : [...staticLinks, ...scrollLinks];

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
            {navLinks.map(link => link.type === 'route' ? (
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
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
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
              {navLinks.map((link, index) => link.type === 'route' ? (
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
              ))}
              <div className="pt-2">
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