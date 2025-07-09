import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower, Sparkles, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import AnimatedBackground from '../components/AnimatedBackground';
import LearnMore from '../components/LearnMore';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const features = [
    {
      icon: Heart,
      title: 'Personalized Health Insights',
      description: 'Discover your unique health profile through our comprehensive assessment.'
    },
    {
      icon: Flower,
      title: 'Tailored Recommendations',
      description: 'Get personalized health tips and guidance based on your specific needs.'
    },
    {
      icon: Sparkles,
      title: 'Holistic Wellness',
      description: 'Focus on mental, physical, and reproductive health in harmony.'
    }
  ];

  return (
    <Layout>
      {showLearnMore && <LearnMore onClose={() => setShowLearnMore(false)} />}
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 py-6"
        >
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WellnessCluster
              </span>
            </div>
            
            <div className="space-x-4">
              <Button variant="outline" onClick={() => onNavigate('login')}>
                Login
              </Button>
              <Button onClick={() => onNavigate('register')}>
                Get Started
              </Button>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold text-gray-800 mb-8 leading-tight"
            >
              Your Journey to{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Holistic Wellness
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Discover personalized health insights tailored specifically for women's unique needs. 
              Take our comprehensive assessment and unlock your path to optimal wellness.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            >
              <Button 
                size="lg" 
                onClick={() => onNavigate('register')}
                className="group"
              >
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowLearnMore(true)}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose WellnessCluster?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience personalized healthcare designed with women's unique needs in mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Begin Your Wellness Journey?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of women who have discovered their personalized path to better health.
              </p>
              <Button 
                size="lg" 
                onClick={() => onNavigate('register')}
                className="group"
              >
                Get Started Today
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </motion.div>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Landing;