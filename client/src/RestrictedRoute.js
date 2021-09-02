import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "./UserContext";

function RestrictedRoute({ component: Component, ...rest }) {
  const User = useContext(UserContext);
  // console.log(User);
  return (
    <Route
      {...rest}
      render={(props) =>
        
        User.isLoggedIn ? (
          User.isAdmin ? (
            
           
            <Component {...props} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

export default RestrictedRoute;
