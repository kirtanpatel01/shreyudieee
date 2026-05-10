import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';
import { playWin } from '../utils/sounds';

const HeartsHunt = ({ onNext }) => {
  const [foundHearts, setFoundHearts] = useState([]);
  const [activeHeart, setActiveHeart] = useState(null);
  const [showQuitMsg, setShowQuitMsg] = useState(false);
  const totalHearts = 5;

  const heartsData = [
    { 
      id: 1, top: '25%', left: '15%', dir: 'bottom',
      msg: "Even though we are faaar away and rarely meet, sharing our good and bad days makes me feel you're right here. 💖" 
    },
    { 
      id: 2, top: '70%', left: '25%', dir: 'top',
      msg: "Stop saving all my ugly snaps! And yes, I will keep replying to every single reel you send. 🙄" 
    },
    { 
      id: 3, top: '35%', left: '75%', dir: 'top',
      msg: "I'm not good at expressing my feelings, but I hope you know that I care about you. ❤️" 
    },
    { 
      id: 4, top: '80%', left: '70%', dir: 'top',
      msg: "We might just be 'close friends' for now, but you know me better than anyone else. Stay chaotic! ✨" 
    },
    { 
      id: 5, top: '15%', left: '85%', dir: 'bottom',
      msg: "Sorry for sometimmes doesn't meeting your expectations, but I'll try my best! ❤️" 
    },
  ];

  const handleHeartClick = (id) => {
    setActiveHeart(id);
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
        playWin();
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
        <span className="text-rose-400 text-2xl mb-2 block font-buttons">
          3/5
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">
          Find the Hidden Hearts
        </h2>
        <p className="text-rose-200/60 mb-2  font-sans">
          There are {totalHearts} hearts hidden on this page. Find them all to proceed.
        </p>
        <div className="text-rose-300 font-medium font-sans mb-4">
          Found: {foundHearts.length} / {totalHearts}
        </div>

        {/* Quit Button */}
        <Button
          className="text-rose-400/50 hover:text-rose-400 bg-transparent border border-rose-500/20"
          onClick={() => setShowQuitMsg(true)}
        >
          I can't find them!
        </Button>

        {showQuitMsg && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 mt-2 text-sm italic"
          >
            "Keep looking, Shortie! I know they are hard to see from down there." 😝
          </motion.p>
        )}
      </div>

      {/* Hearts are now scattered directly on the page container, not inside a box */}
      {heartsData.map((heart) => {
        const isFound = foundHearts.includes(heart.id);
        const isActive = activeHeart === heart.id;

        return (
          <div
            key={heart.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: heart.top, left: heart.left }}
          >
            <motion.div
              className={`cursor-pointer text-2xl ${isFound ? 'text-rose-500' : 'text-rose-500/5 hover:text-rose-500/20'} transition-colors duration-300`}
              onClick={() => handleHeartClick(heart.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ♥
            </motion.div>

            <AnimatePresence>
              {isActive && isFound && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: heart.dir === 'top' ? -20 : 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`absolute z-20 w-48 bg-neutral-800 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-100 shadow-xl ${
                    heart.dir === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                  } left-1/2 transform -translate-x-1/2 relative`}
                >
                  <div className="absolute w-2 h-2 bg-neutral-800 border-t border-l border-rose-500/30 transform rotate-45" 
                    style={{ 
                      left: '50%', 
                      marginLeft: '-4px',
                      bottom: heart.dir === 'top' ? '-5px' : 'auto',
                      top: heart.dir === 'top' ? 'auto' : '-5px',
                      borderBottom: heart.dir === 'top' ? 'none' : 'auto',
                      borderRight: heart.dir === 'top' ? 'none' : 'auto',
                      borderTop: heart.dir === 'top' ? 'auto' : 'none',
                      borderLeft: heart.dir === 'top' ? 'auto' : 'none',
                    }} 
                  />
                  <p className="font-sans leading-relaxed pr-4">{heart.msg}</p>
                  <button 
                    className="absolute top-2 right-2 text-rose-400 hover:text-rose-300 font-medium"
                    onClick={() => setActiveHeart(null)}
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {foundHearts.length === totalHearts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl text-rose-100 font-bold mb-4 font-heading">
            You found them all!
          </p>
          <Button
            className="bg-linear-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
            onClick={onNext}
          >
            Continue Journey
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default HeartsHunt;
