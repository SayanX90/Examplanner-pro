'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ListTodo, CheckSquare, Clock, Calendar, ArrowRight, Bell, Zap, Filter } from 'lucide-react';

export default function TasksPage() {
    return (
        <main className="min-h-screen bg-green-200 dark:bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100 via-transparent to-transparent dark:from-green-900/20 dark:via-transparent dark:to-transparent opacity-50"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium text-sm mb-6 border border-green-100 dark:border-green-800">
                            <ListTodo className="w-4 h-4 fill-current" />
                            <span>Ultimate Productivity Suite</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                            Master Your Time,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">Crush Your Goals</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            A unified command center for students. Organize assignments, schedule revisions, and never miss a deadline again.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-white hover:bg-gray-100 text-gray-900 dark:text-black font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                                See It In Action <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Mock Section - Task UI */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop"
                        alt="Task Management Tech Background"
                        fill
                        className="object-cover opacity-20 dark:opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black"></div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Chaos, Organized.
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Bring all your academic responsibilities into one streamlined, intelligent workspace.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Glassmorphism Card */}
                        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Glow Effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

                            {/* Task UI Visuals */}
                            <div className="relative z-10 w-full max-w-3xl mx-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h3>
                                        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">2 Overdue</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-white/20 hover:bg-white/80 transition-colors">
                                            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors">
                                            + New Task
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Task 1 */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border-l-4 border-l-red-500 border-y border-r border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-green-500 transition-colors"></div>
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-gray-900 dark:text-white">Calculus III: Vector Fields</div>
                                            <div className="flex items-center gap-2 text-sm text-red-500 font-medium mt-1">
                                                <Clock className="w-3 h-3" /> Due Today, 5:00 PM
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-600 dark:text-gray-400">High Priority</span>
                                    </div>

                                    {/* Task 2 */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border-l-4 border-l-yellow-500 border-y border-r border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-green-500 transition-colors"></div>
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-gray-900 dark:text-white">Physics Lab Report: Optics</div>
                                            <div className="flex items-center gap-2 text-sm text-yellow-500 font-medium mt-1">
                                                <Calendar className="w-3 h-3" /> Tomorrow
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-600 dark:text-gray-400">Medium</span>
                                    </div>

                                    {/* Task 3 */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-l-4 border-l-green-500 border-y border-r border-gray-100 dark:border-gray-800 opacity-60">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                            <CheckSquare className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-gray-500 line-through">Organic Chemistry Reading</div>
                                            <div className="text-sm text-green-600 font-medium mt-1">Completed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Built for High Performers</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Tools designed to keep you focused and efficient.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-green-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Prioritization</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Not all tasks are created equal. Our system highlights what's urgent and important automatically.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-teal-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                                <Bell className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Intelligent Reminders</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Get nudged at the right time. We send reminders based on your optimal study hours.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                <Clock className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Focus Timer</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Built-in Pomodoro timer linked to specific tasks to ensure deep work sessions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-green-100 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10 p-12 md:p-24 text-center">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-grid-slate-200/[0.04] dark:bg-grid-slate-800/[0.04]"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                Take Control of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">Your Day.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                Stop listing, start doing. Experience the most effective way to manage your academic workload.
                            </p>
                            <Link href="/dashboard/tasks" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                Start Organizing Now <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
