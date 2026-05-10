import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';
import { playCorrect, playWin } from '../utils/sounds';

const HeartsHunt = ({ onNext }) => {
  const [foundHearts, setFoundHearts] = useState([]);
  const [activeHeart, setActiveHeart] = useState(null);
  const [showQuitMsg, setShowQuitMsg] = useState(false);
  const totalHearts = 5;

  const heartsData = [
    { 
      id: 1, top: '25%', left: '15%', dir: 'bottom',
      msg: "Thanks for always listening and never judging me. You're the best friend I could ask for! 💖" 
    },
    { 
      id: 2, top: '70%', left: '25%', dir: 'top',
      msg: "Stop sending me food reels when I'm hungry! You're making me fat... oh wait, you already tease me for that! 🙄🍔" 
    },
    { 
      id: 3, top: '35%', left: '75%', dir: 'top',
      msg: "I had to place this heart low so you could reach it, Shortieee! 😜📏" 
    },
    { 
      id: 4, top: '80%', left: '70%', dir: 'top',
      msg: "Thanks for sharing your terrible 90's music taste with me. Jk, they are bops! 🎵😆" 
    },
    { 
      id: 5, top: '15%', left: '85%', dir: 'bottom',
      msg: "Wow, you actually found this! I thought your short height would block your vision. Bakudieee! 😂" 
    },
  ];

  const handleHeartClick = (id) => {
    setActiveHeart(id);
    if (!foundHearts.includes(id)) {
      const newFound = [...foundHearts, id];
      setFoundHearts(newFound);
      playCorrect();
      
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
          Memory Journey 4/6
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">
          Find the Hidden Hearts
        </h2>
        <p className="text-rose-200/60 mb-2 font-light font-sans">
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
          I give up
        </Button>
        
        {/* Extended Quit Message */}
        <AnimatePresence>
          {showQuitMsg && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-rose-300 mt-4 font-sans text-lg max-w-md mx-auto"
            >
              Can't you do this for me? I collected all these hearts just for you, and you want to quit? 🥺 Please find them all!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Hearts */}
      {heartsData.map((pos) => {
        const isTop = pos.dir === 'top';
        const leftValue = parseFloat(pos.left);
        
        let alignClass = "left-1/2 -translate-x-1/2";
        let arrowAlignClass = "left-1/2 -translate-x-1/2";
        
        if (leftValue < 30) {
          alignClass = "left-0";
          arrowAlignClass = "left-3";
        } else if (leftValue > 70) {
          alignClass = "right-0";
          arrowAlignClass = "right-3";
        }

        return (
          <div 
            key={pos.id} 
            className="absolute" 
            style={{ top: pos.top, left: pos.left }}
          >
            <motion.div
              className={`cursor-pointer transition-opacity duration-300 ${
                pos.id === 5 ? 'text-xs' : 'text-2xl'
              } ${
                foundHearts.includes(pos.id) ? 'opacity-100 text-rose-500' : 'opacity-5 hover:opacity-30 text-rose-300'
              }`}
              onClick={() => handleHeartClick(pos.id)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              animate={pos.id === 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={pos.id === 5 ? { duration: 3, repeat: Infinity } : {}}
            >
              ♥
              {/* Camouflage for heart 5 */}
              {pos.id === 5 && !foundHearts.includes(5) && (
                <div className="absolute inset-0 w-4 h-4 border border-rose-500/10 rounded-full -left-1 -top-1 pointer-events-none" />
              )}
            </motion.div>
 
            {/* Tooltip Message */}
            <AnimatePresence>
              {activeHeart === pos.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: isTop ? 10 : -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: isTop ? 10 : -10 }}
                  className={`absolute ${isTop ? 'bottom-full mb-2' : 'top-full mt-2'} ${alignClass} bg-neutral-800/95 text-rose-100 p-3 rounded-lg text-xs font-sans w-40 backdrop-blur-sm border border-rose-500/20 z-20 text-center shadow-xl`}
                >
                  {pos.msg}
                  {/* Tooltip arrow */}
                  <div className={`absolute ${isTop ? 'top-full border-t-neutral-800/95' : 'bottom-full border-b-neutral-800/95'} ${arrowAlignClass} w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent ${isTop ? 'border-t-4' : 'border-b-4'}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Floating Elements to distract/blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-rose-500/10 rounded-full" />
        <div className="absolute top-3/4 left-2/3 w-20 h-20 border border-rose-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/10 w-8 h-8 border border-rose-500/10 rotate-45" />
        
        {/* Blob hiding Heart 5 */}
        <div className="absolute top-[13%] left-[83%] w-16 h-16 bg-rose-500/5 rounded-full blur-sm" />
        
        {/* Cute element: floating sparkle */}
        <motion.div
          className="absolute top-1/3 right-1/4 text-pink-300 text-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦
        </motion.div>
      </div>

      <AnimatePresence>
        {foundHearts.length === totalHearts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-rose-200 mb-6 font-sans">You found them all! You have a keen eye.</p>
            <Button
              className="bg-linear-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
              onClick={onNext}
            >
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartsHunt;
