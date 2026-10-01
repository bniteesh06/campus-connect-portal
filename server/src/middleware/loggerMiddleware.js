/* [EXPERIMENT 6: START] Custom Request Logging Middleware                       */

/* Aim: Understand the role of middleware in request handling.                   */
/* Intercepts all incoming HTTP requests and logs timestamp, method, and URL.   */
/**
 * Custom request logger middleware
 * Logs incoming HTTP method, request path, and timestamp to the server console.
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] [EXP 6 LOG] ${method} ${url}`);
  next();
};

module.exports = requestLogger;
