// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api"; // usa tu helper con interceptor

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      const storedEmail = localStorage.getItem("user_email");
      setUser(storedEmail ? { email: storedEmail } : { email: "usuario" });
    } else {
      setUser(null);
    }
  }, [token]);

  // 🔹 LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const receivedToken = res.data.token;

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user_email", email);

      setToken(receivedToken);
      setUser({ email });

      navigate("/analytics");
    } catch (err) {
      const msg = err.response?.data?.error || "Error al iniciar sesión";
      alert(msg);
    }
  };

  // 🔹 REGISTER
  const register = async (email, password) => {
    try {
      await axios.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.error || "Error al registrarse";
      alert(msg);
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
