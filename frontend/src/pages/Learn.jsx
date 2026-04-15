import React from 'react';

const topics = [
  {
    icon: '🧠', title: 'ML Basics', tag: 'BEGINNER',
    desc: 'Understand what machine learning is, how algorithms learn from data, and where AI is used in the real world.',
    meta: '5 lessons · 20 min',
    tagColor: 'rgba(16,185,129,0.15)', tagText: '#10b981',
    iconBg: 'rgba(59,130,246,0.12)',
  },
  {
    icon: '📊', title: 'Data Handling', tag: 'INTERMEDIATE',
    desc: 'Learn how to collect, clean, and prepare datasets. The foundation of every successful ML project.',
    meta: '6 lessons · 30 min',
    tagColor: 'rgba(245,158,11,0.15)', tagText: '#f59e0b',
    iconBg: 'rgba(6,182,212,0.12)',
  },
  {
    icon: '🤖', title: 'ML Models', tag: 'INTERMEDIATE',
    desc: 'Explore decision trees, neural networks, and regression models. Learn how to choose the right one.',
    meta: '8 lessons · 45 min',
    tagColor: 'rgba(245,158,11,0.15)', tagText: '#f59e0b',
    iconBg: 'rgba(139,92,246,0.12)',
  },
  {
    icon: '🔬', title: 'Model Evaluation', tag: 'ADVANCED',
    desc: 'Accuracy, precision, recall, F1-score — learn how to measure and improve your model performance.',
    meta: '5 lessons · 35 min',
    tagColor: 'rgba(236,72,153,0.15)', tagText: '#ec4899',
    iconBg: 'rgba(236,72,153,0.12)',
  },
  {
    icon: '⚡', title: 'Live ML Demo', tag: 'HANDS-ON',
    desc: 'Try our trained Decision Tree model live. Input student data and get instant Pass/Fail predictions.',
    meta: 'Interactive · API powered',
    tagColor: 'rgba(59,130,246,0.15)', tagText: '#60a5fa',
    iconBg: 'rgba(245,158,11,0.12)',
  },
  {
    icon: '🚀', title: 'Deploy Models', tag: 'ADVANCED',
    desc: 'Learn how to serve ML models via REST APIs using FastAPI. Connect your model to any frontend.',
    meta: '4 lessons · 25 min',
    tagColor: 'rgba(236,72,153,0.15)', tagText: '#ec4899',
    iconBg: 'rgba(16,185,129,0.12)',
  },
];

function Learn() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Learning <span>Modules</span></h2>
        <p className="page-subtitle">Pick a topic and start your ML journey today.</p>
      </div>
      <div className="cards-grid">
        {topics.map((t) => (
          <div className="card" key={t.title}>
            <div className="card-top">
              <div className="card-icon-box" style={{ background: t.iconBg }}>{t.icon}</div>
              <span className="card-tag" style={{ background: t.tagColor, color: t.tagText }}>{t.tag}</span>
            </div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <div className="card-footer">
              <span className="card-meta">🕐 {t.meta}</span>
              <div className="card-arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
