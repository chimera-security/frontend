import React from 'react';
import { ArrowRight, Brain, Shield, Clock, ChartBar, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import AIVisualization from '../ui/animations/AIVisualization';
import NavLink from '../ui/NavLink';

function AIIntelligence() {
  const aiCapabilities = [
    {
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      title: "Predictive Threat Detection",
      description: "Identify security risks before they materialize through pattern recognition and behavioral analysis"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Real-time Anomaly Detection",
      description: "Detect unusual credential usage patterns instantly with our neural network monitoring system"
    },
    {
      icon: <ChartBar className="h-6 w-6 text-indigo-400" />,
      title: "Intelligent Policy Recommendations",
      description: "Get actionable security policy improvements based on actual usage data and industry benchmarks"
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-400" />,
      title: "Smart Lifecycle Management",
      description: "Optimize credential rotation and provisioning with AI-driven scheduling that reduces risk"
    }
  ];

  const aiMetrics = [
    { value: "99.8%", label: "detection accuracy" },
    { value: "3.4×", label: "faster than manual audits" },
    { value: "87%", label: "reduction in false positives" }
  ];

  return (
    <section id="intelligence" className="py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-light to-dark"></div>
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-float" 
            style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="AI-Powered Security Intelligence" />
        
        <div className="mt-8 text-center mx-auto max-w-3xl">
          <p className="text-xl text-slate-300 leading-relaxed">
            Our platform uses advanced machine learning to deliver predictive security that evolves with your environment - replacing static rules with dynamic intelligence.
          </p>
        </div>
        
        {/* Metrics */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {aiMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">{metric.value}</div>
              <div className="text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left side: Visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative group transform transition-all duration-500 hover:translate-y-[-5px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative backdrop-blur-md bg-dark-light/40 rounded-xl border border-dark-lighter p-8 md:p-10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <AIVisualization />
                  
                  <div className="mt-8 p-4 bg-dark/60 backdrop-blur-sm rounded-lg border border-dark-lighter">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-400 mr-2" />
                      <div className="text-sm text-slate-300">
                        <span className="font-semibold">Live AI Analysis:</span> Our neural networks continuously learn from new threats and adapt protection strategies
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Capabilities */}
          <div className="order-1 lg:order-2 space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="relative group transform transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative h-full backdrop-blur-sm bg-dark-light/40 rounded-lg p-6 border border-dark-lighter">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 mr-3">
                        {capability.icon}
                      </div>
                      <h3 className="font-bold text-white">{capability.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:justify-start mt-8">
              <NavLink href="/ai-capabilities" className="relative group inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
                <div className="relative px-6 py-3 bg-dark-light/80 backdrop-blur-sm rounded-lg flex items-center border border-dark-lighter group-hover:border-blue-500/50 transition-all duration-300">
                  <span className="mr-2 text-white group-hover:text-blue-100 transition-colors duration-300">Learn more about our AI capabilities</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIIntelligence;