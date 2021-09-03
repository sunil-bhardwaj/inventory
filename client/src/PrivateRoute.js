import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext, UserProvider } from "./UserContext";
import Navbar from "./mycomponents/Navbar";
import Header from "./mycomponents/Header";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const User = useContext(UserContext);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        User.isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};
