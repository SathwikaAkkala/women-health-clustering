import { HealthData, ClusterResult, WeeklyTrend, DailyMoodEntry } from '../types';
import { getDailyMoodEntries } from './storage';

export const clusterData: Record<string, ClusterResult> = {
  'mental-wellness': {
    label: 'Mental Wellness Focus',
    description: 'Based on your stress levels and sleep patterns, focusing on mental health and stress management would be most beneficial for your overall wellness journey.',
    tips: [
      'Practice daily meditation for 10-15 minutes',
      'Maintain a consistent sleep schedule of 7-9 hours',
      'Try stress-reduction techniques like deep breathing',
      'Connect with supportive friends and family regularly'
    ],
    color: '#E6E6FA',
    detailedTips: {
      nutrition: [
        'Include omega-3 rich foods like salmon, walnuts, and flaxseeds to support brain health',
        'Limit caffeine intake after 2 PM to improve sleep quality',
        'Eat magnesium-rich foods like dark chocolate, spinach, and almonds to reduce stress',
        'Stay hydrated with 8-10 glasses of water daily for optimal brain function'
      ],
      exercise: [
        'Practice yoga or gentle stretching for 20-30 minutes daily',
        'Take 10-minute walks during work breaks to reduce stress',
        'Try swimming or water aerobics for low-impact stress relief',
        'Include strength training 2-3 times per week to boost mood'
      ],
      mentalHealth: [
        'Keep a gratitude journal and write 3 things you\'re grateful for daily',
        'Practice mindfulness meditation using apps like Headspace or Calm',
        'Set boundaries with work and social commitments to prevent burnout',
        'Consider talking to a therapist or counselor for additional support'
      ],
      lifestyle: [
        'Create a relaxing bedtime routine 1 hour before sleep',
        'Limit screen time 2 hours before bedtime',
        'Spend time in nature for at least 30 minutes daily',
        'Practice saying "no" to commitments that don\'t align with your priorities'
      ]
    }
  },
  'pregnancy-support': {
    label: 'Pregnancy Support',
    description: 'Your journey requires specialized care and support during this important time. Focus on prenatal health and preparing for motherhood.',
    tips: [
      'Attend all scheduled prenatal appointments',
      'Take prenatal vitamins with folic acid daily',
      'Stay hydrated and eat nutritious, balanced meals',
      'Practice gentle prenatal exercises and stretches'
    ],
    color: '#FFD1DC',
    detailedTips: {
      nutrition: [
        'Take 400-800 mcg of folic acid daily to prevent birth defects',
        'Include iron-rich foods like lean meats, beans, and fortified cereals',
        'Eat calcium-rich foods like dairy, leafy greens, and fortified plant milks',
        'Avoid raw fish, unpasteurized dairy, and high-mercury fish'
      ],
      exercise: [
        'Practice prenatal yoga with certified instructors',
        'Take daily walks for 20-30 minutes at a comfortable pace',
        'Do pelvic floor exercises (Kegels) to prepare for delivery',
        'Try swimming for low-impact cardiovascular exercise'
      ],
      mentalHealth: [
        'Join prenatal classes to connect with other expecting mothers',
        'Practice relaxation techniques to manage pregnancy anxiety',
        'Communicate openly with your partner about fears and expectations',
        'Consider prenatal counseling if experiencing mood changes'
      ],
      lifestyle: [
        'Get 8-9 hours of sleep nightly, using pregnancy pillows for comfort',
        'Avoid alcohol, smoking, and limit caffeine to 200mg daily',
        'Create a birth plan and discuss it with your healthcare provider',
        'Prepare your home environment for the baby\'s arrival'
      ]
    }
  },
  'reproductive-health': {
    label: 'Reproductive Health',
    description: 'Focus on menstrual health and reproductive wellness is key for you. Managing cycle irregularities and supporting hormonal balance.',
    tips: [
      'Track your menstrual cycle using apps or journals',
      'Maintain a balanced diet rich in iron and B vitamins',
      'Stay active with regular, moderate exercise',
      'Schedule regular gynecological check-ups every year'
    ],
    color: '#B0E0E6',
    detailedTips: {
      nutrition: [
        'Eat iron-rich foods during menstruation to prevent anemia',
        'Include anti-inflammatory foods like berries, leafy greens, and fatty fish',
        'Limit processed foods and sugar to reduce hormonal fluctuations',
        'Consider evening primrose oil supplements for PMS symptoms'
      ],
      exercise: [
        'Adjust workout intensity based on your menstrual cycle phases',
        'Try gentle yoga during menstruation to reduce cramps',
        'Include strength training to support bone health',
        'Practice core strengthening exercises for pelvic floor health'
      ],
      mentalHealth: [
        'Track mood changes throughout your cycle to identify patterns',
        'Practice stress management during PMS to reduce symptoms',
        'Consider therapy if experiencing severe mood swings',
        'Join support groups for women with similar reproductive health concerns'
      ],
      lifestyle: [
        'Use heat therapy for menstrual cramps and discomfort',
        'Maintain consistent sleep patterns to support hormonal balance',
        'Consider natural remedies like chamomile tea for relaxation',
        'Discuss birth control options with your healthcare provider'
      ]
    }
  },
  'lifestyle-wellness': {
    label: 'Lifestyle & Wellness',
    description: 'Your overall health and lifestyle balance is the primary focus. Maintaining healthy habits and preventing future health issues.',
    tips: [
      'Maintain a regular exercise routine 4-5 times per week',
      'Focus on balanced nutrition with whole foods',
      'Prioritize quality sleep with consistent bedtime',
      'Practice work-life balance and stress management'
    ],
    color: '#FADADD',
    detailedTips: {
      nutrition: [
        'Follow the Mediterranean diet pattern with plenty of vegetables and healthy fats',
        'Eat protein with every meal to maintain stable blood sugar',
        'Include probiotic foods like yogurt and kefir for gut health',
        'Plan and prep meals to maintain consistent healthy eating habits'
      ],
      exercise: [
        'Combine cardio, strength training, and flexibility exercises',
        'Aim for 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly',
        'Try new activities like dancing, hiking, or rock climbing to stay motivated',
        'Include balance and coordination exercises to prevent falls'
      ],
      mentalHealth: [
        'Practice regular self-care activities that bring you joy',
        'Maintain social connections and nurture relationships',
        'Set realistic goals and celebrate small achievements',
        'Learn new skills or hobbies to keep your mind engaged'
      ],
      lifestyle: [
        'Create morning and evening routines that support your goals',
        'Limit alcohol consumption and avoid smoking',
        'Schedule regular health screenings and preventive care',
        'Organize your living space to reduce stress and increase productivity'
      ]
    }
  }
};

