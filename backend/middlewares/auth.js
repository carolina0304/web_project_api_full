// middleware/auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("🔍 AUTH: Middleware ejecutándose");
  console.log("🔍 AUTH: Headers recibidos:", req.headers.authorization);

  const authorization = req.headers.authorization || req.headers.Authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("❌ AUTH: No hay token o formato incorrecto");
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  const token = authorization.replace("Bearer ", "");
  console.log("🔍 AUTH: Token extraído:", token.substring(0, 20) + "...");
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || "tu-clave-secreta");
    console.log("✅ AUTH: Token verificado exitosamente");
    console.log("🔍 AUTH: Usuario ID:", payload._id);
  } catch (err) {
    console.log("❌ AUTH: Error verificando token:", err.message);
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  req.user = payload; // asigna el payload al objeto de solicitud
  console.log("✅ AUTH: Usuario asignado a req.user");

  next(); // envía la solicitud al siguiente middleware
};
