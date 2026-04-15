import React from 'react';

const topics = [
  {
    icon: '🧠',
    title: 'ML Basics',
    description: 'Understand what machine learning is, how it works, and where it\'s used in the real world.',
    tag: 'Beginner',
  },
  {
    icon: '📊',
    title: 'Data Handling',
    description: 'Learn how to collect, clean, and prepare data — the foundation of every ML project.',
    tag: 'Intermediate',
  },
  {
    icon: '🤖',
    title: 'Models',
    description: 'Explore decision trees, neural networks, and how to choose the right model.',
    tag: 'Intermediate',
  },
];

function Learn() {
  return (
    <div>
      <h2 className="page-title">Learn</h2>
      <p className="page-subtitle">Pick a topic and start exploring machine learning.</p>
      <div className="cards-grid">
        {topics.map((topic) => (
          <div className="card" key={topic.title}>
            <div className="card-icon">{topic.icon}</div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <span className="card-tag">{topic.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
