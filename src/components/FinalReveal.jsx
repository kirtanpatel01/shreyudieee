import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playHappyBirthday } from '../utils/sounds';

const FinalReveal = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Play the synth birthday song
    playHappyBirthday();
    
    // Confetti effect
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
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const handleSliderChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

          <p className="text-xl md:text-2xl text-rose-100 leading-relaxed mb-6 font-sans">
            
          </p>
          <p className="text-rose-200/80 leading-relaxed font-sans mb-8">
            From the bottom of my heart i wish you the happiest of birthdays. May you get everything you desire and may you always be happy.
          </p>

          {/* Custom Audio Player */}
          <div className="bg-neutral-900/60 backdrop-blur-md border border-rose-500/10 rounded-2xl p-4 flex flex-col gap-3 w-full max-w-md mx-auto">
            <audio 
              ref={audioRef}
              src="/sounds/shreyudieee.mp3"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            <div className="flex items-center justify-between">
              <button 
                onClick={togglePlay} 
                className="text-rose-400 hover:text-rose-300 text-2xl w-8 h-8 flex items-center justify-center focus:outline-none"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              <div className="flex-1 mx-4">
                <input 
                  type="range" 
                  min="0" 
                  max={duration} 
                  value={currentTime} 
                  onChange={handleSliderChange}
                  className="w-full accent-rose-500 bg-neutral-700 h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
                />
              </div>
              
              <button 
                onClick={toggleMute} 
                className="text-rose-400 hover:text-rose-300 text-xl w-8 h-8 flex items-center justify-center focus:outline-none"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            
            <div className="flex justify-between text-xs text-rose-300/70 font-sans">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
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
