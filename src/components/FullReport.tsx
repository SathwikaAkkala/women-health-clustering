import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share, Calendar, TrendingUp, Heart, Brain, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from './Button';
import Card from './Card';
import { HealthData, WeeklyTrend, DailyMoodEntry } from '../types';
import { clusterData } from '../utils/clusters';
import { getDailyMoodEntries } from '../utils/storage';

interface FullReportProps {
  onClose: () => void;
  healthData: HealthData;
  cluster: string;
  weeklyTrends: WeeklyTrend[];
}

const FullReport: React.FC<FullReportProps> = ({ onClose, healthData, cluster, weeklyTrends }) => {
  const clusterInfo = clusterData[cluster];
  const moodEntries = getDailyMoodEntries().slice(-30); // Last 30 days

  const healthMetrics = [
    { name: 'Sleep Quality', value: Math.max(20, 100 - (Math.abs(healthData.sleepHours - 8) * 15)), color: '#B0E0E6' },
    { name: 'Stress Management', value: Math.max(20, 100 - (healthData.stressLevel * 8)), color: '#E6E6FA' },
    { name: 'Activity Level', value: healthData.activityLevel === 'high' ? 90 : healthData.activityLevel === 'moderate' ? 70 : 40, color: '#FADADD' },
    { name: 'Overall Wellness', value: Math.round((100 - (healthData.stressLevel * 8) + (healthData.sleepHours * 10) + (healthData.activityLevel === 'high' ? 30 : 20)) / 3), color: '#FFD1DC' }
  ];

  const monthlyTrends = moodEntries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
    energy: entry.energy,
    stress: entry.stress
  }));

  const averages = {
    mood: Math.round(moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / Math.max(moodEntries.length, 1)),
    energy: Math.round(moodEntries.reduce((sum, entry) => sum + entry.energy, 0) / Math.max(moodEntries.length, 1)),
    stress: Math.round(moodEntries.reduce((sum, entry) => sum + entry.stress, 0) / Math.max(moodEntries.length, 1))
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <Card>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Complete Wellness Report
              </h2>
              <p className="text-gray-600">
                Generated on {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cluster Analysis */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: clusterInfo.color }}
                  >
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Your Health Cluster: {clusterInfo.label}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {clusterInfo.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Key Health Metrics</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>Sleep: {healthData.sleepHours} hours/night</li>
                          <li>Stress Level: {healthData.stressLevel}/10</li>
                          <li>Activity: {healthData.activityLevel}</li>
                          <li>Cycle: {healthData.menstrualCycle}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">30-Day Averages</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>Mood: {averages.mood}/10</li>
                          <li>Energy: {averages.energy}/10</li>
                          <li>Stress: {averages.stress}/10</li>
                          <li>Entries: {moodEntries.length} days</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Health Metrics Chart */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-pink-500" />
                Health Metrics Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthMetrics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {healthMetrics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Trends */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Weekly Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="mood" fill="#FADADD" name="Mood" />
                  <Bar dataKey="energy" fill="#B0E0E6" name="Energy" />
                  <Bar dataKey="stress" fill="#E6E6FA" name="Stress" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Mood Trends */}
            {monthlyTrends.length > 0 && (
              <div className="lg:col-span-2">
                <Card>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    30-Day Mood Tracking
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#FADADD" strokeWidth={3} name="Mood" />
                      <Line type="monotone" dataKey="energy" stroke="#B0E0E6" strokeWidth={3} name="Energy" />
                      <Line type="monotone" dataKey="stress" stroke="#E6E6FA" strokeWidth={3} name="Stress" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            )}

            {/* Detailed Recommendations */}
            <div className="lg:col-span-2">
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-500" />
                  Personalized Recommendations
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(clusterInfo.detailedTips).map(([category, tips]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-800 mb-3 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <ul className="space-y-2">
                        {tips.slice(0, 3).map((tip, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              This report is based on your personal health data and mood tracking. 
              Consult with healthcare professionals for medical advice.
            </p>
            <Button onClick={onClose} size="lg">
              Close Report
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FullReport;