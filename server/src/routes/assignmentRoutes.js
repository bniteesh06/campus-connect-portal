/* ============================================================================= */
/* [EXPERIMENT 6: START] RESTful Resource Routes                                 */
/* ----------------------------------------------------------------------------- */
/* Aim: Design clear, predictable API endpoint routes mapped to standard HTTP    */
/* methods: GET (read), POST (create), PUT/PATCH (update), and DELETE (delete).  */
/* ============================================================================= */

const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

// Route: /api/assignments
// - GET:  Read all assignments
// - POST: Create a new assignment
router
  .route("/")
  .get(getAllAssignments)
  .post(createAssignment);

// Route: /api/assignments/:id
// - GET:    Read a single assignment by its ID
// - PUT:    Update an assignment (full replacement)
// - PATCH:  Update an assignment (partial modification)
// - DELETE: Remove an assignment by ID
router
  .route("/:id")
  .get(getAssignmentById)
  .put(updateAssignment)
  .patch(updateAssignment)
  .delete(deleteAssignment);

module.exports = router;
/* ============================================================================= */
/* [EXPERIMENT 6: END] RESTful Resource Routes                                   */
/* ============================================================================= */
