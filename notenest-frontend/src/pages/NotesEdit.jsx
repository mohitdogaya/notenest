import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

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

      formData.append("tags", JSON.stringify(tagsArray));

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
    <div className="min-h-screen flex justify-center items-center from-purple-500/20 via-blue-500/20 to-pink-500/20 p-6">
      <div className="w-full max-w-2xl p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6">Edit Note</h1>
        <p className="text-gray-200 mb-4">Editing note with ID: {id}</p>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-3 h-32 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 rounded-lg bg-white/20 text-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
          />

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="px-6 py-3 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
