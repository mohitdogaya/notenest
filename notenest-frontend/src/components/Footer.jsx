// src/components/Footer.jsx
import "./footer.css"
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-border">__________________________</div>
      <p>
        &copy; {new Date().getFullYear()} NoteNest. All rights reserved.
      </p>
      <p>
        Designed by WISD.
      </p>
    </footer>
  );
}
