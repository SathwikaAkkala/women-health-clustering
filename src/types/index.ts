export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface HealthData {
  userId: string;
  menstrualCycle: 'regular' | 'irregular' | 'postmenopausal';
  stressLevel: number;
  sleepHours: number;
  pregnancyStatus: 'none' | 'trying' | 'pregnant' | 'postpartum';
  activityLevel: 'low' | 'moderate' | 'high';
  mood: string;
  concerns: string[];
  completedAt: Date;
}

export interface DailyMoodEntry {
  id: string;
  userId: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  notes?: string;
}

export interface ClusterResult {
  label: string;
  description: string;
  tips: string[];
  color: string;
  detailedTips: {
    nutrition: string[];
    exercise: string[];
    mentalHealth: string[];
    lifestyle: string[];
  };
}

export interface WeeklyTrend {
  day: string;
  mood: number;
  energy: number;
  stress: number;
}