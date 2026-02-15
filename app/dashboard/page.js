'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState, useMemo } from 'react';
import { getSubjects, getTasks, getRoadmaps } from '@/lib/firebase_db';
import Link from 'next/link';
import { BookOpen, CheckSquare, TrendingUp, ArrowRight, Calendar, Zap, Map as MapIcon, Clock } from 'lucide-react';

export default function DashboardOverview() {
    const { user, loading: authLoading } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [roadmaps, setRoadmaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            setIsLoading(true);
            try {
                const [subjectsResult, tasksResult, roadmapsResult] = await Promise.all([
                    getSubjects(user.uid),
                    getTasks(user.uid),
                    getRoadmaps(user.uid)
                ]);

                if (subjectsResult.success) setSubjects(subjectsResult.data);
                if (tasksResult.success) setTasks(tasksResult.data);
                if (roadmapsResult.success) setRoadmaps(roadmapsResult.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    // Calculate Analytics
    const analytics = useMemo(() => {
        const now = new Date();

        // 1. Task Progress
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;
        const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // 2. Exam Countdown (Nearest Future Exam)
        const upcomingExams = subjects
            .filter(s => new Date(s.examDate) >= now) // Filter past exams (roughly)
            .sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

        const nearestExam = upcomingExams[0];
        let daysLeft = 0;
        if (nearestExam) {
            const examDate = new Date(nearestExam.examDate);
            const diffTime = examDate - now;
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        // 3. Current Focus Week (Based on active roadmap)
        // Assume the most recently created roadmap is active
        const activeRoadmap = roadmaps[0]; // roadmaps are ordered desc by createdAt
        let currentWeekTitle = "No Active Plan";
        let weekNumber = 0;
        let roadmapProgress = 0;

        if (activeRoadmap) {
            // Calculate Roadmap Progress
            const totalWeeks = activeRoadmap.roadmap?.length || 0;
            const completedWeeksCount = activeRoadmap.completedWeeks?.length || 0;
            if (totalWeeks > 0) {
                roadmapProgress = Math.round((completedWeeksCount / totalWeeks) * 100);
            }

            // Calculate Current Week (Time-based fallback or Next Incomplete)
            // Let's use "Next Incomplete" as the true "Focus"
            if (activeRoadmap.roadmap) {
                // Find first index NOT in completedWeeks
                const firstIncompleteIndex = activeRoadmap.roadmap.findIndex((_, idx) => !activeRoadmap.completedWeeks?.includes(idx));

                if (firstIncompleteIndex !== -1) {
                    weekNumber = firstIncompleteIndex + 1;
                    currentWeekTitle = activeRoadmap.roadmap[firstIncompleteIndex].title;
                } else if (totalWeeks > 0 && completedWeeksCount === totalWeeks) {
                    weekNumber = totalWeeks;
                    currentWeekTitle = "All Weeks Completed! 🎉";
                } else {
                    // Fallback to time-based if no completion data started? No, better to stick to one logic.
                    // If nothing completed, week 1.
                    weekNumber = 1;
                    currentWeekTitle = activeRoadmap.roadmap[0]?.title || "Week 1";
                }
            }
        }

        return {
            totalSubjects: subjects.length,
            totalTasks,
            completedTasks,
            progressPercentage: roadmapProgress, // Use Roadmap Progress now
            daysLeft: daysLeft > 0 ? daysLeft : 0,
            nearestExamName: nearestExam ? nearestExam.name : null,
            currentWeekTitle,
            weekNumber: weekNumber > 0 ? weekNumber : 1,
            activeRoadmapId: activeRoadmap?.id
        };
    }, [subjects, tasks, roadmaps]);

    // Stats Cards Configuration
    const statsCards = [
        {
            label: 'Total Subjects',
            value: analytics.totalSubjects,
            icon: BookOpen,
            color: 'from-blue-500 to-cyan-400',
            subtext: `${analytics.completedTasks} tasks done`
        },
        {
            label: 'Study Progress',
            value: `${analytics.progressPercentage}%`,
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-400',
            subtext: 'Keep it up!'
        },
        {
            label: 'Current Streak',
            value: '5 Days',
            icon: Zap,
            color: 'from-yellow-500 to-orange-400',
            subtext: 'Mock Streak 🔥'
        },
    ];

    if (authLoading || isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-20 bg-slate-900/50 rounded-2xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-900/50 rounded-2xl"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-slate-400">Track your progress and stay exam-ready.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Exam Countdown Banner (New) */}
            {analytics.nearestExamName && (
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Clock size={120} className="text-white transform rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-blue-400 mb-1">
                                <Calendar size={18} />
                                <span className="text-sm font-semibold uppercase tracking-wider">Upcoming Exam</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1">
                                {analytics.daysLeft} Days Left
                            </h2>
                            <p className="text-slate-300">
                                until your <span className="text-white font-semibold">{analytics.nearestExamName}</span> exam.
                            </p>
                        </div>
                        {analytics.activeRoadmapId ? (
                            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-5 py-3 rounded-xl min-w-[200px]">
                                <p className="text-xs text-slate-400 mb-1 uppercase tracking-wide font-medium">Current Focus</p>
                                <p className="text-white font-semibold truncate flex items-center gap-2">
                                    <MapIcon size={16} className="text-purple-400" />
                                    Week {analytics.weekNumber}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 truncate">{analytics.currentWeekTitle}</p>
                            </div>
                        ) : (
                            <Link href="/dashboard/roadmap" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
                                Create Roadmap
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsCards.map((stat, index) => (
                    <div key={index} className="relative group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`}></div>

                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-lg shadow-black/20`}>
                                <stat.icon className="text-white" size={24} />
                            </div>
                            {index === 1 && ( // Progress Badge for middle card
                                <span className={`text-xs px-2 py-1 rounded-full border ${analytics.progressPercentage >= 50 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                                    {analytics.progressPercentage >= 50 ? 'On Track' : 'In Progress'}
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-slate-400 font-medium mb-1">{stat.label}</p>
                            <p className="text-xs text-slate-500">{stat.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent & Upcoming Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Subjects */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Your Subjects</h3>
                        <Link href="/dashboard/subjects" className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {subjects.slice(0, 3).map((subject) => (
                            <div key={subject.id} className="flex items-center gap-4 p-4 bg-slate-950/40 border border-slate-800/50 rounded-xl hover:border-slate-700 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <BookOpen size={20} className="text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-white">{subject.name}</h4>
                                    <p className="text-xs text-slate-500">
                                        Exam: {new Date(subject.examDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs capitalize border ${subject.difficulty === 'hard' ? 'border-red-500/20 text-red-400 bg-red-500/10' : subject.difficulty === 'medium' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/10' : 'border-green-500/20 text-green-400 bg-green-500/10'}`}>
                                    {subject.difficulty}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Upcoming Tasks</h3>
                        <Link href="/dashboard/tasks" className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {tasks.filter(t => !t.completed).slice(0, 3).map((task) => (
                            <div key={task.id} className="flex items-start gap-3 p-4 bg-slate-950/40 border border-slate-800/50 rounded-xl hover:border-slate-700 transition-colors">
                                <div className={`w-5 h-5 mt-0.5 rounded border ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-600'} flex items-center justify-center`}>
                                    {task.completed && <CheckSquare size={12} className="text-white" />}
                                </div>
                                <div>
                                    <p className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {tasks.filter(t => !t.completed).length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <p>No pending tasks! 🎉</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
