'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-20 md:py-32">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6 animate-slide-up">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            FREE Mock AI System - No API Costs
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        AI Study Planner +<br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Smart Exam Coach
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Plan your studies efficiently with AI-generated roadmaps, smart task management, and progress tracking
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link href="/signup" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                            <span>Get Started Free</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#features" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
                            View Features
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Free to Use</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">AI</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Powered</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">Smart</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Planning</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
