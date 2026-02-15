'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * ProtectedRoute component
 * 
 * This component protects pages that require authentication.
 * If the user is not logged in, they will be redirected to the login page.
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourProtectedContent />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If authentication check is complete and user is not logged in
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is not authenticated, show nothing (redirect will happen)
    if (!user) {
        return null;
    }

    // User is authenticated, render the protected content
    return <>{children}</>;
}
