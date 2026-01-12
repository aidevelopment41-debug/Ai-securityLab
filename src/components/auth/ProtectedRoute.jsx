'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  if (requireAdmin && !user?.is_superuser) {
    redirect('/dashboard');
  }

  return <>{children}</>;
};
