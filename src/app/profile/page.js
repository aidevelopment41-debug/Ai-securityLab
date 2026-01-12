'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Key, 
  Bell,
  Save,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NeonButton } from '@/components/neon-button';

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        username: user.username || ''
      });
    }
  }, [loading, isAuthenticated, router, user]);

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

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

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white font-orbitron">
                    <User className="w-5 h-5 mr-2 text-orange-500" />
                    Personal Information
                  </CardTitle>
                  <NeonButton
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </NeonButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-white/[0.02] border-white/10 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-white font-orbitron">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <NeonButton variant="outline" size="sm">
                    Enable
                  </NeonButton>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-sm text-gray-400">Update your account password</p>
                  </div>
                  <NeonButton variant="outline" size="sm">
                    <Key className="w-4 h-4 mr-2" />
                    Change
                  </NeonButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Account Status */}
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-orbitron text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Account Type</span>
                    <span className="text-sm text-orange-400 font-medium">Premium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Member Since</span>
                    <span className="text-sm text-white">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Login</span>
                    <span className="text-sm text-white">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white font-orbitron text-lg">
                  <Bell className="w-5 h-5 mr-2 text-orange-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Email Notifications</p>
                      <p className="text-xs text-gray-400">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        notifications.email ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.email ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Push Notifications</p>
                      <p className="text-xs text-gray-400">Browser notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('push')}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        notifications.push ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.push ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Security Alerts</p>
                      <p className="text-xs text-gray-400">Critical security updates</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('security')}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        notifications.security ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.security ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}