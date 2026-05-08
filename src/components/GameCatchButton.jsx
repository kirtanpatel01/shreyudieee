import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const GameCatchButton = ({ onNext }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);

  const texts = [
    "No",
    "Still no?",
    "Try harder",
    "Impossible",
    "Shreya.exe confused",
    "Are you clicking?",
    "Nice try!",
    "Catch me if you can",
  ];

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    setClickCount((prev) => (prev + 1) % texts.length);
  };

  const handleYes = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f472b6', '#ec4899'],
    });
    setTimeout(onNext, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl">
        <span className="text-rose-400 text-sm uppercase tracking-widest mb-4 block">
          Memory Journey 2/6
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100">
          Are you ready for the next step?
        </h2>
        <p className="text-rose-200/60 mb-12 font-light">
          You must agree to proceed.
        </p>

        <div className="flex gap-4 justify-center items-center h-20 relative">
          <motion.button
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
            onClick={handleYes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes
          </motion.button>

          <motion.button
            className="bg-neutral-800 border border-rose-500/20 text-rose-200 px-8 py-3 rounded-full font-medium text-lg absolute"
            style={{ x: noButtonPos.x, y: noButtonPos.y }}
            onMouseEnter={handleNoHover}
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {texts[clickCount]}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameCatchButton;
