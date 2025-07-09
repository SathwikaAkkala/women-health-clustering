import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;