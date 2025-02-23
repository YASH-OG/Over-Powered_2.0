import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;