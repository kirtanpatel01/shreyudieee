import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom';
import Background from './components/Background';
import WelcomePortal from './components/WelcomePortal';
import GameCatchButton from './components/GameCatchButton';
import HeartsHunt from './components/HeartsHunt';
import GameReaction from './components/GameReaction';
import FakeHacker from './components/FakeHacker';
import FinalReveal from './components/FinalReveal';
import Button from './components/Button';

const musicMap = {
  welcome: "5gIpqS-Qpzw",
  catch: "ekr2nIex040",
  quiz: "a7fzkqLozwA",
  hunt: "62TrmUvQGjo",
  reaction: "a7fzkqLozwA",
  hacker: "WGXmDsOwW4k",
  reveal: "GxldQ9eX2wo",
};

const routesOrder = ['/', '/catch', '/reaction', '/hunt', '/hacker', '/reveal'];
const gameKeys = {
  '/': 'welcome',
  '/catch': 'catch',
  '/reaction': 'reaction',
  '/hunt': 'hunt',
  '/hacker': 'hacker',
  '/reveal': 'reveal'
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [currentMusic, setCurrentMusic] = useState(musicMap.welcome);

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {
      welcome: { wins: 1, losses: 0 },
      catch: { wins: 0, losses: 0 },
      reaction: { wins: 0, losses: 0 },
      hunt: { wins: 0, losses: 0 },
      hacker: { wins: 0, losses: 0 },
      reveal: { wins: 1, losses: 0 }
    };
  });

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const recordWin = (gameKey) => {
    setProgress(prev => ({
      ...prev,
      [gameKey]: { ...prev[gameKey], wins: prev[gameKey].wins + 1 }
    }));
  };

  const recordLoss = (gameKey) => {
    setProgress(prev => ({
      ...prev,
      [gameKey]: { ...prev[gameKey], losses: prev[gameKey].losses + 1 }
    }));
  };

  useEffect(() => {
    const path = location.pathname;
    let music = musicMap.welcome;
    switch (path) {
      case '/': music = musicMap.welcome; break;
      case '/catch': music = musicMap.catch; break;
      case '/reaction': music = musicMap.reaction; break;
      case '/hunt': music = musicMap.hunt; break;
      case '/hacker': music = musicMap.hacker; break;
      case '/reveal': music = musicMap.reveal; break;
      default: music = musicMap.welcome;
    }
    setCurrentMusic(music);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-neutral-900 overflow-hidden font-sans antialiased">
      <Background />
      
      {/* Hidden YouTube Player */}
      <iframe
        src={`https://www.youtube.com/embed/${currentMusic}?autoplay=1&loop=1&playlist=${currentMusic}&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
        allow="autoplay"
        className="absolute w-1 h-1 opacity-0 pointer-events-none"
        title="Music Player"
      />

      <Routes>
        <Route path="/" element={<Layout progress={progress} />}>
          <Route index element={<WelcomePortal onNext={() => navigate('/catch')} />} />
          <Route path="catch" element={<GameCatchButton onWin={() => recordWin('catch')} onLoss={() => recordLoss('catch')} onNext={() => navigate('/reaction')} />} />
          <Route path="reaction" element={<GameReaction onWin={() => recordWin('reaction')} onLoss={() => recordLoss('reaction')} onNext={() => navigate('/hunt')} />} />
          <Route path="hunt" element={<HeartsHunt onWin={() => recordWin('hunt')} onLoss={() => recordLoss('hunt')} onNext={() => navigate('/hacker')} />} />
          <Route path="hacker" element={<FakeHacker onWin={() => recordWin('hacker')} onLoss={() => recordLoss('hacker')} onNext={() => navigate('/reveal')} />} />
          <Route path="reveal" element={<FinalReveal />} />
        </Route>
      </Routes>
    </div>
  );
}

const Layout = ({ progress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const currentIndex = routesOrder.indexOf(currentPath);
  
  const currentGameKey = gameKeys[currentPath];
  const hasWon = progress[currentGameKey]?.wins > 0 || currentPath === '/' || currentPath === '/reveal';
  
  const handleNext = () => {
    if (currentIndex < routesOrder.length - 1) {
      navigate(routesOrder[currentIndex + 1]);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(routesOrder[currentIndex - 1]);
    }
  };
  
  const handleSkip = () => {
    if (currentPath === '/reaction') {
      navigate('/hunt');
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="pb-20"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-between px-4 z-50">
        <Button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={`bg-neutral-800/80 border border-neutral-700 text-white ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-700'}`}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentPath === '/reaction' && (
            <Button 
              onClick={handleSkip}
              className="bg-yellow-600/80 border border-yellow-700 text-white hover:bg-yellow-500"
            >
              Skip
            </Button>
          )}
          
          <Button 
            onClick={handleNext} 
            disabled={!hasWon || currentIndex === routesOrder.length - 1}
            className={`${hasWon ? 'bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-lg hover:shadow-rose-500/30' : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'} text-white`}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* Stats Display */}
      {currentGameKey && currentGameKey !== 'welcome' && currentGameKey !== 'reveal' && (
        <div className="fixed top-4 left-4 z-50 text-xs text-rose-300/70 bg-neutral-800/80 px-2 py-1 rounded border border-rose-500/20">
          Wins: {progress[currentGameKey]?.wins || 0} | Losses: {progress[currentGameKey]?.losses || 0}
        </div>
      )}
    </div>
  );
};

export default App;
