/* [EXPERIMENT 6: START] Centralized Error Handling Middleware                   */
/* Aim: Implement middleware to gracefully intercept unhandled routes (404)     */
/* and centralized runtime errors (500) returning structured JSON responses.     */
/**
 * Middleware to catch requests for non-existent routes (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found - [${req.method}] ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized error handler middleware
 * Formats errors into a predictable JSON payload
 */
const errorHandler = (err, req, res, next) => {
  // If status code is 200, default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`[EXP 6 ERROR HANDLER] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
