// src/pages/About.jsx
export default function About() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto", lineHeight: 1.6 }}>
      <h1>
        <span style={{ fontSize: 25, fontStyle: "italic" }}>about</span> Me & NoteNest
      </h1>

      {/* About You */}
      <section style={{ marginBottom: 20 }}>
        <p>
          Hi, I’m <strong>Mohit Dogaya</strong>, a passionate Full Stack Developer
          specializing in the MERN stack. I enjoy building tools that solve real-world
          problems, and <strong>NoteNest</strong> is one of my personal projects created to
          help people organize their notes in a clean and efficient way.
        </p>
      </section>

      {/* Why You Built NoteNest */}
      <section style={{ marginBottom: 20 }}>
        <h2>📝 Why I Built NoteNest</h2>
        <p>
          While learning full-stack development, I noticed that students and trainees
          (myself included!) often struggle to manage multiple notes and resources.
          I wanted to create a simple, fast, and visually appealing note-taking tool
          where users can securely store, edit, and organize their notes from anywhere.
        </p>
      </section>

      {/* How You Built It */}
      <section style={{ marginBottom: 20 }}>
        <h2>🛠 How I Built This Tool</h2>
        <p>
          NoteNest is a full-stack web application built entirely from scratch using
          modern web development technologies. The process involved:
        </p>
        <ul>
          <li>Designing a clean and user-friendly frontend interface</li>
          <li>Developing a secure and scalable backend API</li>
          <li>Integrating MongoDB for efficient data storage</li>
          <li>Adding authentication to protect user data</li>
          <li>Deploying the application for public use</li>
        </ul>
      </section>

      {/* Technologies Used */}
      <section>
        <h2>⚙ Technologies Used</h2>
        <ul>
          <li>
            <strong>Frontend:</strong> React.js, React Router, Axios, TailwindCSS / Custom CSS
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express.js
          </li>
          <li>
            <strong>Database:</strong> MongoDB (with Mongoose for schema modeling)
          </li>
          <li>
            <strong>Authentication:</strong> JSON Web Token (JWT) for secure user login
          </li>
          <li>
            <strong>Other Tools:</strong> Postman (API testing), Git & GitHub (version control), Figma (UI planning)
          </li>
          <li>
            <strong>Deployment:</strong> Render / Netlify / Vercel for hosting, MongoDB Atlas for database
          </li>
        </ul>
      </section>
    </div>
  );
}
