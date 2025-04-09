import React from 'react';
import { ArrowLeft, Brain, Shield, Lock, ChartBar, Clock, Zap, Database, AlertTriangle, Activity } from 'lucide-react';
import NavLink from '../components/ui/NavLink';

function AICapabilities() {
    const capabilityGroups = [
        {
        title: "Predictive Intelligence",
        icon: <Brain className="h-8 w-8 text-blue-400" />,
        description: "Our AI-powered neural networks continuously analyze patterns to predict and prevent security risks before they materialize.",
        capabilities: [
            {
            title: "Behavior-Based Risk Prediction",
            description: "Identifies abnormal credential usage patterns that indicate potential security threats by learning normal usage patterns for each machine identity."
            },
            {
            title: "Temporal Analysis",
            description: "Analyzes time-based patterns to detect unusual access times or frequency changes that might indicate compromise."
            },
            {
            title: "Dependency Mapping",
            description: "Automatically maps relationships between machine identities to predict cascade failure risks and lateral movement vulnerabilities."
            }
        ]
        },
        {
        title: "Real-time Anomaly Detection",
        icon: <AlertTriangle className="h-8 w-8 text-purple-400" />,
        description: "Our platform continuously monitors for unusual patterns and instantly alerts you to potential security incidents.",
        capabilities: [
            {
            title: "Credential Misuse Detection",
            description: "Detects when machine identities are used in ways that deviate from their established patterns or authorized permissions."
            },
            {
            title: "Geographic Anomalies",
            description: "Identifies suspicious access attempts from unusual geographic locations or impossible travel scenarios."
            },
            {
            title: "Velocity Monitoring",
            description: "Tracks the rate of authentication attempts and API calls to identify brute force attempts or denial of service patterns."
            }
        ]
        },
        {
        title: "Intelligent Policy Recommendations",
        icon: <Shield className="h-8 w-8 text-indigo-400" />,
        description: "Our AI analyzes your security posture and recommends precise policy improvements based on actual usage patterns.",
        capabilities: [
            {
            title: "Least Privilege Recommendations",
            description: "Analyzes permission usage patterns to recommend right-sizing access rights to the minimum necessary for each identity."
            },
            {
            title: "Policy Conflict Resolution",
            description: "Identifies and suggests fixes for conflicting security policies that could create vulnerabilities or operational issues."
            },
            {
            title: "Benchmark Comparison",
            description: "Compares your security policies against industry best practices and recommends improvements based on your specific risk profile."
            }
        ]
        },
        {
        title: "Smart Lifecycle Management",
        icon: <Clock className="h-8 w-8 text-pink-400" />,
        description: "Our AI optimizes the entire credential lifecycle from provisioning to rotation and decommissioning.",
        capabilities: [
            {
            title: "Intelligent Rotation Scheduling",
            description: "Determines optimal credential rotation schedules based on usage patterns, risk level, and operational impact."
            },
            {
            title: "Automatic Deprovisioning",
            description: "Identifies unused or abandoned machine identities and safely recommends decommissioning to reduce your attack surface."
            },
            {
            title: "Dependency-Aware Updates",
            description: "Coordinates credential updates across dependent systems to prevent outages and ensure operational continuity."
            }
        ]
        }
    ];

    const technicalDetails = [
        {
        title: "Neural Network Architecture",
        icon: <Activity className="h-6 w-6 text-blue-400" />,
        description: "Our AI system uses a multi-layered neural network with specialized attention mechanisms to process vast amounts of authentication and access data."
        },
        {
        title: "Unsupervised Learning",
        icon: <Database className="h-6 w-6 text-purple-400" />,
        description: "The platform employs unsupervised learning techniques to establish baselines without requiring manual training or configuration."
        },
        {
        title: "Transfer Learning Models",
        icon: <Zap className="h-6 w-6 text-indigo-400" />,
        description: "We utilize transfer learning from our vast credential threat database to provide protection against the latest attack vectors."
        },
        {
        title: "Federated Security Intelligence",
        icon: <Lock className="h-6 w-6 text-pink-400" />,
        description: "Our system aggregates anonymized threat patterns across our customer base to improve detection capabilities while preserving privacy."
        }
    ];

    return (
        <div className="min-h-screen bg-dark text-white">
        {/* Header background with gradient */}
        <div className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-light to-dark z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)] z-0"></div>
            
            {/* Floating elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" 
                style={{animationDelay: '2s'}}></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-10">
                <NavLink href="/#intelligence" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to main page</span>
                </NavLink>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our AI <span className="gradient-text">Capabilities</span>
            </h1>
            
            <div className="max-w-3xl">
                <p className="text-xl text-slate-300 leading-relaxed">
                Chimera's advanced artificial intelligence systems deliver unparalleled protection for your machine identities through continuous learning, pattern recognition, and predictive analytics.
                </p>
            </div>
            </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
            {/* Capability groups */}
            <div className="space-y-24">
            {capabilityGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="relative">
                {/* Section connector line */}
                {groupIndex < capabilityGroups.length - 1 && (
                    <div className="absolute left-10 top-24 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent"></div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                    {/* Left side - Icon and title */}
                    <div className="md:w-64 flex-shrink-0">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-xl"></div>
                        <div className="relative w-20 h-20 rounded-full bg-dark-light/50 backdrop-blur-sm flex items-center justify-center border border-dark-lighter">
                        {group.icon}
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mt-6 gradient-text">{group.title}</h2>
                    <p className="mt-3 text-slate-400">{group.description}</p>
                    </div>
                    
                    {/* Right side - Capabilities */}
                    <div className="flex-1 grid md:grid-cols-2 gap-6">
                    {group.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="relative group transform transition-all duration-300 hover:-translate-y-2">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative h-full backdrop-blur-sm bg-dark-light/40 rounded-lg p-6 border border-dark-lighter">
                            <h3 className="font-bold text-white mb-3">{capability.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{capability.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            ))}
            </div>
            
            {/* Technical details section */}
            <div className="mt-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Technical Approach</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                Our AI platform is built on cutting-edge machine learning technologies designed specifically for machine identity security.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicalDetails.map((detail, index) => (
                <div key={index} className="relative group transform transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative h-full backdrop-blur-sm bg-dark-light/40 rounded-lg p-6 border border-dark-lighter">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 mr-3">
                        {detail.icon}
                        </div>
                        <h3 className="font-bold text-white">{detail.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{detail.description}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
            
            {/* CTA section */}
            <div className="mt-32">
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
                <div className="relative backdrop-blur-md bg-dark-light/30 rounded-xl border border-dark-lighter p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Experience AI-Powered Security
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Ready to see how our AI technology can protect your machine identities?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <NavLink href="/#signup" className="relative group inline-block">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
                    <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center border border-dark-lighter group-hover:border-blue-500/50 transition-all duration-300">
                        <span>Join Beta Program</span>
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                    </NavLink>
                    <NavLink href="/#request-demo" className="relative group inline-block">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
                    <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center border border-dark-lighter group-hover:border-blue-500/50 transition-all duration-300">
                        <span>Request Enterprise Demo</span>
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                    </NavLink>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AICapabilities;