import React, { useState } from "react";
import "../style.css";

export default function StudentPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState("notices");

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

  const assignments = [
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
  ];

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

  return (
    <div className="student-portal">

      {/* Header */}
      <header className="student-header">

        <div>
          <h2>🎓 Student Portal</h2>
          <p>Welcome, RVU Student</p>
        </div>

        <button
          className="back-btn"
          onClick={onBackToHome}
        >
          ← Back to Main Campus View
        </button>

      </header>


      {/* Navigation */}
      <nav className="portal-tabs">

        <button
          className={
            activeTab === "notices"
              ? "portal-tab active-tab"
              : "portal-tab"
          }
          onClick={() => setActiveTab("notices")}
        >
          Notices & Events
        </button>


        <button
          className={
            activeTab === "assignments"
              ? "portal-tab active-tab"
              : "portal-tab"
          }
          onClick={() => setActiveTab("assignments")}
        >
          Assignments
        </button>


        <button
          className={
            activeTab === "attendance"
              ? "portal-tab active-tab"
              : "portal-tab"
          }
          onClick={() => setActiveTab("attendance")}
        >
          Track Attendance
        </button>


        <button
          className={
            activeTab === "profile"
              ? "portal-tab active-tab"
              : "portal-tab"
          }
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

      </nav>


      {/* Main Content */}
      <main className="student-content">


        {/* NOTICES */}
        {activeTab === "notices" && (
          <section>

            <h3>📢 Campus Notices & Events</h3>

            <div className="notice-list">

              {notices.map((notice) => (
                <div
                  className="notice-item"
                  key={notice.id}
                >

                  <div>
                    <h4>{notice.title}</h4>

                    <p>
                      {notice.department} • {notice.date}
                    </p>
                  </div>

                  <button className="details-btn">
                    View Details
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}


        {/* ASSIGNMENTS */}
        {activeTab === "assignments" && (
          <section>

            <h3>📝 Assignments & Submissions</h3>

            <div className="assignment-list">

              {assignments.map((assignment) => (
                <div
                  className="assignment-item"
                  key={assignment.id}
                >

                  <div>
                    <h4>{assignment.title}</h4>

                    <p>
                      {assignment.subject} • Due:{" "}
                      {assignment.due}
                    </p>
                  </div>

                  <span
                    className={
                      assignment.status === "Submitted"
                        ? "status submitted"
                        : "status pending"
                    }
                  >
                    {assignment.status}
                  </span>

                </div>
              ))}

            </div>

          </section>
        )}


        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <section>

            <h3>📊 Attendance Tracker</h3>

            <div className="attendance-grid">

              {attendance.map((item) => (
                <div
                  className="attendance-card"
                  key={item.id}
                >

                  <h4>{item.subject}</h4>

                  <strong>
                    {item.percentage} Attendance
                  </strong>

                </div>
              ))}

            </div>

          </section>
        )}


        {/* PROFILE */}
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