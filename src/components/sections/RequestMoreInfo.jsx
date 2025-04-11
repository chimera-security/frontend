import React, { useState } from 'react';
import { Calendar, Check, AlertTriangle, Building, Users, Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../utils/supabaseClient';

function RequestMoreInfo() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        teamSize: '',
        role: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    
    const teamSizes = [
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501+ employees'
    ];
    
    const roles = [
        'Security Engineer',
        'Security Architect',
        'CIO/CISO',
        'DevOps Engineer',
        'IT Manager',
        'Other'
    ];
    
    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        if (!formData.role) newErrors.role = 'Role is required';
        
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
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
            // Insert data into Supabase
            const { data, error: supabaseError } = await supabase
                .from('demo_requests')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        company: formData.company,
                        team_size: formData.teamSize,
                        role: formData.role,
                        message: formData.message || null,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (supabaseError) {
                throw new Error(supabaseError.message || 'Something went wrong. Please try again later.');
            }
            
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                company: '',
                teamSize: '',
                role: '',
                message: ''
            });
            
            // Reset success state after 6 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 6000);
            
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="request-demo" className="py-32 bg-gradient-to-b from-dark to-dark-light">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Request More Information" />
            
            <div className="mt-16 grid lg:grid-cols-5 gap-12">
            {/* Left Column - Benefits */}
            <div className="lg:col-span-2 space-y-8">
                <div className="relative p-6 backdrop-blur-md bg-dark-light/30 rounded-xl border border-dark-lighter">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Enterprise-Grade Security</h3>
                <p className="text-slate-400 mb-6">
                    See how Chimera Security can help you secure your machine identities and prevent breaches. We are in development and quickly iterating our product to best serve you.
                </p>
                
                <ul className="space-y-4">
                    {[
                    'Complete machine identity inventory',
                    'Advanced threat detection',
                    'Automated credential lifecycle management',
                    'Compliance reporting & dashboards',
                    'Integration with existing security tools'
                    ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-slate-300">{feature}</span>
                    </li>
                    ))}
                </ul>
                </div>
                
                <div className="relative overflow-hidden rounded-xl border border-dark-lighter">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="relative p-6">
                    <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                    <h4 className="text-lg font-semibold">Your Custom Info Session Includes</h4>
                    </div>
                    <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-500/50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                        <span>60-minute personalized session to learn how we can help YOU!</span>
                    </li>
                    <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-500/50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                        <span>Q&A with the Co-Founding team</span>
                    </li>
                    <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-500/50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                        <span>Tailored to your specific security needs</span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="lg:col-span-3">
                <div className="relative group transform transition-all duration-500 hover:translate-y-[-5px]">
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Form container */}
                <div className="relative backdrop-blur-md bg-dark-light/50 rounded-xl border border-dark-lighter overflow-hidden">
                    
                    {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 px-8">
                        <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-dark-light/80 rounded-full flex items-center justify-center border border-green-500/50">
                            <Check className="w-10 h-10 text-green-500" />
                        </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6 mb-2 gradient-text">Request Received!</h3>
                        <p className="text-slate-400 text-center max-w-md">
                        Thanks for your interest in Chimera Security. One of our enterprise specialists will contact you within 24 hours to schedule your personalized demo.
                        </p>
                        <button 
                        onClick={() => setIsSuccess(false)} 
                        className="mt-8 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                        Submit another request
                        </button>
                    </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                            Full Name <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-dark-lighter border ${
                                errors.name ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300`}
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <div className="absolute right-3 top-3 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                </div>
                            )}
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                            Work Email <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-dark-lighter border ${
                                errors.email ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300`}
                                placeholder="you@company.com"
                            />
                            {errors.email && (
                                <div className="absolute right-3 top-3 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                </div>
                            )}
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">
                            Company <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative">
                            <div className="absolute left-3 top-3 text-slate-500">
                                <Building className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 bg-dark-lighter border ${
                                errors.company ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300`}
                                placeholder="Company name"
                            />
                            {errors.company && (
                                <div className="absolute right-3 top-3 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                </div>
                            )}
                            </div>
                            {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="teamSize" className="block text-sm font-medium text-slate-300 mb-1">
                            Team Size <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative">
                            <div className="absolute left-3 top-3 text-slate-500">
                                <Users className="w-5 h-5" />
                            </div>
                            <select
                                id="teamSize"
                                name="teamSize"
                                value={formData.teamSize}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 bg-dark-lighter border ${
                                errors.teamSize ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 appearance-none`}
                            >
                                <option value="">Select team size</option>
                                {teamSizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                                ))}
                            </select>
                            {errors.teamSize && (
                                <div className="absolute right-3 top-3 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                </div>
                            )}
                            <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            </div>
                            {errors.teamSize && <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
                            Your Role <span className="text-blue-500">*</span>
                            </label>
                            <div className="relative">
                            <div className="absolute left-3 top-3 text-slate-500">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 bg-dark-lighter border ${
                                errors.role ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 appearance-none`}
                            >
                                <option value="">Select your role</option>
                                {roles.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                            {errors.role && (
                                <div className="absolute right-3 top-3 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                </div>
                            )}
                            <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            </div>
                            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                            Additional Information <span className="text-slate-500">(optional)</span>
                            </label>
                            <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 bg-dark-lighter border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                            placeholder="Tell us about your security needs or any specific questions"
                            />
                        </div>
                        </div>
                        
                        {error && (
                        <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                        )}
                        
                        <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative px-6 py-3 bg-dark rounded-lg flex items-center">
                            <span className="mr-2">{isSubmitting ? 'Processing...' : 'Request Info'}</span>
                            <Calendar className={`w-4 h-4 transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                            </div>
                        </button>
                        </div>
                        
                        <p className="text-xs text-slate-500 text-center mt-4">
                        By requesting a demo, you agree to our Terms of Service and Privacy Policy.
                        </p>
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

export default RequestMoreInfo;