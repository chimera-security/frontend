import React, { useState, useEffect } from 'react';
import { Key, Shield, Lock, Zap, Database, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-black z-0">
        <div className="absolute -inset-[10%] opacity-20 blur-3xl">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-blue-900 rounded-full animate-pulse" 
               style={{ animationDuration: '15s', transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-indigo-800 rounded-full animate-pulse" 
               style={{ animationDuration: '20s', animationDelay: '2s', transform: `translateY(${scrollY * -0.05}px)` }} />
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-purple-900 rounded-full animate-pulse" 
               style={{ animationDuration: '25s', animationDelay: '1s', transform: `translateY(${scrollY * 0.08}px)` }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="backdrop-blur-md bg-black/40 border-b border-slate-800 sticky top-0 z-50 transition-all duration-300" 
             style={{ height: scrollY > 50 ? '70px' : '90px' }}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-md blur-sm animate-pulse"></div>
                <Key className="h-7 w-7 text-white relative z-10" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                NexusID
              </span>
            </div>
            
            <div className="hidden lg:flex space-x-10">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#intelligence">AI Intelligence</NavLink>
              <NavLink href="#about">About</NavLink>
            </div>
            
            <button className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-6 py-3 bg-black rounded-lg flex items-center">
                <span>Request Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 md:pr-12" 
                 style={{ transform: `translateY(${scrollY * -0.1}px)`, opacity: Math.max(0, 1 - scrollY * 0.001) }}>
              <div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-24 mb-6"></div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Secure Your 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
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
                  <div className="relative px-8 py-4 bg-black rounded-lg">
                    Get Started
                  </div>
                </button>
                <button className="px-8 py-4 border border-slate-700 rounded-lg hover:bg-white/5 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block" style={{ perspective: '1000px', transform: `translateY(${scrollY * 0.1}px)` }}>
              <div className="relative w-full aspect-square" style={{ transform: `rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * -0.01}deg)` }}>
                <SecurityGridAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-b from-black to-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: '58%', label: 'of organizations experienced incidents related to unmanaged machine identities' },
                { value: '20:1', label: 'typical ratio of machine identities to human users in modern enterprises' },
                { value: '15-20%', label: 'annual growth rate in the machine identity management market' },
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative h-full backdrop-blur-sm bg-slate-900/80 rounded-lg p-8 border border-slate-800 flex flex-col items-center text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
                      {stat.value}
                    </div>
                    <p className="text-slate-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Next-Gen Machine Identity Management" />
            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Shield className="h-6 w-6" />}
                title="Automated Discovery"
                description="Identify all service accounts, API keys, tokens, and certificates with intelligent scanning technology."
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureCard 
                icon={<AlertTriangle className="h-6 w-6" />}
                title="Risk Detection"
                description="AI-powered analysis identifies weak configurations, unused credentials, and security threats."
                gradient="from-cyan-500 to-teal-500"
              />
              <FeatureCard 
                icon={<RefreshCw className="h-6 w-6" />}
                title="Lifecycle Automation"
                description="Automate credential rotation, revocation, and provisioning while maintaining operational continuity."
                gradient="from-teal-500 to-emerald-500"
              />
              <FeatureCard 
                icon={<Database className="h-6 w-6" />}
                title="Centralized Inventory"
                description="Unified dashboard with complete visibility into non-human identities with contextual risk data."
                gradient="from-emerald-500 to-green-500"
              />
              <FeatureCard 
                icon={<Lock className="h-6 w-6" />}
                title="Policy Enforcement"
                description="Define and automatically enforce security policies to maintain compliance and reduce attack surface."
                gradient="from-green-500 to-blue-500"
              />
              <FeatureCard 
                icon={<Zap className="h-6 w-6" />}
                title="Anomaly Detection"
                description="ML models detect unusual credential usage patterns and alert you to potential compromises in real-time."
                gradient="from-purple-500 to-blue-500"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="How Our Platform Works" />
            <div className="mt-20">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-transparent"></div>
                {[
                  { 
                    number: "01", 
                    title: "Discover", 
                    description: "Our collectors scan your cloud, on-premise, and SaaS environments to identify all machine identities." 
                  },
                  { 
                    number: "02", 
                    title: "Analyze", 
                    description: "AI-powered risk assessment identifies vulnerabilities, misconfigurations, and potential threats." 
                  },
                  { 
                    number: "03", 
                    title: "Remediate", 
                    description: "Automate credential rotation, revocation, and policy enforcement to reduce risk." 
                  },
                  { 
                    number: "04", 
                    title: "Monitor", 
                    description: "Continuous monitoring detects anomalies and ensures ongoing compliance with security policies." 
                  },
                ].map((step, index) => (
                  <div key={index} className="relative mb-24 last:mb-0">
                    <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:rtl' : ''}`}>
                      <div className={`${index % 2 === 1 ? 'md:text-right' : ''} md:ltr`}>
                        <div className="flex items-center mb-4">
                          <div className="relative flex-shrink-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"></div>
                            <div className="relative bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border border-slate-700">
                              {step.number}
                            </div>
                          </div>
                          <div className="h-0.5 flex-grow bg-gradient-to-r from-blue-600 to-purple-600 ml-4 hidden md:block"></div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-slate-400">{step.description}</p>
                      </div>
                      <div className="h-64 relative overflow-hidden rounded-lg border border-slate-800 md:ltr">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                        <WorkflowIllustration step={index + 1} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Intelligence Section */}
        <section id="intelligence" className="py-32 bg-gradient-to-b from-slate-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="AI-Powered Security Intelligence" />
            <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <p className="text-xl text-slate-400">
                  Unlike traditional tools that rely on static rules, our platform uses advanced machine learning to deliver predictive security for your machine identities.
                </p>
                <div className="space-y-4">
                  {[
                    "Predict security risks before they materialize", 
                    "Detect anomalous credential usage in real-time",
                    "Recommend precise policy improvements based on usage patterns",
                    "Optimize credential lifecycle management with intelligent scheduling"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"></div>
                        <div className="relative bg-black text-white w-8 h-8 rounded-full flex items-center justify-center border border-slate-700">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-slate-300 pt-1">{item}</span>
                    </div>
                  ))}
                </div>
                <button className="group flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <span>Learn more about our AI capabilities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg blur-xl"></div>
                <div className="relative backdrop-blur-sm bg-slate-900/50 rounded-lg border border-slate-800 p-8">
                  <AIVisualization />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-slate-900/90 to-black/90 rounded-xl border border-slate-800 p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your Machine Identities?
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Join leading organizations that trust our platform to protect their most sensitive credentials.
                </p>
                <button className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative px-8 py-4 bg-black rounded-lg flex items-center">
                    <span>Request a Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-12 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-8 md:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-md blur-sm"></div>
                  <Key className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  NexusID
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#how-it-works">How It Works</NavLink>
                <NavLink href="#intelligence">AI Intelligence</NavLink>
                <NavLink href="#about">About</NavLink>
              </div>
              <div className="flex space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-12 text-center text-slate-500">
              <p>&copy; 2025 NexusID. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// --- Sub-components ---

const NavLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-slate-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300"
  >
    {children}
  </a>
);

const SectionHeading = ({ title }) => (
  <div className="text-center">
    <h2 className="inline-block text-3xl md:text-4xl font-bold relative">
      <span className="relative z-10">{title}</span>
      <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 -z-10"></span>
    </h2>
  </div>
);

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="relative group transition-all duration-300 hover:-translate-y-2">
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500`}></div>
    <div className="relative h-full backdrop-blur-sm bg-slate-900/70 rounded-lg p-8 border border-slate-800">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

const SecurityGridAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg"></div>
      <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-1 p-4">
        {Array(64).fill().map((_, i) => (
          <div key={i} className="relative">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md opacity-0"
              style={{
                animation: `pulse 3s ease-in-out ${i % 13 * 0.1}s infinite`,
                opacity: Math.random() > 0.7 ? 0.7 : 0.2
              }}
            ></div>
            <div className="absolute inset-0 border border-slate-700 rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-70 animate-pulse"></div>
          <Shield className="h-20 w-20 text-white relative z-10" />
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

const WorkflowIllustration = ({ step }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {step === 1 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full animate-ping"></div>
          </div>
          <Shield className="h-16 w-16 text-blue-500" />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-2 w-full px-8">
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full w-full animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-4/5"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full w-3/5"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full w-2/3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-3/4"></div>
        </div>
      )}
      {step === 3 && (
        <div className="grid grid-cols-2 gap-2 w-full p-4">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="h-12 border border-slate-700 rounded-md flex items-center justify-center overflow-hidden">
              <div className="w-full bg-gradient-to-r from-green-500/20 to-green-500/10 h-full transform origin-left scale-x-0 animate-growFromLeft" 
                   style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}></div>
              <RefreshCw className="absolute h-4 w-4 text-green-500" />
            </div>
          ))}
        </div>
      )}
      {step === 4 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-t-purple-600 border-r-blue-600 border-b-cyan-600 border-l-transparent animate-spin"></div>
          <div className="absolute flex flex-col items-center">
            <AlertTriangle className="h-10 w-10 text-slate-200" />
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1 w-16 mt-2"></div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes growFromLeft {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

const AIVisualization = () => {
  return (
    <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0">
        {Array(20).fill().map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float 10s linear ${Math.random() * 5}s infinite`,
              animationDirection: i % 2 === 0 ? 'alternate' : 'alternate-reverse'
            }}
          ></div>
        ))}
      </div>
      
      {/* Neural connections */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          {Array(15).fill().map((_, i) => {
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = Math.random() * 100;
            const y2 = Math.random() * 100;
            return (
              <line 
                key={i}
                x1={`${x1}%`} 
                y1={`${y1}%`} 
                x2={`${x2}%`} 
                y2={`${y2}%`} 
                stroke="url(#line-gradient)" 
                strokeWidth="1"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
                style={{
                  animation: `pulse 5s ease-in-out ${i * 0.3}s infinite`
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Central AI node */}
      <div className="relative z-10">
        <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-80 animate-pulse"></div>
        <div className="relative bg-black/50 backdrop-blur-xl border border-slate-700 rounded-lg p-4 text-center">
          <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <div className="text-lg font-bold">Predictive Intelligence</div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
