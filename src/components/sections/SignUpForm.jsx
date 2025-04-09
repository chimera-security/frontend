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
        const apiUrl = import.meta.env.VITE_API_URL || 'https://chimera-backend.vercel.app';
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
        <section id="signup" className="py-32 bg-gradient-to-b from-dark to-black relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-purple-900/20 to-transparent"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array(10).fill().map((_, i) => (
            <div 
                key={i}
                className="absolute bg-blue-500/30 rounded-full"
                style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
                }}
            ></div>
            ))}
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="relative">
            {/* Enhanced card with multiple gradients */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/40 via-indigo-600/10 to-purple-600/40 rounded-2xl blur-xl opacity-80"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-md"></div>
            
            <div className="relative backdrop-blur-sm bg-dark-light/40 rounded-2xl border border-slate-700/30 shadow-2xl overflow-hidden">
                {/* Curved header decoration */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="grid md:grid-cols-5 gap-8">
                {/* Left side - description */}
                <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-80"></div>
                    <div className="relative bg-dark-light rounded-full p-4">
                        <Bell className="h-8 w-8 text-blue-400" />
                    </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Stay In The Loop
                    </h2>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Subscribe to our newsletter and get early access to new features, updates, and exclusive offers.
                    </p>
                    
                    <div className="space-y-3">
                    {['Product updates', 'Early access', 'Security alerts'].map((benefit, index) => (
                        <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                        <span className="text-slate-300">{benefit}</span>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* Right side - form */}
                <div className="md:col-span-3 bg-gradient-to-br from-dark to-dark-light/80 p-8 md:p-12 flex items-center">
                    {isSuccess ? (
                    <div className="text-center py-8 w-full">
                        <div className="relative mx-auto mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
                        <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-900/20">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                        You're In!
                        </h3>
                        
                        <p className="text-slate-300 text-lg max-w-md mx-auto mb-6">
                        Thank you for subscribing. We'll keep you updated with all our latest news and features.
                        </p>
                        
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-dark-light/50 border border-slate-700/50 text-sm text-slate-400">
                        <Check className="w-4 h-4 mr-2 text-green-500" /> Subscription confirmed
                        </div>
                    </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                            Your Name <span className="text-slate-500 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <User className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full pl-12 pr-4 py-4 bg-dark border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-inner"
                            />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                            Email Address <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-xl opacity-75 group-focus-within:opacity-100 transition-all duration-300 blur-sm"></div>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                                }}
                                placeholder="you@example.com"
                                className={`relative w-full pl-12 pr-4 py-4 bg-dark border-0 rounded-xl focus:outline-none focus:ring-0 transition-all duration-300 ${
                                error ? 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'shadow-inner'
                                }`}
                                required
                            />
                            </div>
                            {error && (
                            <p className="mt-2 text-sm text-red-500 flex items-center ml-1">
                                <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                                {error}
                            </p>
                            )}
                        </div>
                        
                        <div className="mt-8">
                            <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full group overflow-hidden"
                            >
                            {/* Enhanced gradient button with animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl transition-all duration-300 animate-gradient-x"></div>
                            <div className="absolute inset-0.5 bg-dark rounded-[0.65rem] group-hover:bg-dark/80 transition-colors duration-300"></div>
                            <div className="relative flex items-center justify-center py-4 px-8">
                                <span className="font-medium text-white mr-2 group-hover:mr-3 transition-all duration-300">
                                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                                </span>
                                <ArrowRight className={`w-5 h-5 text-white transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
                            </div>
                            </button>
                        </div>
                        
                        <p className="text-center text-xs text-slate-500 mt-6">
                            We respect your privacy. Unsubscribe at any time with one click.
                        </p>
                        </div>
                    </form>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    }

export default SignUpForm;