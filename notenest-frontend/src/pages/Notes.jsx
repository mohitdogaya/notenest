import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For edit
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editError, setEditError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setError(null);
    } catch {
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditError(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setEditError(null);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setEditError(null);

    if (!editTitle || !editContent) {
      setEditError("Title and content required.");
      return;
    }

    try {
      await api.put(`/notes/${editId}`, { title: editTitle, content: editContent });
      cancelEdit();
      fetchNotes();
    } catch {
      setEditError("Failed to update note.");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch {
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>

      <button className="add-note-btn" onClick={() => navigate("/notes/add")}>
        + Add Note
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error-msg">{error}</p>}
      <div class className="middle">

        <ul className="notes-list">
          {notes.length === 0 ? (
            <p style={{ color: "#555" }}>No notes found.</p>
          ) : (
            notes.map((note) => (
              <li key={note._id}>
                {editId === note._id ? (
                  <form onSubmit={submitEdit}>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                      placeholder="Title"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      required
                      placeholder="Content"
                    />
                    <div className="button-group">
                      <button type="submit" className="edit-btn">Save</button>
                      <button type="button" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                    {editError && <p className="error-msg">{editError}</p>}
                  </form>
                ) : (
                  <>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="button-group">
                      <button onClick={() => startEdit(note)} className="edit-btn">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}





