export const BASELINE_DOPAMINE = 40;
export const MAX_DOPAMINE = 100;
export const MIN_DOPAMINE = 0;

export const PEAK_RISE_RATE = 2.2;
export const CRASH_FALL_RATE = 0.6;
export const RECOVERY_RATE = 0.08;

export const PHASE = {
  IDLE: 'IDLE',
  PEAK: 'PEAK',
  CRASH: 'CRASH',
  RECOVERY: 'RECOVERY',
};

export const ACTIVITIES = [
  { id: 'scroll', name: 'Doom Scroll', dopaminePeak: 95, dopamineCrash: 15, duration: 6000, emoji: '📱', color: '#ff6b6b' },
  { id: 'exercise', name: 'Exercise', dopaminePeak: 78, dopamineCrash: 55, duration: 8000, emoji: '🏃', color: '#51cf66' },
  { id: 'junk_food', name: 'Junk Food', dopaminePeak: 88, dopamineCrash: 20, duration: 4000, emoji: '🍕', color: '#ffa94d' },
  { id: 'meditation', name: 'Meditate', dopaminePeak: 62, dopamineCrash: 50, duration: 10000, emoji: '🧘', color: '#74c0fc' },
  { id: 'gaming', name: 'Gaming', dopaminePeak: 90, dopamineCrash: 18, duration: 7000, emoji: '🎮', color: '#da77f2' },
  { id: 'reading', name: 'Deep Work', dopaminePeak: 65, dopamineCrash: 58, duration: 9000, emoji: '📖', color: '#a9e34b' },
  { id: 'alcohol', name: 'Alcohol', dopaminePeak: 92, dopamineCrash: 10, duration: 5000, emoji: '🍺', color: '#ffd43b' },
  { id: 'cold_shower', name: 'Cold Shower', dopaminePeak: 70, dopamineCrash: 60, duration: 3000, emoji: '🚿', color: '#4dabf7' },
];

export const CHARACTER_MOODS = {
  EUPHORIC: { min: 80, label: 'Euphoric', color: '#ffd43b' },
  HAPPY: { min: 60, label: 'Happy', color: '#51cf66' },
  NEUTRAL: { min: 40, label: 'Neutral', color: '#74c0fc' },
  LOW: { min: 20, label: 'Low', color: '#ff922b' },
  CRASHED: { min: 0, label: 'Crashed', color: '#ff6b6b' },
};