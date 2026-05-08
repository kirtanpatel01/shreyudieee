import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';

const MotionButton = motion(Button);

const GameCatchButton = ({ onNext }) => {
  const [yesHoverCount, setYesHoverCount] = useState(0);
  const [isSad, setIsSad] = useState(false);
  const [yesButtonPos, setYesButtonPos] = useState({ left: '40%', top: '50%' });
  
  const yesTexts = [
    "Yes",
    "Are you sure?",
    "Catch me!",
    "Too slow!",
    "Not this time",
    "Try again",
    "Almost there...",
    "Okay, fine, click me",
  ];

  const handleYesClick = () => {
    if (yesHoverCount < 7) {
      const left = `${Math.random() * 70 + 10}%`;
      const top = `${Math.random() * 70 + 10}%`;
      setYesButtonPos({ left, top });
      setYesHoverCount((prev) => prev + 1);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f472b6', '#ec4899'],
      });
      setTimeout(onNext, 1000);
    }
  };

  const handleNoClick = () => {
    setIsSad(true);
  };

  const handleSadYes = () => {
    setIsSad(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f472b6', '#ec4899'],
    });
    setTimeout(onNext, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4 transition-colors duration-1000 ${isSad ? 'bg-neutral-800' : 'bg-transparent'}`}>
      
      <AnimatePresence>
        {!isSad ? (
          <motion.div 
            className="text-center max-w-2xl flex flex-col items-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-rose-400 text-2xl mb-2 block font-buttons">
              Memory Journey 2/6
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">
              Are you ready for the next step?
            </h2>
            <p className="text-rose-200/60 mb-12 font-light font-sans">
              You must agree to proceed. (Yes is a bit shy)
            </p>

            <div className="flex gap-4 justify-center items-center h-20 relative">
              {/* Cute element: floating star */}
              <motion.div
                className="absolute -top-10 left-1/4 text-yellow-300 text-xl"
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✦
              </motion.div>

              {/* No Button - Easy to click */}
              <Button
                className="bg-neutral-800 border border-rose-500/20 text-rose-200 hover:bg-neutral-700"
                onClick={handleNoClick}
              >
                No
              </Button>
            </div>

            {/* Yes Button - Moves away 7 times */}
            <MotionButton
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white absolute"
              style={{ left: yesButtonPos.left, top: yesButtonPos.top }}
              onClick={handleYesClick}
              animate={{ left: yesButtonPos.left, top: yesButtonPos.top }}
              transition={{ type: "tween", duration: 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {yesTexts[Math.min(yesHoverCount, yesTexts.length - 1)]}
            </MotionButton>
            
            <p className="text-rose-300/50 text-sm mt-4 font-sans">
              Chased: {yesHoverCount} / 7
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center max-w-2xl bg-neutral-900/90 p-8 rounded-3xl border border-neutral-700 backdrop-blur-lg shadow-2xl shadow-black/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-neutral-400 text-4xl mb-4 block font-sans">
              😢 Oh... I'm so sad...
            </span>
            <p className="text-xl md:text-2xl font-light text-neutral-200 leading-relaxed mb-6 font-heading">
              Don't you wanna see what I made for you? I worked so hard on it...
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-white text-neutral-800 hover:bg-neutral-200 shadow-lg"
                onClick={handleSadYes}
              >
                Yes, I want to see!
              </Button>
              <Button
                className="bg-neutral-700 border border-neutral-600 text-neutral-500 opacity-50 cursor-not-allowed"
                disabled
              >
                No...
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCatchButton;
