// In-Memory Data Store (Experiment 6)
let assignments = [
  { id: 1, title: 'Lab Assignment 2: React State', subject: 'CS3301 - Full Stack', due: 'Sept 12', status: 'Pending' },
  { id: 2, title: 'ER Diagram Project Report', subject: 'CS3302 - DBMS', due: 'Sept 01', status: 'Submitted' },
  { id: 3, title: 'Socket Programming Lab', subject: 'CS3303 - Networks', due: 'Sept 25', status: 'Pending' }
];

// 1. READ ALL (GET /api/assignments)
const getAllAssignments = (req, res) => {
  const { status } = req.query;
  const list = status && status !== 'all'
    ? assignments.filter(a => a.status.toLowerCase() === status.toLowerCase())
    : assignments;

  res.json({ success: true, count: list.length, data: list });
};

// 2. READ ONE (GET /api/assignments/:id)
const getAssignmentById = (req, res) => {
  const item = assignments.find(a => a.id == req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Assignment not found' });
  res.json({ success: true, data: item });
};

// 3. CREATE (POST /api/assignments)
const createAssignment = (req, res) => {
  const { title, subject, due, status } = req.body;
  if (!title || !subject) {
    return res.status(400).json({ success: false, message: 'Title and subject are required' });
  }

  const newAssignment = {
    id: Date.now(),
    title,
    subject,
    due: due || 'TBD',
    status: status || 'Pending'
  };

  assignments.unshift(newAssignment);
  res.status(201).json({ success: true, message: 'Created successfully', data: newAssignment });
};

// 4. UPDATE (PUT/PATCH /api/assignments/:id)
const updateAssignment = (req, res) => {
  const item = assignments.find(a => a.id == req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Assignment not found' });

  Object.assign(item, req.body);
  res.json({ success: true, message: 'Updated successfully', data: item });
};

// 5. DELETE (DELETE /api/assignments/:id)
const deleteAssignment = (req, res) => {
  const item = assignments.find(a => a.id == req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Assignment not found' });

  assignments = assignments.filter(a => a.id != req.params.id);
  res.json({ success: true, message: 'Deleted successfully', data: item });
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment
};