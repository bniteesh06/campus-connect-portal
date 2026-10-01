/* [EXPERIMENT 6: START] Consuming Backend RESTful Services with Axios           */
/* Aim: Consume RESTful API endpoints from the React client to perform full      */
/* CRUD operations (GET, POST, PUT/PATCH, DELETE) with backend Express services.  */

import axios from "axios";

// Base REST API URL pointing to the Express backend (Experiment 6)
const API_BASE_URL = "http://localhost:5000/api/assignments";

const assignmentService = {
  /**
   * 1. READ ALL Assignments from backend service
   * HTTP Method: GET /api/assignments (with optional ?status= filter)
   */
  async getAll(statusFilter = "all") {
    const url = statusFilter && statusFilter !== "all"
      ? `${API_BASE_URL}?status=${encodeURIComponent(statusFilter)}`
      : API_BASE_URL;

    const response = await axios.get(url);
    return response.data; // { success: true, count: N, data: [...] }
  },

  /**
   * 2. READ SINGLE Assignment by ID
   * HTTP Method: GET /api/assignments/:id
   */
  async getById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * 3. CREATE a New Assignment
   * HTTP Method: POST /api/assignments
   */
  async create(assignmentData) {
    const response = await axios.post(API_BASE_URL, assignmentData);
    return response.data;
  },

  /**
   * 4. UPDATE Assignment details or toggle status
   * HTTP Method: PATCH /api/assignments/:id or PUT /api/assignments/:id
   */
  async update(id, updatedFields) {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedFields);
    return response.data;
  },

  /**
   * 5. DELETE Assignment by ID
   * HTTP Method: DELETE /api/assignments/:id
   */
  async remove(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};

export default assignmentService;
