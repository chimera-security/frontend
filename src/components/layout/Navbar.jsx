import React, { useState, useEffect } from 'react';
import { Key, ArrowRight } from 'lucide-react';
import NavLink from '../ui/NavLink';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="backdrop-blur-md bg-dark/40 border-b border-dark-lighter sticky top-0 z-50 transition-all duration-300"
      style={{height: scrollY > 50 ? '70px' : '90px'}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-md blur-sm animate-pulse"></div>
            <Key className="h-7 w-7 text-white relative z-10" />
          </div>
          <span className="text-2xl font-bold tracking-tight gradient-text">
            Chimera
          </span>
        </div>
        
        <div className="hidden lg:flex space-x-10">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#intelligence">AI Intelligence</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        
        <div className="menu-icon lg:hidden" onClick={toggleMenu}>
          <div className="bar w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="bar w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="bar w-6 h-0.5 bg-white"></div>
        </div>
        
        <div className={`lg:hidden absolute top-[90px] right-0 bg-dark-light w-64 p-6 border-l border-dark-lighter transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col space-y-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#intelligence">AI Intelligence</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </div>
        
        <button className="relative group hidden lg:flex">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative px-6 py-3 bg-dark rounded-lg flex items-center">
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;