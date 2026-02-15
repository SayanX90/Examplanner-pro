'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSubjects, deleteSubject } from '@/lib/firebase_db';
import SubjectForm from '@/components/dashboard/SubjectForm';
import { BookOpen, Calendar, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubjectsPage() {
    const { user, loading } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const fetchSubjects = async () => {
        if (!user) return;
        setIsLoading(true);
        const result = await getSubjects(user.uid);
        if (result.success) {
            setSubjects(result.data);
        }
        setIsLoading(false);
    };

    const handleDelete = async (subjectId, subjectName) => {
        if (!confirm(`Are you sure you want to delete "${subjectName}"? This action cannot be undone.`)) {
            return;
        }

        const result = await deleteSubject(user.uid, subjectId);
        if (result.success) {
            toast.success('Subject deleted successfully!');
            fetchSubjects();
        } else {
            toast.error(result.error || 'Failed to delete subject');
        }
    };

    useEffect(() => {
        if (!loading && user) {
            fetchSubjects();
        }
    }, [user, loading]);

    if (loading) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Subjects</h1>
                    <p className="text-slate-400">Manage your study subjects</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors w-full sm:w-auto"
                >
                    <Plus size={20} />
                    {showForm ? 'Close Form' : 'Add Subject'}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <SubjectForm onSuccess={() => {
                        fetchSubjects();
                        setShowForm(false);
                    }} />
                </div>
            )}

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-slate-800/50 animate-pulse" />
                    ))
                ) : subjects.length > 0 ? (
                    subjects.map((subject) => (
                        <div key={subject.id} className="group relative p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(subject.id, subject.name)}
                                className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-red-500 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                title="Delete subject"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    📚
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${subject.difficulty === 'hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    subject.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                        'bg-green-500/10 text-green-400 border-green-500/20'
                                    }`}>
                                    {subject.difficulty.charAt(0).toUpperCase() + subject.difficulty.slice(1)}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{subject.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Calendar size={14} />
                                <span>{new Date(subject.examDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No subjects yet</p>
                        <p className="text-sm">Add a subject to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
