'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar({ onClose }) {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Subjects', icon: '📚', path: '/dashboard/subjects' },
        { name: 'Tasks', icon: '✅', path: '/dashboard/tasks' },
        { name: 'Roadmap', icon: '🗺️', path: '/dashboard/roadmap' },
        { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
    ];

    return (
        <aside className="h-full flex flex-col bg-slate-900/50 backdrop-blur-md border-r border-slate-800">
            {/* Logo Section */}
            <div className="p-6 border-b border-slate-800">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ExamPlanner
                        </h1>
                        <p className="text-xs text-slate-400">Pro Dashboard</p>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                router.push(item.path);
                                if (onClose) onClose();
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 text-white shadow-lg shadow-blue-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-800">
                <div className="bg-blue-500/10 backdrop-blur border border-blue-400/30 rounded-xl p-3">
                    <p className="text-xs text-blue-300 font-medium">
                        💡 Pro Tip: Stay consistent!
                    </p>
                </div>
            </div>
        </aside>
    );
}
