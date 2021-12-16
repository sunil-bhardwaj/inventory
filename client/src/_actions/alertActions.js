import { alertConstants } from "../_constants/actionTypes";

export const alertActions = {
  loading,
  success,
  error,
  clear,
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}
function loading(message) {
  return { type: alertConstants.LOADING, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
