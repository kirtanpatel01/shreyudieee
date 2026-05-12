import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import confetti from 'canvas-confetti';
import { playHackerBeep, playWin, playWrong } from '../utils/sounds';

const failMessages = {
  500: "So close! You almost had it. Try again! 🤏",
  550: "Not bad, but your grandma reacts faster than this! 👵",
  600: "Are you sleeping? Wake up! 😴",
  650: "Internet explorer reacts faster than you. 🌐",
  700: "You're thinking about food again, aren't you? 🍕",
  750: "Did you blink? Don't blink! 👀",
  800: "You are as slow as a turtle on a treadmill. 🐢",
  850: "Are you sure you're 18? Your reflexes say 80! 👴",
  900: "My dead battery has more reaction speed. 🔋",
  950: "One full second? Wow, that's achievement! 🏆 (Not really)",
  1000: "You're taking your time, aren't you? ⏳",
  1050: "I could have baked a cake in that time. 🎂",
  1100: "Are you tapping with your toes? 🦶",
  1150: "Your brain is still loading... 🧠⏳",
  1200: "Did you forget to click? 🤔",
  1250: "You are definitely not a gamer. 🎮❌",
  1300: "A sloth moves faster than your finger! 🦥",
  1350: "Are you paralyzed by the pressure? 😱",
  1400: "You're making me look bad. Click faster! 😠",
  1450: "Is your finger glued to the table? 🧴",
  1500: "Did you go for a walk? That took forever! 🚶‍♀️"
};

const GameReaction = ({ onNext, onWin, onLoss }) => {
  const [state, setState] = useState('idle'); // idle, waiting, ready, clicked, too-early, trolled
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef(null);
  const trollTimerRef = useRef(null);

  const startTest = () => {
    setState('waiting');
    setReactionTime(null);
    
    // Random delay between 2 and 5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    // Trolling logic: 50% chance to troll on the first attempt
    const shouldTroll = attempts === 0 && Math.random() > 0.5;

    timerRef.current = setTimeout(() => {
      if (shouldTroll) {
        setState('trolled');
        // Stay trolled for 1.5 seconds then actually turn green
        trollTimerRef.current = setTimeout(() => {
          setState('ready');
          setStartTime(Date.now());
          playHackerBeep();
        }, 1500);
      } else {
        setState('ready');
        setStartTime(Date.now());
        playHackerBeep();
      }
    }, delay);
  };

  const handleClick = () => {
    if (state === 'waiting') {
      clearTimeout(timerRef.current);
      setState('too-early');
      setAttempts(attempts + 1);
      playWrong();
      onLoss();
    } else if (state === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setState('clicked');
      setAttempts(attempts + 1);
      
      if (time < 500) {
        playWin();
        onWin();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399'],
        });
      } else {
        playWrong();
        onLoss();
      }
    } else if (state === 'trolled') {
      clearTimeout(trollTimerRef.current);
      setState('too-early');
      setAttempts(attempts + 1);
      playWrong();
      onLoss();
    }
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    clearTimeout(trollTimerRef.current);
    setState('idle');
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(trollTimerRef.current);
    };
  }, []);

  const getBgColor = () => {
    switch (state) {
      case 'waiting': return 'bg-amber-900/40 border-amber-500/30';
      case 'ready': return 'bg-emerald-900/60 border-emerald-500/50';
      case 'trolled': return 'bg-rose-900/60 border-rose-500/50';
      case 'too-early': return 'bg-red-900/40 border-red-500/30';
      case 'clicked': return 'bg-blue-900/40 border-blue-500/30';
      default: return 'bg-neutral-800/40 border-neutral-700/30';
    }
  };

  const getMessage = () => {
    switch (state) {
      case 'idle': return 'Click to Start';
      case 'waiting': return 'Wait for Green...';
      case 'ready': return 'CLICK NOW!!!';
      case 'trolled': return 'Wait for it...';
      case 'too-early': return 'Too early! Wait for green.';
      case 'clicked': 
        if (reactionTime < 500) return `Win! ${reactionTime}ms`;
        const interval = Math.min(1500, Math.floor(reactionTime / 50) * 50);
        return `${failMessages[interval] || "Wow, that took forever! 🚶‍♀️"} (${reactionTime}ms)`;
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full mb-8">
        <span className="text-rose-400 text-2xl mb-2 block font-buttons">
          3/6
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">
          Reaction Speed Challenge
        </h2>
        <p className="text-rose-200/60 mb-6 ">
          Click the area when it turns green. Let's see how fast you are!
        </p>
      </div>

      <motion.div
        className={`w-full max-w-md h-64 rounded-2xl border-2 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${getBgColor()}`}
        onClick={state === 'idle' ? startTest : handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl md:text-3xl font-bold text-center px-4"
          >
            {getMessage()}
            
            {state === 'clicked' && reactionTime < 500 && (
              <p className="text-sm font-normal text-emerald-300 mt-2">You are fast! ⚡</p>
            )}
            {state === 'clicked' && reactionTime >= 500 && (
              <p className="text-sm font-normal text-rose-300 mt-2">I know you can do better. 😉</p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex gap-4">
        {(state === 'clicked' || state === 'too-early') && (
          <Button onClick={startTest} className="bg-neutral-800 border border-neutral-700">
            Try Again
          </Button>
        )}
        
        {state === 'clicked' && reactionTime < 500 && (
          <Button
            onClick={onNext}
            className="bg-linear-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
          >
            Continue
          </Button>
        )}
      </div>
      
      {state === 'clicked' && reactionTime >= 500 && (
        <p className="text-rose-300/70 mt-4 text-sm">
          Get under 500ms to proceed!
        </p>
      )}
    </div>
  );
};

export default GameReaction;
