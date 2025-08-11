// src/components/Navbar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/notes" className="nav-link">
          Notes
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <NavLink to="/login" className="btn login-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="btn signup-btn">
              Sign Up
            </NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
