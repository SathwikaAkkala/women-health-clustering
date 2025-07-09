import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Activity, Baby, Smile, Save } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { HealthData } from '../types';
import { getCurrentUser, getHealthData, saveHealthData } from '../utils/storage';

interface HealthDataUpdaterProps {
  onClose: () => void;
  onUpdate: () => void;
}

const HealthDataUpdater: React.FC<HealthDataUpdaterProps> = ({ onClose, onUpdate }) => {
  const [formData, setFormData] = useState<HealthData>({
    userId: '',
    menstrualCycle: 'regular',
    stressLevel: 5,
    sleepHours: 7,
    pregnancyStatus: 'none',
    activityLevel: 'moderate',
    mood: '',
    concerns: [],
    completedAt: new Date()
  });

  useEffect(() => {
    const user = getCurrentUser();
    const existingData = getHealthData();
    
    if (user && existingData) {
      setFormData(existingData);
    } else if (user) {
      setFormData(prev => ({ ...prev, userId: user.id }));
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      completedAt: new Date()
    };
    
    saveHealthData(updatedData);
    onUpdate();
    onClose();
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
        className="w-full max-w-2xl my-8"
      >
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Update Health Information
            </h2>
            <p className="text-gray-600">
              Keep your health profile current for better recommendations
            </p>
          </div>

          <div className="space-y-6">
            {/* Menstrual Cycle */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <label className="text-sm font-medium text-gray-700">Menstrual Cycle</label>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'regular', label: 'Regular (21-35 days)' },
                  { value: 'irregular', label: 'Irregular' },
                  { value: 'postmenopausal', label: 'Postmenopausal' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-pink-50 transition-colors">
                    <input
                      type="radio"
                      name="menstrualCycle"
                      value={option.value}
                      checked={formData.menstrualCycle === option.value}
                      onChange={(e) => handleInputChange('menstrualCycle', e.target.value)}
                      className="mr-3 text-pink-600"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stress Level */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Smile className="w-5 h-5 text-yellow-500" />
                  <label className="text-sm font-medium text-gray-700">Stress Level</label>
                </div>
                <span className="text-xl font-bold text-yellow-600">{formData.stressLevel}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.stressLevel}
                onChange={(e) => handleInputChange('stressLevel', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Sleep Hours */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-blue-500" />
                  <label className="text-sm font-medium text-gray-700">Sleep Hours</label>
                </div>
                <span className="text-xl font-bold text-blue-600">{formData.sleepHours} hours</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={formData.sleepHours}
                onChange={(e) => handleInputChange('sleepHours', parseFloat(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-red-300 via-blue-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Pregnancy Status */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Baby className="w-5 h-5 text-purple-500" />
                <label className="text-sm font-medium text-gray-700">Pregnancy Status</label>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'none', label: 'Not trying to conceive' },
                  { value: 'trying', label: 'Trying to conceive' },
                  { value: 'pregnant', label: 'Currently pregnant' },
                  { value: 'postpartum', label: 'Postpartum' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                    <input
                      type="radio"
                      name="pregnancyStatus"
                      value={option.value}
                      checked={formData.pregnancyStatus === option.value}
                      onChange={(e) => handleInputChange('pregnancyStatus', e.target.value)}
                      className="mr-3 text-purple-600"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-5 h-5 text-green-500" />
                <label className="text-sm font-medium text-gray-700">Physical Activity Level</label>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Low (Little to no exercise)' },
                  { value: 'moderate', label: 'Moderate (2-3 times per week)' },
                  { value: 'high', label: 'High (5+ times per week)' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option.value}
                      checked={formData.activityLevel === option.value}
                      onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Update Health Data
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HealthDataUpdater;