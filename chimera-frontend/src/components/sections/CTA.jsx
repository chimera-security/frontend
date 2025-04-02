import React from 'react';
import { ArrowRight } from 'lucide-react';

function CTA() {
  return (
    <section className="py-32 bg-dark">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
          <div className="relative backdrop-blur-sm bg-gradient-to-br from-dark-light/90 to-dark/90 rounded-xl border border-dark-lighter p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your Machine Identities?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join leading organizations that trust our platform to protect their most sensitive credentials.
            </p>
            <button className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center">
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;