import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NotesAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [addError, setAddError] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setAddError(null);

    if (!title || !content) {
      setAddError("Title and content are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

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
      navigate("/notes");
    } catch (error) {
      console.error("Add note error:", error);
      setAddError("Failed to add note.");
    }
  };

  return (
    <div className="min-h-screen from-gray-900 via-gray-800 to-black p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Add New Note</h2>

        <form onSubmit={handleAddNote} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-semibold bg-transparent text-white placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            required
          />

          {/* Content */}
          <textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 border-none focus:outline-none focus:ring-0 resize-none h-80 leading-relaxed"
            required
          />

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags: work, ideas, personal"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-transparent text-gray-300 placeholder-gray-500 border border-white/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {/* Attachments */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Attachments
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="w-full text-gray-400"
            />
          </div>

          {/* Error */}
          {addError && <p className="text-red-400 text-sm">{addError}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition"
          >
            Add Note
          </button>
        </form>

        {/* Back */}
        <button
          onClick={() => navigate("/notes")}
          className="mt-6 text-blue-400 hover:underline text-sm"
        >
          ← Back to Notes
        </button>
      </div>
    </div>
  );
}
