const { requestLogger, errorLogger } = require("../config/logger");

// Middleware para registrar solicitudes
const logRequests = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
  };

  requestLogger.info(logData);
  next();
};

module.exports = {
  logRequests,
};