export function determineCluster(healthData: HealthData): string {
  const { stressLevel, pregnancyStatus, menstrualCycle, sleepHours, activityLevel } = healthData;
  
  if (pregnancyStatus === 'pregnant' || pregnancyStatus === 'trying' || pregnancyStatus === 'postpartum') {
    return 'pregnancy-support';
  }
  
  if (stressLevel >= 7 || sleepHours < 6) {
    return 'mental-wellness';
  }
  
  if (menstrualCycle === 'irregular' || healthData.concerns.includes('reproductive')) {
    return 'reproductive-health';
  }
  
  return 'lifestyle-wellness';
}

export function generateRealisticWeeklyData(healthData: HealthData, cluster: string): WeeklyTrend[] {
  // Get actual mood entries from the last 7 days
  const moodEntries = getDailyMoodEntries();
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Filter entries from the last week
  const recentEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekAgo && entryDate <= today;
  });
  
  // Create a map of dates to mood data
  const entryMap = new Map();
  recentEntries.forEach(entry => {
    const dayOfWeek = new Date(entry.date).getDay();
    entryMap.set(dayOfWeek, entry);
  });
  
  const baseData = {
    'mental-wellness': { mood: 6, energy: 6, stress: 7 },
    'pregnancy-support': { mood: 7, energy: 5, stress: 5 },
    'reproductive-health': { mood: 7, energy: 7, stress: 6 },
    'lifestyle-wellness': { mood: 8, energy: 8, stress: 4 }
  };

  const base = baseData[cluster] || baseData['lifestyle-wellness'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map((day, index) => {
    // Check if we have actual data for this day
    const dayOfWeek = (index + 1) % 7; // Convert to JS day format (0 = Sunday)
    const actualEntry = entryMap.get(dayOfWeek);
    
    if (actualEntry) {
      // Use actual user data
      return {
        day,
        mood: actualEntry.mood,
        energy: actualEntry.energy,
        stress: actualEntry.stress
      };
    }
    
    // Weekend typically better mood, lower stress
    const isWeekend = index >= 5;
    const moodBonus = isWeekend ? 1 : 0;
    const stressReduction = isWeekend ? 1 : 0;
    
    // Add some realistic variation
    const variation = () => Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    
    // Factor in user's health data for more realistic baseline
    const stressAdjustment = Math.floor(healthData.stressLevel / 2) - 2; // Convert 1-10 to -2 to 3
    const sleepAdjustment = healthData.sleepHours >= 7 ? 1 : -1;
    const activityBonus = healthData.activityLevel === 'high' ? 1 : healthData.activityLevel === 'low' ? -1 : 0;
    
    return {
      day,
      mood: Math.max(1, Math.min(10, base.mood + moodBonus + sleepAdjustment + variation())),
      energy: Math.max(1, Math.min(10, base.energy + activityBonus + sleepAdjustment + (isWeekend ? 0 : variation()))),
      stress: Math.max(1, Math.min(10, base.stress + stressAdjustment - stressReduction + variation()))
    };
  });
}

