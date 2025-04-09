import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Home page sections
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import AIIntelligence from './components/sections/AIIntelligence';
import RequestDemo from './components/sections/RequestDemo';
import SignUpForm from './components/sections/SignUpForm';

// Pages
import AICapabilities from './pages/AICapabilities';

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <AIIntelligence />
      <RequestDemo />
      <SignUpForm />
    </>
  );
}

function App() {
  const location = useLocation();
  
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
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-capabilities" element={<AICapabilities />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;