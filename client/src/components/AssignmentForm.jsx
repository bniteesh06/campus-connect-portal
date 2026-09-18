/* ============================================================================= */
/* [EXPERIMENT 5: START] Reusable Child Component: AssignmentForm                */
/* ----------------------------------------------------------------------------- */
/* Aim: Modular form child component encapsulating controlled input state and    */
/* delegating submission back to the parent component via callback props.        */
/* Props:                                                                        */
/*  - onAddAssignment (Function): Callback function to mutate parent state       */
/* ============================================================================= */

import React, { useState } from "react";

export default function AssignmentForm({ onAddAssignment }) {
  // Local form input states
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [due, setDue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter an assignment title!");
      return;
    }

    // Call parent handler via props
    onAddAssignment({
      title: title.trim(),
      subject: subject.trim() || "CS3301 - Full Stack Development",
      due: due.trim() || "Sept 30, 2026",
    });

    // Reset local form state
    setTitle("");
    setSubject("");
    setDue("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-assignment-form">
      <input
        type="text"
        placeholder="Assignment title (e.g., Lab 5: Modular React Components)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="portal-input"
        required
      />
      <input
        type="text"
        placeholder="Course/Subject (e.g., CS3301)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="portal-input-sm"
      />
      <input
        type="text"
        placeholder="Due date (e.g., Oct 15, 2026)"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="portal-input-sm"
      />
      <button type="submit" className="add-assignment-btn">
        + Add Assignment
      </button>
    </form>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 5: END] Reusable Child Component: AssignmentForm                  */
/* ============================================================================= */
