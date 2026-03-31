import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Plus, Trash2, Edit3, Pin } from 'lucide-react';
import './Diary.css'; 

const Diary = () => {
  const navigate = useNavigate();
  const { workoutNotes, deleteWorkoutNote, updateWorkoutNote } = useStore();
  
  // Ordiniamo le note prima per isPinned (fissate in alto) e poi per data decrescente
  const notes = (workoutNotes || []).slice().sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleEditNote = (e, id) => {
    e.stopPropagation();
    navigate(`/diary/${id}`);
  };

  const handleDeleteNote = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Vuoi eliminare definitivamente questa nota?')) {
      deleteWorkoutNote(id);
    }
  };

  const handleTogglePin = (e, note) => {
    e.stopPropagation();
    updateWorkoutNote(note.id, { isPinned: !note.isPinned });
  };

  const getPreviewText = (note) => {
    const lines = (note.plainText || note.title || '').split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 1) {
        return lines.slice(1).join(' ').substring(0, 80) + (lines.slice(1).join(' ').length > 80 ? '...' : '');
    }
    return 'Nessun testo aggiuntivo';
  };

  const formatNoteDate = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Oggi';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ieri';
    }
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }).replace('.', '');
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
            <h1>Note</h1>
            <p className="subtitle">Le tue Note Sportive</p>
        </div>
      </header>

      <main className="app-main animate-fade-in-up">
         <div className="section-header" style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
            <h2 className="section-title-premium" style={{ margin: 0, fontSize: '1.4rem' }}>
              Le mie note
            </h2>
            <button
              onClick={() => navigate('/diary/new')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)', padding: '8px 14px',
                borderRadius: '16px', color: 'var(--text-main)',
                fontSize: '0.85rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease-out',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} color="var(--primary-color)" /> Nuova Nota
            </button>
         </div>

         <div className="diary-native-list">
             {notes.length === 0 ? (
               <div className="diary-empty-state-modern">
                 <Edit3 size={48} strokeWidth={1} style={{ opacity: 0.2, marginBottom: 16 }} />
                 <p>Nessuna nota presente</p>
               </div>
             ) : (
                 notes.map((note) => (
                   <div key={note.id} className="diary-list-item" onClick={(e) => handleEditNote(e, note.id)} style={note.isPinned ? { borderColor: 'rgba(238, 191, 0, 0.3)' } : {}}>
                      <div className="diary-item-text">
                         <div className="diary-item-header">
                             {note.isPinned && <Pin size={14} fill="var(--primary-color)" color="var(--primary-color)" style={{ flexShrink: 0 }} />}
                             <h3 className="diary-item-title">{note.title || "Nuova nota"}</h3>
                         </div>
                         <div className="diary-item-subtext">
                             <span className="diary-item-date">{formatNoteDate(note.createdAt)}</span>
                             <span className="diary-item-preview">{getPreviewText(note)}</span>
                         </div>
                      </div>
                      
                      <div className="diary-item-reveal-actions">
                         <button className="diary-pin-action" onClick={(e) => handleTogglePin(e, note)} aria-label="Fissa" style={{ marginRight: 4 }}>
                            <Pin size={18} fill={note.isPinned ? 'var(--primary-color)' : 'none'} color={note.isPinned ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)'} />
                         </button>
                         <button className="diary-trash-action" onClick={(e) => handleDeleteNote(e, note.id)} aria-label="Elimina">
                            <Trash2 size={18} />
                         </button>
                      </div>
                   </div>
                 ))
             )}
         </div>
      </main>
    </>
  );
};

export default Diary;
