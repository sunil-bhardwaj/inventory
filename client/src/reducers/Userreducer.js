export const initialState = false

export const authreducer = (authreducer, action) => {
  if (action.type === "isLoggedIn") {
    return action.payload;
  }
  return authreducer;
};
