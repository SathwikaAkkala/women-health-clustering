import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Moon, Shield, Palette, Globe, Volume2, Save } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface SettingsProps {
  onClose: () => void;
}

interface SettingsData {
  notifications: {
    dailyReminders: boolean;
    weeklyReports: boolean;
    healthTips: boolean;
    moodTracking: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
    profileVisibility: 'public' | 'private';
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    soundEnabled: boolean;
    autoSave: boolean;
  };
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<SettingsData>({
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      healthTips: true,
      moodTracking: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      profileVisibility: 'private'
    },
    preferences: {
      theme: 'light',
      language: 'en',
      soundEnabled: true,
      autoSave: true
    }
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (section: keyof SettingsData, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof typeof prev[typeof section]]
      }
    }));
  };

  const handleSelect = (section: keyof SettingsData, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    onClose();
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-pink-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

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
        className="w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-8">
            {/* Notifications */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-pink-500" />
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Daily Reminders</p>
                    <p className="text-sm text-gray-600">Get reminded to log your mood daily</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.dailyReminders}
                    onChange={() => handleToggle('notifications', 'dailyReminders')}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Weekly Reports</p>
                    <p className="text-sm text-gray-600">Receive weekly wellness summaries</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.weeklyReports}
                    onChange={() => handleToggle('notifications', 'weeklyReports')}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Health Tips</p>
                    <p className="text-sm text-gray-600">Get personalized health recommendations</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.healthTips}
                    onChange={() => handleToggle('notifications', 'healthTips')}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Mood Tracking</p>
                    <p className="text-sm text-gray-600">Reminders to track your daily mood</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.moodTracking}
                    onChange={() => handleToggle('notifications', 'moodTracking')}
                  />
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Data Sharing</p>
                    <p className="text-sm text-gray-600">Share anonymized data for research</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.dataSharing}
                    onChange={() => handleToggle('privacy', 'dataSharing')}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Analytics</p>
                    <p className="text-sm text-gray-600">Help improve the app with usage data</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.analytics}
                    onChange={() => handleToggle('privacy', 'analytics')}
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-2">Profile Visibility</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={settings.privacy.profileVisibility === 'public'}
                        onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
                        className="mr-2 text-pink-600"
                      />
                      <span className="text-gray-700">Public</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={settings.privacy.profileVisibility === 'private'}
                        onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
                        className="mr-2 text-pink-600"
                      />
                      <span className="text-gray-700">Private</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Moon className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-gray-800">Theme</p>
                  </div>
                  <div className="space-y-2">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <label key={theme} className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value={theme}
                          checked={settings.preferences.theme === theme}
                          onChange={(e) => handleSelect('preferences', 'theme', e.target.value)}
                          className="mr-2 text-pink-600"
                        />
                        <span className="text-gray-700 capitalize">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-gray-800">Language</p>
                  </div>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSelect('preferences', 'language', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Sound Effects</p>
                      <p className="text-sm text-gray-600">Enable app sounds and notifications</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.preferences.soundEnabled}
                    onChange={() => handleToggle('preferences', 'soundEnabled')}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Auto-Save</p>
                    <p className="text-sm text-gray-600">Automatically save your progress</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.preferences.autoSave}
                    onChange={() => handleToggle('preferences', 'autoSave')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Settings;