import { userConstants } from "../_constants";
import jwtDecode from "jwt-decode";
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
  
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
       return { loggingIn: true };
     
    case userConstants.LOGIN_SUCCESS:
       
      
      return { 
       
        ...state, user: action.user,loggingIn: false, loggedIn: true };
      
        
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
