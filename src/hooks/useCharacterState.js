import { useMemo } from 'react';
import useDopamineStore from '../store/useDopamineStore.js';
import { getMoodFromLevel } from '../core/dopamineEngine.js';
import { CHARACTER_MOODS, PHASE } from '../core/constants.js';

const useCharacterState = () => {
  const dopamine = useDopamineStore((s) => s.dopamine);
  const phase = useDopamineStore((s) => s.phase);
  const activeActivity = useDopamineStore((s) => s.activeActivity);
  const history = useDopamineStore((s) => s.history);
  const totalActivities = useDopamineStore((s) => s.totalActivities);

  const mood = useMemo(() => getMoodFromLevel(dopamine), [dopamine]);
  const moodConfig = useMemo(() => CHARACTER_MOODS[mood], [mood]);

  const isActive = phase !== PHASE.IDLE;
  const isPeaking = phase === PHASE.PEAK;
  const isCrashing = phase === PHASE.CRASH;
  const isRecovering = phase === PHASE.RECOVERY;

  const wobbleIntensity = useMemo(() => {
    if (dopamine > 80) return 3;
    if (dopamine > 60) return 1.5;
    if (dopamine < 20) return 0.3;
    return 1;
  }, [dopamine]);

  const glowColor = useMemo(() => {
    if (dopamine > 80) return '#ffd43b';
    if (dopamine > 60) return '#51cf66';
    if (dopamine > 40) return '#74c0fc';
    if (dopamine > 20) return '#ff922b';
    return '#ff6b6b';
  }, [dopamine]);

  return {
    dopamine,
    phase,
    mood,
    moodConfig,
    activeActivity,
    history,
    totalActivities,
    isActive,
    isPeaking,
    isCrashing,
    isRecovering,
    wobbleIntensity,
    glowColor,
  };
};

export default useCharacterState;