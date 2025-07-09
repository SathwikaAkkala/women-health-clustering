import { User, HealthData, DailyMoodEntry } from '../types';

// User management
export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userHealthData');
};

// Health data management
export const saveHealthData = (healthData: HealthData): void => {
  localStorage.setItem('userHealthData', JSON.stringify(healthData));
};

export const getHealthData = (): HealthData | null => {
  const healthData = localStorage.getItem('userHealthData');
  return healthData ? JSON.parse(healthData) : null;
};

// Daily mood entries
export const saveDailyMood = (entry: DailyMoodEntry): void => {
  const existingEntries = getDailyMoodEntries();
  const updatedEntries = existingEntries.filter(e => e.date !== entry.date);
  updatedEntries.push(entry);
  localStorage.setItem('dailyMoodEntries', JSON.stringify(updatedEntries));
};

export const getDailyMoodEntries = (): DailyMoodEntry[] => {
  const entries = localStorage.getItem('dailyMoodEntries');
  return entries ? JSON.parse(entries) : [];
};

export const getTodaysMoodEntry = (): DailyMoodEntry | null => {
  const today = new Date().toISOString().split('T')[0];
  const entries = getDailyMoodEntries();
  return entries.find(entry => entry.date === today) || null;
};

// Generate realistic user data
export const generateMockUser = (name: string, email: string): User => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    username: name.toLowerCase().replace(/\s+/g, ''),
    createdAt: new Date(),
    lastLogin: new Date()
  };
};