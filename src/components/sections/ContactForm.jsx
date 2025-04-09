import React, { useState } from 'react';
import { Send, Check, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    
    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
        setErrors({ ...errors, [name]: null });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
        const apiUrl = import.meta.env.VITE_API_URL || 'chimerabackend.vercel.app';
        const response = await fetch(`${apiUrl}/api/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Something went wrong. Please try again later.');
        }
        
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
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
        <section id="contact" className="py-32 bg-gradient-to-b from-dark-light to-dark relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-500/70 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-purple-500/70 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-500/70 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
            <SectionHeading title="Get in Touch" />
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
                Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
            </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
            <div className="relative">
                {/* Card background glow and glass effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative backdrop-blur-sm bg-dark-light/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
                
                {isSuccess ? (
                    <div className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-600/20 animate-bounce" style={{animationDuration: '2s'}}>
                        <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">Message Sent!</h3>
                    <p className="text-slate-300 text-lg max-w-md mx-auto">
                        Thank you for contacting us. We'll get back to you shortly.
                    </p>
                    <div className="mt-8 flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Full Name <span className="text-blue-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-lg opacity-75 group-focus-within:opacity-100 transition-all duration-300 blur-sm"></div>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`relative w-full px-5 py-4 bg-dark border-0 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
                                errors.name ? 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'shadow-inner'
                            }`}
                            placeholder="John Doe"
                            />
                        </div>
                        {errors.name && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>{errors.name}</p>}
                        </div>
                        
                        <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Email Address <span className="text-blue-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-lg opacity-75 group-focus-within:opacity-100 transition-all duration-300 blur-sm"></div>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`relative w-full px-5 py-4 bg-dark border-0 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
                                errors.email ? 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'shadow-inner'
                            }`}
                            placeholder="john@example.com"
                            />
                        </div>
                        {errors.email && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-1.5">
                        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Company <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg opacity-50 group-focus-within:opacity-100 transition-all duration-300 blur-sm"></div>
                            <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="relative w-full px-5 py-4 bg-dark border-0 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0 shadow-inner transition-all duration-300"
                            placeholder="ACME Inc."
                            />
                        </div>
                        </div>
                        
                        <div className="md:col-span-2 space-y-1.5">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Message <span className="text-blue-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-lg opacity-75 group-focus-within:opacity-100 transition-all duration-300 blur-sm"></div>
                            <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className={`relative w-full px-5 py-4 bg-dark border-0 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
                                errors.message ? 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'shadow-inner'
                            }`}
                            placeholder="How can we help you today?"
                            ></textarea>
                        </div>
                        {errors.message && <p className="mt-2 text-sm text-red-500 flex items-center"><span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>{errors.message}</p>}
                        </div>
                    </div>
                    
                    {error && (
                        <div className="mt-8 p-4 bg-red-900/20 border border-red-800 rounded-xl backdrop-blur-sm">
                        <p className="text-red-400 text-sm flex items-start">
                            <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2 flex-shrink-0 mt-0.5"></span>
                            <span>{error}</span>
                        </p>
                        </div>
                    )}
                    
                    <div className="mt-10 flex justify-end">
                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative group overflow-hidden"
                        >
                        {/* Button glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-1000 animate-gradient-shift"></div>
                        
                        {/* Button inner content */}
                        <div className="relative px-8 py-4 bg-dark rounded-lg flex items-center space-x-3 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-dark/90">
                            <span className="text-white font-medium">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            <Send className={`w-5 h-5 text-white transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                        </div>
                        </button>
                    </div>
                    </form>
                )}
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    }

export default ContactForm;