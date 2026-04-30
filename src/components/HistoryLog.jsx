import React from 'react';

const HistoryLog = ({ history }) => {
  if (!history.length) return (
    <div className="history-empty">No activities yet. Pick something.</div>
  );

  return (
    <div className="history-log">
      {history.map((entry, i) => (
        <div key={`${entry.id}-${entry.timestamp}`} className="history-entry" style={{ '--delay': i * 0.05 + 's' }}>
          <span className="hist-emoji">{entry.emoji}</span>
          <span className="hist-name">{entry.name}</span>
          <span className="hist-time">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ))}
    </div>
  );
};

export default HistoryLog;