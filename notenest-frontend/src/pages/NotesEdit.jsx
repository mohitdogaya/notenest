import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./notes.css";

export default function NotesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await api.get(`/notes/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch {
      setError("Failed to load note.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${id}`, { title, content });
      navigate("/notes");
    } catch {
      setError("Failed to update note.");
    }
  };

  return (
    <div className="notes-edit-container-glass-card">
      <h1>Edit Note</h1>
      <p>Editing note with ID: {id}</p>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="submit" className="edit-btn">Save Changes</button>
          <button type="button" onClick={() => navigate("/notes")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
