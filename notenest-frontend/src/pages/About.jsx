// src/pages/About.jsx
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 leading-relaxed">
      
      {/* Page Title */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center"> <span className="text-2xl italic text-gray-500 dark:text-gray-400">about</span> {" "}<span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">NoteNest</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your personal, organized, and secure place for all your notes — built for productivity lovers.
        </p>
      </header>

      {/* What is NoteNest */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">📌 What is NoteNest?</h2>
        <p>
          NoteNest is a modern, cloud-based note-taking application designed to help you 
          capture, organize, and access your ideas anytime, anywhere. 
          Whether you are a student, developer, or professional, 
          NoteNest provides a distraction-free space to store your thoughts, project details, and daily plans securely.
        </p>
      </section>

      {/* Why Use NoteNest */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">💡 Why We Use NoteNest</h2>
        <p>
          In today’s fast-paced world, managing scattered notes across devices can be frustrating. 
          NoteNest solves this problem by giving you a single, intuitive platform to create, 
          edit, and organize your notes with ease. 
          No more losing ideas — your thoughts are synced and secured in one place.
        </p>
      </section>

      {/* How NoteNest Creates Something New */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">🚀 How NoteNest is Different</h2>
        <p>
          Unlike traditional note-taking apps, NoteNest combines simplicity with powerful features — 
          from clean UI inspired by Notion and Google Docs, to secure authentication and fast cloud access. 
          It’s built with modern tech that ensures speed, safety, and flexibility.
        </p>
      </section>

      {/* Who Developed */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">👨‍💻 Developed By</h2>
        <p>
          Hi! I’m <strong>Mohit Dogaya</strong>, a passionate Full Stack Developer in training. 
          I created NoteNest as a project to improve productivity tools while learning and applying 
          real-world development skills. This project reflects my interest in building practical, 
          user-focused applications.
        </p>
      </section>

      {/* Technologies Used */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">⚙ Technologies Used</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Frontend:</strong> React.js, React Router, Axios, TailwindCSS</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB + Mongoose</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Token)</li>
          <li><strong>Design Tools:</strong> Figma</li>
          <li><strong>Deployment:</strong> Render, Vercel, MongoDB Atlas</li>
        </ul>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">🌟 Vision</h2>
        <p>
          Our vision is to make note-taking effortless, accessible, and inspiring for everyone. 
          NoteNest aims to become the go-to platform for managing ideas, projects, and learning materials, 
          helping people stay productive and creative without distractions.
        </p>
      </section>

      {/* Social Links */}
      <footer className="mt-12 pt-6 dark:border-gray-700 text-center">
        <p className="mb-4">Connect with me</p>
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://github.com/mohitdogaya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/mohitdogaya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}
