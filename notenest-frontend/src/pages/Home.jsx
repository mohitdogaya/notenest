// src/pages/Home.jsx

import "./home.css";

export default function Home() {
  return (
    <>
    <div className="content-home">
        <h1 className="home-title"> <span style={{fontSize: 25, fontStyle: "italic"}}>welcome to </span> NoteNest</h1>
      <div className="home-content glass-card">
        

        <p className="home-description">
          Your simple and elegant app to organize notes and folders with ease.
          Perfect for students, trainees, and professionals who want to stay
          productive and organized.
        </p>

        <div className="home-features">
          <h2>Features</h2>
          <ul>
            <li>
              <strong>Add, edit, and delete notes:</strong> Easy note management with a modern interface.
            </li>
            <li>
              <strong>Glassmorphic design:</strong> Enjoy a sleek, modern look with smooth animations.
            </li>
            <li>
              <strong>Secure login/logout:</strong> Keep your notes private with user authentication.
            </li>
            <li>
              <strong>Responsive layout:</strong> Use it on any device, anytime.
            </li>
          </ul>
        </div>

        <p className="home-instruction">
          Use the navigation bar above to explore your Notes and learn more about this app.
        </p>
      </div>
    </div>
      
    </>
  );
}
