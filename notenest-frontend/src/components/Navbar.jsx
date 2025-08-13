// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Home,
  StickyNote,
  Info,
  User,
  LogIn,
  LogOut,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
           {/* Logo / Brand */}
          <div className="flex-shrink-0 text-xl font-bold text-white tracking-wide">
            NoteNest
          </div>
          {/* Left Section */}
          <div className="flex items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/"
                end
                className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              >
                <Home size={18} /> Home
              </NavLink>
              <NavLink
                to="/notes"
                className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              >
                <StickyNote size={18} /> Notes
              </NavLink>
              <NavLink
                to="/about"
                className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              >
                <Info size={18} /> About
              </NavLink>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  <LogIn size={18} /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <UserPlus size={18} /> Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
                >
                  <User size={18} /> {user?.fullname || "Profile"}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={18} /> Home
            </NavLink>
            <NavLink
              to="/notes"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              onClick={() => setMenuOpen(false)}
            >
              <StickyNote size={18} /> Notes
            </NavLink>
            <NavLink
              to="/about"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-white/30 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Info size={18} /> About
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={18} /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserPlus size={18} /> Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={18} /> {user?.fullname || "Profile"}
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
