'use client';

import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay animate-grain" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-orange-500 mr-2" />
            <h1 className="text-2xl font-bold font-orbitron">AI Security Lab</h1>
          </div>
          <p className="text-gray-400">Join our security research community</p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RegisterForm />
        </motion.div>

        {/* Login link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
              Log in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}