import React from 'react';

const SectionHeading = ({ title }) => (
  <div className="text-center">
    <h2 className="inline-block text-3xl md:text-4xl font-bold relative">
      <span className="relative z-10">{title}</span>
      <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 -z-10"></span>
    </h2>
  </div>
);

export default SectionHeading;