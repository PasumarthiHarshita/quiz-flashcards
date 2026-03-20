import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="brand">Q&amp;F</div>
        <Link to="/" className="nav-logo">Quiz & Flashcards</Link>
      </div>
      <nav className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
      </nav>
    </header>
  );
}
