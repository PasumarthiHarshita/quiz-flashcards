import React from "react";

/*
  Controlled Flashcard:
  - flipped (boolean)
  - onClick handler provided by parent
  - question / answer strings
*/
export default function Flashcard({ question, answer, flipped, onClick }) {
  return (
    <div className="flashcard-container" onClick={onClick} aria-hidden>
      <div className={`flashcard-inner ${flipped ? "flipped" : ""}`}>
        <div className="flashcard-front">
          <div className="card-text">{question}</div>
        </div>
        <div className="flashcard-back">
          <div className="card-text">{answer}</div>
        </div>
      </div>
    </div>
  );
}
