import React from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Clock, Dumbbell, Trash2 } from 'lucide-react';
import './History.css';

function History() {
  const history = useStore(state => state.history);
  // Optional: add a delete history record function to the store
  const setStore = useStore.setState;

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo allenamento dallo storico?")) {
      setStore(state => ({
        history: state.history.filter(w => w.id !== id)
      }));
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('it-IT', {
      weekday: 'short', 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const formatDuration = (start, end) => {
    if (!start || !end) return '-';
    const diff = Math.floor((end - start) / 1000 / 60); // minutes
    if (diff < 1) return '< 1 min';
    return `${diff} min`;
  };

  const calculateTotalVolume = (exercises) => {
    let vol = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.done && set.kg && set.reps) {
          vol += (parseFloat(set.kg) * parseInt(set.reps));
        }
      });
    });
    return vol;
  };

  const calculateCompletedSets = (exercises) => {
    let sets = 0;
    exercises.forEach(ex => {
      sets += ex.sets.filter(s => s.done).length;
    });
    return sets;
  };

  return (
    <>
      <header className="app-header">
        <h1>Storico</h1>
        <p className="subtitle">I tuoi allenamenti passati</p>
      </header>
      
      <main className="app-main history-main">
        {history.length === 0 ? (
          <div className="card empty-history">
            <Calendar size={48} color="var(--primary-color-dim)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>Non hai ancora registrato nessun allenamento.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Esegui e termina una scheda per vederla qui.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map(workout => (
              <div key={workout.id} className="history-card">
                <div className="history-header">
                  <div>
                    <h3 className="history-title">{workout.name}</h3>
                    <div className="history-date">
                      <Calendar size={14} /> {formatDate(workout.startTime)} alle {formatTime(workout.startTime)}
                    </div>
                  </div>
                  <button className="icon-btn-small delete-btn" onClick={() => handleDelete(workout.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="history-stats">
                  <div className="stat-pill">
                    <Clock size={16} />
                    <span>{formatDuration(workout.startTime, workout.endTime)}</span>
                  </div>
                  <div className="stat-pill">
                    <Dumbbell size={16} />
                    <span>{calculateTotalVolume(workout.exercises)} kg vol.</span>
                  </div>
                  <div className="stat-pill" style={{backgroundColor: 'var(--success-color-dim)', color: 'var(--success-color)'}}>
                    <span>{calculateCompletedSets(workout.exercises)} Set</span>
                  </div>
                </div>

                <div className="history-exercises">
                  {workout.exercises.map((ex, exIdx) => {
                    const doneSets = ex.sets.filter(s => s.done);
                    if (doneSets.length === 0) return null; // Skip if no set was marked as done
                    
                    return (
                      <div key={ex.id} className="history-ex-row">
                        <span className="h-ex-name">{exIdx + 1}. {ex.name}</span>
                        <span className="h-ex-details">
                          {doneSets.length} set completati
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default History;
