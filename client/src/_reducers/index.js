import { combineReducers } from "redux";

import { authentication } from "./authenticationReducer";
import { registration } from "./registrationReducer";
import { users } from "./userReducer";
import { alert } from "./alertReducer";
import { inventory } from "./inventoryReducer";
import { admin } from "./adminReducer";

const rootReducer = combineReducers({
  authenticationData: authentication,
  inventoryData: inventory,
  registrationData:registration,
  userData: users,
  helperData:alert,
  adminData:admin,
});

export default rootReducer;
