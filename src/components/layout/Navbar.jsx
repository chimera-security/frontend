import React, { useState, useEffect } from 'react';
import { Key, ArrowRight, X } from 'lucide-react';
import NavLink from '../ui/NavLink';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when changing location
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Handle logo click: navigate home and/or scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If on another page, navigate to home AND ensure we're at the top
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 backdrop-blur-md bg-dark/80 border-b border-dark-lighter z-50 transition-all duration-300 ${
        scrollY > 50 ? 'h-16 shadow-lg' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo - now a Link to home page with scroll to top functionality */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-md blur-sm animate-pulse group-hover:animate-ping"></div>
            <Key className="h-7 w-7 text-white relative z-10" />
          </div>
          <span className="text-2xl font-bold tracking-tight gradient-text">
            Chimera
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#intelligence">AI Intelligence</NavLink>
          <NavLink href="#signup">Join Beta</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 relative z-20 focus:outline-none group"
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 bg-dark/90 backdrop-blur-lg z-10 transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`} 
          onClick={toggleMenu}
        />
        
        {/* Mobile Menu Panel */}
        <div 
          className={`lg:hidden fixed top-20 right-0 bottom-0 w-64 bg-dark-light/90 backdrop-blur-md border-l border-dark-lighter p-6 z-10 transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col space-y-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#intelligence">AI Intelligence</NavLink>
            <NavLink href="#signup">Join Beta</NavLink>
            <NavLink href="#request-demo">Request Demo</NavLink>
          </div>
        </div>
        
        {/* Desktop CTA Button */}
        <NavLink href="#request-demo" className="relative group hidden lg:flex">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative px-6 py-3 bg-dark rounded-lg flex items-center">
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;