import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// Convert attachment buffer to Base64 image URL
function bufferToBase64(att) {
  if (!att || !att.data) return null;
  return `data:${att.contentType};base64,${att.data}`;
}

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-100">Your Notes</h2>
        <button
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          onClick={() => navigate("/notes/add")}
        >
          + Add Note
        </button>
      </div>

      {/* Loading / Error States */}
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <p className="text-gray-400">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform flex flex-col"
            >
              <h3 className="text-lg font-bold text-white mb-2">{note.title}</h3>
              <p
                className="text-gray-200 mb-4 whitespace-pre-wrap"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",   // ✅ camelCase for vendor prefix
                  overflow: "hidden",
                  textOverflow: "ellipsis",      // ✅ use ellipsis instead of "hidden"
                  WebkitLineClamp: 3             // ✅ camelCase for vendor prefix
                }}
              >
                {note.content}
              </p>

              {/* Tags */}
              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Attachments */}
              {/* {note.attachments?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.attachments.map((att, idx) => {
                    const src = bufferToBase64(att);
                    return (
                      src && (
                        <img
                          key={idx}
                          src={src}
                          alt={`attachment-${idx}`}
                          className="rounded-lg max-h-32 object-cover border border-white/10"
                        />
                      )
                    );
                  })}
                </div>
              )} */}

              {/* Buttons */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                <button
                  onClick={() => navigate(`/notes/view/${note._id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/notes/edit/${note._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(note._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center">
            <h1 className="text-xl font-bold text-white mb-3">Confirm Delete</h1>
            <p className="text-gray-200 mb-6">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleDelete}
                className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="border border-white/30 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold transition"
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
