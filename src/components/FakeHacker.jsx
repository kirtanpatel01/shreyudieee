import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FakeHacker = ({ onNext }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const fullLogs = [
    "Initializing bypass protocol...",
    "Accessing database.shreya.memories...",
    "Decrypting 18 years of data...",
    "Bypassing security layers...",
    "Extracting pure chaos...",
    "Loading funny moments...",
    "Finalizing decryption...",
    "Access Granted.",
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < fullLogs.length) {
        setLogs((prev) => [...prev, fullLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressInterval);
        setIsDone(true);
        return 100;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10 px-4">
      <div className="text-center max-w-2xl w-full mb-8">
        <span className="text-rose-400 text-sm uppercase tracking-widest mb-4 block">
          Memory Journey 5/6
        </span>
      </div>

      <div className="w-full max-w-2xl bg-black/80 border border-rose-500/30 rounded-xl p-6 font-mono text-sm text-rose-300 shadow-2xl shadow-rose-500/10">
        <div className="flex items-center gap-2 mb-4 border-b border-rose-500/20 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-rose-200/50 ml-2 text-xs">shreya@birthday-terminal:~</span>
        </div>

        <div className="space-y-2 min-h-[200px]">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={log === "Access Granted." ? "text-green-400 font-bold" : ""}
            >
              <span className="text-rose-500/50">$</span> {log}
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-rose-200/50 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
              style={{ width: `${progress}%` }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {isDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-12"
        >
          <p className="text-2xl text-rose-100 font-bold mb-6">
            You are officially 18 now.
          </p>
          <button
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
            onClick={onNext}
          >
            See the Final Reveal
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FakeHacker;
