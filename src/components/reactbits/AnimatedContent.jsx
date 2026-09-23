import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedContent({
  children,
  distance = 25,
  direction = 'vertical',
  reverse = false,
  duration = 0.5,
  delay = 0,
  className = '',
}) {
  const directions = {
    vertical: 'y',
    horizontal: 'x',
  };

  const axis = directions[direction];
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      initial={{
        opacity: 0,
        [axis]: offset,
      }}
      animate={{
        opacity: 1,
        [axis]: 0,
      }}
      exit={{
        opacity: 0,
        [axis]: offset,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
