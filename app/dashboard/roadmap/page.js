'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSubjects, saveRoadmap, getRoadmaps, updateRoadmap } from '@/lib/firebase_db';
import { useSearchParams } from 'next/navigation';
import { Map, Calendar, BookOpen, AlertCircle, Sparkles, Loader2, CheckCircle2, Link as LinkIcon, ChevronDown, Search, ArrowRight, Lightbulb, Check, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import CustomDropdown from '@/components/dashboard/CustomDropdown';

export default function RoadmapPage() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const [loading, setLoading] = useState(false);
    const [loadingSubjects, setLoadingSubjects] = useState(true);
    const [roadmap, setRoadmap] = useState(null);
    const [roadmapId, setRoadmapId] = useState(null); // Track Firestore Document ID
    const [tips, setTips] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Tracking Progress
    const [completedWeeks, setCompletedWeeks] = useState([]); // Array of week indices
    const [completedTasks, setCompletedTasks] = useState([]); // Array of strings "weekIndex-taskIndex"
    const [updatingParams, setUpdatingParams] = useState(false); // Loading state for updates

    // Fetch user's subjects and roadmaps
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoadingSubjects(true);

            try {
                const [subjectsResult, roadmapsResult] = await Promise.all([
                    getSubjects(user.uid),
                    getRoadmaps(user.uid)
                ]);

                if (subjectsResult.success) {
                    setSubjects(subjectsResult.data);
                }

                // If a subject is already selected (e.g. persisted state), try to load its roadmap
                if (selectedSubjectId && roadmapsResult.success) {
                    const existingRoadmap = roadmapsResult.data.find(r => r.subjectId === selectedSubjectId);
                    if (existingRoadmap) {
                        setRoadmap(existingRoadmap.roadmap);
                        setTips(existingRoadmap.tips || []);
                        setRoadmapId(existingRoadmap.id);
                        setCompletedWeeks(existingRoadmap.completedWeeks || []);
                        setCompletedTasks(existingRoadmap.completedTasks || []);
                    } else {
                        // Reset if no roadmap found for this subject
                        setRoadmap(null);
                        setRoadmapId(null);
                        setCompletedWeeks([]);
                        setCompletedTasks([]);
                        setTips([]);
                    }
                }

            } catch (error) {
                console.error("Error loading initial data:", error);
            } finally {
                setLoadingSubjects(false);
            }
        };

        fetchData();
    }, [user, selectedSubjectId]); // Re-run when subject changes to load *that* subject's roadmap

    // Update selected subject details
    useEffect(() => {
        if (selectedSubjectId) {
            const subject = subjects.find(s => s.id === selectedSubjectId);
            setSelectedSubject(subject);
        } else {
            setSelectedSubject(null);
        }
    }, [selectedSubjectId, subjects]);

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!selectedSubjectId) {
            toast.error('Please select a subject');
            return;
        }

        setLoading(true);
        // Don't clear immediately to allow "Regenerate" feel if desired, but here we want fresh start
        setRoadmap(null);
        setTips([]);

        try {
            const response = await fetch('/api/generate-roadmap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: selectedSubject })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate roadmap');
            }

            setRoadmap(data.roadmap);
            setTips(data.tips || []);
            setCompletedWeeks([]); // Reset progress on new generation
            setCompletedTasks([]);

            toast.success('Roadmap generated successfully!', {
                icon: '🚀',
                style: { borderRadius: '10px', background: '#1e293b', color: '#fff' },
            });

            // Save to Firebase
            if (user) {
                try {
                    const saveResult = await saveRoadmap(user.uid, {
                        subjectId: selectedSubjectId,
                        subject: data.subjectInfo?.name || selectedSubject.name,
                        examDate: data.subjectInfo?.examDate || selectedSubject.examDate,
                        difficulty: data.subjectInfo?.difficulty || selectedSubject.difficulty,
                        resourceLink: data.subjectInfo?.resourceLink || selectedSubject.resourceLink || '',
                        roadmap: data.roadmap,
                        tips: data.tips || [],
                        completedWeeks: [],
                        completedTasks: []
                    });
                    if (saveResult.success) {
                        setRoadmapId(saveResult.id);
                        console.log("✅ Roadmap saved with ID:", saveResult.id);
                    } else {
                        console.error("❌ Failed to save roadmap:", saveResult.error);
                        toast.error("Roadmap generated but could not save progress");
                    }
                } catch (saveError) {
                    console.error('Could not save roadmap to Firestore:', saveError);
                    toast.error("Roadmap generated but could not save progress");
                }
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateProgress = async (newCompletedWeeks, newCompletedTasks) => {
        console.log("📝 updateProgress called:", { roadmapId, newCompletedWeeks, newCompletedTasks });
        if (!roadmapId) {
            console.error("❌ Cannot update: roadmapId is missing!");
            toast.error("Please save/generate roadmap first");
            return;
        }
        setUpdatingParams(true);

        // Optimistic UI update
        setCompletedWeeks(newCompletedWeeks);
        setCompletedTasks(newCompletedTasks);

        const result = await updateRoadmap(roadmapId, {
            completedWeeks: newCompletedWeeks,
            completedTasks: newCompletedTasks
        });

        if (!result.success) {
            toast.error("Failed to save progress");
            // Revert (could be improved with prev state, but simple reload is fallback)
        }
        setUpdatingParams(false);
    };

    const toggleWeekCompletion = async (weekIndex) => {
        const isWeekCompleted = completedWeeks.includes(weekIndex);
        let newCompletedWeeks;
        let newCompletedTasks = [...completedTasks];

        const weekTasks = roadmap[weekIndex].tasks; // tasks list for this week

        if (isWeekCompleted) {
            // Mark as Incomplete -> Remove from weeks
            newCompletedWeeks = completedWeeks.filter(i => i !== weekIndex);
            // Optional: Uncheck all tasks? Or keep them? 
            // Logic: If user clicks "Mark Not Done" on week, they probably want to reset it.
            // Let's uncheck all tasks for this week to remain consistent.
            newCompletedTasks = newCompletedTasks.filter(taskId => !taskId.startsWith(`${weekIndex}-`));

        } else {
            // Mark as Complete -> Add to weeks
            newCompletedWeeks = [...completedWeeks, weekIndex].sort((a, b) => a - b);
            // Auto-check all tasks
            weekTasks.forEach((_, taskIdx) => {
                const taskId = `${weekIndex}-${taskIdx}`;
                if (!newCompletedTasks.includes(taskId)) {
                    newCompletedTasks.push(taskId);
                }
            });
            toast.success("Week completed! Keep it up! 🎉");
        }

        await updateProgress(newCompletedWeeks, newCompletedTasks);
    };

    const toggleTaskCompletion = async (weekIndex, taskIndex) => {
        const taskId = `${weekIndex}-${taskIndex}`;
        const isTaskCompleted = completedTasks.includes(taskId);
        let newCompletedTasks;

        if (isTaskCompleted) {
            newCompletedTasks = completedTasks.filter(id => id !== taskId);
        } else {
            newCompletedTasks = [...completedTasks, taskId];
        }

        // Sync with Week Status
        const weekTasks = roadmap[weekIndex].tasks;
        const allTasksDone = weekTasks.every((_, idx) => newCompletedTasks.includes(`${weekIndex}-${idx}`));

        let newCompletedWeeks = [...completedWeeks];
        if (allTasksDone) {
            if (!newCompletedWeeks.includes(weekIndex)) {
                newCompletedWeeks.push(weekIndex);
                newCompletedWeeks.sort((a, b) => a - b);
                toast.success("All tasks done! Week completed! 🌟");
            }
        } else {
            if (newCompletedWeeks.includes(weekIndex)) {
                newCompletedWeeks = newCompletedWeeks.filter(i => i !== weekIndex);
            }
        }

        await updateProgress(newCompletedWeeks, newCompletedTasks);
    };

    // Calculate overall progress
    const progressPercentage = roadmap && roadmap.length > 0
        ? Math.round((completedWeeks.length / roadmap.length) * 100)
        : 0;

    // Filter roadmap based on search query
    const filteredWeeks = roadmap?.map((week, index) => ({ ...week, originalIndex: index })) // Keep track of original index for completion toggle
        .filter(week => {
            if (!searchQuery) return true;
            return (
                week.title.toLowerCase().includes(searchQuery) ||
                week.tasks.some(task => {
                    // Handle both string tasks (old) and object tasks (new)
                    if (typeof task === 'string') {
                        return task.toLowerCase().includes(searchQuery);
                    } else {
                        return task.title?.toLowerCase().includes(searchQuery) ||
                            task.description?.toLowerCase().includes(searchQuery) ||
                            task.book?.toLowerCase().includes(searchQuery);
                    }
                }) ||
                week.suggestions?.some(s => s.toLowerCase().includes(searchQuery))
            );
        });

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="text-blue-400" /> AI Study Roadmap
                    </h1>
                    <p className="text-slate-400">Generate a personalized weekly study plan using your subjects.</p>
                </div>
            </div>

            {/* Subject Selection Form */}
            <div className={`transition-all duration-300 ${roadmap ? 'opacity-100' : 'opacity-100 scale-100'}`}>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
                    {loadingSubjects ? (
                        <div className="text-center py-8">
                            <Loader2 className="animate-spin mx-auto text-blue-500 mb-2" size={32} />
                            <p className="text-slate-400">Loading subjects...</p>
                        </div>
                    ) : subjects.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
                            <BookOpen size={48} className="mx-auto mb-4 text-slate-600" />
                            <p className="text-slate-300 font-medium mb-2">No subjects found</p>
                            <p className="text-slate-500 text-sm mb-4">Add a subject first to generate your roadmap</p>
                            <a
                                href="/dashboard/subjects"
                                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                            >
                                Go to Subjects
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleGenerate} className="space-y-6">
                            {/* Subject Dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Select Subject</label>
                                <CustomDropdown
                                    options={subjects.map(s => ({
                                        value: s.id,
                                        label: s.name,
                                        subLabel: new Date(s.examDate).toLocaleDateString()
                                    }))}
                                    value={selectedSubjectId}
                                    onChange={setSelectedSubjectId}
                                    placeholder="Choose a subject..."
                                    icon={BookOpen}
                                />
                            </div>

                            {/* Selected Subject Details */}
                            {selectedSubject && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Exam Date</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar size={16} className="text-blue-400" />
                                            <span className="font-medium">{new Date(selectedSubject.examDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Difficulty</p>
                                        <div className="flex items-center gap-2">
                                            <AlertCircle size={16} className={
                                                selectedSubject.difficulty === 'hard' ? 'text-red-400' :
                                                    selectedSubject.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                            } />
                                            <span className={`font-medium capitalize ${selectedSubject.difficulty === 'hard' ? 'text-red-400' :
                                                selectedSubject.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                {selectedSubject.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                    {selectedSubject.resourceLink && (
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Resource</p>
                                            <a
                                                href={selectedSubject.resourceLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <LinkIcon size={16} />
                                                <span className="font-medium text-sm truncate">View Resource</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Generate Button */}
                            <button
                                type="submit"
                                disabled={loading || !selectedSubjectId}
                                className="w-full sm:w-auto px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-[0.99]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Generating Roadmap...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        {/* Change text if roadmap already exists? Maybe 'Regenerate' */}
                                        {roadmap ? 'Regenerate Plan' : 'Generate Plan'}
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Content Area - Only shown when roadmap exists */}
            {roadmap && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4">

                    {/* Left Column: Tips (Desktop Only - Sticky) */}
                    <div className="lg:col-span-1 space-y-6 hidden lg:block">
                        {tips.length > 0 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden lg:sticky lg:top-24">
                                <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <Lightbulb className="text-yellow-400" size={18} />
                                        <span>Study Strategy</span>
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <ul className="space-y-3">
                                        {tips.map((tip, index) => (
                                            <li key={index} className="flex gap-3 text-sm text-slate-300">
                                                <div className="mt-0.5 min-w-[16px] h-4 rounded border border-slate-600 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                                </div>
                                                <span className="leading-relaxed">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-3 bg-slate-800/30 border-t border-slate-800 text-xs text-slate-500 text-center">
                                    Follow these for best results
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Roadmap Timeline */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Map className="text-blue-400" />
                                <span>Execution Plan</span>
                            </h2>
                            <div className="flex items-center gap-4">
                                {/* Progress Indicator */}
                                <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full hidden sm:flex">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-slate-400 font-medium">{progressPercentage}% Complete</span>
                                        <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
                                                style={{ width: `${progressPercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {searchQuery && (
                                    <span className="text-sm px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                        Filtering: "{searchQuery}"
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Mobile: Collapsible Study Strategy */}
                        <div className="lg:hidden mb-6">
                            <details className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-white font-medium">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="text-yellow-400" size={18} />
                                        <span>Study Strategy & Tips</span>
                                    </div>
                                    <ChevronDown size={18} className="transition-transform group-open:rotate-180 text-slate-400" />
                                </summary>
                                <div className="p-4 border-t border-slate-800 bg-slate-900/30">
                                    <ul className="space-y-3">
                                        {tips.map((tip, index) => (
                                            <li key={index} className="flex gap-3 text-sm text-slate-300">
                                                <div className="mt-0.5 min-w-[16px] h-4 rounded border border-slate-600 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                                </div>
                                                <span className="leading-relaxed">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </div>

                        {filteredWeeks?.length === 0 ? (
                            <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl">
                                <Search size={48} className="mx-auto mb-4 text-slate-600" />
                                <p className="text-slate-400">No weeks found matching "{searchQuery}"</p>
                            </div>
                        ) : (
                            <div className="relative space-y-6 md:space-y-8">
                                {/* Timeline Line - Hidden on very small screens, visible on md+ */}
                                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-slate-800 hidden md:block" />

                                {filteredWeeks?.map((week, index) => {
                                    const isCompleted = completedWeeks.includes(week.originalIndex); // Check original index
                                    // Current Active Week logic: First non-completed week
                                    const firstIncompleteWeekIndex = completedWeeks.length < roadmap.length
                                        ? roadmap.findIndex((_, idx) => !completedWeeks.includes(idx))
                                        : -1;
                                    const isActive = !isCompleted && week.originalIndex === firstIncompleteWeekIndex;

                                    return (
                                        <div key={week.originalIndex} className="relative pl-0 md:pl-16 group">
                                            {/* Timeline Marker */}
                                            <div className={`absolute left-2 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 hidden md:flex transition-all duration-300 ${isCompleted ? 'bg-green-500 border-2 border-green-400' :
                                                isActive ? 'bg-blue-600 border-2 border-blue-400 scale-110' :
                                                    'bg-slate-900 border-2 border-blue-500'
                                                }`}>
                                                {isCompleted ? (
                                                    <Check size={16} className="text-white" />
                                                ) : (
                                                    <span className="text-xs font-bold text-white">{week.originalIndex + 1}</span>
                                                )}
                                            </div>

                                            {/* Week Card */}
                                            <div className={`
                                                relative border rounded-2xl p-4 md:p-6 backdrop-blur-sm transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-slate-900/40 border-green-500/20 opacity-80 hover:opacity-100'
                                                    : isActive
                                                        ? 'bg-slate-900/80 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform scale-[1.01]'
                                                        : 'bg-slate-900/80 border-slate-800 hover:border-blue-500/30'
                                                }
                                            `}>
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4 border-b border-slate-800/50 pb-4">
                                                    <div>
                                                        <h3 className={`text-xl font-bold mb-1 transition-colors ${isCompleted ? 'text-green-400/90 line-through decoration-slate-600/50' :
                                                            isActive ? 'text-blue-400' :
                                                                'text-white group-hover:text-blue-400'
                                                            }`}>
                                                            {week.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs uppercase tracking-wider font-semibold ${isCompleted ? 'text-green-500/70' :
                                                                isActive ? 'text-blue-400' :
                                                                    'text-slate-500'
                                                                }`}>
                                                                Phase {week.originalIndex + 1}
                                                            </span>
                                                            {isActive && (
                                                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold rounded-full border border-blue-500/30 animate-pulse">
                                                                    Current Focus
                                                                </span>
                                                            )}
                                                            {isCompleted && (
                                                                <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] uppercase font-bold rounded-full border border-green-500/20">
                                                                    Done
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Mark Complete Button */}
                                                    <button
                                                        onClick={() => toggleWeekCompletion(week.originalIndex)}
                                                        disabled={updatingParams}
                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${isCompleted
                                                            ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                                                            } ${updatingParams ? 'opacity-50 cursor-wait' : ''}`}
                                                    >
                                                        {isCompleted ? (
                                                            <>
                                                                <CheckCircle2 size={14} />
                                                                Completed
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="w-3.5 h-3.5 rounded-full border border-slate-500"></div>
                                                                Mark Done
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Tasks Grid */}
                                                <div className="space-y-4 mb-6">
                                                    {week.tasks.map((task, taskIndex) => {
                                                        const taskId = `${week.originalIndex}-${taskIndex}`;
                                                        const isTaskDone = completedTasks.includes(taskId);

                                                        // Handle both old string format and new object format
                                                        const isEnhancedTask = typeof task === 'object';
                                                        const taskTitle = isEnhancedTask ? task.title : task;
                                                        const taskDescription = isEnhancedTask ? task.description : null;
                                                        const taskBook = isEnhancedTask ? task.book : null;
                                                        const taskTime = isEnhancedTask ? task.time : null;
                                                        const taskDifficulty = isEnhancedTask ? task.difficulty : null;
                                                        const taskLinks = isEnhancedTask ? task.links : null;

                                                        return (
                                                            <div
                                                                key={taskIndex}
                                                                className={`relative rounded-xl border transition-all group/task ${isTaskDone
                                                                    ? 'bg-slate-900/30 border-green-500/30'
                                                                    : 'bg-slate-900/60 border-slate-700/50 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5'
                                                                    }`}>
                                                                {/* Header with checkbox and title */}
                                                                <div className="flex items-start gap-3 p-4 pb-3">
                                                                    <div className="mt-0.5" onClick={() => toggleTaskCompletion(week.originalIndex, taskIndex)}>
                                                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${isTaskDone
                                                                            ? 'border-green-500 bg-green-500 text-white'
                                                                            : 'border-slate-600 group-hover/task:border-blue-500 group-hover/task:bg-blue-500/10'
                                                                            }`}>
                                                                            {isTaskDone && <Check size={14} strokeWidth={3} />}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-start justify-between gap-3 mb-1">
                                                                            <h4 className={`text-base font-bold transition-colors ${isTaskDone ? 'text-slate-500 line-through decoration-slate-700' : 'text-white'}`}>
                                                                                {taskTitle}
                                                                            </h4>
                                                                            {taskDifficulty && (
                                                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase whitespace-nowrap ${taskDifficulty === 'Hard' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                                                                                    taskDifficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' :
                                                                                        'bg-green-500/15 text-green-400 border border-green-500/30'
                                                                                    }`}>
                                                                                    {taskDifficulty}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {taskDescription && (
                                                                            <p className={`text-sm leading-relaxed ${isTaskDone ? 'text-slate-600' : 'text-slate-300'}`}>
                                                                                {taskDescription}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Book and Time Info */}
                                                                {(taskBook || taskTime) && (
                                                                    <div className="px-4 pb-3 flex flex-wrap items-center gap-4">
                                                                        {taskBook && (
                                                                            <div className={`flex items-center gap-2 text-sm ${isTaskDone ? 'text-slate-600' : 'text-blue-400'}`}>
                                                                                <BookOpen size={14} className="flex-shrink-0" />
                                                                                <span className="font-medium truncate">{taskBook}</span>
                                                                            </div>
                                                                        )}
                                                                        {taskTime && (
                                                                            <div className={`flex items-center gap-1.5 text-sm ${isTaskDone ? 'text-slate-600' : 'text-slate-400'}`}>
                                                                                <Calendar size={14} />
                                                                                <span className="font-medium">{taskTime}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Resource Links */}
                                                                {taskLinks && (
                                                                    <div className="px-4 pb-4 pt-2 border-t border-slate-800/50">
                                                                        <div className="flex items-center gap-2 flex-wrap">
                                                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources:</span>
                                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                                <a
                                                                                    href={taskLinks.google}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isTaskDone
                                                                                        ? 'bg-slate-800/30 text-slate-600 hover:bg-slate-800/50'
                                                                                        : 'bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-700 hover:border-blue-500'
                                                                                        }`}
                                                                                    title="Search on Google"
                                                                                >
                                                                                    📄 Google
                                                                                </a>
                                                                                <a
                                                                                    href={taskLinks.youtube}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isTaskDone
                                                                                        ? 'bg-slate-800/30 text-slate-600 hover:bg-slate-800/50'
                                                                                        : 'bg-red-900/30 text-red-400 hover:bg-red-600 hover:text-white border border-red-900/50 hover:border-red-500'
                                                                                        }`}
                                                                                    title="Watch on YouTube"
                                                                                >
                                                                                    ▶️ YouTube
                                                                                </a>
                                                                                <a
                                                                                    href={taskLinks.udemy || `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(taskTitle)}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isTaskDone
                                                                                        ? 'bg-slate-800/30 text-slate-600 hover:bg-slate-800/50'
                                                                                        : 'bg-purple-900/30 text-purple-400 hover:bg-purple-600 hover:text-white border border-purple-900/50 hover:border-purple-500'
                                                                                        }`}
                                                                                    title="Search on Udemy"
                                                                                >
                                                                                    🟣 Udemy
                                                                                </a>
                                                                                <a
                                                                                    href={taskLinks.coursera || `https://www.coursera.org/search?query=${encodeURIComponent(taskTitle)}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isTaskDone
                                                                                        ? 'bg-slate-800/30 text-slate-600 hover:bg-slate-800/50'
                                                                                        : 'bg-blue-900/30 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-900/50 hover:border-blue-500'
                                                                                        }`}
                                                                                    title="Search on Coursera"
                                                                                >
                                                                                    🔵 Coursera
                                                                                </a>
                                                                                <a
                                                                                    href={taskLinks.practice}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isTaskDone
                                                                                        ? 'bg-slate-800/30 text-slate-600 hover:bg-slate-800/50'
                                                                                        : 'bg-green-900/30 text-green-400 hover:bg-green-600 hover:text-white border border-green-900/50 hover:border-green-500'
                                                                                        }`}
                                                                                    title="Practice Questions"
                                                                                >
                                                                                    ✏️ Practice
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Suggestions Footer */}
                                                {week.suggestions && week.suggestions.length > 0 && (
                                                    <div className={`-mx-6 -mb-6 p-4 border-t rounded-b-2xl flex flex-col sm:flex-row gap-4 ${isCompleted ? 'bg-slate-900/30 border-slate-800/30' : 'bg-blue-900/10 border-blue-900/20'
                                                        }`}>
                                                        {week.suggestions.map((suggestion, sugIndex) => (
                                                            <div key={sugIndex} className={`flex items-start gap-2 text-xs ${isCompleted ? 'text-slate-600' : 'text-blue-200/80'}`}>
                                                                <Sparkles size={14} className={`mt-0.5 flex-shrink-0 ${isCompleted ? 'text-slate-600' : 'text-blue-400'}`} />
                                                                <span>{suggestion}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


