import { useEffect, useRef } from 'react';
import useDopamineStore from '../store/useDopamineStore.js';
import { computeNextDopamine, isPhaseComplete } from '../core/dopamineEngine.js';
import { PHASE } from '../core/constants.js';

const useDopamineLoop = () => {
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const {
    dopamine,
    phase,
    phaseTarget,
    updateDopamine,
    advanceTocrash,
    advanceToRecovery,
    returnToIdle,
    peakReached,
  } = useDopamineStore();

  const stateRef = useRef({ dopamine, phase, phaseTarget, peakReached });
  stateRef.current = { dopamine, phase, phaseTarget, peakReached };

  useEffect(() => {
    const tick = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const { dopamine: curr, phase: p, phaseTarget: target, peakReached: peaked } = stateRef.current;

      const next = computeNextDopamine(curr, p, target, delta);
      updateDopamine(next);

      if (p === PHASE.PEAK && !peaked && isPhaseComplete(next, target, PHASE.PEAK)) {
        advanceTocrash();
      } else if (p === PHASE.CRASH && isPhaseComplete(next, target, PHASE.CRASH)) {
        advanceToRecovery();
      } else if (p === PHASE.RECOVERY && isPhaseComplete(next, target, PHASE.RECOVERY)) {
        returnToIdle();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
};

export default useDopamineLoop;