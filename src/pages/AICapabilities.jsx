// frontend/src/pages/AICapabilities.jsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Brain, Shield, Lock, ChartBar, Clock, Zap, Database, AlertTriangle, Activity, ChevronRight } from 'lucide-react';
import NavLink from '../components/ui/NavLink';
import { useNavigate, useLocation } from 'react-router-dom';

function AICapabilities() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // Handle navigation back to homepage signup section
    const handleJoinBetaClick = (e) => {
        e.preventDefault();
        navigate('/');
        
        // After navigation, scroll to the signup section
        setTimeout(() => {
            const signupElement = document.getElementById('signup');
            if (signupElement) {
                signupElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };
    
    // Handle navigation back to main page intelligence section
    const handleBackClick = (e) => {
        e.preventDefault();
        navigate('/');
        
        // After navigation, scroll to the intelligence section
        setTimeout(() => {
            const intelligenceElement = document.getElementById('intelligence');
            if (intelligenceElement) {
                intelligenceElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const capabilityGroups = [
        {
        title: "Predictive Intelligence",
        icon: <Brain className="h-8 w-8" />,
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
        icon: <AlertTriangle className="h-8 w-8" />,
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
        icon: <Shield className="h-8 w-8" />,
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
        icon: <Clock className="h-8 w-8" />,
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
        icon: <Activity className="h-6 w-6" />,
        description: "Our AI system uses a multi-layered neural network with specialized attention mechanisms to process vast amounts of authentication and access data."
        },
        {
        title: "Unsupervised Learning",
        icon: <Database className="h-6 w-6" />,
        description: "The platform employs unsupervised learning techniques to establish baselines without requiring manual training or configuration."
        },
        {
        title: "Transfer Learning Models",
        icon: <Zap className="h-6 w-6" />,
        description: "We utilize transfer learning from our vast credential threat database to provide protection against the latest attack vectors."
        },
        {
        title: "Federated Security Intelligence",
        icon: <Lock className="h-6 w-6" />,
        description: "Our system aggregates anonymized threat patterns across our customer base to improve detection capabilities while preserving privacy."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Animated background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]"></div>
                <div className="absolute top-0 w-full h-full bg-grid-pattern opacity-10"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" 
                    style={{animationDelay: '2s'}}></div>
                <div className="absolute top-2/3 right-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" 
                    style={{animationDelay: '3.5s'}}></div>
            </div>
            
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <a 
                        href="/#intelligence" 
                        onClick={handleBackClick}
                        className="inline-flex items-center text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                        <span className="font-medium text-sm">Back</span>
                    </a>
                    
                    <a 
                        href="/#signup" 
                        onClick={handleJoinBetaClick}
                        className="relative group overflow-hidden rounded-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"></div>
                        <div className="relative px-5 py-2 flex items-center group-hover:scale-[0.98] transition-all duration-300">
                            <span className="font-medium text-sm">Join Beta</span>
                            <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </a>
                </div>
            </nav>
            
            {/* Hero section */}
            <div className="relative pt-32 pb-20 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-6 pt-20 relative">
                    <div className="absolute -top-60 -left-60 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                        <div className="md:max-w-2xl">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                Our AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">Capabilities</span>
                            </h1>
                            
                            <p className="mt-6 text-xl text-slate-300 leading-relaxed max-w-2xl">
                                Chimera's advanced artificial intelligence systems deliver unparalleled protection for your machine identities through continuous learning, pattern recognition, and predictive analytics.
                            </p>
                        </div>
                        
                        <div className="hidden lg:block w-80 h-80 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse-slow"></div>
                            <div className="absolute inset-4 rounded-full border border-white/20 backdrop-blur-sm bg-black/30 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                                <Brain className="w-24 h-24 text-blue-400 animate-float" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Capabilities tabs section */}
            <div className="relative z-10 pt-10 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex overflow-x-auto no-scrollbar space-x-2 pb-4 mb-10">
                        {capabilityGroups.map((group, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`flex-none px-5 py-3 rounded-full transition-all duration-300 font-medium text-sm ${
                                    activeTab === index 
                                        ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-lg shadow-blue-900/30' 
                                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className={`transition-colors duration-300 ${activeTab === index ? 'text-white' : 'text-blue-400'}`}>
                                        {group.icon}
                                    </div>
                                    <span>{group.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-70"></div>
                        <div className="relative rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 overflow-hidden">
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                                    <div className="flex-shrink-0">
                                        <div className="relative inline-block">
                                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-xl"></div>
                                            <div className="relative w-20 h-20 rounded-full backdrop-blur-sm bg-black/50 flex items-center justify-center border border-white/10">
                                                <div className={`text-gradient-blue-purple`}>
                                                    {capabilityGroups[activeTab].icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                            {capabilityGroups[activeTab].title}
                                        </h2>
                                        <p className="mt-3 text-slate-300 md:text-lg">
                                            {capabilityGroups[activeTab].description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {capabilityGroups[activeTab].capabilities.map((capability, index) => (
                                        <div 
                                            key={index} 
                                            className="group relative transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                            <div className="relative h-full backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                                <h3 className="font-bold text-white text-lg mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:from-blue-300 group-hover:to-white transition-all duration-300">
                                                    {capability.title}
                                                </h3>
                                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-all duration-300">
                                                    {capability.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Technical details section */}
            <div className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                            Technical Approach
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                            Our AI platform is built on cutting-edge machine learning technologies designed specifically for machine identity security.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technicalDetails.map((detail, index) => (
                            <div 
                                key={index} 
                                className="group relative transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03]"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative h-full backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                                            {detail.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white text-lg mb-3">
                                        {detail.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-all duration-300">
                                        {detail.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* CTA section */}
            <div className="relative z-10 py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-xl"></div>
                        <div className="relative rounded-2xl backdrop-blur-lg bg-black/30 border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                            
                            <div className="relative p-10 md:p-16 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
                                    Experience AI-Powered Security
                                </h2>
                                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                                    Ready to see how our AI technology can protect your machine identities?
                                </p>
                                <a 
                                    href="/#signup" 
                                    onClick={handleJoinBetaClick}
                                    className="relative group inline-block"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
                                    <div className="relative px-8 py-4 bg-black rounded-full flex items-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                        <span className="font-medium">Join Beta</span>
                                        <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </a>
                                
                                <div className="mt-12 flex justify-center space-x-10">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-400">99.8%</div>
                                        <div className="text-sm text-slate-400 mt-1">Threat Detection Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-purple-400">2.5x</div>
                                        <div className="text-sm text-slate-400 mt-1">Faster Response Time</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-indigo-400">85%</div>
                                        <div className="text-sm text-slate-400 mt-1">Reduction in Alerts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add a fake "grid pattern" CSS */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-size: 50px 50px;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                }
                
                .text-gradient-blue-purple {
                    @apply text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </div>
    );
}

export default AICapabilities;