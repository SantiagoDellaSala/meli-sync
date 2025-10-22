// routes/meliAuth.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const MELI_AUTH_URL = "https://auth.mercadolibre.com.ar/authorization";
const MELI_TOKEN_URL = "https://api.mercadolibre.com/oauth/token";

router.get("/login", (req, res) => {
  const redirectUri = process.env.MELI_REDIRECT_URI;
  const clientId = process.env.MELI_CLIENT_ID;

  const authUrl = `${MELI_AUTH_URL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // Redirige al usuario al login de Mercado Libre
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No se recibió código de autorización" });
  }

  try {
    const response = await axios.post(MELI_TOKEN_URL, null, {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.MELI_CLIENT_ID,
        client_secret: process.env.MELI_CLIENT_SECRET,
        code,
        redirect_uri: process.env.MELI_REDIRECT_URI,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("✅ TOKENS RECIBIDOS DESDE MERCADO LIBRE:");
    console.log(response.data);

    // Luego podemos guardar estos tokens en la DB (por ahora los mostramos)
    res.send(`
      <h2>Autenticación exitosa ✅</h2>
      <p>Access Token: ${response.data.access_token}</p>
      <p>Refresh Token: ${response.data.refresh_token}</p>
      <p>Expira en: ${response.data.expires_in} segundos</p>
    `);
  } catch (err) {
    console.error("❌ Error al obtener tokens:", err.response?.data || err.message);
    res.status(500).json({ error: "No se pudo obtener el token de Mercado Libre" });
  }
});

module.exports = router;
