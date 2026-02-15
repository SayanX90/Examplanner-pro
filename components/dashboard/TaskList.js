'use client';

import { useState } from 'react';

/**
 * TaskList Component - Dark Glass Design
 */
export default function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete Chapter 3 - Algebra', completed: false, subject: 'Mathematics' },
        { id: 2, title: 'Review Physics formulas', completed: true, subject: 'Physics' },
        { id: 3, title: 'Practice English essay writing', completed: false, subject: 'English' },
        { id: 4, title: 'Solve Chemistry problems', completed: false, subject: 'Chemistry' },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
                        <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                        Today's Tasks
                    </h3>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold rounded-full backdrop-blur">
                    {tasks.filter(t => t.completed).length} / {tasks.length}
                </span>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-400 text-center py-12">
                        No tasks yet. Add a subject to get started! 📝
                    </p>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all backdrop-blur"
                        >
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />

                            {/* Task Info */}
                            <div className="flex-1">
                                <p className={`font-medium transition-all ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                    {task.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {task.subject}
                                </p>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Task Button */}
            <button className="mt-5 w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-blue-400/50 hover:text-blue-300 hover:bg-blue-500/5 transition-all font-medium backdrop-blur">
                + Add New Task
            </button>
        </div>
    );
}
