import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./notes.css";

export default function NotesAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addError, setAddError] = useState(null);

  const navigate = useNavigate();

  const handleAddNote = async (e) => {
    e.preventDefault();
    setAddError(null);

    if (!title || !content) {
      setAddError("Title and content required.");
      return;
    }

    try {
      await api.post("/notes", { title, content });
      navigate("/notes"); // Redirect back to notes list
    } catch {
      setAddError("Failed to add note.");
    }
  };

  return (
    <div className="notes-container">
      <h2>Add New Note</h2>

      <form onSubmit={handleAddNote}>
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
        <button type="submit" className="add-note-btn">Add Note</button>
        {addError && <p className="error-msg">{addError}</p>}
      </form>

      <button
        onClick={() => navigate("/notes")}
        style={{ marginTop: "20px" }}
      >
        ← Back to Notes
      </button>
    </div>
  );
}
