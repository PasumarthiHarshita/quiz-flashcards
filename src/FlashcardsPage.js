
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Flashcard from "./Flashcard";

// Data for 5 courses, 5 flashcards each
const FLASHCARDS = {
  aptitude: [
    { q: "25% of 80?", a: "20" },
    { q: "Speed = ?", a: "Distance / Time" },
    { q: "5 + 7 = ?", a: "12" },
    { q: "Square root of 49?", a: "7" },
    { q: "12 ÷ 4 = ?", a: "3" },
  ],
  "computer-science": [
    { q: "CPU stands for ?", a: "Central Processing Unit" },
    { q: "RAM stands for ?", a: "Random Access Memory" },
    { q: "HTML is for ?", a: "Structure of web pages" },
    { q: "CSS is for ?", a: "Styling web pages" },
    { q: "JS stands for ?", a: "JavaScript" },
  ],
  "general-knowledge": [
    { q: "Capital of India?", a: "New Delhi" },
    { q: "Largest ocean?", a: "Pacific Ocean" },
    { q: "Olympics are held every?", a: "4 years" },
    { q: "Currency of USA?", a: "US Dollar" },
    { q: "National anthem of India by?", a: "Rabindranath Tagore" },
  ],
  mathematics: [
    { q: "Derivative of x^2 ?", a: "2x" },
    { q: "Integral of 1/x ?", a: "ln|x|" },
    { q: "10 × 10 = ?", a: "100" },
    { q: "7 + 8 = ?", a: "15" },
    { q: "Square of 9 ?", a: "81" },
  ],
  "current-affairs": [
    { q: "UN Secretary-General ?", a: "António Guterres" },
    { q: "2024 Olympics host ?", a: "Paris" },
    { q: "Nobel Peace Prize 2023 ?", a: "Narges Mohammadi" },
    { q: "Capital of France?", a: "Paris" },
    { q: "President of USA (2024)?", a: "Joe Biden" },
  ],
};

export default function FlashcardsPage() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const key = courseName.toLowerCase();
  const cards = useMemo(() => FLASHCARDS[key] || [], [key]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards.length) {
    return (
      <div className="container">
        <h2>No flashcards for this course.</h2>
        <button className="btn ghost" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  // Controlled flip + advance logic:
  // - Click once: flip to show answer
  // - Click again: advance to next card and show question
  const handleCardClick = () => {
    if (!flipped) {
      setFlipped(true); // show answer
      return;
    }
    // flipped is true -> move to next
    setFlipped(false);
    if (index < cards.length - 1) setIndex(index + 1);
    else {
      // end: go back or loop — we'll go back to start
      setIndex(0);
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">{courseName.replace(/-/g, " ").toUpperCase()} — Flashcards</h2>

      <div className="flash-area">
        <Flashcard
          question={cards[index].q}
          answer={cards[index].a}
          flipped={flipped}
          onClick={handleCardClick}
        />
        <div className="flash-controls">
          <div className="small-muted">Card {index + 1} of {cards.length}</div>
          <div style={{ marginTop: 12 }}>
            <button className="btn ghost" onClick={() => { setIndex(Math.max(0, index - 1)); setFlipped(false); }}>Prev</button>
            <button className="btn ghost" onClick={() => { setIndex((index + 1) % cards.length); setFlipped(false); }}>Next</button>
            <button className="btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

