import { create } from 'zustand';
import { BASELINE_DOPAMINE, PHASE } from '../core/constants.js';

const useDopamineStore = create((set, get) => ({
  dopamine: BASELINE_DOPAMINE,
  phase: PHASE.IDLE,
  activeActivity: null,
  phaseTarget: BASELINE_DOPAMINE,
  phaseStartValue: BASELINE_DOPAMINE,
  activityStartTime: null,
  history: [],
  totalActivities: 0,
  peakReached: false,

  setDopamine: (dopamine) => set({ dopamine }),

  setPhase: (phase) => set({ phase }),

  startActivity: (activity) => {
    const { dopamine } = get();
    set({
      activeActivity: activity,
      phase: PHASE.PEAK,
      phaseTarget: activity.dopaminePeak,
      phaseStartValue: dopamine,
      activityStartTime: performance.now(),
      peakReached: false,
      totalActivities: get().totalActivities + 1,
    });
  },

  advanceTocrash: () => {
    const { dopamine, activeActivity } = get();
    if (!activeActivity) return;
    set({
      phase: PHASE.CRASH,
      phaseTarget: activeActivity.dopamineCrash,
      phaseStartValue: dopamine,
      peakReached: true,
    });
  },

  advanceToRecovery: () => {
    const { dopamine, activeActivity, history } = get();
    const entry = activeActivity
      ? { ...activeActivity, timestamp: Date.now(), peakLevel: dopamine }
      : null;
    set({
      phase: PHASE.RECOVERY,
      phaseTarget: BASELINE_DOPAMINE,
      phaseStartValue: dopamine,
      activeActivity: null,
      history: entry ? [entry, ...history].slice(0, 10) : history,
    });
  },

  returnToIdle: () => {
    set({
      phase: PHASE.IDLE,
      phaseTarget: BASELINE_DOPAMINE,
      phaseStartValue: BASELINE_DOPAMINE,
    });
  },

  updateDopamine: (value) => set({ dopamine: value }),
}));

export default useDopamineStore;