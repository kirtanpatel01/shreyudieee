import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';
import { playWin, playLose, playWrong } from '../utils/sounds';

const GameCatchButton = ({ onNext }) => {
  const [gameStep, setGameStep] = useState(0);
  const [heartsCaught, setHeartsCaught] = useState(0);
  
  // Step 2 (Whack-a-Mole with Traps) state
  const [whackScore, setWhackScore] = useState(0);
  const [targetScore] = useState(7); // Harder
  const [mole, setMole] = useState({ left: '50%', top: '50%', type: 'good' });
  
  // Step 3 (Wordle) state
  const targetWord = "BAKUDI";
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  
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
            duration: Math.random() * 2 + 1.5, // Faster
          },
        ]);
      }, 600); // Faster spawn
      return () => clearInterval(interval);
    }
  }, [gameStep]);

  // Step 2: Whack-a-Mole loop
  useEffect(() => {
    if (gameStep === 1) {
      const interval = setInterval(() => {
        const left = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
        const top = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
        const type = Math.random() > 0.3 ? 'good' : 'bad'; // 30% chance of trap
        setMole({ left, top, type });
      }, 1000); // Moves every second
      return () => clearInterval(interval);
    }
  }, [gameStep]);

  const handleCatchHeart = (id) => {
    setFallingHearts((prev) => prev.filter((h) => h.id !== id));
    const newCount = heartsCaught + 1;
    setHeartsCaught(newCount);
    if (newCount >= 7) { // Increased to 7
      setTimeout(() => setGameStep(1), 500);
    }
  };

  const handleMoleClick = () => {
    if (mole.type === 'good') {
      const newScore = whackScore + 1;
      setWhackScore(newScore);
      if (newScore >= targetScore) {
        setTimeout(() => setGameStep(2), 500);
      }
    } else {
      // Hit a trap! Reset score.
      setWhackScore(0);
      alert("Oops! You tapped a broken heart! Score reset.");
    }
    // Move immediately on click
    const left = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
    const top = Math.random() > 0.5 ? `${Math.random() * 30 + 5}%` : `${Math.random() * 30 + 65}%`;
    setMole({ left, top, type: Math.random() > 0.3 ? 'good' : 'bad' });
  };

  const handleWordleSubmit = (e) => {
    e.preventDefault();
    const guess = currentGuess.toUpperCase();
    
    if (guess.length !== 6) {
      alert("Guess must be 6 letters!");
      return;
    }
    
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    
    if (guess === targetWord) {
      triggerWin();
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
      setGuesses([]);
      playLose();
    } else {
      playWrong();
    }
  };

  const triggerWin = () => {
    playWin();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f472b6', '#ec4899'],
    });
    setTimeout(onNext, 1000);
  };

  const handleResetWordle = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  };

  const getLetterColor = (guess, index) => {
    const letter = guess[index];
    if (targetWord[index] === letter) return 'bg-rose-500 text-white'; // Green equivalent
    if (targetWord.includes(letter)) return 'bg-yellow-500 text-white'; // Yellow equivalent
    return 'bg-neutral-700 text-neutral-400'; // Gray equivalent
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Catch 7 Falling Hearts!</h2>
            <p className="text-rose-200/60 mb-8 font-sans font-light">They are falling faster now.</p>
            <div className="text-5xl font-bold text-rose-300 font-heading">
              {heartsCaught} / 7
            </div>
          </motion.div>
        )}

        {/* STEP 1: WHACK A MOLE WITH TRAPS */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Avoid the Broken Hearts!</h2>
            <p className="text-rose-200/60 mb-12 font-sans font-light">Tap ❤️ to score. Avoid 💔 or score resets!</p>
            
            <div className="text-5xl font-bold text-rose-300 font-heading mb-8">
              {whackScore} / {targetScore}
            </div>

            <motion.div
              key={`${mole.left}-${mole.top}`}
              className="text-5xl cursor-pointer select-none absolute"
              style={{ left: mole.left, top: mole.top }}
              onClick={handleMoleClick}
              onTouchStart={handleMoleClick}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {mole.type === 'good' ? '❤️' : '💔'}
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: WORDLE */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">Guess the 6-Letter Word</h2>
            <p className="text-rose-200/60 mb-4 font-sans font-light">It's a special person's name!</p>
            
            {/* Color Instructions */}
            <div className="flex gap-4 justify-center text-xs mb-6 text-rose-200/80">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-rose-500 rounded-sm"></div>
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                <span>Wrong spot</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-neutral-700 rounded-sm"></div>
                <span>Not in word</span>
              </div>
            </div>
            
            {/* Wordle Grid */}
            <div className="flex flex-col gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5].map((row) => {
                const guess = guesses[row] || '';
                return (
                  <div key={row} className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((col) => {
                      const letter = guess[col] || '';
                      const colorClass = guesses[row] ? getLetterColor(guess, col) : 'bg-neutral-800 border border-rose-500/10';
                      return (
                        <div
                          key={col}
                          className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-md font-heading ${colorClass}`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleWordleSubmit} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                className="bg-neutral-800/50 border border-rose-500/20 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-rose-500 font-sans uppercase"
                placeholder="Type your guess..."
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value.slice(0, 6))}
                maxLength={6}
              />
              <div className="flex gap-2 w-full">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-shadow font-buttons"
                >
                  Submit Guess
                </Button>
                <Button
                  type="button"
                  onClick={handleResetWordle}
                  className="bg-neutral-700 text-white py-3 px-6 rounded-xl hover:bg-neutral-600 transition-colors font-buttons"
                >
                  Reset
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCatchButton;
