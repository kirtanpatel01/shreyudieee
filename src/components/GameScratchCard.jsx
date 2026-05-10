import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import confetti from 'canvas-confetti';
import scratchBg from '../assets/scratch_bg.png';

const GameScratchCard = ({ onNext }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    
    // Set canvas size to match parent
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    // Fill canvas with a cover color (like silver or rose gold)
    ctx.fillStyle = '#e879f9'; // rose-400
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise or pattern to make it look like a scratch card
    ctx.fillStyle = '#f472b6'; // pink-400
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }

    // Add text instructions on the canvas
    ctx.font = '24px "Caveat", cursive, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch here with your mouse/finger!', canvas.width / 2, canvas.height / 2);
    
    ctx.font = '16px sans-serif';
    ctx.fillText('Reveal the secret message', canvas.width / 2, canvas.height / 2 + 30);

    // Set up composite operation for scratching
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPointerPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const draw = (e) => {
      if (!isDrawing) return;
      
      const pos = getPointerPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      
      calculateScratchedPercentage();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      ctx.beginPath();
    };

    const startDrawing = (e) => {
      setIsDrawing(true);
      const pos = getPointerPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      draw(e);
    };

    const calculateScratchedPercentage = () => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      
      // Check every 10th pixel to save performance
      for (let i = 0; i < pixels.length; i += 40) {
        if (pixels[i + 3] === 0) {
          transparentPixels++;
        }
      }
      
      const percentage = (transparentPixels / (pixels.length / 40)) * 100;
      setScratchedPercentage(percentage);
      
      if (percentage > 50 && !isScratched) {
        setIsScratched(true);
        // Clear the whole canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fda4af', '#f472b6'],
        });
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, isScratched]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full mb-8">
        <span className="text-rose-400 text-2xl mb-2 block font-caveat">
          Game 3: The Secret
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-100 font-heading">
          Scratch Card Reveal
        </h2>
        <p className="text-rose-200/60 mb-6 font-light">
          Scratch the card to reveal a special memory or message!
        </p>
      </div>

      <div className="relative w-full max-w-md h-80 bg-neutral-800 rounded-2xl overflow-hidden border border-rose-500/20 shadow-2xl">
        {/* Hidden Content (Revealed) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <img 
            src={scratchBg} 
            alt="Secret" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-rose-300 mb-2">Surprise! 🎉</h3>
            <p className="text-rose-100 text-lg font-caveat">
              "You are legally unforgettable."
            </p>
            <p className="text-rose-200/80 text-sm mt-4">
              I made this whole site just to make you smile on your birthday.
            </p>
          </div>
        </div>

        {/* Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-500 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>

      <div className="mt-8">
        {isScratched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
            >
              Continue to Hacking...
            </Button>
          </motion.div>
        )}
      </div>
      
      {!isScratched && scratchedPercentage > 0 && (
        <p className="text-rose-300/70 mt-4 text-sm">
          Scratched: {Math.round(scratchedPercentage)}% (Need 50%)
        </p>
      )}
    </div>
  );
};

export default GameScratchCard;
