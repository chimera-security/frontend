import React, { useState } from 'react';
import { Calendar, Check, AlertTriangle, Building, Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../utils/supabaseClient';

function RequestMoreInfo() {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        contactInfo: '',
        interests: []
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    
    const roles = [
        'CEO / CTO',
        'CIO / CISO',
        'Security Engineer',
        'Security Architect',
        'Engineer',
        'IT Manager',
        'Other'
    ];
    
    const interestOptions = [
        'Machine identity inventory',
        'Credential lifecycle management',
        'Inline Enforcement',
        'Compliance reporting',
        'Threat detection',
        'Integration with existing tools'
    ];
    
    const validate = () => {
        const newErrors = {};
        
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact information is required';
        if (formData.interests.length === 0) newErrors.interests = 'Please select at least one area of interest';
        
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };
    
    const handleInterestChange = (interest) => {
        const updatedInterests = formData.interests.includes(interest)
            ? formData.interests.filter(item => item !== interest)
            : [...formData.interests, interest];
            
        setFormData({ ...formData, interests: updatedInterests });
        
        if (errors.interests) {
            setErrors({ ...errors, interests: null });
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
                .from('request_info')
                .insert([
                    {
                        company: formData.company,
                        role: formData.role,
                        contact_info: formData.contactInfo,
                        interests: formData.interests,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (supabaseError) {
                // Check for duplicate error (if you have a unique constraint on any fields)
                if (supabaseError.code === '23505' || supabaseError.message.includes('duplicate key value')) {
                    // Handle duplicate gracefully - either treat as success or show a specific message
                    // For example, if you have unique constraint on contact_info:
                    setIsSuccess(true); // Treat as success
                } else {
                    throw new Error(supabaseError.message || 'Something went wrong. Please try again later.');
                }
            } else {
                setIsSuccess(true);
            }
            
            setFormData({
                company: '',
                role: '',
                contactInfo: '',
                interests: []
            });
            
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
        <section id="request-info" className="py-32 bg-gradient-to-b from-dark to-dark-light">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Enterprise Security Solutions" />
            
            <div className="mt-12 max-w-3xl mx-auto text-center">
                <p className="text-xl text-slate-300 mb-8">
                    Looking for enterprise-grade machine identity protection? 
                    Let us know what you're interested in and we'll schedule a 
                    personalized consultation.
                </p>
            </div>
            
            <div className="mt-8 max-w-3xl mx-auto">
                {/* Form container with glow effect */}
                <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative backdrop-blur-md bg-dark-light/50 rounded-xl border border-dark-lighter overflow-hidden">
                    
                    {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 px-8">
                        <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-dark-light/80 rounded-full flex items-center justify-center border border-green-500/50">
                            <Check className="w-10 h-10 text-green-500" />
                        </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6 mb-2 gradient-text">Thank You!</h3>
                        <p className="text-slate-400 text-center max-w-md">
                        We've received your inquiry and will reach out within 24 hours to schedule your personalized consultation.
                        </p>
                    </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-6">
                            {/* Company Field */}
                            <div className="space-y-2">
                                <label htmlFor="company" className="block text-sm font-medium text-slate-300">
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
                                        placeholder="Your company name"
                                    />
                                    {errors.company && (
                                        <div className="absolute right-3 top-3 text-red-500">
                                        <AlertTriangle className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                            </div>
                            
                            {/* Role Field */}
                            <div className="space-y-2">
                                <label htmlFor="role" className="block text-sm font-medium text-slate-300">
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
                            
                            {/* Contact Info Field */}
                            <div className="space-y-2">
                                <label htmlFor="contactInfo" className="block text-sm font-medium text-slate-300">
                                Contact Information <span className="text-blue-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contactInfo"
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-dark-lighter border ${
                                    errors.contactInfo ? 'border-red-500' : 'border-dark-lighter focus:border-blue-500'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300`}
                                    placeholder="Your email or phone number"
                                />
                                {errors.contactInfo && <p className="mt-1 text-sm text-red-500">{errors.contactInfo}</p>}
                            </div>
                            
                            {/* Areas of Interest */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-300">
                                Areas of Interest <span className="text-blue-500">*</span>
                                </label>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {interestOptions.map((interest, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`interest-${index}`}
                                                checked={formData.interests.includes(interest)}
                                                onChange={() => handleInterestChange(interest)}
                                                className="w-4 h-4 text-blue-600 bg-dark-lighter border-dark-lighter rounded focus:ring-blue-500"
                                            />
                                            <label 
                                                htmlFor={`interest-${index}`} 
                                                className="ml-2 text-sm text-slate-300 cursor-pointer"
                                            >
                                                {interest}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.interests && <p className="mt-1 text-sm text-red-500">{errors.interests}</p>}
                            </div>
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                        <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                        )}
                        
                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative px-6 py-3 bg-dark rounded-lg flex items-center">
                            <span className="mr-2">{isSubmitting ? 'Processing...' : 'Request Consultation'}</span>
                            <Calendar className={`w-4 h-4 transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                            </div>
                        </button>
                        </div>
                        
                        <p className="text-xs text-slate-500 text-center mt-4">
                        Your information will never be shared with third parties.
                        </p>
                    </form>
                    )}
                </div>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {[
                {
                    title: 'Comprehensive Protection',
                    description: 'Complete machine identity inventory and management for your entire organization.'
                },
                {
                    title: 'Enterprise Integration',
                    description: 'Seamless integration with your existing security infrastructure and SSO.'
                },
                {
                    title: 'Dedicated Support',
                    description: 'Enterprise customers receive priority support and a dedicated security consultant.'
                }
                ].map((feature, index) => (
                <div key={index} className="relative group transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative h-full backdrop-blur-sm bg-dark-light/40 rounded-lg p-6 border border-dark-lighter">
                    <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </section>
    );
}

export default RequestMoreInfo;