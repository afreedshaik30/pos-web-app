import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
    localStorage.setItem("token", token || "");
    localStorage.setItem("role", role || "");
    localStorage.setItem("userId", userId || "");
    console.log("AuthContext updated:", { token, role, userId });
  }, [token, role, userId]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      console.log("Login response:", response.data);
      setToken(response.data.token);
      setRole(response.data.role);
      setUserId(response.data.id);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response || error);
      throw error.response?.data || "Login failed";
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
