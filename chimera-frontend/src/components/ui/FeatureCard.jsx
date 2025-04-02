import React from 'react';

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="relative group transition-all duration-300 hover:-translate-y-2">
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500`}></div>
    <div className="relative h-full backdrop-blur-sm bg-dark-light/70 rounded-lg p-8 border border-dark-lighter">
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

export default FeatureCard;