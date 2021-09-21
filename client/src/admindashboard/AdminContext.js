import React, { useState, createContext } from "react";

export const AdminContext = createContext({});
export const AdminProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [sets, setSets] = useState([]);
  const [box, setBox] = useState([]);
  
  return (
    <AdminContext.Provider
      value={{
        branches,
        setBranches,
        sets,
        setSets,
        box,
        setBox,
        
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
