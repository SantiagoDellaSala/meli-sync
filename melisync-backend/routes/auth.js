// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.status(201).json({ message: 'Usuario creado', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
