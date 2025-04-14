import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : { isLoggedIn: false, isAdmin: false, name: '' };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    const cleared = { isLoggedIn: false, isAdmin: false, name: '' };
    setUser(cleared);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);