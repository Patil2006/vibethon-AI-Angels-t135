import React from 'react';

const stats = [
  { icon: '📚', label: 'Topics Completed', value: '0', badge: '0%', badgeColor: 'rgba(59,130,246,0.15)', badgeText: '#60a5fa', iconBg: 'rgba(59,130,246,0.1)', valueGrad: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' },
  { icon: '🏆', label: 'Quiz Score', value: '0%', badge: 'NEW', badgeColor: 'rgba(245,158,11,0.15)', badgeText: '#f59e0b', iconBg: 'rgba(245,158,11,0.1)', valueGrad: 'linear-gradient(135deg,#f59e0b,#ec4899)' },
  { icon: '🎮', label: 'Games Played', value: '0', badge: 'START', badgeColor: 'rgba(16,185,129,0.15)', badgeText: '#10b981', iconBg: 'rgba(16,185,129,0.1)', valueGrad: 'linear-gradient(135deg,#10b981,#06b6d4)' },
  { icon: '🔥', label: 'Day Streak', value: '1', badge: 'ACTIVE', badgeColor: 'rgba(236,72,153,0.15)', badgeText: '#ec4899', iconBg: 'rgba(236,72,153,0.1)', valueGrad: 'linear-gradient(135deg,#ec4899,#f59e0b)' },
];

const progress = [
  { label: 'ML Basics', pct: 0, color: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' },
  { label: 'Data Handling', pct: 0, color: 'linear-gradient(90deg,#06b6d4,#3b82f6)' },
  { label: 'Models', pct: 0, color: 'linear-gradient(90deg,#10b981,#06b6d4)' },
];

function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Your <span>Dashboard</span></h2>
        <p className="page-subtitle">Track your learning progress and achievements.</p>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-top">
              <div className="stat-icon-box" style={{ background: s.iconBg }}>{s.icon}</div>
              <span className="stat-badge" style={{ background: s.badgeColor, color: s.badgeText }}>{s.badge}</span>
            </div>
            <div className="stat-value" style={{ background: s.valueGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="glass-card-title">📈 Learning Progress</div>
          {progress.map((p) => (
            <div className="progress-item" key={p.label}>
              <div className="progress-label">
                <span>{p.label}</span>
                <span>{p.pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <div className="glass-card-title">⚡ Recent Activity</div>
          <div className="activity-item">
            <div className="activity-dot" style={{ background: '#3b82f6' }} />
            <span className="activity-text">Account created — welcome aboard!</span>
            <span className="activity-time">Just now</span>
          </div>
          <div className="activity-item">
            <div className="activity-dot" style={{ background: '#8b5cf6' }} />
            <span className="activity-text">Start a lesson to see activity here</span>
            <span className="activity-time">—</span>
          </div>
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <a href="/learn" className="btn-primary" style={{ fontSize: '0.82rem', padding: '10px 24px' }}>Start Learning →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
