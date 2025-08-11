import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./notes.css";

export default function NotesAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [attachments, setAttachments] = useState([]); // files
  const [addError, setAddError] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files)); // convert FileList to array
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setAddError(null);

    if (!title || !content) {
      setAddError("Title and content required.");
      return;
    }

    try {
      // Create formData for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      // Tags: send as array after splitting comma separated string and trimming spaces
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      tagsArray.forEach((tag) => formData.append("tags[]", tag));

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await api.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/notes"); // Redirect back to notes list
    } catch (error) {
      console.error("Add note error:", error);
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
        <button type="submit" className="add-note-btn">
          Add Note
        </button>
        {addError && <p className="error-msg">{addError}</p>}
      </form>

      <button onClick={() => navigate("/notes")} style={{ marginTop: "20px" }}>
        ← Back to Notes
      </button>
    </div>
  );
}
