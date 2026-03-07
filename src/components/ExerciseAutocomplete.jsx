import React, { useState, useRef, useEffect } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import './Autocomplete.css';

export function ExerciseAutocomplete({ value, onChange, placeholder = "Cerca esercizio..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredExercises = EXERCISES_DB.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ex.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="autocomplete-wrapper">
      <input
        type="text"
        className="autocomplete-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setSearchTerm(''); // show all on focus if needed or keep current
          setIsOpen(true);
        }}
      />
      
      {isOpen && (
        <ul className="autocomplete-dropdown">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(ex => (
              <li 
                key={ex.id} 
                className="autocomplete-item"
                onClick={() => {
                  onChange(ex.name);
                  setIsOpen(false);
                }}
              >
                <span className="ac-name">{ex.name}</span>
                <span className="ac-category">{ex.category}</span>
              </li>
            ))
          ) : (
             <li className="autocomplete-item-empty">Premi invio per aggiungere "{value}" custom</li>
          )}
        </ul>
      )}
    </div>
  );
}
