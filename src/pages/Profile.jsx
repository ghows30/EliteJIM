import React, { useRef } from 'react';
import { useStore } from '../store/useStore';
import { Download, Upload } from 'lucide-react';

function Profile() {
  const fileInputRef = useRef(null);
  
  const handleExport = () => {
    // Get the current state from LocalStorage directly, since Zustand persists it there under 'elitejim-storage'
    const data = localStorage.getItem('elitejim-storage');
    if (!data) {
      alert("Nessun dato trovato da esportare.");
      return;
    }
    
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EliteJIM_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        // Basic validation: ensure it's a valid JSON object
        const parsed = JSON.parse(content);
        
        if (!parsed.state) {
            alert("Il file non sembra essere un backup di EliteJIM valido.");
            return;
        }

        if (window.confirm("Attenzione: Importare questo file sovrascriverà tutte le tue schede e la cronologia attuali. Sei sicuro di voler procedere?")) {
          // Restore to local storage
          localStorage.setItem('elitejim-storage', JSON.stringify(parsed));
          
          // Force Zustand to re-hydrate from the newly set localStorage
          // The easiest way for a PWA is simply a page reload
          window.location.reload();
        }
      } catch (err) {
        alert("Errore durante la lettura del file: " + err.message);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };

  return (
    <>
      <header className="app-header">
        <h1>Profilo</h1>
        <p className="subtitle">Gestione Dati</p>
      </header>
      
      <main className="app-main">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Backup Dati</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.4 }}>
            Le tue schede e le tue statistiche sono salvate localmente sul tuo dispositivo. 
            Puoi esportarle per salvarle in sicurezza o trasferirle su un altro telefono.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'var(--surface-color-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
              onClick={handleExport}
            >
              <Download size={20} /> Esporta
            </button>
            
            <button 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} /> Importa
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImport}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
