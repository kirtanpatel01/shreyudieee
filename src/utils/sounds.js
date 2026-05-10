// Custom sound effects generator using Web Audio API
// This avoids external dependencies and ensures sounds load instantly and reliably.

let audioCtx = null;

export const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Helper to create a gain node with an exponential decay
const createDecayGain = (ctx, startValue, duration) => {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(startValue, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  return gain;
};

export const playClick = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = createDecayGain(ctx, 0.3, 0.1);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playCorrect = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = createDecayGain(ctx, 0.2, 0.3);
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};

export const playWrong = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = createDecayGain(ctx, 0.3, 0.4);
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
  
  // Filter to make it less harsh
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
};

export const playWin = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  
  const playNote = (freq, time, duration) => {
    const osc = ctx.createOscillator();
    const gain = createDecayGain(ctx, 0.15, duration);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  };

  // Arpeggio
  playNote(523.25, now, 0.2); // C5
  playNote(659.25, now + 0.1, 0.2); // E5
  playNote(783.99, now + 0.2, 0.2); // G5
  playNote(1046.50, now + 0.3, 0.5); // C6
};

export const playLose = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  
  const playNote = (freq, time, duration) => {
    const osc = ctx.createOscillator();
    const gain = createDecayGain(ctx, 0.2, duration);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  };

  // Descending
  playNote(392.00, now, 0.2); // G4
  playNote(349.23, now + 0.15, 0.2); // F4
  playNote(329.63, now + 0.3, 0.4); // E4
};

export const playHackerBeep = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = createDecayGain(ctx, 0.1, 0.05);
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(1000, ctx.currentTime);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

export const playHappyBirthday = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  
  const playNote = (freq, time, duration) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Smooth envelope to sound like a music box
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  };

  const notes = [
    { f: 261.63, d: 0.5 }, // C4
    { f: 261.63, d: 0.5 }, // C4
    { f: 293.66, d: 1.0 }, // D4
    { f: 261.63, d: 1.0 }, // C4
    { f: 349.23, d: 1.0 }, // F4
    { f: 329.63, d: 2.0 }, // E4
    
    { f: 261.63, d: 0.5 }, // C4
    { f: 261.63, d: 0.5 }, // C4
    { f: 293.66, d: 1.0 }, // D4
    { f: 261.63, d: 1.0 }, // C4
    { f: 392.00, d: 1.0 }, // G4
    { f: 349.23, d: 2.0 }, // F4
    
    { f: 261.63, d: 0.5 }, // C4
    { f: 261.63, d: 0.5 }, // C4
    { f: 523.25, d: 1.0 }, // C5
    { f: 440.00, d: 1.0 }, // A4
    { f: 349.23, d: 1.0 }, // F4
    { f: 329.63, d: 1.0 }, // E4
    { f: 293.66, d: 2.0 }, // D4
    
    { f: 466.16, d: 0.5 }, // Bb4
    { f: 466.16, d: 0.5 }, // Bb4
    { f: 440.00, d: 1.0 }, // A4
    { f: 349.23, d: 1.0 }, // F4
    { f: 392.00, d: 1.0 }, // G4
    { f: 349.23, d: 2.0 }, // F4
  ];

  let currentTime = now + 0.5; // Start after a short delay
  notes.forEach((note) => {
    playNote(note.f, currentTime, note.d);
    currentTime += note.d * 0.8; // Overlap slightly for legato feel
  });
};

const fairyGlitterAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/fairy-glitter.wav') : null;
if (fairyGlitterAudio) {
  fairyGlitterAudio.preload = 'auto';
}

export const playFairyGlitter = () => {
  if (fairyGlitterAudio) {
    fairyGlitterAudio.currentTime = 0;
    fairyGlitterAudio.play().catch(e => console.error("Error playing sound:", e));
  }
};
