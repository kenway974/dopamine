import React, { useEffect } from 'react';
import useDopamineLoop from './hooks/useDopamineLoop.js';
import DopamineDisplay from './features/DopamineDisplay.jsx';
import ActivityGrid from './features/ActivityGrid.jsx';
import StatsPanel from './features/StatsPanel.jsx';
import './App.css';

const App = () => {
  useDopamineLoop();

  return (
    <div className="app">
      <div className="scanlines" />
      <header className="app-header">
        <div className="header-eyebrow">NEURAL REWARD SIMULATOR</div>
        <h1 className="header-title">DOPAMINE<span className="title-accent">LOOP</span></h1>
        <div className="header-sub">Your brain. Gamified. Exposed.</div>
      </header>

      <main className="app-main">
        <section className="panel panel-display">
          <DopamineDisplay />
        </section>

        <section className="panel panel-activities">
          <ActivityGrid />
        </section>

        <section className="panel panel-stats">
          <StatsPanel />
        </section>
      </main>

      <footer className="app-footer">
        <span>⚡ Real neuroscience. Fake consequences. Very real feelings.</span>
      </footer>
    </div>
  );
};

export default App;