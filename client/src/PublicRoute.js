import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
//import Header from "./mycomponents/Header";
//import Sidebar from "./admindashboard/Sidebar";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const User = useContext(UserContext);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        User.isLoggedIn ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
