import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
//import Header from "./mycomponents/Header";
function PublicRoute({ component: Component, ...rest }) {
const User = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        User.isLoggedIn ? <Redirect to='/dashboard'/> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
