import React from 'react';

function Stats() {
  const stats = [
    { 
      value: '58%', 
      label: 'of organizations experienced incidents related to unmanaged machine identities' 
    },
    { 
      value: '20:1', 
      label: 'typical ratio of machine identities to human users in modern enterprises' 
    },
    { 
      value: '15-20%', 
      label: 'annual growth rate in the machine identity management market' 
    },
  ];

  return (
    <section className="bg-gradient-to-b from-dark to-dark-light py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative h-full backdrop-blur-sm bg-dark-light/80 rounded-lg p-8 border border-dark-lighter flex flex-col items-center text-center">
                <div className="text-4xl font-bold gradient-text mb-3">{stat.value}</div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;