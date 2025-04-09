import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children, external = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Handle different link types
  const handleClick = (e) => {
    // For external links, do nothing special
    if (external) return;
    
    // For hash links (section navigation)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're on the home page, scroll to the section
      if (isHomePage) {
        const element = document.getElementById(href.substring(1));
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      } 
      // If we're not on the home page, navigate to home page with hash
      else {
        window.location.href = '/' + href;
      }
    }
  };

  // For external links, use regular anchor tags
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300"
      >
        {children}
        <svg className="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  }
  
  // For page links (not starting with #)
  if (!href.startsWith('#')) {
    return (
      <Link
        to={href}
        className="text-slate-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300"
      >
        {children}
      </Link>
    );
  }
  
  // For in-page section links
  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-slate-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300"
    >
      {children}
    </a>
  );
};

export default NavLink;