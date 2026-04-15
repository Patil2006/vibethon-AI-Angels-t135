import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle sidebar">
          ☰
        </button>
        <Link to="/" className="navbar-brand">🤖 AI Playground</Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/learn" className={({ isActive }) => isActive ? 'active' : ''}>Learn</NavLink></li>
        <li><NavLink to="/quiz" className={({ isActive }) => isActive ? 'active' : ''}>Quiz</NavLink></li>
        <li><NavLink to="/game" className={({ isActive }) => isActive ? 'active' : ''}>Game</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
