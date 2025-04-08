import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SecurityGridAnimation from '../ui/animations/SecurityGridAnimation';
import IdentityGraphNetwork from '../ui/animations/IdentityGraphNetwork';
import IdentityKnowledgeGraph from '../ui/animations/IdentityKnowledgeGraph';

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
            <button className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-dark rounded-lg">
                Get Started
              </div>
            </button>
            {/* <button className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-dark rounded-lg">
                Watch Demo
              </div>
            </button> */}
          </div>
        </div>
        
        <div className="relative hidden lg:block" 
             style={{perspective: '1000px', transform: `translateY(${scrollY * 0.1}px)`}}>
          <div className="relative w-full aspect-square" 
               style={{transform: `rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * -0.01}deg)`}}>
            {/* <SecurityGridAnimation /> */}
            {/* <IdentityKnowledgeGraph /> */}
            <IdentityGraphNetwork />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;