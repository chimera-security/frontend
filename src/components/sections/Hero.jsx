import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import IdentityGraphNetwork from '../ui/animations/IdentityGraphNetwork';
import NavLink from '../ui/NavLink';

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 md:pr-12" 
             style={{transform: `translateY(${scrollY * -0.1}px)`, opacity: Math.max(0, 1 - scrollY * 0.001)}}>
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-24 mb-6"></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Secure Your 
              <span className="block gradient-text">
                Machine Identities
              </span>
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
            Discover, secure, and manage your non-human identities with advanced AI intelligence that predicts threats before they materialize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink href="#signup" className="relative group block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </NavLink>
            <NavLink href="#request-info" className="relative group block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center">
                <span>Request Information</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </NavLink>
          </div>
        <p className='text-sm text-slate-500'>We are in <span className='font-bold italic text-white '>founder mode</span> and quickly iterating our product to best serve you. Development will take time, but we are committed to building a product that you will love.
            <br />
            <br />
            If you are interested in learning more about our future releases, please fill out the form below.
          </p>
        </div>
        
        <div className="relative hidden lg:block" 
             style={{perspective: '1000px', transform: `translateY(${scrollY * 0.1}px)`}}>
          <div className="relative w-full aspect-square" 
               style={{transform: `rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * -0.01}deg)`}}>
            <IdentityGraphNetwork />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;