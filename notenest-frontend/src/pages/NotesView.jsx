import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./notes.css";

// Since backend sends base64 string, just build data URL here
function bufferToBase64(att) {
  if (!att || !att.data) return null;
  return `data:${att.contentType};base64,${att.data}`;
}

export default function NotesView() {
  const { id } = useParams();
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
    <div className="notes-container-view">
      <h2>View Note</h2>
      <div className="note-view-card-glass-card">
        <h3>{note.title}</h3>
        <p>{note.content}</p>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="tags-container">
            {note.tags.map((tag, i) => (
              <span key={i} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Attachments */}
        {note.attachments && note.attachments.length > 0 && (
          <div className="attachments-container">
            {note.attachments.map((att, idx) => {
              const src = bufferToBase64(att);
              if (!src) return null;
              return (
                <img
                  key={idx}
                  src={src}
                  alt={`attachment-${idx}`}
                  className="note-image"
                  style={{ maxWidth: 300, margin: 10, borderRadius: 6 }}
                />
              );
            })}
          </div>
        )}

        <button onClick={() => navigate("/notes")} className="back-btn">
          ← Back to Notes
        </button>
      </div>
    </div>
  );
}
