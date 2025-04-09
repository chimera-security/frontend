import React, { useState } from 'react';
import { ArrowRight, Mail, User, Check, Bell } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://chimerabackend.vercel.app/';
        const response = await fetch(`${apiUrl}/api/subscribers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name: name || undefined }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Something went wrong. Please try again later.');
        }
        
        setIsSuccess(true);
        setEmail('');
        setName('');
        setTimeout(() => {
            setIsSuccess(false);
        }, 5000);
        
        } catch (err) {
        setError(err.message || 'Something went wrong. Please try again later.');
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <section id="signup" className="py-32 bg-dark">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title="Get Early Access by Joining Our Beta Program" />
                <div className="mt-16 max-w-4xl mx-auto">
                <div className="relative">
                    {/* Background blur effect */}
                    <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[40px] blur-3xl opacity-50"></div>
                    
                    {/* Content container */}
                    <div className="relative backdrop-blur-lg bg-gradient-to-br from-dark-light/80 to-dark/80 rounded-3xl border border-dark-lighter p-8 md:p-12 overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow" 
                        style={{animationDelay: '2s'}}></div>
                    
                    {/* Main content */}
                    <div className="relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                        <p className="text-slate-400 text-xl">
                            Sign up to help shape the future of machine identity protection.
                        </p>
                        </div>
                        
                        {isSuccess ? (
                        <div className="text-center py-8 max-w-md mx-auto">
                            <div className="inline-flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                                <CheckCircle className="w-16 h-16 text-green-500 relative" />
                            </div>
                            </div>
                            <h4 className="text-xl font-bold mt-6 mb-2 gradient-text">You're In!</h4>
                            <p className="text-slate-400">
                            Thanks for joining our beta program. We'll be in touch soon with your exclusive access details.
                            </p>
                        </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Name <span className="text-slate-500">(optional)</span>
                                </label>
                                <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                placeholder="Your name"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email <span className="text-blue-500">*</span>
                                </label>
                                <div className="relative">
                                <div className="absolute left-3 top-3.5 text-slate-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError('');
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 bg-dark-lighter border ${
                                    error ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300`}
                                    placeholder="your.email@example.com"
                                />
                                {error && (
                                    <div className="absolute right-3 top-3 text-red-500">
                                    <AlertTriangle className="w-5 h-5" />
                                    </div>
                                )}
                                </div>
                                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                            </div>
                            </div>
                            
                            <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative px-6 py-4 bg-dark rounded-lg flex items-center justify-center">
                                <span className="mr-2">{isSubmitting ? 'Processing...' : 'Join Beta Program'}</span>
                                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                                </div>
                            </button>
                            </div>
                            
                            <p className="text-xs text-slate-500 text-center mt-4">
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                        )}
                    </div>
                    </div>
                </div>
                
                {/* Benefits section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {[
                    {
                        title: 'Early Access',
                        description: 'Be among the first to use our cutting-edge security platform.'
                    },
                    {
                        title: 'Priority Support',
                        description: 'Get dedicated support and personalized onboarding assistance.'
                    },
                    {
                        title: 'Influence Development',
                        description: 'Your feedback will directly shape our product roadmap.'
                    }
                    ].map((benefit, index) => (
                    <div key={index} className="relative group transition-all duration-300 hover:-translate-y-2">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative h-full backdrop-blur-sm bg-dark-light/40 rounded-lg p-6 border border-dark-lighter">
                        <h4 className="text-lg font-bold mb-2">{benefit.title}</h4>
                        <p className="text-slate-400 text-sm">{benefit.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </section>
        );
    }
    
    export default SignUpForm;    