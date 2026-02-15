"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
                {/* Sidebar - Fixed width, hidden on mobile unless toggled */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/50 backdrop-blur-md border-r border-slate-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:visible ${isMobileMenuOpen ? 'translate-x-0 visible' : '-translate-x-full invisible'}`}>
                    <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 h-screen overflow-hidden relative">
                    {/* Navbar */}
                    <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <div className="max-w-7xl mx-auto space-y-6 pb-20">
                            {children}
                        </div>
                    </main>

                    {/* Overlay for mobile sidebar */}
                    {isMobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
