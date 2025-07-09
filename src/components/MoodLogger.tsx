import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Zap, AlertCircle, Save } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { DailyMoodEntry } from '../types';
import { getCurrentUser, saveDailyMood, getTodaysMoodEntry } from '../utils/storage';

interface MoodLoggerProps {
  onClose: () => void;
}

const MoodLogger: React.FC<MoodLoggerProps> = ({ onClose }) => {
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState('');
  const [existingEntry, setExistingEntry] = useState<DailyMoodEntry | null>(null);

  useEffect(() => {
    const todaysEntry = getTodaysMoodEntry();
    if (todaysEntry) {
      setExistingEntry(todaysEntry);
      setMood(todaysEntry.mood);
      setEnergy(todaysEntry.energy);
      setStress(todaysEntry.stress);
      setNotes(todaysEntry.notes || '');
    }
  }, []);

  const handleSave = () => {
    const user = getCurrentUser();
    if (!user) return;

    const entry: DailyMoodEntry = {
      id: existingEntry?.id || Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
      mood,
      energy,
      stress,
      notes: notes.trim() || undefined
    };

    saveDailyMood(entry);
    onClose();
  };

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Frown className="w-6 h-6 text-red-500" />;
    if (value <= 7) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Smile className="w-6 h-6 text-green-500" />;
  };

  const getSliderColor = (type: string) => {
    switch (type) {
      case 'mood': return 'from-red-300 via-yellow-300 to-green-300';
      case 'energy': return 'from-red-300 via-orange-300 to-blue-300';
      case 'stress': return 'from-green-300 via-yellow-300 to-red-300';
      default: return 'from-pink-300 to-purple-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {existingEntry ? 'Update Today\'s Mood' : 'Log Today\'s Mood'}
            </h2>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="space-y-6">
            {/* Mood */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getMoodIcon(mood)}
                  <label className="text-sm font-medium text-gray-700">Mood</label>
                </div>
                <span className="text-2xl font-bold text-pink-600">{mood}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className={`w-full h-2 bg-gradient-to-r ${getSliderColor('mood')} rounded-lg appearance-none cursor-pointer slider`}
              />
            </div>

            {/* Energy */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-blue-500" />
                  <label className="text-sm font-medium text-gray-700">Energy Level</label>
                </div>
                <span className="text-2xl font-bold text-blue-600">{energy}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className={`w-full h-2 bg-gradient-to-r ${getSliderColor('energy')} rounded-lg appearance-none cursor-pointer slider`}
              />
            </div>

            {/* Stress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  <label className="text-sm font-medium text-gray-700">Stress Level</label>
                </div>
                <span className="text-2xl font-bold text-orange-600">{stress}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stress}
                onChange={(e) => setStress(parseInt(e.target.value))}
                className={`w-full h-2 bg-gradient-to-r ${getSliderColor('stress')} rounded-lg appearance-none cursor-pointer slider`}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling today? Any specific thoughts or events?"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {existingEntry ? 'Update' : 'Save'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MoodLogger;