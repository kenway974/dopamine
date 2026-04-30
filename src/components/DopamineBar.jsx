import React, { useRef, useEffect } from 'react';

const DopamineBar = ({ dopamine, phase, glowColor, moodConfig }) => {
  const fillRef = useRef(null);

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.height = `${dopamine}%`;
    }
  }, [dopamine]);

  const segments = [80, 60, 40, 20];

  return (
    <div className="dopamine-bar-container">
      <div className="bar-label">DOPAMINE</div>
      <div className="bar-track">
        {segments.map((seg) => (
          <div
            key={seg}
            className="bar-segment-line"
            style={{ bottom: `${seg}%` }}
          />
        ))}
        <div
          ref={fillRef}
          className={`bar-fill phase-${phase.toLowerCase()}`}
          style={{
            '--glow-color': glowColor,
            background: `linear-gradient(to top, ${glowColor}88, ${glowColor})`,
          }}
        />
        <div className="bar-value">{Math.round(dopamine)}</div>
      </div>
      <div className="bar-mood-label" style={{ color: moodConfig?.color }}>
        {moodConfig?.label}
      </div>
    </div>
  );
};

export default DopamineBar;