/* ============================================================================= */
/* [EXPERIMENT 5: START] Reusable Child Component: NoticeCard                    */
/* ----------------------------------------------------------------------------- */
/* Aim: Reusable card component receiving notice data and action callbacks       */
/* via props.                                                                    */
/* Props:                                                                        */
/*  - notice (Object): { id, title, department, date }                           */
/*  - onViewDetails (Function): Callback invoked on button click                 */
/* ============================================================================= */

import React from "react";

export default function NoticeCard({ notice, onViewDetails }) {
  return (
    <div className="notice-item">
      <div>
        <h4>{notice.title}</h4>
        <p>
          {notice.department} • {notice.date}
        </p>
      </div>
      <button
        type="button"
        className="details-btn"
        onClick={() => onViewDetails && onViewDetails(notice)}
      >
        View Details
      </button>
    </div>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 5: END] Reusable Child Component: NoticeCard                      */
/* ============================================================================= */
