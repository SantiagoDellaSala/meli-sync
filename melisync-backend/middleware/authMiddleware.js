// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No se envió token" });

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // agrega info del usuario al request
    next();
  } catch (err) {
    res.status(403).json({ error: "Token no válido o expirado" });
  }
};

module.exports = { verifyToken };
