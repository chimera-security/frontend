import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import WorkflowIllustration from '../ui/animations/WorkflowIllustration';

function HowItWorks() {
  const steps = [
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
  ];

  return (
    <section id="how-it-works" className="py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="How Our Platform Works" />
        
        <div className="mt-20">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-transparent"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative mb-24 last:mb-0">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:rtl' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'md:text-right' : ''} md:ltr`}>
                    <div className="flex items-center mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"></div>
                        <div className="relative bg-dark text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border border-dark-lighter">
                          {step.number}
                        </div>
                      </div>
                      <div className="h-0.5 flex-grow bg-gradient-to-r from-blue-600 to-purple-600 ml-4 hidden md:block"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                  
                  <div className="h-64 relative overflow-hidden rounded-lg border border-dark-lighter md:ltr">
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
  );
}

export default HowItWorks;