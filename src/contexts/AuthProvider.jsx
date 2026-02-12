// React
import { useContext, useState, useCallback, createContext } from "react";

// Services
import { loginService } from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = useCallback(async (loginForm) => {
    try {
      const { data } = await loginService(loginForm);    

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data.user.position;
    } catch (err) {
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };

      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    });
  }, []);

  const value = { user, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
