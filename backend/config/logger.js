const winston = require("winston");

// Logger para solicitudes
const requestLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "request.log" })],
});

// Logger para errores
const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

module.exports = {
  requestLogger,
  errorLogger,
};
