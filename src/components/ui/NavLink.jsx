import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavLink = ({ href, children, external = false, className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  // Define base styling class
  const baseClass = "text-slate-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300";
  
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
          // Adjust offset based on screen size
          const offset = window.innerWidth >= 1024 ? 100 : 80;
          window.scrollTo({
            top: element.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      } 
      // If we're not on the home page, navigate to home page with hash
      else {
        // Use navigate instead of window.location
        navigate('/');
        // Set timeout to allow for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.getElementById(href.substring(1));
          if (element) {
            const offset = window.innerWidth >= 1024 ? 100 : 80;
            window.scrollTo({
              top: element.offsetTop - offset,
              behavior: 'smooth'
            });
          }
        }, 100);
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
        className={`${baseClass} ${className}`}
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
        className={`${baseClass} ${className}`}
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
      className={`${baseClass} ${className}`}
    >
      {children}
    </a>
  );
};

// Use React.memo for optimization
export default React.memo(NavLink);