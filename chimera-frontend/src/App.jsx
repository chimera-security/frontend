import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import AIIntelligence from './components/sections/AIIntelligence';
import CTA from './components/sections/CTA';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute -inset-[10%] opacity-20 blur-3xl">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-blue-900 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-indigo-800 rounded-full animate-pulse-slow" 
               style={{animationDelay: '1s'}} />
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-purple-900 rounded-full animate-pulse-slow" 
               style={{animationDelay: '2s'}} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <AIIntelligence />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;