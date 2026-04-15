import React, { useState } from 'react';
import { topics } from '../data/learnData';

function LessonModal({ topic, onClose }) {
  const [active, setActive] = useState(0);
  const lesson = topic.lessons[active];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: topic.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{topic.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{topic.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#718096' }}>Lesson {active + 1} of {topic.lessons.length}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a0aec0', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', width: `${((active + 1) / topic.lessons.length) * 100}%`, transition: 'width 0.4s ease' }} />
        </div>

        {/* Lesson tabs */}
        <div style={{ display: 'flex', gap: '6px', padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
          {topic.lessons.map((l, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: i === active ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === active ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`, color: i === active ? '#60a5fa' : '#718096', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              {i + 1}. {l.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px' }}>{lesson.title}</h3>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem', lineHeight: '1.9', whiteSpace: 'pre-line' }}>{lesson.content}</div>
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: active === 0 ? '#4a5568' : '#a0aec0', padding: '10px 20px', borderRadius: '8px', cursor: active === 0 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>← Previous</button>
          <span style={{ fontSize: '0.78rem', color: '#4a5568' }}>{active + 1} / {topic.lessons.length}</span>
          {active < topic.lessons.length - 1
            ? <button onClick={() => setActive(active + 1)} style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Next →</button>
            : <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>✅ Complete!</button>
          }
        </div>
      </div>
    </div>
  );
}

function Learn() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {selected && <LessonModal topic={selected} onClose={() => setSelected(null)} />}
      <div className="page-header">
        <h2 className="page-title">Learning <span>Modules</span></h2>
        <p className="page-subtitle">Click any module to start learning. {topics.reduce((a, t) => a + t.lessons.length, 0)} lessons total.</p>
      </div>
      <div className="cards-grid">
        {topics.map((t) => (
          <div className="card" key={t.id} onClick={() => setSelected(t)} style={{ cursor: 'pointer' }}>
            <div className="card-top">
              <div className="card-icon-box" style={{ background: t.iconBg }}>{t.icon}</div>
              <span className="card-tag" style={{ background: t.tagColor, color: t.tagText }}>{t.tag}</span>
            </div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {t.lessons.slice(0, 3).map((l, i) => (
                <span key={i} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '5px', color: '#718096' }}>{l.title}</span>
              ))}
              {t.lessons.length > 3 && <span style={{ fontSize: '0.72rem', color: '#4a5568' }}>+{t.lessons.length - 3} more</span>}
            </div>
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
