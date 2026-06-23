import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: string, department: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Base URL for your Mac Backend
  const API_URL = "http://localhost:5001/api/auth";

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = res.data;

    // THE FIX: Physically save to the browser
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

 const signup = async (name, email, password, role, department) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { 
      name, 
      email, 
      password, 
      role: role.toUpperCase(), 
      department,
      // Change this: Ensure skills is a String, not an Array
      skills: "" 
    });
    
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};