import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '📚', title: 'Interactive Learning', desc: 'Bite-sized ML lessons with real examples. Go from zero to understanding AI in hours.', grad: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', bg: 'rgba(59,130,246,0.1)' },
  { icon: '🎮', title: 'Learn by Playing', desc: 'Mini games that teach ML concepts through hands-on interaction. Fun and effective.', grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)', bg: 'rgba(6,182,212,0.1)' },
  { icon: '📝', title: 'Smart Quizzes', desc: 'Test your knowledge with adaptive quizzes. Track your progress and improve fast.', grad: 'linear-gradient(135deg,#10b981,#06b6d4)', bg: 'rgba(16,185,129,0.1)' },
  { icon: '🤖', title: 'Live ML Demo', desc: 'See real machine learning predictions in action. Input data, get instant results.', grad: 'linear-gradient(135deg,#f59e0b,#ec4899)', bg: 'rgba(245,158,11,0.1)' },
  { icon: '📊', title: 'Progress Dashboard', desc: 'Track your learning journey with beautiful stats, streaks, and achievements.', grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)', bg: 'rgba(139,92,246,0.1)' },
  { icon: '🚀', title: 'Project Ready', desc: 'Built for hackathons and demos. Full-stack React + FastAPI + MongoDB architecture.', grad: 'linear-gradient(135deg,#ec4899,#f59e0b)', bg: 'rgba(236,72,153,0.1)' },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-Powered Learning Platform
        </div>
        <h1>
          Learn Machine Learning<br />
          <span className="grad">by Playing</span> &amp; <span className="grad2">Exploring</span>
        </h1>
        <p>
          The most interactive way to understand AI. No math degree required —
          just curiosity and a browser.
        </p>
        <div className="hero-actions">
          <Link to="/learn" className="btn-primary">🚀 Start Learning</Link>
          <Link to="/dashboard" className="btn-secondary">📊 View Dashboard</Link>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">3+</div>
            <div className="hero-stat-label">ML TOPICS</div>
          </div>
          <div>
            <div className="hero-stat-value">100%</div>
            <div className="hero-stat-label">MODEL ACCURACY</div>
          </div>
          <div>
            <div className="hero-stat-value">Live</div>
            <div className="hero-stat-label">API DEMO</div>
          </div>
          <div>
            <div className="hero-stat-value">Free</div>
            <div className="hero-stat-label">OPEN SOURCE</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginTop: '60px' }}>
        <div className="section-label">WHAT YOU GET</div>
        <h2 className="section-title">Everything to Master ML</h2>
        <p className="section-sub">From basics to live predictions — all in one platform.</p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon-wrap" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
