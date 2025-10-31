import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const res = await api.post("/register", {
      ...data,
      role: "trouper", // hardcoded role for frontend
    });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const login = async (data: { email: string; password: string }) => {
    const res = await api.post("/login", data);
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const logout = () => {
    api.post("/logout");

    // Clear localStorage
    localStorage.removeItem("user");
    setUser(null);

    // ✅ Manually clear Laravel cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: !!user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
