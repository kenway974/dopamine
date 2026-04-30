import React from 'react';
import { ACTIVITIES } from '../core/constants.js';
import ActivityButton from '../components/ActivityButton.jsx';
import useDopamineStore from '../store/useDopamineStore.js';
import { PHASE } from '../core/constants.js';

const ActivityGrid = () => {
  const phase = useDopamineStore((s) => s.phase);
  const startActivity = useDopamineStore((s) => s.startActivity);
  const isDisabled = phase !== PHASE.IDLE;

  return (
    <div className="activity-grid">
      <div className="grid-header">Choose a stimulus</div>
      <div className="grid-cells">
        {ACTIVITIES.map((act) => (
          <ActivityButton
            key={act.id}
            activity={act}
            isDisabled={isDisabled}
            onSelect={startActivity}
          />
        ))}
      </div>
      {isDisabled && (
        <div className="grid-overlay-msg">⏳ Wait for recovery...</div>
      )}
    </div>
  );
};

export default ActivityGrid;