import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, authenticate, createUser, saveSession, getSession, clearSession } from "@/lib/mockDatabase";

interface AuthUser extends Omit<User, "password"> {}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string; dateOfBirth?: string; role: UserRole }) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    const result = authenticate(email, password, role);
    if (result.success && result.user) {
      const { password: _, ...safeUser } = result.user;
      setUser(safeUser);
      saveSession(result.user);
    }
    return { success: result.success, error: result.error };
  };

  const register = (data: { email: string; password: string; firstName: string; lastName: string; phone?: string; dateOfBirth?: string; role: UserRole }) => {
    const result = createUser(data);
    if (result.success && result.user) {
      const { password: _, ...safeUser } = result.user;
      setUser(safeUser);
      saveSession(result.user);
    }
    return { success: result.success, error: result.error };
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
