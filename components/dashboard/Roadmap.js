'use client';

/**
 * Roadmap Component - Dark Glass Design with Glowing Timeline
 */
export default function Roadmap() {
    const roadmapItems = [
        {
            id: 1,
            week: 'Week 1',
            title: 'Foundation Building',
            tasks: ['Complete basic algebra', 'Review fundamentals'],
            status: 'completed'
        },
        {
            id: 2,
            week: 'Week 2',
            title: 'Core Concepts',
            tasks: ['Advanced topics', 'Practice problems'],
            status: 'in-progress'
        },
        {
            id: 3,
            week: 'Week 3',
            title: 'Practice & Revision',
            tasks: ['Mock tests', 'Weak area focus'],
            status: 'upcoming'
        },
        {
            id: 4,
            week: 'Week 4',
            title: 'Final Preparation',
            tasks: ['Full revision', 'Previous papers'],
            status: 'upcoming'
        },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed':
                return {
                    glow: 'shadow-green-500/50',
                    border: 'border-green-400/50',
                    bg: 'bg-green-500/10',
                    dot: 'bg-green-500 shadow-lg shadow-green-500/50',
                    text: 'text-green-300',
                    icon: '✓'
                };
            case 'in-progress':
                return {
                    glow: 'shadow-blue-500/50',
                    border: 'border-blue-400/50',
                    bg: 'bg-blue-500/10',
                    dot: 'bg-blue-500 shadow-lg shadow-blue-500/50',
                    text: 'text-blue-300',
                    icon: '▶'
                };
            default:
                return {
                    glow: '',
                    border: 'border-white/10',
                    bg: 'bg-white/5',
                    dot: 'bg-gray-600 shadow-lg',
                    text: 'text-gray-400',
                    icon: '○'
                };
        }
    };

    return (
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                    Study Roadmap
                </h3>
            </div>

            {/* Vertical Glowing Timeline */}
            <div className="relative">
                {/* Glowing Timeline Line */}
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-600 shadow-lg"></div>

                {/* Timeline Items */}
                <div className="space-y-6">
                    {roadmapItems.map((item) => {
                        const styles = getStatusStyles(item.status);
                        return (
                            <div key={item.id} className="relative pl-14">
                                {/* Glowing Badge Circle */}
                                <div className={`absolute left-0 w-10 h-10 ${styles.dot} rounded-full flex items-center justify-center text-white font-bold text-lg ring-4 ring-gray-900`}>
                                    {styles.icon}
                                </div>

                                {/* Glass Content Card */}
                                <div className={`${styles.bg} ${styles.text} backdrop-blur border ${styles.border} ${styles.glow} rounded-xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                                            {item.week}
                                        </span>
                                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur rounded-full text-xs font-semibold border border-white/20">
                                            {item.status === 'completed' ? 'Done' : item.status === 'in-progress' ? 'Current' : 'Upcoming'}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-3 text-white">{item.title}</h4>
                                    <ul className="space-y-1.5">
                                        {item.tasks.map((task, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AI Note */}
            <div className="mt-6 p-4 bg-blue-500/10 backdrop-blur border border-blue-400/30 rounded-xl">
                <p className="text-sm text-blue-300">
                    💡 <strong>Coming soon:</strong> AI-generated personalized roadmaps!
                </p>
            </div>
        </div>
    );
}
