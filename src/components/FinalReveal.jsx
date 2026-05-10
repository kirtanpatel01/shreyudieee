import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playHappyBirthday } from '../utils/sounds';

const FinalReveal = () => {
  React.useEffect(() => {
    playHappyBirthday();
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, skew start a bit higher
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4 py-20">
      <div className="text-center max-w-4xl w-full">
        <span className="text-rose-400 text-2xl mb-2 block font-caveat">
          5/5
        </span>
        
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-rose-300 via-pink-200 to-rose-300 font-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          Happy Birthday, My one and only dearest & the most adorable Mahila Mittar Shreya!
        </motion.h1>

        <motion.div
          className="bg-neutral-800/40 backdrop-blur-lg border border-rose-500/20 rounded-3xl p-8 md:p-12 mb-16 relative mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Cute element: floating heart */}
          <motion.div
            className="absolute -top-5 -left-5 text-rose-400 text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♥
          </motion.div>

          <p className="text-xl md:text-2xl font-light text-rose-100 leading-relaxed mb-6 font-sans">
            
          </p>
          <p className="text-rose-200/80 font-light leading-relaxed font-sans">
            From the bottom of my heart i wish you the happiest of birthdays. May you get everything you desire and may you always be happy.
          </p>
        </motion.div>

        <motion.p
          className="text-rose-300/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Built with ❤️ for Shreya.
        </motion.p>
      </div>
    </div>
  );
};

export default FinalReveal;
