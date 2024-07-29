import React, { useState } from "react";
import "./App.css";

function App() {
 const [notes, setNotes] = useState([
    
  ]);
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [viewing, setViewing] = useState(false);

  const handleSaveNote = () => {
    if (note.trim() !== "") {
      if (editId !== null) {
        setNotes(
          notes.map((n) => (n.id === editId ? { ...n, content: note } : n))
        );
        setEditId(null);
      } else {
        setNotes([...notes, { id: notes.length + 1, content: note }]);
      }
      setNote("");
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNote(noteToEdit.content);
    setEditId(noteToEdit.id);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleViewNotes = () => {
    setViewing(true);
  };

  const handleCloseView = () => {
    setViewing(false);
  };

  return (
    <div className="App">
      <div className="note-container">
        <div className="note-input">
          <h1>Note App</h1>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note here..."
          />
          <br />
          <button onClick={handleSaveNote}>
            {editId !== null ? "Save Edit " : "Save Note "}
          </button>
          <button onClick={handleViewNotes}>View Notes</button>
        </div>
        {viewing && (
          <div className="note-view">
            <button onClick={handleCloseView} className="close-button"> 
              Close ❌
            </button>
            <h2>Notes List</h2>
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  {note.content}
                  <div>
                    <button onClick={() => handleEditNote(note.id)}>
                      Edit ✏️
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      Delete 🗑️ 
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;