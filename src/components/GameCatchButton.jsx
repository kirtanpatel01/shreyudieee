import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';

const GameCatchButton = ({ onNext }) => {
  const [gameStep, setGameStep] = useState(0);
  const [heartsCaught, setHeartsCaught] = useState(0);
  
  // Step 2 (Whack-a-Mole) state
  const [whackCount, setWhackCount] = useState(0);
  const [molePos, setMolePos] = useState({ left: '50%', top: '50%' });
  
  // Step 3 state
  const [nextLetterIndex, setNextLetterIndex] = useState(0);
  const letters = ['S', 'H', 'R', 'E', 'Y', 'A'];
  
  // Falling hearts state (Step 0)
  const [fallingHearts, setFallingHearts] = useState([]);

  // Spawn falling hearts for Step 0
  useEffect(() => {
    if (gameStep === 0) {
      const interval = setInterval(() => {
        setFallingHearts((prev) => [
          ...prev,
          {
            id: Math.random(),
            left: `${Math.random() * 80 + 10}%`,
            duration: Math.random() * 2 + 2,
          },
        ]);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameStep]);

  const handleCatchHeart = (id) => {
    setFallingHearts((prev) => prev.filter((h) => h.id !== id));
    const newCount = heartsCaught + 1;
    setHeartsCaught(newCount);
    if (newCount >= 5) {
      setTimeout(() => setGameStep(1), 500);
    }
  };

  const handleWhackMole = () => {
    const newCount = whackCount + 1;
    setWhackCount(newCount);
    
    if (newCount >= 5) {
      setTimeout(() => setGameStep(2), 500);
    } else {
      // Pick a new random position avoiding the center where the text is
      const left = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
      const top = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
      setMolePos({ left, top });
    }
  };

  const handleLetterClick = (letter) => {
    if (letter === letters[nextLetterIndex]) {
      const next = nextLetterIndex + 1;
      setNextLetterIndex(next);
      if (next >= letters.length) {
        triggerWin();
      }
    } else {
      setNextLetterIndex(0);
    }
  };

  const triggerWin = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f472b6', '#ec4899'],
    });
    setTimeout(onNext, 1000);
  };

  // Randomize letters for Step 3
  const [shuffledLetters, setShuffledLetters] = useState([]);
  useEffect(() => {
    if (gameStep === 2) {
      setShuffledLetters([...letters].sort(() => Math.random() - 0.5));
    }
  }, [gameStep]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4 bg-transparent overflow-hidden">
      
      {/* Falling Hearts (Step 0) */}
      {gameStep === 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {fallingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-2xl cursor-pointer pointer-events-auto"
              style={{ left: heart.left, top: -20 }}
              animate={{ y: '105vh' }}
              transition={{ duration: heart.duration, ease: 'linear' }}
              onClick={() => handleCatchHeart(heart.id)}
              onTouchStart={() => handleCatchHeart(heart.id)}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 0: CATCH HEARTS */}
        {gameStep === 0 && (
          <motion.div
            key="step0"
            className="text-center max-w-md flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-rose-400 text-xl mb-2 font-buttons">Step 1: The Reflex Test</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Catch 5 Falling Hearts!</h2>
            <p className="text-rose-200/60 mb-8 font-sans font-light">Tap them before they fall off the screen.</p>
            <div className="text-5xl font-bold text-rose-300 font-heading">
              {heartsCaught} / 5
            </div>
          </motion.div>
        )}

        {/* STEP 1: WHACK A MOLE */}
        {gameStep === 1 && (
          <motion.div
            key="step1"
            className="text-center max-w-md flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-rose-400 text-xl mb-2 font-buttons">Step 2: The Speed Test</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Tap the Teleporting Heart!</h2>
            <p className="text-rose-200/60 mb-12 font-sans font-light">Tap it 5 times. It's fast!</p>
            
            <div className="text-5xl font-bold text-rose-300 font-heading mb-8">
              {whackCount} / 5
            </div>

            <motion.div
              className="text-5xl cursor-pointer select-none absolute"
              style={{ left: molePos.left, top: molePos.top }}
              onClick={handleWhackMole}
              onTouchStart={handleWhackMole}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.2 }}
            >
              ❤️
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: SPELL THE NAME */}
        {gameStep === 2 && (
          <motion.div
            key="step2"
            className="text-center max-w-md flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-rose-400 text-xl mb-2 font-buttons">Step 3: The Knowledge Test</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Spell Her Name in Order</h2>
            <p className="text-rose-200/60 mb-6 font-sans font-light">Tap the letters in the correct order.</p>
            
            <div className="flex gap-4 flex-wrap justify-center mb-8">
              {shuffledLetters.map((letter, index) => {
                const isCorrect = letters.indexOf(letter) < nextLetterIndex;
                return (
                  <motion.div
                    key={index}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold font-heading cursor-pointer border ${
                      isCorrect 
                        ? 'bg-rose-500 text-white border-rose-400' 
                        : 'bg-neutral-800 text-rose-100 border-rose-500/20'
                    }`}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>

            <div className="text-sm text-rose-300/50 font-sans">
              Next letter needed: <span className="text-rose-300 font-bold">{letters[nextLetterIndex]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCatchButton;
