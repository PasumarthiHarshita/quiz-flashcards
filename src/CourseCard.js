import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ title }) {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p className="course-desc">Tap below to start learning {title}.</p>
      <Link to={`/course/${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <button className="btn primary">Start Learning</button>
      </Link>
    </div>
  );
}
