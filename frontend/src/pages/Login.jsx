import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const ALL   = UPPER + LOWER + NUMS + SYMS;

function generatePassword() {
  const len = Math.floor(Math.random() * 5) + 12; // 12–16 chars
  // Guarantee at least one of each required type
  const required = [
    UPPER[Math.floor(Math.random() * UPPER.length)],
    UPPER[Math.floor(Math.random() * UPPER.length)],
    LOWER[Math.floor(Math.random() * LOWER.length)],
    LOWER[Math.floor(Math.random() * LOWER.length)],
    NUMS[Math.floor(Math.random() * NUMS.length)],
    SYMS[Math.floor(Math.random() * SYMS.length)],
  ];
  const rest = Array.from({ length: len - required.length }, () =>
    ALL[Math.floor(Math.random() * ALL.length)]
  );
  return [...required, ...rest]
    .sort(() => Math.random() - 0.5)
    .join('');
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [copied, setCopied] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.username)) {
      setError('Username must be a valid email address.');
      return false;
    }
    if (!/[A-Z]/.test(form.password)) {
      setError('Password must contain at least one uppercase letter.');
      return false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) {
      setError('Password must contain at least one special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = login(form.username, form.password);
    if (ok) navigate('/');
    else setError('Please enter a valid email and password.');
  };

  const handleGenerate = () => {
    setSuggestions(Array.from({ length: 5 }, generatePassword));
    setCopied(null);
  };

  const handleUse = (pwd) => {
    setForm((f) => ({ ...f, password: pwd }));
    setCopied(pwd);
    setSuggestions([]);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">🤖</div>
        <h2 className="login-title">AI Playground</h2>
        <p className="login-subtitle">Sign in to start learning</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="you@example.com"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          {/* Password with eye toggle */}
          <div className="form-group">
            <div className="pw-label-row">
              <label htmlFor="password">Password</label>
              <button type="button" className="btn-generate" onClick={handleGenerate}>
                ⚡ Suggest passwords
              </button>
            </div>
            <div className="pw-input-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Password suggestions */}
          {suggestions.length > 0 && (
            <div className="pw-suggestions">
              <p className="pw-suggestions-title">Click to use a password:</p>
              {suggestions.map((pwd, i) => (
                <div key={i} className="pw-suggestion-item">
                  <code>{pwd}</code>
                  <button type="button" onClick={() => handleUse(pwd)}>Use</button>
                </div>
              ))}
            </div>
          )}

          {copied && suggestions.length === 0 && (
            <p className="pw-copied">✅ Password applied from suggestion</p>
          )}

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn-primary login-btn">Sign In</button>
        </form>

        <p className="login-hint">Password needs 1 uppercase letter &amp; 1 special character</p>
      </div>
    </div>
  );
}

export default Login;
