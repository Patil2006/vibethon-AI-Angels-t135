import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

// ── Game: Classify the Data Point ──────────────────────────
// Show a student's stats → player guesses Pass or Fail
// 10 rounds, score saved to backend

const generateQuestion = () => {
  const pass = Math.random() > 0.45;
  if (pass) {
    return {
      hours: Math.floor(Math.random() * 5) + 6,       // 6-10
      score: Math.floor(Math.random() * 25) + 65,     // 65-89
      attendance: Math.floor(Math.random() * 20) + 75, // 75-94
      answer: 1,
    };
  } else {
    return {
      hours: Math.floor(Math.random() * 4) + 1,       // 1-4
      score: Math.floor(Math.random() * 30) + 25,     // 25-54
      attendance: Math.floor(Math.random() * 25) + 40, // 40-64
      answer: 0,
    };
  }
};

const TOTAL = 10;

export default function Game() {
  const { user } = useAuth();
  const [screen, setScreen] = useState('intro'); // intro | playing | result
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/game/scores');
      if (res.ok) setLeaderboard(await res.json());
    } catch {}
  }, []);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  const startGame = () => {
    setQuestions(Array.from({ length: TOTAL }, generateQuestion));
    setCurrent(0); setScore(0); setChosen(null);
    setStreak(0); setBestStreak(0); setHistory([]);
    setScreen('playing');
  };

  const handleGuess = (guess) => {
    if (chosen !== null) return;
    setChosen(guess);
    const q = questions[current];
    const correct = guess === q.answer;
    const newStreak = correct ? streak + 1 : 0;
    const newBest = Math.max(bestStreak, newStreak);
    setStreak(newStreak);
    setBestStreak(newBest);
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { ...q, guess, correct }]);

    setTimeout(() => {
      if (current + 1 < TOTAL) {
        setCurrent(c => c + 1);
        setChosen(null);
      } else {
        finishGame(correct ? score + 1 : score, newBest);
      }
    }, 1100);
  };

  const finishGame = async (finalScore, finalBest) => {
    setScreen('result');
    setSaving(true);
    try {
      await fetch('http://localhost:8000/api/game/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user?.username || 'Guest',
          score: finalScore,
          total: TOTAL,
          best_streak: finalBest,
          percentage: Math.round((finalScore / TOTAL) * 100),
        }),
      });
      fetchLeaderboard();
    } catch {}
    setSaving(false);
  };

  const pct = Math.round((score / TOTAL) * 100);
  const q = questions[current];

  // ── INTRO ──
  if (screen === 'intro') return (
    <div>
      <div className="page-header">
        <h2 className="page-title">ML <span>Classifier Game</span></h2>
        <p className="page-subtitle">Look at a student's data and predict: Pass or Fail?</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* How to play */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '20px' }}>🎮 HOW TO PLAY</div>
          {[
            { icon: '👀', title: 'Read the Data', desc: "You'll see a student's hours studied, exam score, and attendance." },
            { icon: '🧠', title: 'Think Like ML', desc: 'Use your ML knowledge to decide if the student will Pass or Fail.' },
            { icon: '⚡', title: 'Click Fast', desc: 'Choose Pass ✅ or Fail ❌ — instant feedback after each answer.' },
            { icon: '🏆', title: 'Beat the Score', desc: `${TOTAL} rounds total. Save your score to the leaderboard!` },
          ].map((s) => (
            <div key={s.icon} style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '3px' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#718096', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
          <button className="btn-primary" onClick={startGame} style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '1rem' }}>
            🚀 Start Game
          </button>
        </div>

        {/* Leaderboard */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '1px', marginBottom: '20px' }}>🏆 LEADERBOARD</div>
          {leaderboard.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#4a5568', padding: '40px 0', fontSize: '0.875rem' }}>No scores yet — be the first!</div>
          ) : (
            leaderboard.slice(0, 8).map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: i === 0 ? 'rgba(245,158,11,0.2)' : i === 1 ? 'rgba(160,174,192,0.15)' : i === 2 ? 'rgba(180,120,60,0.15)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: i === 0 ? '#f59e0b' : i === 1 ? '#a0aec0' : i === 2 ? '#b47c3c' : '#4a5568', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{entry.username}</div>
                  <div style={{ fontSize: '0.72rem', color: '#718096' }}>Streak: {entry.best_streak}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{entry.percentage}%</div>
                  <div style={{ fontSize: '0.7rem', color: '#4a5568' }}>{entry.score}/{entry.total}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (screen === 'playing' && q) return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>Question <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{current + 1}</span> / {TOTAL}</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{score}</div>
            <div style={{ fontSize: '0.65rem', color: '#4a5568' }}>SCORE</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{streak}</div>
            <div style={{ fontSize: '0.65rem', color: '#4a5568' }}>STREAK 🔥</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', width: `${(current / TOTAL) * 100}%`, transition: 'width 0.4s', borderRadius: '3px' }} />
      </div>

      {/* Student card */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '20px' }}>👤 STUDENT DATA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '8px' }}>
          {[
            { label: 'Hours Studied', value: q.hours, unit: 'hrs/day', color: '#3b82f6', icon: '📖' },
            { label: 'Exam Score', value: q.score, unit: '/ 100', color: '#8b5cf6', icon: '📝' },
            { label: 'Attendance', value: q.attendance, unit: '%', color: '#10b981', icon: '📅' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '18px 12px' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', color: '#718096' }}>{s.unit}</div>
              <div style={{ fontSize: '0.7rem', color: '#4a5568', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Guess buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {[{ label: '✅ PASS', val: 1, yes: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
          { label: '❌ FAIL', val: 0, yes: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' }].map((btn) => {
          let style = { background: btn.bg, border: `2px solid ${btn.border}`, color: btn.yes, padding: '20px', borderRadius: '14px', cursor: chosen !== null ? 'default' : 'pointer', fontSize: '1.1rem', fontWeight: 800, transition: 'all 0.2s', letterSpacing: '1px' };
          if (chosen !== null) {
            if (btn.val === q.answer) style = { ...style, background: 'rgba(16,185,129,0.2)', border: '2px solid #10b981', color: '#10b981', transform: 'scale(1.03)' };
            else if (btn.val === chosen) style = { ...style, background: 'rgba(239,68,68,0.15)', border: '2px solid #ef4444', color: '#ef4444' };
            else style = { ...style, opacity: 0.3 };
          }
          return <button key={btn.val} onClick={() => handleGuess(btn.val)} style={style}>{btn.label}</button>;
        })}
      </div>

      {chosen !== null && (
        <div style={{ marginTop: '16px', textAlign: 'center', padding: '12px', background: chosen === q.answer ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${chosen === q.answer ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, color: chosen === q.answer ? '#10b981' : '#fc8181' }}>
          {chosen === q.answer ? `✅ Correct! ${streak > 1 ? `🔥 ${streak} streak!` : ''}` : '❌ Wrong! The model would predict differently.'}
        </div>
      )}
    </div>
  );

  // ── RESULT ──
  if (screen === 'result') return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px' }}>
          Game <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Over!</span>
        </h2>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{pct}%</div>
        <div style={{ color: '#718096', marginTop: '6px' }}>{score}/{TOTAL} correct · Best streak: {bestStreak} 🔥</div>
        {saving && <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#60a5fa' }}>💾 Saving score...</div>}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Correct', value: score, color: '#10b981' },
          { label: 'Wrong', value: TOTAL - score, color: '#ef4444' },
          { label: 'Best Streak', value: `${bestStreak}🔥`, color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#718096', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Answer review */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '14px' }}>📋 ANSWER REVIEW</div>
        {history.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.8rem' }}>
            <span>{h.correct ? '✅' : '❌'}</span>
            <span style={{ color: '#718096', flex: 1 }}>Q{i + 1}: {h.hours}hrs · {h.score}pts · {h.attendance}%</span>
            <span style={{ color: h.answer === 1 ? '#10b981' : '#ef4444', fontWeight: 600 }}>{h.answer === 1 ? 'PASS' : 'FAIL'}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-primary" onClick={startGame} style={{ flex: 1, justifyContent: 'center' }}>🔄 Play Again</button>
        <button className="btn-secondary" onClick={() => setScreen('intro')} style={{ flex: 1, justifyContent: 'center' }}>🏆 Leaderboard</button>
      </div>
    </div>
  );
}
