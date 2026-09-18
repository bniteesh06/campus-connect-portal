import React, { useState } from "react";
import "../style.css";

/* ============================================================================= */
/* [EXPERIMENT 4: START] Building an Interactive Web Application with State Handling */
/* ----------------------------------------------------------------------------- */
/* Aim: Manage application state in memory and update the UI whenever that state  */
/* changes (add item, edit/toggle item, remove item, state filtering).            */
/* ============================================================================= */

export default function StudentPortal({ onBackToHome }) {
  // --- EXPERIMENT 4: APPLICATION STATE DECLARATIONS (Step 5) ---
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

  // State 2: Form Input States for adding new assignments
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDue, setNewDue] = useState("");

  // State 3: Filter State ('all' | 'Pending' | 'Submitted')
  const [filter, setFilter] = useState("all");

  // Static Notices data
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

  // Static Attendance data
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

  // --- EXPERIMENT 4: STATE MUTATION ROUTINES ---

  // Step 6: Add Item to State
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("Please enter an assignment title!");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject.trim() || "CS3301 - Full Stack Development",
      due: newDue.trim() || "Sept 30, 2026",
      status: "Pending",
    };

    // Updating state array (triggers automatic UI redraw)
    setAssignmentsList([newAssignment, ...assignmentsList]);
    setNewTitle("");
    setNewSubject("");
    setNewDue("");
  };

  // Step 8: Edit/Toggle Item State
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

  // Step 8: Remove Item from State
  const handleDeleteAssignment = (id) => {
    setAssignmentsList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Step 7: Redrawing interface based on current state & filter
  const filteredAssignments = assignmentsList.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const totalCount = assignmentsList.length;
  const pendingCount = assignmentsList.filter((a) => a.status === "Pending").length;
  const submittedCount = assignmentsList.filter((a) => a.status === "Submitted").length;

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
        {/* TAB 1: ASSIGNMENTS (EXPERIMENT 4 STATE-DRIVEN COMPONENT)            */}
        {/* =================================================================== */}
        {activeTab === "assignments" && (
          <section className="assignment-state-section">
            <div className="section-header-row">
              <div>
                <h3>📝 Interactive Assignment &amp; Submission Manager</h3>
                <p className="state-desc">
                  [Experiment 4] State-driven application. Adding, editing, and deleting items directly mutates in-memory state and automatically redraws the UI.
                </p>
              </div>

              {/* State Derived Summary Badges */}
              <div className="state-stats-bar">
                <span className="stat-pill total">Total: {totalCount}</span>
                <span className="stat-pill pending">Pending: {pendingCount}</span>
                <span className="stat-pill submitted">Submitted: {submittedCount}</span>
              </div>
            </div>

            {/* Step 6: Form to Add New Assignment to State */}
            <form onSubmit={handleAddAssignment} className="add-assignment-form">
              <input
                type="text"
                placeholder="Assignment title (e.g., Lab 4: State Management)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="portal-input"
                required
              />
              <input
                type="text"
                placeholder="Course/Subject (e.g., CS3301)"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="portal-input-sm"
              />
              <input
                type="text"
                placeholder="Due date (e.g., Oct 05, 2026)"
                value={newDue}
                onChange={(e) => setNewDue(e.target.value)}
                className="portal-input-sm"
              />
              <button type="submit" className="add-assignment-btn">
                + Add Assignment
              </button>
            </form>

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

            {/* Step 7: Redrawing List from Current State */}
            <div className="assignment-list">
              {filteredAssignments.length === 0 ? (
                <p className="empty-state-msg">No assignments found for this filter.</p>
              ) : (
                filteredAssignments.map((assignment) => (
                  <div className="assignment-item" key={assignment.id}>
                    <div className="assignment-info">
                      <h4>{assignment.title}</h4>
                      <p>
                        {assignment.subject} • Due: {assignment.due}
                      </p>
                    </div>

                    <div className="assignment-actions">
                      {/* Step 8: Edit / Toggle Item State on Click */}
                      <button
                        type="button"
                        className={
                          assignment.status === "Submitted"
                            ? "status submitted clickable-status"
                            : "status pending clickable-status"
                        }
                        onClick={() => handleToggleStatus(assignment.id)}
                        title="Click to toggle status (Pending / Submitted)"
                      >
                        {assignment.status === "Submitted" ? "✓ Submitted" : "⏳ Pending"}
                        <span className="toggle-hint">Click to toggle</span>
                      </button>

                      {/* Step 8: Remove Item from State */}
                      <button
                        type="button"
                        className="delete-assignment-btn"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                        title="Delete assignment"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 2: NOTICES & EVENTS                                             */}
        {/* =================================================================== */}
        {activeTab === "notices" && (
          <section>
            <h3>📢 Campus Notices &amp; Events</h3>
            <div className="notice-list">
              {notices.map((notice) => (
                <div className="notice-item" key={notice.id}>
                  <div>
                    <h4>{notice.title}</h4>
                    <p>
                      {notice.department} • {notice.date}
                    </p>
                  </div>
                  <button className="details-btn">View Details</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 3: ATTENDANCE TRACKER                                           */}
        {/* =================================================================== */}
        {activeTab === "attendance" && (
          <section>
            <h3>📊 Attendance Tracker</h3>
            <div className="attendance-grid">
              {attendance.map((item) => (
                <div className="attendance-card" key={item.id}>
                  <h4>{item.subject}</h4>
                  <strong>{item.percentage} Attendance</strong>
                </div>
              ))}
            </div>
          </section>
        )}

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
/* [EXPERIMENT 4: END] Interactive Web Application with State Handling           */
/* ============================================================================= */