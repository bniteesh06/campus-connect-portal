/* ============================================================================= */
/* [EXPERIMENT 6: START] Node.js & Express HTTP Server Entry Point               */
/* ----------------------------------------------------------------------------- */
/* Aim: Set up a basic server that listens for requests on a chosen port.        */
/* ============================================================================= */

require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("============================================================");
  console.log(`[EXP 6] Backend Server successfully started on port ${PORT}`);
  console.log(`[EXP 6] Base URL: http://localhost:${PORT}`);
  console.log(`[EXP 6] RESTful Endpoints: http://localhost:${PORT}/api/assignments`);
  console.log("============================================================");
});
/* ============================================================================= */
/* [EXPERIMENT 6: END] Node.js & Express HTTP Server Entry Point                 */
/* ============================================================================= */
