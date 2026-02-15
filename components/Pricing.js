'use client';

import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const pricingPlans = [
        {
            name: 'Basic',
            price: 'Free',
            period: 'forever',
            description: 'Essential tools for students just starting their journey.',
            features: [
                'Add up to 2 subjects',
                'Manual roadmap creation',
                'Basic task tracking',
                'Mobile responsive dashboard',
                'Community support'
            ],
            cta: 'Get Started Free',
            href: '/signup',
            popular: false,
            gradient: 'border-transparent',
            buttonStyle: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
        },
        {
            name: 'Intermediate',
            price: billingCycle === 'monthly' ? '₹199' : '₹1,910',
            period: billingCycle === 'monthly' ? '/month' : '/year',
            billed: billingCycle === 'yearly' ? 'Save 20%' : '',
            description: 'Perfect for serious students who need structure.',
            features: [
                'Up to 5 Subjects',
                'AI Roadmap Generation',
                'Progress Analytics',
                'Exam Countdown',
                'Priority Task Management',
                'Email Support'
            ],
            cta: 'Start Free Trial',
            href: '/signup',
            popular: false,
            gradient: 'border-blue-500/30',
            buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
        },
        {
            name: 'Advanced',
            price: billingCycle === 'monthly' ? '₹399' : '₹3,830',
            period: billingCycle === 'monthly' ? '/month' : '/year',
            billed: billingCycle === 'yearly' ? 'Save 20%' : '',
            description: 'The ultimate toolkit for high achievers and aspirants.',
            features: [
                'Unlimited Subjects',
                'Smart AI Roadmap Engine',
                'Advanced Analytics Dashboard',
                'Priority Features Access',
                'Download Roadmap as PDF',
                '24/7 Priority Support',
                'Exam Performance Insights'
            ],
            cta: 'Get Advanced',
            href: '/signup',
            popular: true,
            gradient: 'border-purple-500',
            buttonStyle: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40'
        }
    ];

    return (
        <section id="pricing" className="py-24 relative overflow-hidden dark:bg-black">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-6">
                        Invest in Your Future
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Choose the plan that fits your study needs. Upgrade anytime as you grow.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                        >
                            <div
                                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                            Yearly <span className="text-green-500 font-bold ml-1 text-xs uppercase bg-green-500/10 px-2 py-1 rounded-full">Save 20%</span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl p-[1px] ${plan.popular ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' : 'bg-gray-200 dark:bg-gray-800'} h-full`}
                        >
                            <div className="h-full bg-white dark:bg-gray-900/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col relative overflow-hidden">
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        {plan.name}
                                        {plan.popular && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-black text-gray-900 dark:text-white">
                                            {plan.price}
                                        </span>
                                        {plan.price !== 'Free' && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                    {plan.billed && (
                                        <p className="text-xs text-green-500 font-medium mt-1">
                                            {plan.billed}
                                        </p>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-6"></div>

                                {/* Features */}
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start space-x-3">
                                            <div className="mt-0.5 min-w-[18px]">
                                                <Check className={`w-4.5 h-4.5 ${plan.popular ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-tight">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    href={plan.href}
                                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-center text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${plan.buttonStyle}`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
