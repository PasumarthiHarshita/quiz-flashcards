import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ✅ QUESTIONS
const QUIZ = {
  aptitude: [
    { q: "10 + 15 = ?", opts: ["20", "25", "30", "35"], ans: "25" },
    { q: "50% of 200 = ?", opts: ["50", "100", "150", "200"], ans: "100" },
    { q: "12 × 3 = ?", opts: ["36", "32", "35", "30"], ans: "36" },
    { q: "Square root of 81 = ?", opts: ["8", "9", "10", "7"], ans: "9" },
    { q: "7 + 8 = ?", opts: ["14", "15", "16", "13"], ans: "15" },
  ],
  "computer-science": [
    { q: "CPU stands for ?", opts: ["Central Processing Unit", "Control Processing Unit", "Compute Process Unit", "None"], ans: "Central Processing Unit" },
    { q: "RAM stands for ?", opts: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "None"], ans: "Random Access Memory" },
    { q: "HTML is used for ?", opts: ["Styling", "Structure", "Database", "OS"], ans: "Structure" },
    { q: "CSS stands for ?", opts: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets","None"], ans: "Cascading Style Sheets" },
    { q: "JS stands for ?", opts: ["JavaScript","JavaSystem","JustScript","None"], ans: "JavaScript" },
  ],
  "general-knowledge": [
    { q: "Capital of India ?", opts: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], ans: "New Delhi" },
    { q: "Largest ocean ?", opts: ["Atlantic", "Indian", "Pacific", "Arctic"], ans: "Pacific" },
    { q: "Olympics held every ?", opts: ["2 years","3 years","4 years","5 years"], ans: "4 years" },
    { q: "Currency of USA ?", opts: ["Dollar","Euro","Rupee","Yen"], ans: "Dollar" },
    { q: "National anthem of India by ?", opts: ["Tagore","Gandhi","Nehru","Bose"], ans: "Tagore" },
  ],
  mathematics: [
    { q: "Derivative of x^2 ?", opts: ["x","2x","x^2","2"], ans: "2x" },
    { q: "Integral of 1/x ?", opts: ["x","ln|x|","1/x^2","e^x"], ans: "ln|x|" },
    { q: "10 × 10 = ?", opts: ["100","90","110","120"], ans: "100" },
    { q: "7 + 8 = ?", opts: ["14","15","13","16"], ans: "15" },
    { q: "Square of 9 ?", opts: ["81","72","91","99"], ans: "81" },
  ],
  "current-affairs": [
    { q: "UN Secretary-General ?", opts: ["Ban Ki-moon","António Guterres","Kofi Annan","Boutros Boutros-Ghali"], ans: "António Guterres" },
    { q: "2024 Olympics host ?", opts: ["Tokyo","Paris","LA","Beijing"], ans: "Paris" },
    { q: "Nobel Peace Prize 2023 winner ?", opts: ["Person A","Narges Mohammadi","Person C","Person D"], ans: "Narges Mohammadi" },
    { q: "Capital of France ?", opts: ["Lyon","Nice","Paris","Marseille"], ans: "Paris" },
    { q: "President of USA (2024) ?", opts: ["Donald Trump","Barack Obama","Joe Biden","Someone"], ans: "Joe Biden" },
  ],
};

export default function QuizPage() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const key = courseName.toLowerCase();
  const questions = useMemo(() => QUIZ[key] || [], [key]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // ✅ FIXED useEffect (no warning now)
  useEffect(() => {
    if (quizFinished) {
      let history = JSON.parse(localStorage.getItem("quizScores")) || [];

      history.push({
        course: courseName,
        score: score,
        total: questions.length,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem("quizScores", JSON.stringify(history));
    }
  }, [quizFinished, score, courseName, questions.length]);

  const handleSelect = (opt) => {
    if (locked) return;
    setSelected(opt);
    setLocked(true);

    const isCorrect = opt === questions[index].ans;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected(null);
      setLocked(false);

      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        setQuizFinished(true);
      }
    }, 800);
  };

  const history = JSON.parse(localStorage.getItem("quizScores")) || [];

  // ✅ RESULT SCREEN
  if (quizFinished) {
    return (
      <div className="container">
        <h2>Quiz Completed 🎉</h2>
        <h3>Your Score: {score}/{questions.length}</h3>

        <h3>Previous Attempts</h3>
        <ul>
          {history.map((item, i) => (
            <li key={i}>
              {item.course} → {item.score}/{item.total} ({item.date})
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/")}>Go Home</button>
        <button onClick={() => localStorage.removeItem("quizScores")}>
          Clear History
        </button>
      </div>
    );
  }

  // ✅ QUIZ UI (FIXED selected warning + better UI)
  return (
    <div className="container">
      <h2>{courseName.toUpperCase()} Quiz</h2>

      <div className="question">{questions[index].q}</div>

      <div className="options">
        {questions[index].opts.map((opt, i) => {
          let cls = "opt-btn";

          if (selected !== null) {
            if (opt === questions[index].ans && selected === opt) cls += " correct";
            else if (selected === opt && opt !== questions[index].ans) cls += " wrong";
            else if (opt === questions[index].ans) cls += " correct";
          }

          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleSelect(opt)}
              disabled={locked}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <p>Question {index + 1} of {questions.length}</p>
    </div>
  );
}