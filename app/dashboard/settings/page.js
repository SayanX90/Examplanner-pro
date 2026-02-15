'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, LogOut, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const { user, logout, updateUserProfile } = useAuth();
    const router = useRouter();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isUpdating, setIsUpdating] = useState(false);

    // Sync state with user data when it loads
    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    const handleUpdateName = async (e) => {
        e.preventDefault();

        if (!displayName.trim()) {
            toast.error('Display name cannot be empty');
            return;
        }

        setIsUpdating(true);
        setIsUpdating(true);
        try {
            const result = await updateUserProfile({
                displayName: displayName.trim()
            });

            if (result.success) {
                toast.success('Display name updated successfully!');
            } else {
                toast.error(result.error || 'Failed to update display name');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update display name');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400">Manage your account settings and preferences</p>
            </div>

            {/* User Profile Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <User size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Profile Information</h3>
                        <p className="text-xs text-slate-400">Update your personal details</p>
                    </div>
                </div>

                <form onSubmit={handleUpdateName} className="space-y-4">
                    {/* Display Name */}
                    <div className="space-y-1.5">
                        <label htmlFor="displayName" className="text-sm font-medium text-slate-300">
                            Display Name
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                id="displayName"
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter your name"
                                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-slate-500 transition-all outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isUpdating || displayName === user?.displayName}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Save size={18} />
                                {isUpdating ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full px-4 py-3 pl-10 bg-slate-800/30 border border-slate-700 rounded-xl text-slate-400 cursor-not-allowed outline-none"
                            />
                            <Mail size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none" />
                        </div>
                        <p className="text-xs text-slate-500">Email cannot be changed</p>
                    </div>
                </form>
            </div>

            {/* Logout Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Logout</h3>
                        <p className="text-sm text-slate-400">Sign out of your account</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-6 py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 hover:border-red-600/50 text-red-400 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
