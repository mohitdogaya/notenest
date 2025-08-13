import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

// Convert buffer to Base64
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

  if (loading) return <p className="text-white text-center mt-10">Loading note...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!note) return <p className="text-gray-400 text-center mt-10">Note not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen  from-gray-900 via-gray-800 to-black px-4">
      <div className="max-w-3xl w-full">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">View Note</h2>

        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
          <h3 className="text-white text-2xl font-semibold mb-4">{note.title}</h3>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line">{note.content}</p>

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full border border-blue-300/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Attachments */}
          {note.attachments && note.attachments.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {note.attachments.map((att, idx) => {
                const src = bufferToBase64(att);
                if (!src) return null;
                return (
                  <img
                    key={idx}
                    src={src}
                    alt={`attachment-${idx}`}
                    className="rounded-lg border border-white/20 shadow-md max-w-xs"
                  />
                );
              })}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/notes")}
              className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
            >
              ← Back to Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
