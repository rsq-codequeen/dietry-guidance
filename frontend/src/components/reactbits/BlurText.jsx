import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  delay = 0.04,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top',
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -18 : 18,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {el}
        </motion.span>
      ))}
    </motion.div>
  );
}
