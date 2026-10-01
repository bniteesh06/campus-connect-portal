/* [EXPERIMENT 6: START] RESTful Resource Controller & In-Memory Data Store      */
/* Aim: Implement all four basic CRUD operations (Create, Read, Update, Delete)   */
/* using standard HTTP methods and status codes with in-memory persistence.      */
/* Resource: Assignment items for Campus Connect Portal.                         */
/**
 * Temporary In-Memory Data Store (as per Experiment 6 specification)
 */
let assignments = [
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
];

/**
 * @desc   1. READ ALL Assignments (with optional filter by ?status=)
 * @route  GET /api/assignments
 * @access Public
 */
const getAllAssignments = (req, res) => {
  const { status } = req.query;

  let results = assignments;
  if (status && status !== "all") {
    results = assignments.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
};

/**
 * @desc   2. READ SINGLE Assignment by ID
 * @route  GET /api/assignments/:id
 * @access Public
 */
const getAssignmentById = (req, res) => {
  const assignmentId = parseInt(req.params.id, 10);
  const assignment = assignments.find((a) => a.id === assignmentId);

  if (!assignment) {
    return res.status(404).json({
      success: false,
      message: `Assignment with id ${req.params.id} was not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: assignment,
  });
};

/**
 * @desc   3. CREATE a New Assignment
 * @route  POST /api/assignments
 * @access Public
 */
const createAssignment = (req, res) => {
  const { title, subject, due, status } = req.body;

  // Validation: Check for required fields
  if (!title || !subject) {
    return res.status(400).json({
      success: false,
      message: "Please provide both 'title' and 'subject' for the assignment.",
    });
  }

  const newAssignment = {
    id: Date.now(), // Generate unique numeric ID
    title: title.trim(),
    subject: subject.trim(),
    due: due ? due.trim() : "TBD",
    status: status || "Pending",
  };

  // Add to in-memory store (prepending so newest shows first)
  assignments.unshift(newAssignment);

  res.status(201).json({
    success: true,
    message: "Assignment created successfully.",
    data: newAssignment,
  });
};

/**
 * @desc   4. UPDATE an Existing Assignment (Full or Partial)
 * @route  PUT /api/assignments/:id, PATCH /api/assignments/:id
 * @access Public
 */
const updateAssignment = (req, res) => {
  const assignmentId = parseInt(req.params.id, 10);
  const index = assignments.findIndex((a) => a.id === assignmentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Assignment with id ${req.params.id} was not found to update.`,
    });
  }

  const { title, subject, due, status } = req.body;

  // Mutate fields if provided in request body
  if (title !== undefined) assignments[index].title = title.trim();
  if (subject !== undefined) assignments[index].subject = subject.trim();
  if (due !== undefined) assignments[index].due = due.trim();
  if (status !== undefined) assignments[index].status = status;

  res.status(200).json({
    success: true,
    message: `Assignment ${assignmentId} updated successfully.`,
    data: assignments[index],
  });
};

/**
 * @desc   5. DELETE an Assignment by ID
 * @route  DELETE /api/assignments/:id
 * @access Public
 */
const deleteAssignment = (req, res) => {
  const assignmentId = parseInt(req.params.id, 10);
  const index = assignments.findIndex((a) => a.id === assignmentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Assignment with id ${req.params.id} was not found to delete.`,
    });
  }

  const removedAssignment = assignments.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Assignment "${removedAssignment.title}" deleted successfully.`,
    data: removedAssignment,
  });
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
