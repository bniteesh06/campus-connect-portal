/* ============================================================================= */
/* [EXPERIMENT 5: START] Reusable Child Component: AssignmentCard                */
/* ----------------------------------------------------------------------------- */
/* Aim: Modular child card component receiving data and callback event handlers   */
/* via props from the parent component.                                          */
/* Props:                                                                        */
/*  - assignment (Object): Item containing id, title, subject, due, and status   */
/*  - onToggleStatus (Function): Parent event handler to toggle completion state */
/*  - onDelete (Function): Parent event handler to remove item from state        */
/* ============================================================================= */

import React from "react";

export default function AssignmentCard({ assignment, onToggleStatus, onDelete }) {
  const isSubmitted = assignment.status === "Submitted";

  return (
    <div className="assignment-item">
      <div className="assignment-info">
        <h4>{assignment.title}</h4>
        <p>
          {assignment.subject} • Due: {assignment.due}
        </p>
      </div>

      <div className="assignment-actions">
        {/* User Event: Toggle status between Pending and Submitted */}
        <button
          type="button"
          className={`status ${isSubmitted ? "submitted" : "pending"} clickable-status`}
          onClick={() => onToggleStatus(assignment.id)}
          title="Click to toggle status (Pending / Submitted)"
        >
          {isSubmitted ? "✓ Submitted" : "⏳ Pending"}
          <span className="toggle-hint">Click to toggle</span>
        </button>

        {/* User Event: Delete assignment */}
        <button
          type="button"
          className="delete-assignment-btn"
          onClick={() => onDelete(assignment.id)}
          title="Delete assignment"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 5: END] Reusable Child Component: AssignmentCard                  */
/* ============================================================================= */
