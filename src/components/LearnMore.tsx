import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Brain, Activity, Users, Shield, Sparkles, CheckCircle, Star } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface LearnMoreProps {
  onClose: () => void;
}

const LearnMore: React.FC<LearnMoreProps> = ({ onClose }) => {
  const features = [
    {
      icon: Heart,
      title: 'Personalized Health Clustering',
      description: 'Our advanced algorithm analyzes your unique health profile to place you in one of four specialized wellness clusters, ensuring recommendations that truly fit your needs.',
      benefits: ['Tailored to your specific health patterns', 'Based on scientific research', 'Continuously updated with new data']
    },
    {
      icon: Brain,
      title: 'Mental Wellness Focus',
      description: 'Comprehensive mental health support including stress management, mood tracking, and mindfulness practices designed specifically for women.',
      benefits: ['Daily mood tracking', 'Stress reduction techniques', 'Mindfulness exercises', 'Sleep optimization']
    },
    {
      icon: Activity,
      title: 'Holistic Health Approach',
      description: 'We consider all aspects of women\'s health including reproductive health, physical fitness, nutrition, and lifestyle factors.',
      benefits: ['Menstrual cycle tracking', 'Pregnancy support', 'Fitness recommendations', 'Nutritional guidance']
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other women on similar health journeys through our supportive community features and expert-led discussions.',
      benefits: ['Peer support groups', 'Expert Q&A sessions', 'Shared experiences', 'Motivation and accountability']
    }
  ];

  const clusters = [
    {
      name: 'Mental Wellness Focus',
      color: '#E6E6FA',
      description: 'For women prioritizing stress management and mental health',
      features: ['Stress reduction techniques', 'Sleep optimization', 'Mindfulness practices', 'Mood tracking']
    },
    {
      name: 'Pregnancy Support',
      color: '#FFD1DC',
      description: 'Specialized care for expecting and new mothers',
      features: ['Prenatal guidance', 'Postpartum support', 'Nutrition planning', 'Exercise modifications']
    },
    {
      name: 'Reproductive Health',
      color: '#B0E0E6',
      description: 'Focus on menstrual health and reproductive wellness',
      features: ['Cycle tracking', 'Hormonal balance', 'Fertility support', 'Gynecological health']
    },
    {
      name: 'Lifestyle & Wellness',
      color: '#FADADD',
      description: 'Comprehensive approach to overall health and wellness',
      features: ['Fitness planning', 'Nutrition guidance', 'Work-life balance', 'Preventive care']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      cluster: 'Mental Wellness Focus',
      text: 'WellnessCluster helped me understand my stress patterns and gave me practical tools to manage them. I feel more balanced than ever.',
      rating: 5
    },
    {
      name: 'Emily R.',
      cluster: 'Pregnancy Support',
      text: 'The pregnancy support cluster provided exactly what I needed during my journey to motherhood. The tips were invaluable.',
      rating: 5
    },
    {
      name: 'Jessica L.',
      cluster: 'Reproductive Health',
      text: 'Finally, a platform that understands women\'s unique health needs. The cycle tracking and insights have been game-changing.',
      rating: 5
    }
  ];

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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                About WellnessCluster
              </h2>
              <p className="text-xl text-gray-600">
                Revolutionizing women's health through personalized wellness insights
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Mission Statement */}
          <div className="mb-12">
            <Card>
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  We believe every woman deserves personalized healthcare that understands her unique needs. 
                  WellnessCluster uses advanced clustering algorithms to group women with similar health profiles, 
                  providing tailored recommendations that actually work for your specific situation.
                </p>
              </div>
            </Card>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose WellnessCluster?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <ul className="space-y-1">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Health Clusters */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Health Clusters</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {clusters.map((cluster, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: cluster.color }}
                      >
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{cluster.name}</h4>
                        <p className="text-gray-600 mb-3">{cluster.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {cluster.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.cluster}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="mb-8">
            <Card>
              <div className="flex items-start space-x-4">
                <Shield className="w-12 h-12 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Privacy & Security</h3>
                  <p className="text-gray-600 mb-4">
                    We take your privacy seriously. All health data is encrypted, stored securely, and never shared 
                    without your explicit consent. Our platform complies with HIPAA regulations and industry best practices.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      End-to-end encryption
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      HIPAA compliant
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      No data sharing
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={onClose} size="lg">
              Start Your Wellness Journey
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LearnMore;