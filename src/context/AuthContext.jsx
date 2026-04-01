import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// ─── Hardcoded admin credentials ───────────────────────────────────────────
const ADMIN_EMAIL    = "admin@therootdeep.com";
const ADMIN_PASSWORD = "rootdeep@2024";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("trd_admin") === "true"
  );

  function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("trd_admin", "true");
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials. Please try again." };
  }

  function logout() {
    sessionStorage.removeItem("trd_admin");
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}