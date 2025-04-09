import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, Shield, Lock, Zap,
  Globe, Database, Server, RefreshCw,
  LineChart, FileCheck, Check,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const steps = [
    { 
      id: "01", 
      title: "Identity Graph Mapping", 
      description: "Our platform builds a comprehensive identity graph that maps all service relationships across your entire infrastructure.", 
      icon: <Network />,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      bgColor: "bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent",
      features: [
        "Maps all service relationships in real-time",
        "Visualizes identity lineage across environments",
        "Connects cloud, on-premise, and SaaS resources"
      ],
      visual: {
        type: "graph",
        primary: <Network size={32} />,
        elements: [
          { type: "cloud", label: "Cloud Services" },
          { type: "database", label: "Databases" },
          { type: "server", label: "Servers" },
          { type: "app", label: "Applications" }
        ]
      }
    },
    { 
      id: "02", 
      title: "Risk Assessment & Scoring", 
      description: "Advanced ML algorithms analyze the identity graph to perform risk-based scoring and detect abnormal behavior patterns.", 
      icon: <Shield />,
      color: "from-blue-600 to-indigo-700",
      textColor: "text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent",
      features: [
        "Real-time risk scoring for all identities",
        "Abnormal behavior pattern detection",
        "Automated vulnerability identification"
      ],
      visual: {
        type: "score",
        primary: <Shield size={32} />,
        elements: [
          { level: "high", value: 93, label: "API Service" },
          { level: "medium", value: 52, label: "Database Access" },
          { level: "low", value: 19, label: "Log Service" }
        ]
      }
    },
    { 
      id: "03", 
      title: "Zero-Trust Enforcement", 
      description: "Our identity broker enforces security controls at runtime and issues ephemeral just-in-time credentials for service communication.", 
      icon: <Lock />,
      color: "from-indigo-700 to-violet-800",
      textColor: "text-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-900/20 via-violet-900/10 to-transparent",
      features: [
        "Runtime security control enforcement",
        "Just-in-time ephemeral credentials",
        "Prevents unauthorized lateral movement"
      ],
      visual: {
        type: "secure",
        primary: <Lock size={32} />,
        elements: [
          { type: "allowed", label: "API Gateway" },
          { type: "allowed", label: "Auth Service" },
          { type: "denied", label: "Storage Service" }
        ]
      }
    },
    { 
      id: "04", 
      title: "Automated Remediation", 
      description: "Deploy automated remediation playbooks to rotate credentials, revoke excessive permissions, and enforce least-privilege access.", 
      icon: <Zap />,
      color: "from-violet-800 to-purple-900",
      textColor: "text-violet-400",
      bgColor: "bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-transparent",
      features: [
        "Automated credential rotation",
        "Excessive permission revocation",
        "Least-privilege enforcement"
      ],
      visual: {
        type: "workflow",
        primary: <Zap size={32} />,
        elements: [
          { step: 1, label: "Detect", icon: <Shield size={18} /> },
          { step: 2, label: "Analyze", icon: <LineChart size={18} /> },
          { step: 3, label: "Remediate", icon: <RefreshCw size={18} /> },
          { step: 4, label: "Verify", icon: <FileCheck size={18} /> }
        ]
      }
    },
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Visual component for each step
  const StepVisual = ({ step, isActive }) => {
    const visual = steps[step].visual;
    
    if (visual.type === "graph") {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-md p-8">
            {/* Simple Network Graph */}
            <div className="grid grid-cols-3 gap-6">
              {/* Central Identity Hub */}
              <motion.div 
                className="col-start-2 col-span-1 row-start-2 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg`}>
                  {visual.primary}
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-300 bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-md w-fit mx-auto">Identity Hub</p>
              </motion.div>
              
              {/* Connected Resources */}
              <motion.div 
                className="col-start-1 col-span-1 row-start-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
                transition={{ delay: isActive ? 0.3 : 0, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-md flex items-center justify-center mb-2">
                    <Globe size={24} className="text-gray-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-md">Cloud Services</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-start-3 col-span-1 row-start-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
                transition={{ delay: isActive ? 0.4 : 0, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-md flex items-center justify-center mb-2">
                    <Database size={24} className="text-gray-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-md">Databases</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-start-1 col-span-1 row-start-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: isActive ? 0.5 : 0, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-md flex items-center justify-center mb-2">
                    <Server size={24} className="text-gray-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-md">Servers</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-start-3 col-span-1 row-start-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: isActive ? 0.6 : 0, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-md flex items-center justify-center mb-2">
                    <Lock size={24} className="text-gray-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-gray-800/70 backdrop-blur-sm px-2 py-1 rounded-md">Applications</span>
                </div>
              </motion.div>
              
              {/* Animated pulse effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-cyan-500/10"
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{ 
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.2, 0.3, 0.2] 
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    
    if (visual.type === "score") {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-full max-w-md p-6">
            {/* Central shield */}
            <motion.div 
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg relative`}>
                {visual.primary}
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
            
            {/* Risk scores */}
            <div className="space-y-8">
              {visual.elements.map((element, idx) => {
                const colorClass = 
                  element.level === "high" ? "bg-red-500" : 
                  element.level === "medium" ? "bg-yellow-500" : 
                  "bg-green-500";
                
                const bgColorClass = 
                  element.level === "high" ? "bg-red-900/20" : 
                  element.level === "medium" ? "bg-yellow-900/20" : 
                  "bg-green-900/20";
                
                return (
                  <motion.div 
                    key={idx}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0, 
                      x: isActive ? 0 : -20 
                    }}
                    transition={{ delay: isActive ? 0.2 + (0.2 * idx) : 0, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${colorClass} mr-3`}></div>
                        <span className="text-sm font-medium text-gray-300">{element.label}</span>
                      </div>
                      <motion.span 
                        className={`text-sm font-bold ${element.level === "high" ? "text-red-400" : element.level === "medium" ? "text-yellow-400" : "text-green-400"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ delay: isActive ? 0.7 + (0.2 * idx) : 0, duration: 0.3 }}
                      >
                        {element.value}%
                      </motion.span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${bgColorClass}`}>
                      <motion.div 
                        className={`h-full rounded-full ${colorClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${element.value}%` : 0 }}
                        transition={{ delay: isActive ? 0.4 + (0.2 * idx) : 0, duration: 0.7 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    
    if (visual.type === "secure") {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Central node */}
            <motion.div 
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                scale: isActive ? 1 : 0.8 
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg mb-3 relative`}>
                {visual.primary}
                <div className="absolute -inset-2 bg-indigo-500/20 rounded-2xl blur-md"></div>
              </div>
              <span className="text-sm font-medium text-gray-300 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-md">Identity Broker</span>
            </motion.div>
            
            {/* Connected services */}
            <div className="grid grid-cols-3 gap-4">
              {visual.elements.map((element, idx) => (
                <motion.div 
                  key={idx}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    y: isActive ? 0 : 20 
                  }}
                  transition={{ delay: isActive ? 0.3 + (0.2 * idx) : 0, duration: 0.4 }}
                >
                  <div className={`relative w-full aspect-square rounded-xl bg-gray-800/80 backdrop-blur-sm border ${element.type === "denied" ? "border-red-500/50" : "border-indigo-500/50"} flex items-center justify-center mb-3 shadow-lg`}>
                    {element.type === "allowed" ? (
                      <div className="flex items-center justify-center flex-col">
                        <Server size={24} className="text-gray-300 mb-2" />
                        <div className="px-3 py-1 bg-indigo-500/30 rounded-full">
                          <span className="text-xs font-medium text-indigo-300">Secured</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center flex-col">
                        <div className="relative">
                          <Server size={24} className="text-gray-300 mb-2" />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0, 
                              rotate: isActive ? 0 : -45 
                            }}
                            transition={{ delay: isActive ? 0.5 + (0.1 * idx) : 0, duration: 0.3 }}
                          >
                            <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                            <div className="w-full h-0.5 bg-red-500 -rotate-45"></div>
                          </motion.div>
                        </div>
                        <div className="px-3 py-1 bg-red-500/30 rounded-full">
                          <span className="text-xs font-medium text-red-300">Blocked</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-gray-800/50 backdrop-blur-sm px-2 py-1 rounded-md text-center">{element.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    if (visual.type === "workflow") {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <motion.div 
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                y: isActive ? 0 : -20 
              }}
              transition={{ duration: 0.4 }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg relative`}>
                {visual.primary}
                <div className="absolute -inset-2 bg-violet-500/20 rounded-full blur-md"></div>
              </div>
            </motion.div>
            
            {/* Workflow steps */}
            <div className="relative flex flex-col">
              {visual.elements.map((element, idx) => (
                <motion.div 
                  key={idx}
                  className="flex mb-8 last:mb-0 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    x: isActive ? 0 : -20 
                  }}
                  transition={{ delay: isActive ? 0.2 + (0.2 * idx) : 0, duration: 0.4 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg flex-shrink-0 mr-4`}>
                    {element.icon}
                  </div>
                  <div className="flex-grow pt-1">
                    <div className="flex items-center">
                      <h4 className="text-base font-medium text-gray-300">{element.label}</h4>
                      <motion.div 
                        className="h-px flex-grow bg-gradient-to-r from-violet-600/30 to-transparent ml-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ delay: isActive ? 0.4 + (0.1 * idx) : 0, duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                      ></motion.div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {idx === 0 && "Identify security risks and anomalies"}
                      {idx === 1 && "Evaluate impact and determine action"}
                      {idx === 2 && "Apply security controls automatically"}
                      {idx === 3 && "Confirm successful remediation"}
                    </div>
                    
                    {/* Step completion checkmark */}
                    <motion.div 
                      className="absolute right-0 top-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0, 
                        scale: isActive ? 1 : 0 
                      }}
                      transition={{ delay: isActive ? 0.5 + (0.2 * idx) : 0, duration: 0.3 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <Check size={14} className="text-violet-400" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Connector line */}
                  {idx < visual.elements.length - 1 && (
                    <motion.div 
                      className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-violet-600 to-indigo-800 z-0"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ delay: isActive ? 0.4 + (0.2 * idx) : 0, duration: 0.5 }}
                      style={{ transformOrigin: "top" }}
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  // Timeline navigation component
  const StepTimeline = () => {
    return (
      <div className="flex justify-center items-center space-x-6 mt-6 md:mt-10">
        {steps.map((step, idx) => (
          <button
            key={idx}
            className="group flex flex-col items-center"
            onClick={() => setActiveStep(idx)}
            aria-label={`Go to step ${idx + 1}`}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer mb-2
                  ${activeStep === idx 
                    ? `bg-gradient-to-r ${step.color} shadow-lg` 
                    : 'bg-gray-800 border border-gray-700'
                  } transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs font-bold text-white">{step.id}</span>
                
                {/* Subtle pulse for active step */}
                {activeStep === idx && (
                  <motion.span
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color}`}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.span>
                )}
              </motion.div>
              
              <motion.span 
                className={`text-xs font-medium transition-colors duration-300 text-center w-24 line-clamp-1
                  ${activeStep === idx ? step.textColor : 'text-gray-500 group-hover:text-gray-300'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {step.title}
              </motion.span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  // Card for the step details
  const StepCard = ({ step, isActive }) => {
    return (
      <motion.div
        className={`bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg h-full flex flex-col ${steps[step].bgColor}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${steps[step].color} flex items-center justify-center shadow-lg mr-4`}>
              {steps[step].icon}
            </div>
            <div>
              <div className="flex items-center">
                <span className={`text-sm font-mono ${steps[step].textColor} mr-2`}>{steps[step].id}</span>
                <h3 className={`text-xl font-bold ${steps[step].textColor}`}>
                  {steps[step].title}
                </h3>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 text-sm lg:text-base">
            {steps[step].description}
          </p>
          
          {/* Feature list */}
          <div className="space-y-3">
            {steps[step].features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                transition={{ delay: isActive ? 0.3 + (0.1 * idx) : 0, duration: 0.4 }}
              >
                <div className={`p-1 rounded-full bg-gradient-to-r ${steps[step].color} mr-3 mt-0.5`}>
                  <Check size={14} />
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="how-it-works" 
      className="py-16 md:py-24 bg-gray-900 text-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 text-blue-300">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              The Zero-Trust Machine Identity Platform
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
            A fundamental shift in how organizations secure machine-to-machine communication. Our platform acts as an identity broker that enforces security controls at runtime while automating the full credential lifecycle.
          </p>
        </motion.div>
        
        {/* Timeline navigation */}
        <div className="relative mb-12">
          <StepTimeline />
          
          {/* Line connecting the dots (hidden on mobile) */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gray-800 -z-10 hidden md:block"></div>
        </div>
        
        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left column: Visual display */}
          <div className="order-2 md:order-1 bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-auto min-h-[350px] relative">
            <div className={`h-full w-full bg-gradient-to-br ${steps[activeStep].bgColor} relative`}>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              {/* Visual content */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  className="h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps.map((_, idx) => (
                    <div key={idx} style={{ display: activeStep === idx ? 'block' : 'none', height: '100%' }}>
                      <StepVisual step={idx} isActive={activeStep === idx} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              {/* Step number indicator */}
              <div className="absolute top-4 left-4 text-4xl font-bold opacity-10 font-mono">
                {steps[activeStep].id}
              </div>
            </div>
          </div>
          
          {/* Right column: Text content */}
          <div className="order-1 md:order-2 h-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                {steps.map((_, idx) => (
                  <div key={idx} style={{ display: activeStep === idx ? 'block' : 'none', height: '100%' }}>
                    <StepCard step={idx} isActive={activeStep === idx} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <motion.button
            className="bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center p-3 transition-all duration-300 hover:bg-gray-800 hover:border-gray-600"
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} className="text-gray-300" />
          </motion.button>
          
          <motion.button
            className="bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center p-3 transition-all duration-300 hover:bg-gray-800 hover:border-gray-600"
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} className="text-gray-300" />
          </motion.button>
        </div>
        
        {/* Key benefits section */}
        <div className="mt-24">
          <motion.h3 
            className="text-2xl font-bold text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Key <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Benefits</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={24} />,
                title: "Comprehensive Protection",
                description: "End-to-end security across all your infrastructure",
                gradient: "from-blue-600 to-cyan-600"
              },
              {
                icon: <RefreshCw size={24} />,
                title: "Continuous Monitoring",
                description: "Real-time identity risk assessment and protection",
                gradient: "from-indigo-600 to-purple-600"
              },
              {
                icon: <Globe size={24} />,
                title: "Multi-Cloud Support",
                description: "Unified security across cloud providers and on-prem",
                gradient: "from-violet-600 to-purple-600"
              },
              {
                icon: <Zap size={24} />,
                title: "Automated Security",
                description: "Reduce manual intervention with smart automation",
                gradient: "from-purple-600 to-pink-600"
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ delay: 0.1 * idx + 0.5, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-1 w-full bg-gradient-to-r group-hover:opacity-100 opacity-75 transition-opacity duration-300"></div>
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg shadow-blue-500/10 transform group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Background grid pattern style */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;