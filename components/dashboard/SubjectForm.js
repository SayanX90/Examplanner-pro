'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addSubject } from '@/lib/firebase_db';
import { BookOpen, Calendar, AlertCircle, Link } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubjectForm({ onSuccess }) {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        examDate: '',
        difficulty: 'medium',
        resourceLink: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to add a subject');
            return;
        }

        if (!formData.name || !formData.examDate) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const result = await addSubject(user.uid, {
                name: formData.name,
                examDate: formData.examDate,
                difficulty: formData.difficulty,
                resourceLink: formData.resourceLink || null
            });

            if (result.success) {
                toast.success(`Subject "${formData.name}" added successfully!`);
                setFormData({ name: '', examDate: '', difficulty: 'medium', resourceLink: '' });
                if (onSuccess) onSuccess();
            } else {
                toast.error('Failed to add subject. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <BookOpen size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Add New Subject</h3>
                    <p className="text-xs text-slate-400">Plan your exam schedule</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject Name */}
                <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">
                        Subject Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Mathematics"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-slate-500 transition-all outline-none"
                    />
                </div>

                {/* Exam Date */}
                <div className="space-y-1.5">
                    <label htmlFor="examDate" className="text-sm font-medium text-slate-300">
                        Exam Date
                    </label>
                    <div className="relative">
                        <input
                            id="examDate"
                            type="date"
                            value={formData.examDate}
                            onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                            className="w-full px-4 py-3 pl-10 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all outline-none [color-scheme:dark]"
                        />
                        <Calendar size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none" />
                    </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-1.5">
                    <label htmlFor="difficulty" className="text-sm font-medium text-slate-300">
                        Difficulty Level
                    </label>
                    <div className="relative">
                        <select
                            id="difficulty"
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            className="w-full px-4 py-3 pl-10 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all outline-none appearance-none"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <AlertCircle size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none" />
                    </div>
                </div>

                {/* Resource Link (Optional) */}
                <div className="space-y-1.5">
                    <label htmlFor="resourceLink" className="text-sm font-medium text-slate-300">
                        Resource Link <span className="text-slate-500 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                        <input
                            id="resourceLink"
                            type="url"
                            value={formData.resourceLink}
                            onChange={(e) => setFormData({ ...formData, resourceLink: e.target.value })}
                            placeholder="https://example.com/course"
                            className="w-full px-4 py-3 pl-10 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-slate-500 transition-all outline-none"
                        />
                        <Link size={18} className="absolute left-3 top-3.5 text-slate-500 pointer-events-none" />
                    </div>
                    <p className="text-xs text-slate-500">Add a link to study materials, videos, or online courses</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Adding...' : 'Add Subject'}
                </button>
            </form>
        </div>
    );
}
