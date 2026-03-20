import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import LearningChoice from "./LearningChoice";
import FlashcardsPage from "./FlashcardsPage";
import QuizPage from "./QuizPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const courses = [
    "Aptitude",
    "Computer Science",
    "General Knowledge",
    "Mathematics",
    "Current Affairs",
  ];

  return (
    <Router>
      <div className={darkMode ? "app-root dark" : "app-root light"}>
        
        {/* 🔘 Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="toggle-btn"
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        <Navbar />

        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="title">Quiz App </h1>
                  <p className="subtitle">Choose a course to start learning</p>
                  <div className="course-list">
                    {courses.map((c) => (
                      <CourseCard key={c} title={c} />
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="/course/:courseName" element={<LearningChoice />} />
            <Route
              path="/flashcards/:courseName"
              element={<FlashcardsPage />}
            />
            <Route path="/quiz/:courseName" element={<QuizPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}