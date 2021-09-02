import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

//import Header from "./mycomponents/Header";
function PrivateRoute({ component: Component, ...rest }) {
const User = useContext(UserContext);
 // console.log(User);
 return (
   <Route
     {...rest}
     render={(props) =>
       User.isLoggedIn ? (
        
           <Component {...props} />
        
       ) : (
         <Redirect to='/' />
       )
     }
   />
 );
}

export default PrivateRoute;
