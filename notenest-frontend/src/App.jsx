// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotesAdd from "./pages/NotesAdd";
import Footer from "./components/Footer";
// import "./index.css";

// import "./App.css"; // new background styles

export default function App() {

  return (
    <div className="app-background">
      {/* glowing background elements */}
      <Navbar />
      <div className="content">
      <div className="glow-circle circle1"></div>
      <div className="glow-circle circle2"></div>
      <div className="glow-circle circle3"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/add"
            element={
              <ProtectedRoute>
                <NotesAdd />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}
