
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        if (active) setUser(response.data.user);
      } catch {
        localStorage.removeItem("token");
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    checkUser();
    return () => { active = false; };
  }, []);

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  }

  async function signup(details) {
    const { data } = await api.post("/auth/signup", details);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
