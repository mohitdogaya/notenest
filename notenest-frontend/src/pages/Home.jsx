// src/pages/Home.jsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        <span className="text-2xl italic text-gray-500 dark:text-gray-400">welcome to</span> {" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">NoteNest</span>
      </h1>

      {/* Glassmorphic Card */}
      <div className="backdrop-blur-lg bg-white/20 dark:bg-gray-800/30 shadow-xl rounded-2xl p-8 max-w-3xl w-full border border-white/30 dark:border-gray-700/40">
        
        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
          Your simple and elegant app to organize notes and folders with ease.
          Perfect for students, trainees, and professionals who want to stay
          productive and organized.
        </p>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Features
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-indigo-500 mt-1 mr-2">✔</span>
              <span><strong>Add, edit, and delete notes:</strong> Easy note management with a modern interface.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mt-1 mr-2">✔</span>
              <span><strong>Glassmorphic design:</strong> Enjoy a sleek, modern look with smooth animations.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mt-1 mr-2">✔</span>
              <span><strong>Secure login/logout:</strong> Keep your notes private with user authentication.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mt-1 mr-2">✔</span>
              <span><strong>Responsive layout:</strong> Use it on any device, anytime.</span>
            </li>
          </ul>
        </div>

        {/* Instruction */}
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Use the navigation bar above to explore your Notes and learn more about this app.
        </p>
      </div>
    </div>
  );
}
