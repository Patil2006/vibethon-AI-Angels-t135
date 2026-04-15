import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '📚', title: 'Learn', desc: 'Bite-sized ML lessons for all levels.' },
  { icon: '🎮', title: 'Play', desc: 'Mini games that teach ML concepts.' },
  { icon: '📝', title: 'Quiz', desc: 'Test what you know and track progress.' },
];

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Learn Machine Learning <span>by Playing</span></h1>
        <p>
          Interactive lessons, games, and quizzes that make AI concepts click —
          no math degree required.
        </p>
        <div className="hero-actions">
          <Link to="/learn" className="btn-primary">Get Started</Link>
          <Link to="/dashboard" className="btn-secondary">View Dashboard</Link>
        </div>
      </section>

      <section className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
