// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth'); // Rutas de login/register
const { sequelize } = require('./models'); // IMPORTANTE
const meliWebhookRoutes = require("./routes/meliWebhook");
const meliRoutes = require("./routes/meli");
const meliAuthRoutes = require("./routes/meliAuth");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/analytics', analyticsRoutes);
app.use("/meli", meliRoutes);
app.use("/meli", meliWebhookRoutes);
app.use("/meli", meliAuthRoutes);

// Sincronizar DB y levantar servidor
const PORT = process.env.PORT || 5000;
sequelize.sync() // 🔹 crea las tablas si no existen
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error sincronizando la DB:', err));
