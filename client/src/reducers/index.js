import {
  ADD_INVENTORY,
  ADD_USER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../constants/actionTypes";
const initialState = {
  inventory: [],
  users:[],
  cart :[],
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_INVENTORY) {
    return Object.assign({}, state, {
      inventory: state.inventory.concat(action.payload),
    });
  }
  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      user: state.user.concat(action.payload),
    });
  }
  if (action.type === ADD_TO_CART) {
    return Object.assign({}, state, {
      cart: state.cart.concat(action.payload),
    });
  }
  if (action.type === REMOVE_FROM_CART) {
    return Object.assign({}, state, {
      //cart: state.cart.concat(action.payload),
    });
  }
  return state;
}

export default rootReducer;
