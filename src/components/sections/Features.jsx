import React from 'react';
import { Shield, AlertTriangle, RefreshCw, Database, Lock, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from '../ui/FeatureCard';

function Features() {
  const featuresData = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Automated Discovery',
      description: 'Identify all secure accounts, API keys, tokens, and certificates with intelligent scanning technology.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Risk Detection',
      description: 'AI-powered analysis identifies weak configurations, unused credentials, and security threats.',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: 'Lifecycle Automation',
      description: 'Automate credential rotation, revocation, and provisioning while maintaining operational continuity.',
      gradient: 'from-teal-500 to-emerald-500'
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Centralized Inventory',
      description: 'Unified dashboard with complete visibility into non-human identities with contextual risk data.',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Policy Enforcement',
      description: 'Define and automatically enforce security policies to maintain compliance and reduce attack surface.',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Anomaly Detection',
      description: 'ML models detect unusual credential usage patterns and alert you to potential compromises in real-time.',
      gradient: 'from-purple-500 to-blue-500'
    }
  ];

  return (
    <section id="features" className="py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Next-Gen Machine Identity Management" />
        
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;