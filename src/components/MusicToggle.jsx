import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Button from './Button';

const MusicToggle = ({ isMuted, onToggle }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={onToggle}
        className="bg-neutral-800/60 backdrop-blur-md border border-rose-500/20 p-3 text-rose-300 hover:bg-neutral-800 hover:border-rose-500/50"
        aria-label="Toggle Music"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
    </div>
  );
};

export default MusicToggle;
