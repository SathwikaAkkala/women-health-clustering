import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Moon, Activity, Baby, Smile } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { HealthData } from '../types';
import { getCurrentUser, saveHealthData } from '../utils/storage';

interface QuestionnaireProps {
  onNavigate: (page: string) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HealthData>(() => {
    const user = getCurrentUser();
    return {
      userId: user?.id || '',
      menstrualCycle: 'regular',
      stressLevel: 5,
      sleepHours: 7,
      pregnancyStatus: 'none',
      activityLevel: 'moderate',
      mood: '',
      concerns: [],
      completedAt: new Date()
    };
  });

  const questions = [
    {
      id: 'menstrualCycle',
      title: 'How would you describe your menstrual cycle?',
      icon: Heart,
      type: 'radio',
      options: [
        { value: 'regular', label: 'Regular (21-35 days)' },
        { value: 'irregular', label: 'Irregular' },
        { value: 'postmenopausal', label: 'Postmenopausal' }
      ]
    },
    {
      id: 'stressLevel',
      title: 'How would you rate your current stress level?',
      icon: Smile,
      type: 'slider',
      min: 1,
      max: 10,
      step: 1
    },
    {
      id: 'sleepHours',
      title: 'How many hours of sleep do you typically get?',
      icon: Moon,
      type: 'slider',
      min: 3,
      max: 12,
      step: 0.5
    },
    {
      id: 'pregnancyStatus',
      title: 'What is your current pregnancy status?',
      icon: Baby,
      type: 'radio',
      options: [
        { value: 'none', label: 'Not trying to conceive' },
        { value: 'trying', label: 'Trying to conceive' },
        { value: 'pregnant', label: 'Currently pregnant' },
        { value: 'postpartum', label: 'Postpartum' }
      ]
    },
    {
      id: 'activityLevel',
      title: 'How would you describe your physical activity level?',
      icon: Activity,
      type: 'radio',
      options: [
        { value: 'low', label: 'Low (Little to no exercise)' },
        { value: 'moderate', label: 'Moderate (2-3 times per week)' },
        { value: 'high', label: 'High (5+ times per week)' }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const completedData = {
        ...formData,
        completedAt: new Date()
      };
      saveHealthData(completedData);
      onNavigate('dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
                      <currentQuestion.icon className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentQuestion.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentQuestion.type === 'radio' && (
                    <div className="space-y-3">
                      {currentQuestion.options?.map((option) => (
                        <motion.label
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-pink-50 transition-colors"
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option.value}
                            checked={formData[currentQuestion.id as keyof HealthData] === option.value}
                            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                            className="mr-3 text-pink-600"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'slider' && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <span className="text-4xl font-bold text-pink-600">
                          {formData[currentQuestion.id as keyof HealthData]}
                        </span>
                        <p className="text-gray-600 mt-2">
                          {currentQuestion.id === 'stressLevel' && 'out of 10'}
                          {currentQuestion.id === 'sleepHours' && 'hours per night'}
                        </p>
                      </div>
                      <input
                        type="range"
                        min={currentQuestion.min}
                        max={currentQuestion.max}
                        step={currentQuestion.step}
                        value={formData[currentQuestion.id as keyof HealthData]}
                        onChange={(e) => handleInputChange(currentQuestion.id, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{currentQuestion.min}</span>
                        <span>{currentQuestion.max}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    className="flex items-center"
                  >
                    {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Questionnaire;