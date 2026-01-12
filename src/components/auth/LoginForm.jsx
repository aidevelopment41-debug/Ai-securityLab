'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, error, clearError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#1a1a1a] rounded-lg border border-orange-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-orange-500"
          required
          disabled={loading}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-orange-500"
          required
          disabled={loading}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 text-red-400 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 transition-colors"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