export function getTodaysTip(cluster: string, healthData: HealthData): string {
  const tips = {
    'mental-wellness': [
      "Start your day with 5 minutes of deep breathing. Inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system and reduces cortisol levels, helping you feel more centered and calm throughout the day.",
      "Take a 10-minute mindful walk without your phone. Focus on your surroundings, the feeling of your feet touching the ground, and your breathing. This simple practice can reduce anxiety by up to 25% and improve your mood naturally.",
      "Practice the 5-4-3-2-1 grounding technique when feeling overwhelmed: Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment."
    ],
    'pregnancy-support': [
      "Eat small, frequent meals every 2-3 hours to maintain stable blood sugar and reduce nausea. Include protein and complex carbohydrates in each meal. Try crackers with almond butter or Greek yogurt with berries for sustained energy.",
      "Practice prenatal pelvic tilts: Stand against a wall, tilt your pelvis forward and back gently. This helps relieve back pain and strengthens your core muscles for labor. Do 10-15 repetitions, 2-3 times daily.",
      "Stay hydrated by drinking water throughout the day, aiming for pale yellow urine. Add lemon or cucumber for flavor. Proper hydration supports increased blood volume, reduces swelling, and helps prevent constipation."
    ],
    'reproductive-health': [
      "Track your basal body temperature first thing in the morning to understand your cycle patterns. A slight temperature rise (0.5-1°F) indicates ovulation has occurred. This helps you understand your hormonal fluctuations better.",
      "Include iron-rich foods in your diet today, especially if you're menstruating. Pair vitamin C foods (citrus, bell peppers) with iron sources (spinach, lean meat) to enhance absorption and prevent fatigue.",
      "Practice gentle hip circles and cat-cow stretches to relieve menstrual cramps. These movements increase blood flow to the pelvic area and can reduce pain naturally without medication."
    ],
    'lifestyle-wellness': [
      "Try the 20-20-20 rule if you work at a computer: Every 20 minutes, look at something 20 feet away for 20 seconds. This reduces eye strain and gives your mind a micro-break, improving focus and reducing headaches.",
      "Prepare a colorful plate for lunch with at least 3 different colored vegetables. Each color provides different antioxidants and nutrients. Aim for red (tomatoes), green (spinach), and orange (carrots) for optimal nutrition.",
      "Set a phone-free zone 1 hour before bedtime. Use this time for reading, gentle stretching, or journaling. Blue light from screens can disrupt melatonin production, affecting your sleep quality and recovery."
    ]
  };

  const clusterTips = tips[cluster] || tips['lifestyle-wellness'];
  const today = new Date().getDay();
  return clusterTips[today % clusterTips.length];
}