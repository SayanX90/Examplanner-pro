'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, Bell, Menu, User, LogOut, Home } from 'lucide-react';


export default function Navbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Initialize search query from URL
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Debounce search update
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (searchQuery) {
                params.set('search', searchQuery);
            } else {
                params.delete('search');
            }
            router.replace(`${pathname}?${params.toString()}`);
        }, 300); // 300ms debounce

        return () => clearTimeout(handler);
    }, [searchQuery, router, pathname, searchParams]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <nav className="sticky top-0 z-30 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left Section - Mobile Toggle & Welcome */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <div>
                            <h2 className="text-xl font-bold text-white hidden sm:block">
                                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    {user?.displayName || 'Student'}
                                </span>! 👋
                            </h2>
                            <p className="text-sm text-slate-400 hidden sm:block">Here's your study progress overview</p>
                        </div>
                    </div>

                    {/* Right Section - Search & Profile */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl focus-within:border-blue-500/50 focus-within:bg-slate-800 transition-all">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-sm placeholder-slate-500 w-32 lg:w-48"
                            />
                        </div>

                        {/* Notifications (Optional) */}
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 px-2 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-all"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                    {(user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-slate-300 hidden md:block">
                                    {user?.displayName || 'Student'}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-30"
                                        onClick={() => setIsProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-40 py-1 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-3 border-b border-slate-800">
                                            <p className="text-sm font-medium text-white truncate">{user?.displayName || 'Student'}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2">
                                            <User size={16} />
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => router.push('/')}
                                            className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <Home size={16} />
                                            Home Page
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
