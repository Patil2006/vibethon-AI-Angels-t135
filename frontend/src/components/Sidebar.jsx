import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/dashboard', label: 'Dashboard', icon: '📈' },
  { to: '/learn', label: 'Learn', icon: '📚' },
  { to: '/quiz', label: 'Quiz', icon: '📝' },
  { to: '/game', label: 'Game', icon: '🎮' },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <span>Menu</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">✕</button>
        </div>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                onClick={onClose}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
