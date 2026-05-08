import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const HeartsHunt = ({ onNext }) => {
  const [foundHearts, setFoundHearts] = useState([]);
  const totalHearts = 5;

  const heartsPositions = [
    { id: 1, top: '20%', left: '15%' },
    { id: 2, top: '70%', left: '25%' },
    { id: 3, top: '30%', left: '80%' },
    { id: 4, top: '80%', left: '75%' },
    { id: 5, top: '50%', left: '50%' },
  ];

  const handleHeartClick = (id) => {
    if (!foundHearts.includes(id)) {
      const newFound = [...foundHearts, id];
      setFoundHearts(newFound);
      
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#fda4af'],
      });

      if (newFound.length === totalHearts) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fda4af', '#f472b6'],
          });
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full mb-12">
        <span className="text-rose-400 text-sm uppercase tracking-widest mb-4 block">
          Memory Journey 4/6
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100">
          Find the Hidden Hearts
        </h2>
        <p className="text-rose-200/60 mb-2 font-light">
          There are {totalHearts} hearts hidden on this page. Find them all to proceed.
        </p>
        <div className="text-rose-300 font-medium">
          Found: {foundHearts.length} / {totalHearts}
        </div>
      </div>

      {/* Hidden Hearts */}
      {heartsPositions.map((pos) => (
        <motion.div
          key={pos.id}
          className={`absolute cursor-pointer text-2xl transition-opacity duration-300 ${
            foundHearts.includes(pos.id) ? 'opacity-100 text-rose-500' : 'opacity-10 hover:opacity-30 text-rose-300'
          }`}
          style={{ top: pos.top, left: pos.left }}
          onClick={() => handleHeartClick(pos.id)}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating Elements to distract/blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-rose-500/10 rounded-full" />
        <div className="absolute top-3/4 left-2/3 w-20 h-20 border border-rose-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/10 w-8 h-8 border border-rose-500/10 rotate-45" />
      </div>

      <AnimatePresence>
        {foundHearts.length === totalHearts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-rose-200 mb-6">You found them all! You have a keen eye.</p>
            <button
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
              onClick={onNext}
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartsHunt;
