/* [EXPERIMENT 6: START] Express Application Configuration & Middleware Pipeline */
/* Aim: Setup Express web server with essential middleware pipeline (body parser,*/
/* CORS, request logger) and wire RESTful routes and error handlers.             */

const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/loggerMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

// --- 1. Essential Middleware Stack ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. Custom Logging Middleware (Exp 6 Requirement) ---
app.use(requestLogger);

// --- 3. Health & Information Endpoint ---
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Campus Connect Portal - RESTful Backend API (Experiment 6)",
    status: "Active",
    resource: "/api/assignments",
    availableEndpoints: [
      { method: "GET", path: "/api/assignments", desc: "Get all assignments" },
      { method: "GET", path: "/api/assignments/:id", desc: "Get single assignment by ID" },
      { method: "POST", path: "/api/assignments", desc: "Create a new assignment" },
      { method: "PUT/PATCH", path: "/api/assignments/:id", desc: "Update an assignment" },
      { method: "DELETE", path: "/api/assignments/:id", desc: "Delete an assignment" },
    ],
  });
});

// --- 4. Mount REST API Routes ---
app.use("/api/assignments", assignmentRoutes);

// --- 5. Error Handling Middleware Stack (Exp 6 Requirement) ---
app.use(notFound); // Catches 404 for unhandled routes
app.use(errorHandler); // Formats centralized 500 error responses

module.exports = app;
