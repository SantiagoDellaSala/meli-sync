// Simula datos que más adelante vendrán desde el backend (MySQL)
export const getAnalyticsData = async () => {
  // Simula un pequeño retardo de red
  await new Promise((res) => setTimeout(res, 500));

  return {
    ventas: 1245,
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
  };
};
