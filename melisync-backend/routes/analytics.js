// routes/analytics.js
const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Datos simulados por usuario
const userAnalytics = {
  1: {
    ventas: 1240,
    conversiones: 3.2,
    visitas: 8540,
    grafico: [
      { name: 'Lun', ventas: 400 },
      { name: 'Mar', ventas: 700 },
      { name: 'Mié', ventas: 600 },
      { name: 'Jue', ventas: 1000 },
      { name: 'Vie', ventas: 850 },
      { name: 'Sáb', ventas: 1200 },
      { name: 'Dom', ventas: 900 },
    ],
  },
  2: {
    ventas: 850,
    conversiones: 2.8,
    visitas: 5400,
    grafico: [
      { name: 'Lun', ventas: 300 },
      { name: 'Mar', ventas: 500 },
      { name: 'Mié', ventas: 400 },
      { name: 'Jue', ventas: 800 },
      { name: 'Vie', ventas: 700 },
      { name: 'Sáb', ventas: 1000 },
      { name: 'Dom', ventas: 600 },
    ],
  },
};

router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const data = userAnalytics[userId] || {
    ventas: 0,
    conversiones: 0,
    visitas: 0,
    grafico: [],
  };
  res.json(data);
});

module.exports = router;
