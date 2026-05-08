import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Button';

const MotionButton = motion(Button);

const questions = [
  {
    question: "What do we send each other the most?",
    options: ["Food reels that make us hungry", "Cringe reels", "90's songs", "Emotional quotes"],
    correct: 0,
    responses: [
      "Correct! And you're the reason I'm not losing weight! 🍔",
      "Cringe? Our taste is elite! How dare you! 😠",
      "We do send 90s songs, but food is life! 🎵",
      "Emotional quotes? Who are you and what have you done to Shreya? 😳"
    ]
  },
  {
    question: "Why do you tease me?",
    options: ["Because I'm fat", "Because you love me", "Because I'm easy to tease", "I don't tease you"],
    correct: 0,
    responses: [
      "Yes, you always call me fatty! But I still talk to you every day... 🥺",
      "Love? Don't get emotional now, Shortie! 😜",
      "Wow, admitting to bullying me? Mean! 😭",
      "Liar! You tease me every single day! 🤥"
    ]
  },
  {
    question: "What's my favorite thing about you?",
    options: ["You respect me", "You listen to my rants", "You are short", "You always make me happy"],
    correct: 3,
    responses: [
      "Yes, you do respect me, and that means a lot! 💖",
      "Thanks for being my free therapist! 😂",
      "I mean, it is fun to tease you about it, but not the favorite! 😜",
      "Yes! You always make me happy, Bakudieee! 🥰"
    ]
  }
];

const MemoryQuiz = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f472b6'],
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full">
        <span className="text-rose-400 text-2xl mb-2 block font-caveat">
          Memory Journey {currentQuestion + 1}/6
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-rose-100 font-heading relative">
          {questions[currentQuestion].question}
          {/* Cute element: floating question mark */}
          <motion.span
            className="absolute -top-6 -right-6 text-pink-400 text-2xl font-caveat"
            animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ?
          </motion.span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <MotionButton
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                selectedOption === index
                  ? index === questions[currentQuestion].correct
                    ? 'bg-rose-500/20 border-rose-500 text-rose-100'
                    : 'bg-red-500/20 border-red-500 text-red-100'
                  : 'bg-neutral-800/60 border-rose-500/20 text-rose-200/80 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
              onClick={() => handleOptionClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </MotionButton>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-light text-rose-200"
            >
              {questions[currentQuestion].responses[selectedOption]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-md mx-auto">
          <Button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`bg-neutral-800 border border-rose-500/20 text-rose-200 ${currentQuestion === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-700'}`}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isCorrect}
            className={`bg-gradient-to-r from-rose-500 to-pink-500 text-white ${!isCorrect ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-rose-500/30'}`}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryQuiz;
