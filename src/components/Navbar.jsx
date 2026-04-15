import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🤖 AI Playground</Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/learn" className={({ isActive }) => isActive ? 'active' : ''}>Learn</NavLink></li>
        <li><NavLink to="/game" className={({ isActive }) => isActive ? 'active' : ''}>Game</NavLink></li>
        <li><NavLink to="/quiz" className={({ isActive }) => isActive ? 'active' : ''}>Quiz</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
