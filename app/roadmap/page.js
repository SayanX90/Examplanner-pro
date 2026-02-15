'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Brain, Calendar, CheckCircle, TrendingUp, Target, Clock, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function RoadmapPage() {
    return (
        <main className="min-h-screen bg-blue-200 dark:bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent opacity-50"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 border border-blue-100 dark:border-blue-800">
                            <Brain className="w-4 h-4 fill-current" />
                            <span>AI-Powered Study Planning</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                            Turn Your Syllabus into a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Actionable Plan</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Stop worrying about *what* to study. Our AI Roadmap Engine breaks down your entire curriculum into a personalized weekly schedule.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-white hover:bg-gray-100 text-gray-900 dark:text-black font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                                See How It Works <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Mock Section - Redesigned with Image Background */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="AI Network Background"
                        fill
                        className="object-cover opacity-20 dark:opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black"></div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Visualize Your Success
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            See the big picture. Our AI connects every topic, chapter, and concept into a seamless learning journey.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Glassmorphism Card */}
                        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Glow Effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

                            {/* Timeline Content */}
                            <div className="relative z-10">
                                <div className="space-y-12">
                                    {/* Item 1 */}
                                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Goal Setting</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Define your exam targets and timeline. Our AI analyzes your syllabus and creates a strategic plan.</p>
                                        </div>
                                    </div>

                                    {/* Connecting Line */}
                                    <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-green-600 hidden md:block"></div>

                                    {/* Item 2 */}
                                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
                                        <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-600/30 z-10 group-hover:scale-110 transition-transform">
                                            <Layers className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Scheduling</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Receive a balanced weekly schedule that adapts to your learning speed and unexpected breaks.</p>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
                                        <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-600/30 z-10 group-hover:scale-110 transition-transform">
                                            <CheckCircle className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Progress Mastery</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Track your completion rates, identify weak spots, and ensure you're exam-ready with confidence.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/Steps */}
            <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Your path to success in 3 simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-blue-600">1</div>
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 relative z-10">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Input Your Syllabus</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                                Enter your subjects, chapters, and exam dates. Our system supports all major curriculums and competitive exams.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 relative overflow-hidden group hover:border-purple-500/30 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-purple-600">2</div>
                            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 relative z-10">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">AI Generates Plan</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                                Our sophisticated algorithm creates a balanced weekly schedule, prioritizing high-weightage topics and your weak areas.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 relative overflow-hidden group hover:border-green-500/30 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-green-600">3</div>
                            <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 text-green-600 dark:text-green-400 relative z-10">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Track & Adapt</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                                Mark your progress daily. If you fall behind, the roadmap automatically adjusts to keep you on track for exam day.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 p-12 md:p-24 text-center">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-grid-slate-200/[0.04] dark:bg-grid-slate-800/[0.04]"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                Stop Guessing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Start Achieving.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                The Roadmap Engine is just one part of your success toolkit. Unlock the full potential of AI-driven study planning today.
                            </p>
                            <Link href="/dashboard/roadmap" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                Generate My Free Roadmap <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
