import React, { useState, createContext } from "react";

export const AdminContext = createContext({});
export const AdminProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        branches,
        setBranches,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
