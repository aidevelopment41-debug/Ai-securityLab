'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Database,
  Lock,
  Eye,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NeonButton } from '@/components/neon-button';

const StatCard = ({ icon: Icon, title, value, change, trend }) => (
  <Card className="bg-white/[0.02] border-white/10 hover:border-orange-500/20 transition-all">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white font-orbitron">{value}</p>
          {change && (
            <p className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change}
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ type, message, time, status }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${
        status === 'success' ? 'bg-green-400' : 
        status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
      }`} />
      <div>
        <p className="text-sm text-white">{message}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
    <span className={`text-xs px-2 py-1 rounded ${
      status === 'success' ? 'bg-green-900/30 text-green-400' :
      status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
      'bg-red-900/30 text-red-400'
    }`}>
      {type}
    </span>
  </div>
);

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      threatsBlocked: '1,247',
      systemsMonitored: '23',
      alertsToday: '8',
      uptime: '99.9%'
    },
    recentActivity: [
      { type: 'THREAT', message: 'SQL injection attempt blocked', time: '2 minutes ago', status: 'success' },
      { type: 'ALERT', message: 'Unusual login pattern detected', time: '15 minutes ago', status: 'warning' },
      { type: 'SYSTEM', message: 'Security scan completed', time: '1 hour ago', status: 'success' },
      { type: 'THREAT', message: 'Malware signature updated', time: '2 hours ago', status: 'success' },
    ]
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-orange-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-[100px] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay animate-grain" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-screen-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-2">
            Welcome back, {user?.full_name || user?.username}
          </h1>
          <p className="text-gray-400">Monitor your security infrastructure and threat landscape</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            icon={Shield}
            title="Threats Blocked"
            value={dashboardData.stats.threatsBlocked}
            change="+12% from yesterday"
            trend="up"
          />
          <StatCard
            icon={Database}
            title="Systems Monitored"
            value={dashboardData.stats.systemsMonitored}
            change="+2 new systems"
            trend="up"
          />
          <StatCard
            icon={AlertTriangle}
            title="Alerts Today"
            value={dashboardData.stats.alertsToday}
            change="-3 from yesterday"
            trend="down"
          />
          <StatCard
            icon={Activity}
            title="System Uptime"
            value={dashboardData.stats.uptime}
            change="99.9% this month"
            trend="up"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white font-orbitron">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-orbitron">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <NeonButton variant="outline" size="sm" className="w-full justify-start">
                    <Lock className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </NeonButton>
                  <NeonButton variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View Threat Map
                  </NeonButton>
                  <NeonButton variant="outline" size="sm" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Report
                  </NeonButton>
                  <NeonButton variant="outline" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Team
                  </NeonButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-white font-orbitron">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-sm text-white font-medium">API Gateway</p>
                  <p className="text-xs text-green-400">Operational</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-sm text-white font-medium">Threat Detection</p>
                  <p className="text-xs text-green-400">Operational</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <p className="text-sm text-white font-medium">Database</p>
                  <p className="text-xs text-yellow-400">Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}