'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTasks, addTask, toggleTaskCompletion, deleteTask } from '@/lib/firebase_db'; // We need to export these from firebase_db.js
import { CheckSquare, Plus, Trash2, Calendar, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TasksPage() {
    const { user, loading } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');

    const fetchTasks = async () => {
        if (!user) return;
        setIsLoading(true);
        const result = await getTasks(user.uid);
        if (result.success) {
            setTasks(result.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!loading && user) {
            fetchTasks();
        }
    }, [user, loading]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const result = await addTask(user.uid, {
                title: newTask,
                dueDate,
                priority
            });
            if (result.success) {
                toast.success('Task added!');
                setNewTask('');
                setDueDate('');
                fetchTasks(); // Refresh list
            } else {
                toast.error('Failed to add task');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggle = async (taskId, currentStatus) => {
        // Optimistic update
        setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !currentStatus } : t));

        const result = await toggleTaskCompletion(taskId, currentStatus);
        if (!result.success) {
            // Revert on failure
            fetchTasks();
            toast.error('Failed to update task');
        }
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm('Delete this task?')) return;

        const result = await deleteTask(taskId);
        if (result.success) {
            toast.success('Task deleted');
            setTasks(tasks.filter(t => t.id !== taskId));
        } else {
            toast.error('Failed to delete task');
        }
    };

    if (loading) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Tasks</h1>
                <p className="text-slate-400">Manage your daily tasks</p>
            </div>

            {/* Quick Add Task */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-6">
                <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-white outline-none"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-white outline-none [color-scheme:dark]"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-white outline-none"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors whitespace-nowrap w-full md:w-auto"
                    >
                        Add Task
                    </button>
                </form>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center text-slate-500 py-8">Loading tasks...</div>
                ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${task.completed
                                ? 'bg-slate-900/30 border-slate-800/50 opacity-60'
                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <button
                                    onClick={() => handleToggle(task.id, task.completed)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-slate-600 hover:border-blue-500 text-transparent'
                                        }`}
                                >
                                    <CheckSquare size={14} fill="currentColor" />
                                </button>
                                <div>
                                    <p className={`font-medium text-white transition-all ${task.completed ? 'line-through text-slate-500' : ''}`}>
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                        {task.dueDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                        <span className={`px-1.5 py-0.5 rounded uppercase text-[10px] font-bold ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(task.id)}
                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800">
                        <CheckSquare size={48} className="mx-auto mb-4 text-slate-600" />
                        <p className="text-slate-500">No tasks found. Add one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
