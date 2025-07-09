import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, User, Settings as SettingsIcon, LogOut, Sparkles, TrendingUp, Calendar, Smile, Activity, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import MoodLogger from '../components/MoodLogger';
import HealthDataUpdater from '../components/HealthDataUpdater';
import FullReport from '../components/FullReport';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import { HealthData, User as UserType, WeeklyTrend } from '../types';
import { determineCluster, clusterData, generateRealisticWeeklyData, getTodaysTip } from '../utils/clusters';
import { getCurrentUser, getHealthData, logout } from '../utils/storage';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [cluster, setCluster] = useState<string>('');
  const [weeklyTrends, setWeeklyTrends] = useState<WeeklyTrend[]>([]);
  const [showMoodLogger, setShowMoodLogger] = useState(false);
  const [showHealthUpdater, setShowHealthUpdater] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [todaysTip, setTodaysTip] = useState<string>('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    const userData = getHealthData();
    
    if (currentUser && userData) {
      setUser(currentUser);
      setHealthData(userData);
      const userCluster = determineCluster(userData);
      setCluster(userCluster);
      setWeeklyTrends(generateRealisticWeeklyData(userData, userCluster));
      setTodaysTip(getTodaysTip(userCluster, userData));
    } else {
      onNavigate('landing');
    }
  }, []);

  const refreshData = () => {
    const userData = getHealthData();
    if (userData) {
      setHealthData(userData);
      const userCluster = determineCluster(userData);
      setCluster(userCluster);
      setWeeklyTrends(generateRealisticWeeklyData(userData, userCluster));
      setTodaysTip(getTodaysTip(userCluster, userData));
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  const mockChartData = healthData ? [
    { name: 'Sleep Quality', value: Math.max(20, 100 - (Math.abs(healthData.sleepHours - 8) * 15)) },
    { name: 'Stress Management', value: Math.max(20, 100 - (healthData.stressLevel * 8)) },
    { name: 'Activity Level', value: healthData.activityLevel === 'high' ? 90 : healthData.activityLevel === 'moderate' ? 70 : 40 },
    { name: 'Reproductive Health', value: healthData.menstrualCycle === 'regular' ? 85 : 60 }
  ] : [];

  const clusterInfo = cluster ? clusterData[cluster] : null;

  if (!user || !healthData || !clusterInfo) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card>
            <p className="text-center text-gray-600">Loading your wellness insights...</p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {showMoodLogger && <MoodLogger onClose={() => setShowMoodLogger(false)} />}
      {showHealthUpdater && <HealthDataUpdater onClose={() => setShowHealthUpdater(false)} onUpdate={refreshData} />}
      {showFullReport && <FullReport onClose={() => setShowFullReport(false)} healthData={healthData} cluster={cluster} weeklyTrends={weeklyTrends} />}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-pink-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  WellnessCluster
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowProfile(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome back, {user.name}! 👋
                      </h1>
                      <p className="text-gray-600">
                        Here's your personalized wellness overview for today.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Today</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Cluster Result */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: clusterInfo.color }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Your Health Cluster: {clusterInfo.label}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {clusterInfo.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {clusterInfo.tips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Weekly Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Weekly Trends</h3>
                    <TrendingUp className="w-5 h-5 text-pink-500" />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="mood" fill="#FADADD" name="Mood" />
                      <Bar dataKey="energy" fill="#B0E0E6" name="Energy" />
                      <Bar dataKey="stress" fill="#E6E6FA" name="Stress" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Health Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Metrics</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={mockChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mockChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#FADADD', '#B0E0E6', '#E6E6FA', '#FFD1DC'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {mockChartData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: ['#FADADD', '#B0E0E6', '#E6E6FA', '#FFD1DC'][index] }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowMoodLogger(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Log Today's Mood
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowHealthUpdater(true)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Update Health Data
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowFullReport(true)}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Daily Tip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Tip</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Take 5 minutes for deep breathing exercises. It can help reduce stress and improve your overall mood.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;