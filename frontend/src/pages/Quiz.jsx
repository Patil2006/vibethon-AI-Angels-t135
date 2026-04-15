import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';

function Quiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const score = answers.filter(a => a.correct).length;

  const handleSelect = (i) => { if (selected === null) setSelected(i); };

  const handleNext = () => {
    const isCorrect = selected === q.correct;
    const newAnswers = [...answers, { correct: isCorrect, selected, question: q.question, explanation: q.explanation }];
    setAnswers(newAnswers);
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => { setStarted(false); setCurrent(0); setSelected(null); setAnswers([]); setFinished(false); };

  const pct = Math.round((score / quizQuestions.length) * 100);

  if (!started) return (
    <div className="placeholder-page">
      <div className="placeholder-glow" style={{ background: 'rgba(139,92,246,0.1)' }}>📝</div>
      <h2>ML Knowledge <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Quiz</span></h2>
      <p>Test your machine learning knowledge with {quizQuestions.length} questions. See how much you've learned!</p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{quizQuestions.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '4px' }}>QUESTIONS</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>~5</div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '4px' }}>MINUTES</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#f59e0b,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ML</div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '4px' }}>TOPIC</div>
        </div>
      </div>
      <button className="btn-primary" onClick={() => setStarted(true)} style={{ marginTop: '8px' }}>🚀 Start Quiz</button>
    </div>
  );

  if (finished) return (
    <div className="placeholder-page">
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
      <h2 style={{ marginBottom: '8px' }}>Quiz <span style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Complete!</span></h2>
      <div style={{ fontSize: '3rem', fontWeight: 900, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' }}>{pct}%</div>
      <p style={{ marginBottom: '24px' }}>{score}/{quizQuestions.length} correct — {pct >= 80 ? 'Excellent! You really know your ML!' : pct >= 50 ? 'Good job! Keep learning to improve.' : 'Keep studying — you\'ll get there!'}</p>
      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '28px' }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: a.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${a.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: '10px', marginBottom: '8px', textAlign: 'left' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{a.correct ? '✅' : '❌'}</span>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '3px' }}>Q{i + 1}: {a.question}</div>
              <div style={{ fontSize: '0.75rem', color: '#718096' }}>{a.explanation}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={reset}>🔄 Retake Quiz</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div className="page-header">
        <h2 className="page-title">ML <span>Quiz</span></h2>
        <p className="page-subtitle">Question {current + 1} of {quizQuestions.length}</p>
      </div>

      {/* Progress */}
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '32px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', width: `${((current) / quizQuestions.length) * 100}%`, transition: 'width 0.4s ease', borderRadius: '3px' }} />
      </div>

      {/* Question card */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '14px' }}>QUESTION {current + 1}</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '28px' }}>{q.question}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, i) => {
            let bg = 'rgba(255,255,255,0.04)';
            let border = 'rgba(255,255,255,0.08)';
            let color = '#a0aec0';
            if (selected !== null) {
              if (i === q.correct) { bg = 'rgba(16,185,129,0.12)'; border = 'rgba(16,185,129,0.4)'; color = '#10b981'; }
              else if (i === selected && selected !== q.correct) { bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.3)'; color = '#fc8181'; }
            } else if (selected === i) { bg = 'rgba(59,130,246,0.12)'; border = 'rgba(59,130,246,0.4)'; color = '#60a5fa'; }
            return (
              <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border: `1px solid ${border}`, color, padding: '14px 18px', borderRadius: '12px', cursor: selected === null ? 'pointer' : 'default', textAlign: 'left', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div style={{ marginTop: '20px', padding: '14px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', fontSize: '0.85rem', color: '#a0aec0' }}>
            💡 {q.explanation}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={handleNext} disabled={selected === null} style={{ opacity: selected === null ? 0.4 : 1, cursor: selected === null ? 'not-allowed' : 'pointer' }}>
          {current + 1 === quizQuestions.length ? '🏁 Finish Quiz' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
