import React from 'react';
import useCharacterState from '../hooks/useCharacterState.js';
import Character from '../components/Character.jsx';
import DopamineBar from '../components/DopamineBar.jsx';
import PhaseIndicator from '../components/PhaseIndicator.jsx';

const DopamineDisplay = () => {
  const {
    dopamine,
    phase,
    mood,
    moodConfig,
    activeActivity,
    isPeaking,
    isCrashing,
    wobbleIntensity,
    glowColor,
  } = useCharacterState();

  return (
    <div className="dopamine-display">
      <PhaseIndicator phase={phase} activeActivity={activeActivity} />
      <div className="display-center">
        <Character
          mood={mood}
          dopamine={dopamine}
          wobbleIntensity={wobbleIntensity}
          glowColor={glowColor}
          isPeaking={isPeaking}
          isCrashing={isCrashing}
        />
        <DopamineBar
          dopamine={dopamine}
          phase={phase}
          glowColor={glowColor}
          moodConfig={moodConfig}
        />
      </div>
    </div>
  );
};

export default DopamineDisplay;