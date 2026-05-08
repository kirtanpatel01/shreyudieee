import React from 'react';
import { motion } from 'framer-motion';

const WelcomePortal = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.span
          className="text-rose-400 text-sm uppercase tracking-widest mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Memory Journey 1/6
        </motion.span>
        
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Happy 18th Birthday Shreya
        </motion.h1>

        <motion.p
          className="text-rose-100/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Welcome to your personal interactive story. Today, we celebrate 18 years of you.
        </motion.p>

        {/* Floating Photo Placeholders */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-32 h-40 md:w-40 md:h-52 bg-neutral-800/60 backdrop-blur-md border border-rose-500/20 rounded-xl p-2 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? 5 : -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="w-full h-full bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-300/30 text-sm">
                Photo {i}
              </div>
              <div className="h-4 w-12 bg-rose-500/20 rounded mt-2" />
            </motion.div>
          ))}
        </div>

        <motion.button
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin the Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomePortal;
