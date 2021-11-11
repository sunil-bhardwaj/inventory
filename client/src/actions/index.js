import {
  ADD_INVENTORY,
  REMOVE_INVENTORY,
  ADD_USER,
  REMOVE_USER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SHOW_STORE_STOCK,
  SHOW_TOTAL_INVENTORY,
  SHOW_USERS,
} from "../constants/actionTypes";
export function addInventory(payload) {
  return { type: ADD_INVENTORY, payload };
}
export function removeProduct(payload) {
  return { type: REMOVE_INVENTORY, payload };
}
export function addUser(payload) {
  return { type: ADD_USER, payload };
}
export function removeUser(payload) {
  return { type: REMOVE_USER, payload };
}
export function addToCart(payload) {
  return { type: ADD_TO_CART, payload };
}
export function removeFromCart(payload) {
  return { type: REMOVE_FROM_CART, payload };
}
export function showStoreStock(payload) {
  return { type: SHOW_STORE_STOCK, payload };
}
export function showTotalInventory(payload) {
  return { type: SHOW_TOTAL_INVENTORY, payload };
}
export function showUsers(payload) {
  return { type: SHOW_USERS, payload };
}
