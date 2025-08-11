// NotesView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../notenest-frontend/src/services/api";
import "./notes.css";

export default function NotesView() {
  const { id } = useParams(); // get note id from URL params
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setError(null);
      } catch {
        setError("Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p>Loading note...</p>;
  if (error) return <p className="error-msg">{error}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className="notes-container">
      <h2>View Note</h2>
      <div className="note-view-card-glass-card">
        <h3>{note.title}</h3>
        <p>{note.content}</p>

        {/* Optional: show attachments or other fields here if you have */}

        <button onClick={() => navigate("/notes")} className="back-btn">
          ← Back to Notes
        </button>
      </div>
    </div>
  );
}
