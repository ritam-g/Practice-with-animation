import React, { createContext, useContext, useState } from 'react';

const UserAuthContext = createContext();

export const useAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username, isAuthenticated: true });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

