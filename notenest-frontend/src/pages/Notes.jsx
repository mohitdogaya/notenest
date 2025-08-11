import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
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

      <ul className="notes-list">
        {notes.length === 0 ? (
          <p style={{ color: "#555" }}>No notes found.</p>
        ) : (
          notes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="button-group">
                <button onClick={() => navigate(`/notes/view/${note._id}`)} className="view-btn">
                  View
                </button>

                <button
                  onClick={() => navigate(`/notes/edit/${note._id}`)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(note._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this note?</p>
            <div className="button-group">
              <button onClick={handleDelete} className="delete-btn">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}