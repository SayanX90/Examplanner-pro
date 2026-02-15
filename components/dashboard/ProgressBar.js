'use client';

/**
 * ProgressBar Component - Analytics Card Style
 */
export default function ProgressBar() {
    const stats = {
        totalSubjects: 4,
        completedTasks: 12,
        totalTasks: 20,
        studyStreak: 7,
        hoursStudied: 24.5,
    };

    const progressPercentage = Math.round((stats.completedTasks / stats.totalTasks) * 100);

    return (
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:-translate-y-1 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                        Study Progress
                    </h3>
                    <p className="text-sm text-gray-400">Your weekly performance metrics</p>
                </div>
                <div className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg backdrop-blur">
                    <span className="text-xs font-semibold text-blue-300">WEEKLY</span>
                </div>
            </div>

            {/* Large Progress Display */}
            <div className="mb-6">
                <div className="flex items-end gap-3 mb-3">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {progressPercentage}%
                    </span>
                    <span className="text-gray-400 mb-2">Overall Completion</span>
                </div>

                {/* Glowing Progress Bar */}
                <div className="relative w-full h-4 bg-white/10 backdrop-blur rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-blue-500/50 transition-all duration-700 relative overflow-hidden"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Tasks</div>
                    <div className="text-2xl font-bold text-white">{stats.completedTasks}/{stats.totalTasks}</div>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Streak</div>
                    <div className="text-2xl font-bold text-white">{stats.studyStreak} 🔥</div>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Hours</div>
                    <div className="text-2xl font-bold text-white">{stats.hoursStudied}h</div>
                </div>
            </div>

            {/* Motivational Message */}
            <div className="mt-6 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg backdrop-blur">
                <p className="text-sm text-gray-300 font-medium text-center">
                    {progressPercentage >= 75 ? '🎉 Excellent progress! Keep it up!' :
                        progressPercentage >= 50 ? '💪 You\'re doing great! Stay focused!' :
                            progressPercentage >= 25 ? '📚 Good start! Keep pushing!' :
                                '🚀 Let\'s get started on your goals!'}
                </p>
            </div>
        </div>
    );
}
