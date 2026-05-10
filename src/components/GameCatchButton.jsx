import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';

const GameCatchButton = ({ onNext }) => {
  const [gameStep, setGameStep] = useState(0);
  const [heartsCaught, setHeartsCaught] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  
  // Falling hearts state
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
            duration: Math.random() * 2 + 2, // 2-4 seconds
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

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizAnswer.toLowerCase() === 'forever' || quizAnswer.toLowerCase() === 'shreya') {
      triggerWin();
    } else {
      alert("Hint: It starts with 'S' or it's how long I'll love you!");
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

        {/* STEP 1: SLIDE TO UNLOCK */}
        {gameStep === 1 && (
          <motion.div
            key="step1"
            className="text-center max-w-md flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-rose-400 text-xl mb-2 font-buttons">Step 2: The Commitment</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Slide to Unlock the Next Step</h2>
            <p className="text-rose-200/60 mb-12 font-sans font-light">Prove your patience...</p>
            
            <div className="w-64 h-14 bg-neutral-800/80 rounded-full border border-rose-500/20 flex items-center px-1 relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-xl cursor-grab active:cursor-grabbing z-10"
                drag="x"
                dragConstraints={{ left: 0, right: 200 }}
                dragElastic={0.1}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 150) {
                    setGameStep(2);
                  }
                }}
              >
                ❤️
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-rose-200/30 text-sm font-sans">
                Slide Right &gt;&gt;&gt;
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: THE QUIZ */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Answer the Riddle</h2>
            <p className="text-rose-200/60 mb-6 font-sans font-light">What is the magic word? (Hint: Your name or 'Forever')</p>
            
            <form onSubmit={handleQuizSubmit} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                className="bg-neutral-800/50 border border-rose-500/20 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-rose-500 font-sans"
                placeholder="Type here..."
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-shadow font-buttons"
              >
                Submit Answer
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCatchButton;
