import React from 'react';

const stats = [
  { icon: '📚', label: 'Topics Completed', value: '0' },
  { icon: '🏆', label: 'Quiz Score', value: '0%' },
  { icon: '🎮', label: 'Games Played', value: '0' },
  { icon: '🔥', label: 'Day Streak', value: '1' },
];

const recentActivity = [
  { text: 'No activity yet — start learning!', time: '' },
];

function Dashboard() {
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">Track your learning progress at a glance.</p>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section-block">
        <h3 className="section-heading">Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((a, i) => (
            <div className="activity-item" key={i}>
              <span>{a.text}</span>
              {a.time && <span className="activity-time">{a.time}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
