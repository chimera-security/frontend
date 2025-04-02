import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import AIVisualization from '../ui/animations/AIVisualization';

function AIIntelligence() {
  const aiCapabilities = [
    "Predict security risks before they materialize", 
    "Detect anomalous credential usage in real-time",
    "Recommend precise policy improvements based on usage patterns",
    "Optimize credential lifecycle management with intelligent scheduling"
  ];

  return (
    <section id="intelligence" className="py-32 bg-gradient-to-b from-dark-light to-dark">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="AI-Powered Security Intelligence" />
        
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-xl text-slate-400">
              Unlike traditional tools that rely on static rules, our platform uses advanced machine learning to deliver predictive security for your machine identities.
            </p>
            
            <div className="space-y-4">
              {aiCapabilities.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"></div>
                    <div className="relative bg-dark text-white w-8 h-8 rounded-full flex items-center justify-center border border-dark-lighter">
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
            <div className="relative backdrop-blur-sm bg-dark-light/50 rounded-lg border border-dark-lighter p-8">
              <AIVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIIntelligence;