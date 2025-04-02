import React from 'react';
import { Key } from 'lucide-react';
import NavLink from '../ui/NavLink';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = [
    { id: 1, name: 'twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { id: 2, name: 'linkedin', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z' },
    { id: 3, name: 'github', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' }
  ];

  return (
    <footer className="border-t border-dark-lighter py-12 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-md blur-sm"></div>
              <Key className="h-6 w-6 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">
              Chimera
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#intelligence">AI Intelligence</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>
          
          <div className="flex space-x-4">
            {socialIcons.map(icon => (
              <div key={icon.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-dark-light border border-dark-lighter">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.path} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-dark-lighter mt-12 pt-12 text-center text-slate-500">
          <p>&copy; {currentYear} Chimera Security. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;