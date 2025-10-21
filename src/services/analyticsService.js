import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Agregar el token JWT automáticamente
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getAnalyticsData = async () => {
  try {
    const response = await API.get("/analytics");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las analíticas:", error);
    throw error;
  }
};
