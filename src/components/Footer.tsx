import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const socialLinks = [{
    icon: <Facebook className="w-5 h-5" />,
    href: "#",
    label: "Facebook"
  }, {
    icon: <Instagram className="w-5 h-5" />,
    href: "#",
    label: "Instagram"
  }, {
    icon: <Twitter className="w-5 h-5" />,
    href: "#",
    label: "Twitter"
  }, {
    icon: <Linkedin className="w-5 h-5" />,
    href: "#",
    label: "LinkedIn"
  }];
  const currentYear = new Date().getFullYear();
  return <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full" role="img" aria-label="Salixo logo"></div>
              <span className="text-xl md:text-2xl font-bold">Salixo</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Professional photography, design, and marketing services. 
              From lens to launch - we handle everything.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => <a key={index} href={social.href} aria-label={`Follow us on ${social.label}`} className="p-3 bg-background/10 hover:bg-background/20 rounded-full transition-all duration-300 hover:scale-110">
                  {social.icon}
                </a>)}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a href="tel:+917011441159" className="flex items-center gap-2 text-background/80 hover:text-background transition-colors group" aria-label="Call us at +91 7011441159">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+91 7011441159</span>
              </a>
              <a href="mailto:info@salixo.com" className="flex items-center gap-2 text-background/80 hover:text-background transition-colors group" aria-label="Email us at info@salixo.com">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>info@salixo.com</span>
              </a>
              <div className="flex items-center gap-2 text-background/80">
                <Clock className="w-4 h-4" />
                <span>2 PM - 10 PM IST</span>
              </div>
              <a href="https://wa.me/917011441159" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/80 hover:text-background transition-colors group" aria-label="WhatsApp us at +91 7011441159">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Available</span>
              </a>
              <p className="text-xs text-background/60 mt-2">
                🌍 International clients welcome
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-background/80 hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <button onClick={() => document.querySelector('#portfolio')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-background/80 hover:text-background transition-colors">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => document.querySelector('#contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-background/80 hover:text-background transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <Link to="/custom-pricing" className="text-background/80 hover:text-background transition-colors">
                  Pricing Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/80 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center md:text-left">
            © {currentYear} Salixo. All rights reserved.
          </p>
          <p className="text-background/60 text-sm text-center md:text-right">
            Made with ♥ for modern brands worldwide
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;