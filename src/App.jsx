import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Countdown from './components/Countdown';
import WelcomePortal from './components/WelcomePortal';
import GameCatchButton from './components/GameCatchButton';
import MemoryQuiz from './components/MemoryQuiz';
import HeartsHunt from './components/HeartsHunt';
import GameReaction from './components/GameReaction';
import FakeHacker from './components/FakeHacker';
import FinalReveal from './components/FinalReveal';
import MusicToggle from './components/MusicToggle';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [devMode, setDevMode] = useState(() => {
    return localStorage.getItem('devMode') === 'true';
  });
  
  const [isMuted, setIsMuted] = useState(true);
  
  const musicMap = {
    countdown: "IpFX2vq8HKw", // Replace with Blue ID
    welcome: "5gIpqS-Qpzw", // Replace with Vhalam Aavo Ne ID
    catch: "ekr2nIex040", // Replace with APT ID
    quiz: "a7fzkqLozwA", // Replace with I like me better ID
    hunt: "62TrmUvQGjo", // Replace with Cupid ID
    reaction: "a7fzkqLozwA", // Reaction game music
    hacker: "WGXmDsOwW4k", // Replace with Dhoom Again ID
    reveal: "GxldQ9eX2wo", // Replace with Until I Found You ID
  };

  const [currentMusic, setCurrentMusic] = useState(musicMap.welcome);

  const targetDate = new Date('2026-05-11T00:00:00').getTime();

  useEffect(() => {
    const checkUnlock = () => {
      const now = new Date().getTime();
      if (now >= targetDate || devMode) {
        setIsUnlocked(true);
      }
    };

    checkUnlock();
    const interval = setInterval(checkUnlock, 1000);

    // Keyboard shortcut for dev mode: Shift + S
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'S') {
        const newDevMode = !devMode;
        setDevMode(newDevMode);
        localStorage.setItem('devMode', String(newDevMode));
        if (newDevMode) {
          setIsUnlocked(true);
        } else {
          // Re-check if it should be locked
          const now = new Date().getTime();
          if (now < targetDate) {
            setIsUnlocked(false);
            setCurrentPage(1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [devMode, targetDate]);

  useEffect(() => {
    let music = musicMap.welcome;
    if (!isUnlocked) {
      music = musicMap.countdown;
    } else {
      switch (currentPage) {
        case 1: music = musicMap.welcome; break;
        case 2: music = musicMap.catch; break;
        case 3: music = musicMap.reaction; break;
        case 4: music = musicMap.quiz; break;
        case 5: music = musicMap.hunt; break;
        case 6: music = musicMap.hacker; break;
        case 7: music = musicMap.reveal; break;
        default: music = musicMap.welcome;
      }
    }
    setCurrentMusic(music);
  }, [isUnlocked, currentPage]);



  const toggleMusic = () => {
    setIsMuted(!isMuted);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <WelcomePortal onNext={handleNextPage} />;
      case 2:
        return <GameCatchButton onNext={handleNextPage} />;
      case 3:
        return <GameReaction onNext={handleNextPage} />;
      case 4:
        return <MemoryQuiz onNext={handleNextPage} />;
      case 5:
        return <HeartsHunt onNext={handleNextPage} />;
      case 6:
        return <FakeHacker onNext={handleNextPage} />;
      case 7:
        return <FinalReveal />;
      default:
        return <WelcomePortal onNext={handleNextPage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 overflow-hidden font-sans antialiased">
      <Background />
      <MusicToggle isMuted={isMuted} onToggle={toggleMusic} />
      
      {/* Hidden YouTube Player (sized 1x1 to allow autoplay on mobile) */}
      <iframe
        src={`https://www.youtube.com/embed/${currentMusic}?autoplay=1&loop=1&playlist=${currentMusic}&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
        allow="autoplay"
        className="absolute w-1 h-1 opacity-0 pointer-events-none"
        title="Music Player"
      />

      {/* Dev Mode Indicator */}
      {devMode && (
        <div className="fixed bottom-4 left-4 z-50 text-xs text-rose-300/50 bg-neutral-800/80 px-2 py-1 rounded border border-rose-500/20">
          Dev Mode Active (Press Shift + S to toggle)
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <Countdown onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key={`page-${currentPage}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {renderPage()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
