import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/Button';
import { NavLink } from '../types';

const links: NavLink[] = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'الخدمات', href: '#services' },
  { label: 'السيارات', href: '#fleet' },
  { label: 'تواصل', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-gold/20 py-3' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1180px] mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#hero')}>
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center text-gold-soft font-bold text-lg shadow-glow">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-base leading-none text-white">DOOS RENTAL</span>
            <span className="text-[11px] text-gray-400 leading-none mt-1">دوس لتأجير السيارات</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-400">
          {links.map((link) => (
            <button 
              key={link.href} 
              onClick={() => scrollToSection(link.href)}
              className="relative hover:text-white transition-colors py-1 after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
            <Phone size={14} className="text-gold" />
            <span>0500000000</span>
          </div>
          <div className="hidden sm:block">
            <Button variant="outline" onClick={() => scrollToSection('#contact')}>
              طلب عرض
            </Button>
          </div>
          
          {/* Mobile Burger */}
          <button 
            className="md:hidden text-gold p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 fade-in">
          {links.map((link) => (
            <button 
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-right text-gray-300 hover:text-gold py-2 border-b border-white/5 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <Button variant="primary" className="w-full mt-2" onClick={() => scrollToSection('#contact')}>
            تواصل معنا
          </Button>
        </div>
      )}
    </header>
