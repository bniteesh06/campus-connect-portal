/* ============================================================================= */
/* [EXPERIMENT 4 & 5: START] Modular Frontend Application & State Architecture   */
/* ----------------------------------------------------------------------------- */
/* [EXPERIMENT 4] In-Memory State Handling: Central state array, add, edit,     */
/*               toggle status, remove item, live derived summary metrics.       */
/* [EXPERIMENT 5] Component-Based Architecture: Decomposed into reusable child   */
/*               components communicating via props and event handlers:          */
/*               - StatBadge.jsx (reusable metrics pill)                         */
/*               - AssignmentForm.jsx (modular form with local controlled state) */
/*               - AssignmentCard.jsx (modular item card with action callbacks)  */
/*               - NoticeCard.jsx (reusable notice card with props)              */
/*               - AttendanceCard.jsx (reusable attendance card with props)      */
/* ============================================================================= */

import React, { useState } from "react";
import "../style.css";
import StatBadge from "./StatBadge.jsx";
import AssignmentForm from "./AssignmentForm.jsx";
import AssignmentCard from "./AssignmentCard.jsx";
import NoticeCard from "./NoticeCard.jsx";
import AttendanceCard from "./AttendanceCard.jsx";

export default function StudentPortal({ onBackToHome }) {
  // =============================================================================
  // [EXPERIMENT 4: START] In-Memory State Declarations & State Mutation Handlers
  // -----------------------------------------------------------------------------
  // Step 5: Central application state declared using React useState hook.
  // =============================================================================
  const [activeTab, setActiveTab] = useState("assignments");

  // State 1: Central State Array for Assignments
  const [assignmentsList, setAssignmentsList] = useState([
    {
      id: 1,
      title: "Lab Assignment 2: React State Management",
      subject: "CS3301 - Full Stack",
      due: "Sept 12, 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "ER Diagram Project Report",
      subject: "CS3302 - DBMS",
      due: "Sept 01, 2026",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Computer Networks Socket Programming Lab",
      subject: "CS3303 - Networks",
      due: "Sept 25, 2026",
      status: "Pending",
    },
  ]);

  // State 2: Filter State ('all' | 'Pending' | 'Submitted')
  const [filter, setFilter] = useState("all");

  // Sample static Notices data passed to reusable child NoticeCard components
  const notices = [
    {
      id: 1,
      title: "Mid-Term Exam Schedule Released",
      department: "SOCE",
      date: "Sept 10, 2026",
    },
    {
      id: 2,
      title: "Hackathon Registration Open",
      department: "RVU Tech Club",
      date: "Sept 15, 2026",
    },
  ];

  // Sample static Attendance data passed to reusable child AttendanceCard components
  const attendance = [
    {
      id: 1,
      subject: "CS3301 - Full Stack",
      percentage: "88%",
    },
    {
      id: 2,
      subject: "CS3302 - DBMS",
      percentage: "92%",
    },
  ];

  // --- EXPERIMENT 4: STATE MUTATION ROUTINES (Invoked by child callback props) ---

  // Step 6: Add New Item to Parent State (invoked by AssignmentForm via onAddAssignment prop)
  const handleAddAssignment = (newAssignmentData) => {
    const newAssignment = {
      id: Date.now(),
      ...newAssignmentData,
      status: "Pending",
    };

    setAssignmentsList([newAssignment, ...assignmentsList]);
  };

  // Step 8: Edit/Toggle Item State (invoked by AssignmentCard via onToggleStatus prop)
  const handleToggleStatus = (id) => {
    setAssignmentsList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Submitted" ? "Pending" : "Submitted",
            }
          : item
      )
    );
  };

  // Step 8: Remove Item from State (invoked by AssignmentCard via onDelete prop)
  const handleDeleteAssignment = (id) => {
    setAssignmentsList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Step 7: Redraw List from Current Filter State
  const filteredAssignments = assignmentsList.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  // Step 9: Derived State Statistics (Total, Pending, Submitted counts)
  const totalCount = assignmentsList.length;
  const pendingCount = assignmentsList.filter((a) => a.status === "Pending").length;
  const submittedCount = assignmentsList.filter((a) => a.status === "Submitted").length;
  // =============================================================================
  // [EXPERIMENT 4: END] In-Memory State Declarations & State Mutation Handlers
  // =============================================================================

  return (
    <div className="student-portal">
      {/* Header */}
      <header className="student-header">
        <div>
          <h2>🎓 Student Portal</h2>
          <p>Welcome, RVU Student</p>
        </div>

        <button className="back-btn" onClick={onBackToHome}>
          ← Back to Main Campus View
        </button>
      </header>

      {/* Navigation Tabs (State-driven tab switching) */}
      <nav className="portal-tabs">
        <button
          className={activeTab === "assignments" ? "portal-tab active-tab" : "portal-tab"}
          onClick={() => setActiveTab("assignments")}
        >
          Assignments ({totalCount})
        </button>

        <button
          className={activeTab === "notices" ? "portal-tab active-tab" : "portal-tab"}
          onClick={() => setActiveTab("notices")}
        >
          Notices & Events
        </button>

        <button
          className={activeTab === "attendance" ? "portal-tab active-tab" : "portal-tab"}
          onClick={() => setActiveTab("attendance")}
        >
          Track Attendance
        </button>

        <button
          className={activeTab === "profile" ? "portal-tab active-tab" : "portal-tab"}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="student-content">
        {/* =================================================================== */}
        {/* [EXPERIMENT 5: START] Component-Based Architecture & Props Passing   */}
        {/* ------------------------------------------------------------------- */}
        {/* Step 3: Parent component (StudentPortal) composing child components  */}
        {/* Step 4 & 5: Passing data down to children using props                */}
        {/* Step 7 & 8: Handling child events via callback props                 */}
        {/* Step 10: Reusing components with different props (StatBadge, etc.)  */}
        {/* =================================================================== */}

        {/* TAB 1: ASSIGNMENTS (EXPERIMENT 5 COMPONENT COMPOSITION) */}
        {activeTab === "assignments" && (
          <section className="assignment-state-section">
            <div className="section-header-row">
              <div>
                <h3>📝 Interactive Assignment &amp; Submission Manager</h3>
              </div>

              {/* EXPERIMENT 5: Reusable StatBadge Component with Props */}
              <div className="state-stats-bar">
                <StatBadge label="Total" count={totalCount} type="total" />
                <StatBadge label="Pending" count={pendingCount} type="pending" />
                <StatBadge label="Submitted" count={submittedCount} type="submitted" />
              </div>
            </div>

            {/* EXPERIMENT 5: Reusable AssignmentForm Component with callback prop */}
            <AssignmentForm onAddAssignment={handleAddAssignment} />

            {/* Filter Controls (State-Driven Filtering) */}
            <div className="assignment-filters">
              <span className="filter-label">Filter View:</span>
              <button
                type="button"
                className={`filter-btn ${filter === "all" ? "active-filter" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === "Pending" ? "active-filter" : ""}`}
                onClick={() => setFilter("Pending")}
              >
                Pending ({pendingCount})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === "Submitted" ? "active-filter" : ""}`}
                onClick={() => setFilter("Submitted")}
              >
                Submitted ({submittedCount})
              </button>
            </div>

            {/* EXPERIMENT 5: Reusable AssignmentCard Component rendered for each item */}
            <div className="assignment-list">
              {filteredAssignments.length === 0 ? (
                <p className="empty-state-msg">No assignments found for this filter.</p>
              ) : (
                filteredAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDeleteAssignment}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 2: NOTICES & EVENTS (EXPERIMENT 5 REUSABLE NoticeCard)          */}
        {/* =================================================================== */}
        {activeTab === "notices" && (
          <section>
            <h3>📢 Campus Notices &amp; Events</h3>
            <div className="notice-list">
              {notices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onViewDetails={(n) =>
                    alert(
                      `Announcement: ${n.title}\nDepartment: ${n.department}\nDate: ${n.date}`
                    )
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 3: ATTENDANCE TRACKER (EXPERIMENT 5 REUSABLE AttendanceCard)    */}
        {/* =================================================================== */}
        {activeTab === "attendance" && (
          <section>
            <h3>📊 Attendance Tracker</h3>
            <div className="attendance-grid">
              {attendance.map((item) => (
                <AttendanceCard
                  key={item.id}
                  subject={item.subject}
                  percentage={item.percentage}
                />
              ))}
            </div>
          </section>
        )}
        {/* =================================================================== */}
        {/* [EXPERIMENT 5: END] Component-Based Architecture & Props Passing     */}
        {/* =================================================================== */}

        {/* =================================================================== */}
        {/* TAB 4: PROFILE                                                      */}
        {/* =================================================================== */}
        {activeTab === "profile" && (
          <section>
            <h3>👤 Student Profile</h3>
            <div className="profile-card">
              <p>
                <strong>Name:</strong> RVU Student
              </p>
              <p>
                <strong>Student ID:</strong> RVU2026CS001
              </p>
              <p>
                <strong>Program:</strong> BSc Computer Science
              </p>
              <p>
                <strong>Semester:</strong> 5
              </p>
              <p>
                <strong>Email:</strong> student@rvu.edu.in
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ============================================================================= */
/* [EXPERIMENT 4 & 5: END] Modular Frontend Application & State Architecture     */
/* ============================================================================= */