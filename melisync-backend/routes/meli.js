// routes/meli.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// 🔹 Paso 1: Redirigir al usuario a Mercado Libre para loguearse
router.get("/login", (req, res) => {
  const redirectUri = encodeURIComponent(process.env.MELI_REDIRECT_URI);
  const clientId = process.env.MELI_CLIENT_ID;
  const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});

// 🔹 Paso 2: Mercado Libre redirige acá con un “code”, lo cambiamos por el access_token
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Falta el código de autorización");

  try {
    const response = await axios.post("https://api.mercadolibre.com/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.MELI_CLIENT_ID,
        client_secret: process.env.MELI_CLIENT_SECRET,
        code,
        redirect_uri: process.env.MELI_REDIRECT_URI,
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = response.data;
    console.log("✅ Token recibido de Mercado Libre:", data);

    // ⚠️ En un caso real, guardá esto en tu DB
    res.json({
      message: "Autenticación exitosa con Mercado Libre",
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user_id: data.user_id,
      expires_in: data.expires_in,
    });
  } catch (err) {
    console.error("❌ Error al obtener el token:", err.response?.data || err.message);
    res.status(500).json({ error: "Error al obtener token de Mercado Libre" });
  }
});

module.exports = router;
