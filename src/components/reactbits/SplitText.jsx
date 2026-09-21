import React from 'react';
import { motion } from 'framer-motion';

export default function SplitText({
  text = '',
  className = '',
  delay = 0.03,
  animationFrom = { opacity: 0, transform: 'translate3d(0,25px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOut',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
}) {
  const words = text.split(' ');

  return (
    <p
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={animationFrom}
              whileInView={animationTo}
              viewport={{ once: true, amount: threshold, margin: rootMargin }}
              transition={{
                duration: 0.45,
                delay: (wordIndex * 3 + charIndex) * delay,
                ease: easing,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </p>
  );
}
