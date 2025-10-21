// routes/analytics.js
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    // Simulación de datos protegidos
    const mockAnalytics = {
      user: req.user.email || "usuario@correo.com",
      ventas: 124,
      visitas: 843,
      conversiones: 12.4,
    };

    res.json(mockAnalytics);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener analíticas" });
  }
});

module.exports = router;
