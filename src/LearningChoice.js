import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LearningChoice() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  // normalize display name from route param
  const display = courseName.replace(/-/g, " ");

  return (
    <div className="choice-page">
      <h2 className="section-title">{display.toUpperCase()}</h2>
      <p className="section-sub">Choose a learning mode</p>

      <div className="choice-row">
        <button
          className="btn secondary"
          onClick={() => navigate(`/flashcards/${courseName}`)}
        >
          Flashcards
        </button>
        <button
          className="btn primary"
          onClick={() => navigate(`/quiz/${courseName}`)}
        >
          Quiz
        </button>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn ghost" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
