'use client';

import Link from 'next/link';
import { Brain, check, BarChart3, Layers, Zap, Check, ArrowRight, Calendar, Clock, Target } from 'lucide-react';

export default function Features() {
    return (
        <section id="features" className="py-24 dark:bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* 1. Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 border border-blue-100 dark:border-blue-800">
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Next-Gen Study Intelligence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                        Experience the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Smart Learning</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Stop planning manually. Let our AI construct the perfect path to your academic success while you focus on what matters—learning.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-32">

                    {/* Feature 1: AI Roadmap Engine */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
                                AI Powered
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Your Personal Syllabus Navigator
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Our advanced AI algorithm breaks down your entire syllabus into manageable weekly targets, adapting to your pace and exam deadline instantly.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Instant syllabus breakdown by topic weightage',
                                    'Dynamic rescheduling if you miss a day',
                                    'Smart revision buffers before exams'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/roadmap" className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                                Explore Roadmap Engine <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Visual Mock */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-6 transform transition-transform duration-500 hover:scale-[1.01]">
                                    {/* Fake Roadmap UI */}
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">JEE Advanced 2026</div>
                                                <div className="text-xs text-gray-500">24 Weeks Remaining</div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                                            On Track
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {/* Week Item 1 */}
                                        <div className="flex gap-4 relative">
                                            <div className="flex flex-col items-center">
                                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold z-10">1</div>
                                                <div className="w-0.5 h-full bg-blue-100 dark:bg-gray-800 -my-2"></div>
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Physics: Rotational Motion</span>
                                                        <span className="text-xs text-gray-500">4 hrs</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
                                                        <div className="bg-blue-600 h-1.5 rounded-full w-3/4"></div>
                                                    </div>
                                                    <div className="flex gap-2 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Theory</span>
                                                        <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Practice</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Week Item 2 */}
                                        <div className="flex gap-4 relative">
                                            <div className="flex flex-col items-center">
                                                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 border-2 border-blue-600 dark:border-blue-500 flex items-center justify-center text-xs font-bold z-10 text-blue-600">2</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Math: Calculus - Limits</span>
                                                        <span className="text-xs text-gray-500">6 hrs</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Smart Analytics (Reverse Layout) */}
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-6">
                                Data Driven
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Visualize Your Growth
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Don't just study hard, study smart. Our analytics dashboard gives you deep insights into your performance, helping you identify weak areas before exam day.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Real-time progress tracking per subject',
                                    'Consistency heatmap for study streaks',
                                    'Performance prediction based on history'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/analytics" className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                                View Demo Dashboard <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Visual Mock - Redesigned with Image Background */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] border border-gray-200 dark:border-gray-800">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                        alt="Analytics Dashboard Background"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 dark:opacity-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                                </div>

                                {/* Glass Overlay Content */}
                                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <div className="text-xs text-gray-300 mb-1 uppercase tracking-wider">Total Study Hours</div>
                                            <div className="text-3xl font-bold text-white">124.5 <span className="text-sm font-normal text-green-400">+12%</span></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white"><BarChart3 className="w-4 h-4" /></div>
                                        </div>
                                    </div>

                                    {/* Charts */}
                                    <div className="flex items-end justify-between gap-2 h-24 mb-6">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                            <div key={i} className="w-full bg-white/10 rounded-t-sm relative group/bar">
                                                <div
                                                    className="absolute bottom-0 left-0 w-full rounded-t-sm bg-gradient-to-t from-purple-500 to-pink-500 opacity-90 transition-all duration-500 group-hover/bar:opacity-100 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                            <div className="text-[10px] text-purple-300 uppercase">Tasks Done</div>
                                            <div className="text-lg font-bold text-white">85/112</div>
                                        </div>
                                        <div className="px-3 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30">
                                            <div className="text-[10px] text-pink-300 uppercase">Current Streak</div>
                                            <div className="text-lg font-bold text-white">14 Days 🔥</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Task Command Center */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <div className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold mb-6">
                                Productivity
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Ultimate Task Command Center
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Never miss a deadline again. Organize your assignments, projects, and revision sessions in one unified workspace designed for high-performance students.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Priority-based task sorting',
                                    'Automated exam countdown timers',
                                    'Focus mode timer built-in'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/tasks" className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                                Start Organizing <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Visual Mock - Redesigned with Image Background */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] border border-gray-200 dark:border-gray-800">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop"
                                        alt="Task Management Background"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 dark:opacity-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                                </div>

                                {/* Glass Overlay Content */}
                                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold text-lg text-white">Today's Focus</h4>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Task 1 */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10 shadow-sm border-l-2 border-l-red-500">
                                            <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white">Calculus Final Review</div>
                                                <div className="text-xs text-red-400 font-medium">Due Today • High Priority</div>
                                            </div>
                                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-gray-300">2h</div>
                                        </div>

                                        {/* Task 2 */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/10 shadow-sm border-l-2 border-l-yellow-500">
                                            <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white/90">Physics Lab Report</div>
                                                <div className="text-xs text-yellow-400 font-medium">Due Tomorrow</div>
                                            </div>
                                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-gray-300">45m</div>
                                        </div>

                                        {/* Task 3 */}
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/10 border border-white/5 opacity-60">
                                            <div className="w-5 h-5 rounded-full bg-green-500/80 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-400 line-through">Chemistry Chapter 4</div>
                                                <div className="text-xs text-green-400/80">Completed</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
