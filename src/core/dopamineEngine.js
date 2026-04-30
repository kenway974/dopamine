import { BASELINE_DOPAMINE, MAX_DOPAMINE, MIN_DOPAMINE, PEAK_RISE_RATE, CRASH_FALL_RATE, RECOVERY_RATE, PHASE } from './constants.js';
import { lerp, clamp, easeOutElastic, easeInQuad } from './easing.js';

export const computeNextDopamine = (current, phase, target, delta) => {
  const dt = Math.min(delta, 64) / 16;

  switch (phase) {
    case PHASE.PEAK: {
      const speed = PEAK_RISE_RATE * dt;
      const next = lerp(current, target, speed * 0.12);
      return clamp(next, MIN_DOPAMINE, MAX_DOPAMINE);
    }
    case PHASE.CRASH: {
      const speed = CRASH_FALL_RATE * dt;
      const next = lerp(current, target, speed * 0.08);
      return clamp(next, MIN_DOPAMINE, MAX_DOPAMINE);
    }
    case PHASE.RECOVERY: {
      const speed = RECOVERY_RATE * dt;
      const next = lerp(current, BASELINE_DOPAMINE, speed * 0.05);
      return clamp(next, MIN_DOPAMINE, MAX_DOPAMINE);
    }
    case PHASE.IDLE:
    default: {
      if (Math.abs(current - BASELINE_DOPAMINE) < 0.1) return BASELINE_DOPAMINE;
      const next = lerp(current, BASELINE_DOPAMINE, 0.02 * dt);
      return clamp(next, MIN_DOPAMINE, MAX_DOPAMINE);
    }
  }
};

export const getPhaseProgress = (current, start, target) => {
  if (Math.abs(target - start) < 0.001) return 1;
  return clamp((current - start) / (target - start), 0, 1);
};

export const isPhaseComplete = (current, target, phase) => {
  const threshold = 0.8;
  if (phase === PHASE.PEAK) return current >= target * threshold;
  if (phase === PHASE.CRASH) return current <= target + (target * 0.1);
  if (phase === PHASE.RECOVERY) return Math.abs(current - BASELINE_DOPAMINE) < 1.5;
  return false;
};

export const getMoodFromLevel = (level) => {
  if (level >= 80) return 'EUPHORIC';
  if (level >= 60) return 'HAPPY';
  if (level >= 40) return 'NEUTRAL';
  if (level >= 20) return 'LOW';
  return 'CRASHED';
};

export const computeActivityPhases = (activity) => ({
  peakTarget: activity.dopaminePeak,
  crashTarget: activity.dopamineCrash,
  peakDuration: activity.duration * 0.4,
  crashDuration: activity.duration * 0.6,
});