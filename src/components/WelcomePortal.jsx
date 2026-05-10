import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { playFairyGlitter, getCtx } from '../utils/sounds';

const MotionButton = motion(Button);

const WelcomePortal = ({ onNext }) => {
  React.useEffect(() => {
    const ctx = getCtx();
    if (ctx.state === 'running') {
      playFairyGlitter();
    } else {
      const handleFirstClick = () => {
        playFairyGlitter();
        document.removeEventListener('click', handleFirstClick);
      };
      document.addEventListener('click', handleFirstClick);
      return () => document.removeEventListener('click', handleFirstClick);
    }
  }, []);

  const photos = [
    {
      name: "bakudieee 🥹",
      src: "/bakudieee.jpg",
    },
    {
      name: "butkieee 😚",
      src: "/cutieee.jpg",
    },
    {
      name: "shreyudieee 😋",
      src: "/shreyudieee.jpg",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.span
          className="text-rose-400 text-2xl mb-2 block font-caveat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          1/5
        </motion.span>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-rose-300 via-pink-200 to-rose-300 font-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Happy 18th Birthday Shreya
        </motion.h1>

        <motion.p
          className="text-rose-100/80 text-lg md:text-xl  mb-12 max-w-2xl mx-auto font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Welcome to your personal interactive story. Today, we celebrate 18
          years of you.
        </motion.p>

        {/* Floating Photo Placeholders */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap relative">
          {/* Cute elements: floating hearts */}
          <motion.div
            className="absolute -top-16 right-0 text-rose-400 text-xl"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♥
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-10 text-pink-400 text-2xl"
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            ♥
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.name}
                className="w-36 sm:w-44 bg-neutral-800/60 backdrop-blur-md border border-rose-500/20 rounded-xl flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? 5 : -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="rounded-t-xl h-36 sm:h-44 w-full object-cover"
                />
                <div className="px-2 bg-rose-500/20 rounded my-2 text-sm sm:text-base">
                  {photo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <MotionButton
          className="bg-linear-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin the Journey
        </MotionButton>
      </motion.div>
    </div>
  );
};

export default WelcomePortal;
