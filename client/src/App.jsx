/* ============================================================================= */
/* [EXPERIMENT 4 & 5: APPLICATION ROUTING] State-Driven Page View Routing        */
/* ----------------------------------------------------------------------------- */
/* Handles routing between the landing page, authentication module, and the      */
/* interactive, modular Student Portal application container (React Components). */
/* ============================================================================= */

import React, { useState, useEffect } from "react";
import AuthModule from "./components/AuthModule.jsx";
import StudentPortal from "./components/StudentPortal.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === "#login") {
        setAuthMode("login");
        setCurrentPage("login");
      } else if (hash === "#register") {
        setAuthMode("register");
        setCurrentPage("login");
      } else if (hash === "#student") {
        setCurrentPage("student");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (currentPage === "login") {
    return (
      <AuthModule
        initialMode={authMode}
        onLoginSuccess={() => {
          setCurrentPage("student");
        }}
      />
    );
  }

  // --- EXPERIMENT 4: Render Interactive Web Application with State Handling ---
  if (currentPage === "student") {
    return (
      <StudentPortal
        onBackToHome={() => {
          window.location.hash = "";
          setCurrentPage("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return null;
}