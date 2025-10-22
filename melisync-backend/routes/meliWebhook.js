// routes/meliWebhook.js
const express = require("express");
const router = express.Router();

// Recibe notificaciones de Mercado Libre
router.post("/webhook", (req, res) => {
  try {
    const notification = req.body;
    console.log("Nueva notificación de Mercado Libre:", notification);

    // Aquí luego podemos guardar en DB o procesar
    res.status(200).json({ message: "Notificación recibida correctamente" });
  } catch (err) {
    console.error("Error en webhook de ML:", err);
    res.status(500).json({ error: "Error al procesar notificación" });
  }
});

module.exports = router;
