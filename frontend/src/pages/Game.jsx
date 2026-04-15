import React from 'react';

function Game() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-glow" style={{ background: 'rgba(59,130,246,0.1)' }}>🎮</div>
      <h2>Mini Game <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Coming Soon</span></h2>
      <p>We're building an interactive ML game where you train models by making decisions. Stay tuned!</p>
      <div className="coming-soon-badge">⏳ In Development</div>
    </div>
  );
}

export default Game;
