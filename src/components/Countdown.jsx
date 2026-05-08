import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const Countdown = ({ onUnlock }) => {
  const targetDate = new Date('2026-05-11T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTypingDone, setIsTypingDone] = useState(false);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
        onUnlock();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlock]);

  const text = "Something special is waiting for Shreya...";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10">
      <div className="max-w-4xl w-full text-center px-4">
        {/* Typing Text */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-12 text-rose-100 font-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative">
          {/* Cute element: floating sparkle */}
          <motion.div
            className="absolute -top-6 -left-6 text-pink-300 text-2xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦
          </motion.div>
          
          {Object.entries(timeLeft).map(([label, value]) => (
            <motion.div
              key={label}
              className="bg-neutral-800/40 backdrop-blur-md border border-rose-500/20 rounded-2xl p-6 flex flex-col items-center justify-center box-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(244, 114, 182, 0.4)' }}
            >
              <span className="text-4xl md:text-6xl font-bold text-rose-300 font-heading">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-sm tracking-widest text-rose-200/60 mt-2 font-sans">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-rose-200/70 text-lg font-light font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Unlocking on May 11
        </motion.p>
        
        <motion.p
          className="text-rose-300/80 text-2xl mt-4 font-caveat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          18 years of chaos loading... ✨
        </motion.p>
      </div>

      {/* Small Unlock Button */}
      <Button
        onClick={onUnlock}
        className="absolute bottom-6 right-6 text-rose-500/30 hover:text-rose-500/80 bg-transparent p-0 flex items-center gap-1"
      >
        <span className="text-lg">♥</span>
        <span>Unlock</span>
      </Button>
    </div>
  );
};

export default Countdown;
