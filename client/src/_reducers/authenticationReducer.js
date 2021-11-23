import { userConstants } from "../_constants";
import jwtDecode from "jwt-decode";
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
       return { ...state, user: action.user, loggingIn: true };
     
    case userConstants.LOGIN_SUCCESS:
       
       
          const decoded = jwtDecode(action.user.token);
          const userrole = decoded.userrole;
          const username = decoded.username;
       
      return { 
       
        ...state, user: action.user,loggingIn: false, loggedIn: true,userRole:userrole,userName:username };
      
        
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
