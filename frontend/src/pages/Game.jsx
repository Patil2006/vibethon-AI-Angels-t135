import React, { useState } from 'react';

function Game() {
  const [form, setForm] = useState({ hours_studied: 6, previous_score: 65, attendance: 80 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: Number(e.target.value) });

  const handlePredict = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('http://localhost:8000/api/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Could not connect to backend. Make sure the server is running on port 8000.');
    }
    setLoading(false);
  };

  const sliders = [
    { name: 'hours_studied', label: 'Hours Studied / Day', min: 0, max: 12, unit: 'hrs', color: '#3b82f6' },
    { name: 'previous_score', label: 'Previous Exam Score', min: 0, max: 100, unit: '/100', color: '#8b5cf6' },
    { name: 'attendance', label: 'Attendance Percentage', min: 0, max: 100, unit: '%', color: '#10b981' },
  ];

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Live ML <span>Demo</span></h2>
        <p className="page-subtitle">Interact with our trained Decision Tree model. Adjust inputs and get real predictions.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Input Panel */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '20px' }}>🎛️ INPUT PARAMETERS</div>

          {sliders.map((s) => (
            <div key={s.name} style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#a0aec0' }}>{s.label}</label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: s.color }}>{form[s.name]}{s.unit}</span>
              </div>
              <input type="range" name={s.name} min={s.min} max={s.max} value={form[s.name]} onChange={handleChange}
                style={{ width: '100%', accentColor: s.color, height: '6px', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: '#4a5568' }}>{s.min}</span>
                <span style={{ fontSize: '0.7rem', color: '#4a5568' }}>{s.max}{s.unit}</span>
              </div>
            </div>
          ))}

          <button className="btn-primary" onClick={handlePredict} disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? '⏳ Predicting...' : '🤖 Predict Now'}
          </button>
          {error && <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', fontSize: '0.8rem', color: '#fc8181' }}>{error}</div>}
        </div>

        {/* Result Panel */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '20px' }}>📊 PREDICTION RESULT</div>

          {!result && !loading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#4a5568', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🤖</div>
              <p style={{ fontSize: '0.875rem' }}>Adjust the sliders and click Predict to see the result</p>
            </div>
          )}

          {loading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px', animation: 'spin 1s linear infinite' }}>⚙️</div>
              <p style={{ color: '#718096', fontSize: '0.875rem' }}>Running prediction...</p>
            </div>
          )}

          {result && (
            <div style={{ flex: 1 }}>
              {/* Big result */}
              <div style={{ textAlign: 'center', padding: '28px', background: result.result_code === 1 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${result.result_code === 1 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{result.result_code === 1 ? '🎉' : '📚'}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: result.result_code === 1 ? '#10b981' : '#fc8181', marginBottom: '6px' }}>{result.prediction}</div>
                <div style={{ fontSize: '0.875rem', color: '#718096' }}>{result.message}</div>
              </div>

              {/* Confidence */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#718096' }}>Model Confidence</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#60a5fa' }}>{result.confidence}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: result.confidence, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', borderRadius: '3px', transition: 'width 0.8s ease' }} />
                </div>
              </div>

              {/* Input summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {Object.entries(result.input).map(([k, v]) => (
                  <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' }}>{v}</div>
                    <div style={{ fontSize: '0.68rem', color: '#4a5568', marginTop: '2px' }}>{k.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How it works */}
      <div style={{ marginTop: '28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '1px', marginBottom: '16px' }}>⚡ HOW IT WORKS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {[
            { step: '1', title: 'You Input Data', desc: 'Set hours studied, score, and attendance using sliders', icon: '🎛️' },
            { step: '2', title: 'API Call', desc: 'React sends data to FastAPI backend at /api/ml/predict', icon: '📡' },
            { step: '3', title: 'Model Predicts', desc: 'Decision Tree model processes your input instantly', icon: '🤖' },
            { step: '4', title: 'Result Returned', desc: 'Pass/Fail prediction with confidence score displayed', icon: '📊' },
          ].map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '3px' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#718096', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
