import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useStore } from '../../store/useStore';
import { ChevronLeft, Bold, Heading1, Italic, List, CheckSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './DiaryEditor.css';

const DiaryEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workoutNotes, updateWorkoutNote, addWorkoutNote } = useStore();
  
  const [noteId] = useState(() => id === 'new' ? `note_${Date.now()}` : id);
  const existingNote = workoutNotes?.find(n => n.id === noteId);

  const [noteTitle, setNoteTitle] = useState(existingNote?.title || '');
  
  const latestDataRef = useRef({ title: noteTitle, inStore: !!existingNote });
  latestDataRef.current.title = noteTitle;

  const performSave = (htmlContent, plainText) => {
    const title = latestDataRef.current.title;
    
    // Non salvare se è vuoto e non è ancora nello store
    if (!plainText.trim() && !title.trim() && !latestDataRef.current.inStore) return;

    const finalTitle = title.trim() || 'Nuova Nota';
    const newNoteData = {
      id: noteId,
      title: finalTitle,
      rawText: htmlContent, 
      plainText: plainText,
      updatedAt: new Date().toISOString()
    };

    if (latestDataRef.current.inStore) {
      updateWorkoutNote(noteId, newNoteData);
    } else {
      newNoteData.date = new Date().toISOString();
      newNoteData.createdAt = newNoteData.updatedAt;
      addWorkoutNote(newNoteData);
      latestDataRef.current.inStore = true;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Inizia a scrivere la tua nota...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: existingNote ? existingNote.rawText : '',
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class: 'premium-tiptap-editor'
      },
    },
    onUpdate: ({ editor }) => {
      performSave(editor.getHTML(), editor.getText());
    }
  });

  useEffect(() => {
    if (editor) {
      performSave(editor.getHTML(), editor.getText());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteTitle]);

  const handleBack = () => {
    if (editor) {
      performSave(editor.getHTML(), editor.getText());
    }
    navigate('/diary');
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="diary-editor-fullscreen animate-fade-in">
      <div className="editor-topbar-blur">
        <button onClick={handleBack} className="editor-back-action">
          <ChevronLeft size={30} strokeWidth={1.5} />
          <span>Note</span>
        </button>
      </div>

      <div className="editor-content-scroll">
        <input 
           type="text" 
           className="diary-editor-title-input" 
           placeholder="Titolo"
           value={noteTitle}
           onChange={(e) => setNoteTitle(e.target.value)}
        />
        <EditorContent editor={editor} className="tiptap-wrapper" />
      </div>

      <div className="editor-fixed-bottom-bar">
         <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`editor-tool-btn ${editor.isActive('heading', { level: 1 }) ? 'tool-active' : ''}`}
            aria-label="Titolo"
         >
            <Heading1 size={22} strokeWidth={2.5} />
         </button>
         <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`editor-tool-btn ${editor.isActive('bold') ? 'tool-active' : ''}`}
            aria-label="Grassetto"
         >
            <Bold size={20} strokeWidth={3} />
         </button>
         <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`editor-tool-btn ${editor.isActive('italic') ? 'tool-active' : ''}`}
            aria-label="Corsivo"
         >
            <Italic size={20} strokeWidth={3} />
         </button>
         <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`editor-tool-btn ${editor.isActive('bulletList') ? 'tool-active' : ''}`}
            aria-label="Elenco Puntato"
         >
            <List size={22} strokeWidth={2.5} />
         </button>
         <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`editor-tool-btn ${editor.isActive('taskList') ? 'tool-active' : ''}`}
            aria-label="Checklist"
         >
            <CheckSquare size={20} strokeWidth={2.5} />
         </button>
      </div>
    </div>
  );
};

export default DiaryEditor;
