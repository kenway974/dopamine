import React from 'react';
import { PHASE } from '../core/constants.js';

const PHASE_INFO = {
  [PHASE.IDLE]: { label: 'Baseline', desc: 'System at rest', color: '#74c0fc' },
  [PHASE.PEAK]: { label: '▲ Rising', desc: 'Dopamine surge active', color: '#ffd43b' },
  [PHASE.CRASH]: { label: '▼ Crashing', desc: 'Post-peak withdrawal', color: '#ff6b6b' },
  [PHASE.RECOVERY]: { label: '↺ Recovery', desc: 'Returning to baseline', color: '#51cf66' },
};

const PhaseIndicator = ({ phase, activeActivity }) => {
  const info = PHASE_INFO[phase] || PHASE_INFO[PHASE.IDLE];

  return (
    <div className="phase-indicator" style={{ '--phase-color': info.color }}>
      <div className="phase-dot" />
      <div className="phase-text">
        <span className="phase-label">{info.label}</span>
        <span className="phase-desc">
          {activeActivity ? `${activeActivity.emoji} ${activeActivity.name}` : info.desc}
        </span>
      </div>
    </div>
  );
};

export default PhaseIndicator;