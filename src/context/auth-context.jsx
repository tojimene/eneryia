"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MOCK_USERS } from "@/lib/mock-data";

const STORAGE_KEY = "eneryia-auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const found = MOCK_USERS.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password
    );

    if (!found) {
      throw new Error("Credenciales inválidas. Prueba con admin@eneryia.io / admin123");
    }

    const safeUser = {
      email: found.email,
      name: found.name,
      role: found.role,
      avatar: found.avatar,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.replace("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isHydrated,
      login,
      logout,
    }),
    [user, isHydrated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
