'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Shield,
  Key,
  Bell,
  Save,
  Edit3,
  Info
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

  /* ✅ Effect 1: Redirect unauthenticated users */
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  /* ✅ Effect 2: Sync user data to form ONCE */
  useEffect(() => {
    if (!user) return;

    setFormData(prev => {
      if (
        prev.full_name === user.full_name &&
        prev.email === user.email &&
        prev.username === user.username
      ) {
        return prev;
      }

      return {
        full_name: user.full_name || '',
        email: user.email || '',
        username: user.username || ''
      };
    });
  }, [user]);

  const handleSave = () => {
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-[100px] relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-400">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Info */}
          <motion.div className="lg:col-span-2">
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-orange-500" />
                    Personal Information
                  </CardTitle>
                  <NeonButton
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
                <Input
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  disabled={!isEditing}
                />
                <Input
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={!isEditing}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div className="space-y-6">
            <Card className="bg-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-500" />
                  Notifications
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {['email', 'push', 'security'].map(type => (
                  <button
                    key={type}
                    onClick={() => handleNotificationChange(type)}
                    className="w-full flex justify-between text-sm"
                  >
                    <span className="capitalize">{type}</span>
                    <span>{notifications[type] ? 'On' : 'Off'}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
