import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, ChevronRight, Dumbbell, Dna, Info } from 'lucide-react';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const showScience = useStore(state => state.showScience);
  const toggleScience = useStore(state => state.toggleScience);

  return (
    <div className="settings-container">
      <header className="settings-header">
        <button className="icon-btn" style={{ background: 'transparent', border: 'none' }} onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h2>Impostazioni</h2>
        <div style={{ width: 44 }}></div>
      </header>

      <main className="settings-content" style={{ marginTop: '0.5rem' }}>
        <div className="settings-group">
          <div 
            className="settings-item clickable" 
            onClick={() => navigate('/settings/exercises')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem', background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '1rem', cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(var(--primary-color-rgb), 0.1)', padding: '8px', borderRadius: '10px' }}>
                <Dumbbell size={20} color="var(--primary-color)" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: '#fff' }}>Database Esercizi</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gestisci esercizi e gruppi muscolari</p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>

          <div 
            className="settings-item" 
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem', background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 45, 85, 0.1)', padding: '8px', borderRadius: '10px' }}>
                <Dna size={20} color="#ff2d55" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: '#fff' }}>Sezione Scienza</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Abilita tracker e obiettivi mesociclo</p>
              </div>
            </div>
            <div 
              onClick={toggleScience}
              style={{
                width: '50px', height: '28px', 
                background: showScience ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                borderRadius: '20px', position: 'relative', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{
                width: '22px', height: '22px', background: '#fff',
                borderRadius: '50%', position: 'absolute', top: '3px',
                left: showScience ? '25px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '2rem' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 8px' }}>
            <Info size={16} /> Info
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Disattivando la Sezione Scienza, verranno nascosti i tracker del mesociclo e i landmark di Mike Israetel per un'esperienza di tracciamento più semplice.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Settings;
