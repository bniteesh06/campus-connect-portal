/* ============================================================================= */
/* [EXPERIMENT 5: START] Reusable Child Component: AttendanceCard                */
/* ----------------------------------------------------------------------------- */
/* Aim: Reusable visual card component demonstrating props passing.              */
/* Props:                                                                        */
/*  - subject (String): Course title/code                                        */
/*  - percentage (String): Attendance percentage metric                          */
/* ============================================================================= */

import React from "react";

export default function AttendanceCard({ subject, percentage }) {
  return (
    <div className="attendance-card">
      <h4>{subject}</h4>
      <strong>{percentage} Attendance</strong>
    </div>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 5: END] Reusable Child Component: AttendanceCard                  */
/* ============================================================================= */
