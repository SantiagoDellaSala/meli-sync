// src/services/analyticsService.js
import axios from "../api/api"; // tu instancia de axios que agrega token automáticamente

export const getAnalyticsData = async () => {
  try {
    const response = await axios.get("/analytics");
    
    // Formatear datos para gráfico (simulación de días de la semana)
    const grafico = [
      { name: "Lun", ventas: response.data.ventas },
      { name: "Mar", ventas: response.data.ventas - 10 },
      { name: "Mié", ventas: response.data.ventas + 5 },
      { name: "Jue", ventas: response.data.ventas - 2 },
      { name: "Vie", ventas: response.data.ventas + 8 },
      { name: "Sáb", ventas: response.data.ventas - 6 },
      { name: "Dom", ventas: response.data.ventas },
    ];

    return { ...response.data, grafico };
  } catch (error) {
    console.error("Error al obtener las analíticas:", error);
    throw error;
  }
};
