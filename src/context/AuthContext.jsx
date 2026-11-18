import { createContext, useContext, useMemo, useState } from "react";
import { students } from "../data/students";

const AuthContext = createContext(null);

const demoUsers = [
  { email: "admin@college.edu", password: "admin123", role: "admin", name: "College Admin", id: "admin-1" },
  { email: "faculty@college.edu", password: "faculty123", role: "faculty", name: "Dr. Maya Patel", id: "faculty-1" },
  { email: "311824103012@msajce-edu.in", password: "student123", role: "student", name: "Arun Kumar", id: 1 }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("college-current-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const account = demoUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );
    if (!account) return { ok: false, error: "Invalid email address or password." };

    const sessionUser = { ...account };
    delete sessionUser.password;
    if (sessionUser.role === "student") {
      sessionUser.student = students.find((student) => student.id === sessionUser.id);
    }
    sessionStorage.setItem("college-current-user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { ok: true, role: sessionUser.role };
  };

  const logout = () => {
    sessionStorage.removeItem("college-current-user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
