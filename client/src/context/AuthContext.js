import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// ... (other imports)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    const register = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    };
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []); // Empty dependency array to run the effect only once
  
    const authContextValue = {
      user,
      login,
      logout,
      register,
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthProvider, useAuth };
  