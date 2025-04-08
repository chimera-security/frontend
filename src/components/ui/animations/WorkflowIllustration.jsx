import React from 'react';
import { Shield, RefreshCw, AlertTriangle } from 'lucide-react';

const WorkflowIllustration = ({ step }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {step === 1 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full animate-ping-slow"></div>
          </div>
          <Shield className="h-16 w-16 text-blue-500" />
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-2 w-full px-8">
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full w-full animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-4/5"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full w-3/5"></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full w-2/3 animate-pulse" 
               style={{animationDelay: '0.5s'}}></div>
          <div className="h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-3/4"></div>
        </div>
      )}
      
      {step === 3 && (
        <div className="grid grid-cols-2 gap-2 w-full p-4">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="h-12 border border-dark-lighter rounded-md flex items-center justify-center overflow-hidden">
              <div className="w-full bg-gradient-to-r from-green-500/20 to-green-500/10 h-full transform origin-left scale-x-0" 
                   style={{
                     animation: `growFromLeft 2s ease-out ${i * 0.2}s forwards`
                   }}></div>
              <RefreshCw className="absolute h-4 w-4 text-green-500" />
            </div>
          ))}
        </div>
      )}
      
      {step === 4 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-t-purple-600 border-r-blue-600 border-b-cyan-600 border-l-transparent animate-spin-slow"></div>
          <div className="absolute flex flex-col items-center">
            <AlertTriangle className="h-10 w-10 text-slate-200" />
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1 w-16 mt-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowIllustration;