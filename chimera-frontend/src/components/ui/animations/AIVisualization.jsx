import React from 'react';
import { Zap } from 'lucide-react';

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
              animation: `float ${8 + Math.random() * 4}s linear ${Math.random() * 5}s infinite`,
              animationDirection: i % 2 === 0 ? 'alternate' : 'alternate-reverse'
            }}
          ></div>
        ))}
      </div>
      
      {/* Neural connections */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" style={{position: 'absolute'}}>
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
        <div className="relative bg-dark/50 backdrop-blur-xl border border-dark-lighter rounded-lg p-4 text-center">
          <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <div className="text-lg font-bold">Predictive Intelligence</div>
        </div>
      </div>
    </div>
  );
};

export default AIVisualization;