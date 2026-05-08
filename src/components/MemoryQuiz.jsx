import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const questions = [
  {
    question: "Who is more chaotic?",
    options: ["Shreya", "Everyone else", "Definitely Shreya", "The Universe"],
    correct: 0,
    wrongResponse: "Nice try, but we all know it's Shreya."
  },
  {
    question: "What's the best memory?",
    options: ["Late night talks", "Random adventures", "All of them", "That one time we..."],
    correct: 2,
    wrongResponse: "Every moment is special, but ALL of them is the right answer!"
  },
  {
    question: "Who replies slower?",
    options: ["A sloth", "A rock", "Shreya", "A snail"],
    correct: 2,
    wrongResponse: "Close, but Shreya holds the record."
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

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full">
        <span className="text-rose-400 text-sm uppercase tracking-widest mb-4 block">
          Memory Journey {currentQuestion + 1}/6
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-rose-100">
          {questions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                selectedOption === index
                  ? index === questions[currentQuestion].correct
                    ? 'bg-rose-500/20 border-rose-500 text-rose-100'
                    : 'bg-red-500/20 border-red-500 text-red-100'
                  : 'bg-neutral-800/60 border-rose-500/20 text-rose-200/80 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-lg font-light ${isCorrect ? 'text-rose-300' : 'text-red-300'}`}
            >
              {isCorrect ? "Correct! ✨" : questions[currentQuestion].wrongResponse}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryQuiz;
