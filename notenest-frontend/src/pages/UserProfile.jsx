import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null); // store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setError(null);
    } catch {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-100">Your Profile</h2>        
      </div>

      {/* Loading / Error States */}
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Profile Data */}
      {user && (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="mb-4">
            <span className="block text-sm text-gray-400">Full Name</span>
            <span className="text-lg text-white font-medium">{user.fullname}</span>
          </div>
          <div className="mb-4">
            <span className="block text-sm text-gray-400">Email</span>
            <span className="text-lg text-white font-medium">{user.email}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-400">Password</span>
            <span className="text-lg text-white font-medium">********</span>
          </div>
        </div>
      )}
    </div>
  );
}
