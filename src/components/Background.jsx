import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-neutral-900 to-rose-900/20" />
      
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose-500/10 blur-sm"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small floating hearts/stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-rose-300/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {i % 2 === 0 ? '♥' : '✦'}
        </motion.div>
      ))}
    </div>
  );
};

export default Background;
