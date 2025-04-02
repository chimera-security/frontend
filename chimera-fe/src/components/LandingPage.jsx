import React, { useState, useEffect } from 'react';
import { Shield, Terminal, CpuIcon, RefreshCw, AlertTriangle, Eye, Code, Database, Server, ArrowRight, ChevronRight } from 'lucide-react';

const styles = `
  .hero-gradient {
    background: linear-gradient(to bottom right, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
  }
  
  .animate-pulse-slow {
    animation: pulseSlow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulseSlow {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className={`navbar border-b border-gray-800 fixed top-0 w-full z-50 bg-black ${scrollY > 50 ? "shadow-xl" : ""}`} style={{ height: scrollY > 50 ? '64px' : '80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">Enigma</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <a href="#approach" className="text-gray-400 hover:text-white">Our Approach</a>
              <a href="#technology" className="text-gray-400 hover:text-white">Technology</a>
              <a href="#vision" className="text-gray-400 hover:text-white">Vision</a>
              <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden relative p-2" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all transform ${menuOpen ? '-rotate-45' : ''}`}></div>
            </button>
            
            {/* Early Access Button */}
            <div className="hidden lg:block">
              <button className="px-6 py-2 border border-gray-800 rounded flex items-center hover:bg-gray-800 transition">
                <span>Early Access</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden w-full bg-black border-b border-gray-800">
              <div className="px-4 py-4 space-y-4">
                <a href="#approach" className="block text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Our Approach</a>
                <a href="#technology" className="block text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Technology</a>
                <a href="#vision" className="block text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Vision</a>
                <a href="#contact" className="block text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-block text-sm bg-gray-900 border border-gray-800 rounded-full px-4 py-1 mb-6">
                  Private Alpha
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-pulse-slow">
                  Securing the
                  <span className="block">
                    AI Identity Fabric
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-300">
                Invisible security for the invisible workforce. We protect the expanding universe of machine identities powering your AI systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 border border-gray-800 bg-gray-900 rounded flex items-center justify-center hover:bg-gray-800 transition">
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button className="px-6 py-3 border border-gray-800 rounded flex items-center justify-center hover:bg-gray-800 transition">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <StatCard value="137×" label="more machine identities than human identities in modern AI architectures" />
              <StatCard value="70%" label="of security incidents involve compromised service identities or API keys" />
              <StatCard value="92%" label="of security teams lack visibility into their expanding machine identity surface" />
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section id="approach" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-20">Redefining Machine Identity Security</h2>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300">
                  Traditional security models fail in AI-powered systems where machine identities outnumber humans by orders of magnitude.
                </p>
                
                <div className="space-y-6 mt-8">
                  <ApproachItem 
                    icon={<Terminal className="h-5 w-5" />}
                    title="Identity-First Architecture"
                    description="Security built around machine identities, not perimeters or networks"
                  />
                  <ApproachItem 
                    icon={<CpuIcon className="h-5 w-5" />}
                    title="AI-Powered Analysis"
                    description="Predictive intelligence that surfaces anomalies before they become incidents"
                  />
                  <ApproachItem 
                    icon={<RefreshCw className="h-5 w-5" />}
                    title="Zero-Touch Operations"
                    description="Autonomous credential rotation and lifecycle management"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-20">Core Technology</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Eye className="h-5 w-5" />}
                title="Autonomous Discovery"
                description="Continuous mapping of all machine identities across cloud providers, containers, and orchestration systems."
              />
              <FeatureCard 
                icon={<AlertTriangle className="h-5 w-5" />}
                title="Behavior Analysis"
                description="AI models that detect abnormal credential usage and evolving attack patterns."
              />
              <FeatureCard 
                icon={<Shield className="h-5 w-5" />}
                title="Risk Quantification"
                description="Prioritized risk scoring based on exposure, permissions, and attack path analysis."
              />
              <FeatureCard 
                icon={<Database className="h-5 w-5" />}
                title="Credential Vault"
                description="Zero-knowledge storage with automated secret rotation and just-in-time access."
              />
              <FeatureCard 
                icon={<Code className="h-5 w-5" />}
                title="Developer APIs"
                description="Seamless integration with CI/CD pipelines and IaC workflows."
              />
              <FeatureCard 
                icon={<Server className="h-5 w-5" />}
                title="Identity Governance"
                description="Policy enforcement with adaptive permissions aligned to security frameworks."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">
                  Join Our Private Alpha
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  We're working with select organizations to deploy our technology in production environments. Request access to be among the first to secure your AI identity fabric.
                </p>
                
                <div className="mt-8 max-w-md mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input 
                      type="email" 
                      placeholder="Work email" 
                      className="sm:col-span-3 bg-black border border-gray-800 rounded px-4 py-3 focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded transition">
                      Request
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Limited availability. We'll contact you within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-8 md:mb-0">
                <Shield className="h-5 w-5 text-white" />
                <span className="text-lg font-bold">Enigma</span>
              </div>
              <div className="text-center md:text-right text-gray-500 text-sm">
                <p>&copy; 2025 Enigma Security, Inc. All rights reserved.</p>
                <p className="mt-1">Stealth mode - By invitation only</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const StatCard = ({ value, label }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
    <div className="text-3xl font-bold mb-3">{value}</div>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

const ApproachItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 rounded bg-gray-900 border border-gray-800">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 h-full flex flex-col">
    <div className="p-2 rounded bg-gray-900 border border-gray-800 inline-block mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mt-auto">{description}</p>
  </div>
);

export default LandingPage;
