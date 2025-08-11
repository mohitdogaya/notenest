import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./notes.css";

export default function NotesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await api.get(`/notes/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setTags(res.data.tags ? res.data.tags.join(", ") : "");
      // You may want to handle existing attachments display separately
    } catch {
      setError("Failed to load note.");
    }
  };

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      formData.append("tags", JSON.stringify(tagsArray));  // Send tags as JSON string

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await api.put(`/notes/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/notes");
    } catch (err) {
      console.error("Edit note error:", err);
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
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="button-group">
          <button type="submit" className="edit-btn">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate("/notes")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
