/* ============================================================================= */
/* [EXPERIMENT 5: START] Reusable Child Component: StatBadge                     */
/* ----------------------------------------------------------------------------- */
/* Aim: Demonstrate component reusability and props passing.                     */
/* Reused 3 times with different props in StudentPortal.jsx (Total, Pending,     */
/* Submitted).                                                                   */
/* Props:                                                                        */
/*  - label (String): Title of the metric (e.g., 'Total', 'Pending')             */
/*  - count (Number): Numerical value derived from parent state                  */
/*  - type (String): CSS modifier ('total' | 'pending' | 'submitted')            */
/* ============================================================================= */

import React from "react";

export default function StatBadge({ label, count, type }) {
  return (
    <span className={`stat-pill ${type}`}>
      {label}: {count}
    </span>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 5: END] Reusable Child Component: StatBadge                       */
/* ============================================================================= */
