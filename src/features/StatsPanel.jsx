import React from 'react';
import useCharacterState from '../hooks/useCharacterState.js';
import HistoryLog from '../components/HistoryLog.jsx';

const StatsPanel = () => {
  const { history, totalActivities, dopamine } = useCharacterState();

  const avgPeak = history.length
    ? Math.round(history.reduce((a, b) => a + b.dopaminePeak, 0) / history.length)
    : 0;

  return (
    <div className="stats-panel">
      <div className="stats-row">
        <div className="stat-chip">
          <span className="stat-num">{totalActivities}</span>
          <span className="stat-lbl">hits</span>
        </div>
        <div className="stat-chip">
          <span className="stat-num">{Math.round(dopamine)}</span>
          <span className="stat-lbl">current</span>
        </div>
        <div className="stat-chip">
          <span className="stat-num">{avgPeak || '–'}</span>
          <span className="stat-lbl">avg peak</span>
        </div>
      </div>
      <div className="history-section">
        <div className="history-title">Recent Activity</div>
        <HistoryLog history={history} />
      </div>
    </div>
  );
};

export default StatsPanel;