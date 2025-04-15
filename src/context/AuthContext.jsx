import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : { isLoggedIn: false, isAdmin: false, name: '', image: '' };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  const login = (userData) => {
    const updated = { ...userData, isLoggedIn: true };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const logout = () => {
    const cleared = { isLoggedIn: false, isAdmin: false, name: '', image: '' };
    setUser(cleared);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
