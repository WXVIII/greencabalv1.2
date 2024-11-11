import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminLogin: () => void;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const adminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};