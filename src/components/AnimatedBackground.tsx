import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          background: [
            'linear-gradient(45deg, #FADADD 0%, #E6E6FA 50%, #B0E0E6 100%)',
            'linear-gradient(45deg, #E6E6FA 0%, #B0E0E6 50%, #FADADD 100%)',
            'linear-gradient(45deg, #B0E0E6 0%, #FADADD 50%, #E6E6FA 100%)',
            'linear-gradient(45deg, #FADADD 0%, #E6E6FA 50%, #B0E0E6 100%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className="absolute inset-0"
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className={`absolute w-${8 + i * 2} h-${8 + i * 2} rounded-full opacity-10 bg-white`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;