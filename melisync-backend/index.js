// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth'); // Rutas de login/register

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
