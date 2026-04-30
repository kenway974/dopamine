import React, { useState } from 'react';

const ActivityButton = ({ activity, isDisabled, onSelect }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;
    setPressed(true);
    onSelect(activity);
    setTimeout(() => setPressed(false), 200);
  };

  return (
    <button
      className={`activity-btn ${isDisabled ? 'disabled' : ''} ${pressed ? 'pressed' : ''}`}
      onClick={handleClick}
      style={{ '--accent': activity.color }}
      disabled={isDisabled}
    >
      <span className="act-emoji">{activity.emoji}</span>
      <span className="act-name">{activity.name}</span>
      <div className="act-bars">
        <div className="act-bar-row">
          <span className="act-bar-label">↑</span>
          <div className="act-bar-track">
            <div
              className="act-bar-fill peak"
              style={{ width: `${activity.dopaminePeak}%`, background: activity.color }}
            />
          </div>
        </div>
        <div className="act-bar-row">
          <span className="act-bar-label">↓</span>
          <div className="act-bar-track">
            <div
              className="act-bar-fill crash"
              style={{ width: `${activity.dopamineCrash}%`, background: '#ff6b6b44' }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ActivityButton;