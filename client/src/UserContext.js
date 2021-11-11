import React, { useState, createContext } from "react";

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([])
  const [stocks, setStocks] = useState([...product]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("Guest");

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        stocks,
        users,
        userName,
        isLoading,
        setIsLoading,
        setUserName,
        setStocks,
        setUsers,
        setIsLoggedIn,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
