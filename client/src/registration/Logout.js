import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
function Logout() {
  const User = useContext(UserContext);
  const [message, setMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("token");

    User.setIsLoggedIn(false);
    User.setIsAdmin(false);
    User.setUserName("Guest");
    User.setUsers([]);
    User.setStocks([]);
    setMessage("Logged Out ScucessFully");
    console.log("Am inside Logged Out");
    history.push("/");
  }, []);

  //
  return (<></>);
}

export default Logout;
