'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, TrendingUp, PieChart, Activity, ArrowRight, Zap, Target, Search } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <main className="min-h-screen bg-purple-200 dark:bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent dark:from-purple-900/20 dark:via-transparent dark:to-transparent opacity-50"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium text-sm mb-6 border border-purple-100 dark:border-purple-800">
                            <Activity className="w-4 h-4 fill-current" />
                            <span>Data-Driven Study Insights</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                            Visualize Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Academic Growth</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Stop guessing effectively. Our AI Analytics Engine tracks every minute, every topic, and every score to give you a clear path to improvement.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-white hover:bg-gray-100 text-gray-900 dark:text-black font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                                Explore Features <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Mock Section - Data Dashboard */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                        alt="Analytics Data Background"
                        fill
                        className="object-cover opacity-20 dark:opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black"></div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Deep Dive Into Your Data
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            From study hours to topic mastery, see exactly where you stand and what needs attention.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Glassmorphism Card */}
                        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Glow Effects */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -mr-32 -mb-32"></div>

                            {/* Analytics Visuals */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {/* Chart 1: Study Consistency */}
                                <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-gray-900 dark:text-white">Study Consistency</h3>
                                        <span className="text-green-500 text-sm font-bold">+15% vs last week</span>
                                    </div>
                                    <div className="h-40 flex items-end justify-between gap-2">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                            <div key={i} className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm relative group/bar">
                                                <div
                                                    className="absolute bottom-0 left-0 w-full rounded-t-sm bg-gradient-to-t from-purple-500 to-pink-500 opacity-90 transition-all duration-500 group-hover/bar:bg-pink-400"
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                    </div>
                                </div>

                                {/* Chart 2: Topic Mastery Radar */}
                                <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 flex flex-col justify-center items-center">
                                    <h3 className="w-full font-bold text-gray-900 dark:text-white mb-6 text-left">Subject Mastery</h3>
                                    <div className="relative w-48 h-48 flex items-center justify-center">
                                        {/* Abstract representation of a radar chart */}
                                        <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full opacity-30"></div>
                                        <div className="absolute inset-4 border-4 border-gray-200 dark:border-gray-700 rounded-full opacity-30"></div>
                                        <div className="absolute inset-8 border-4 border-gray-200 dark:border-gray-700 rounded-full opacity-30"></div>

                                        {/* Data Blob */}
                                        <div className="absolute inset-2 bg-gradient-to-br from-purple-500/50 to-pink-500/50 blur-xl rounded-full animate-pulse"></div>
                                        <div className="relative z-10 text-center">
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">88%</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest">Physics</div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-6 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600 dark:text-gray-400">Math</span>
                                            <span className="font-bold text-purple-600">76%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                            <div className="bg-purple-600 h-1.5 rounded-full w-[76%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/Steps */}
            <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How Analytics Helps You</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Turn raw data into better grades.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-purple-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Track Progress</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Monitor your study hours, task completion rates, and adherence to the schedule in real-time.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-pink-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                                <Search className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Identify Weaknesses</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Our AI detects which topics you're struggling with and suggests targeted revision sessions.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Predict Performance</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Based on your consistency and test scores, get an AI prediction of your likely exam performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-purple-100 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/10 p-12 md:p-24 text-center">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-grid-slate-200/[0.04] dark:bg-grid-slate-800/[0.04]"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Full Potential.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                Data is the difference between working hard and working smart. Start tracking your journey today.
                            </p>
                            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                Access Analytics Dashboard <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
