import { userConstants } from "../_constants";
const initialState = {
  userList: [],
  loading: false,
  error: false,
 
};
export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        userList: [],
        error: false,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return { ...state, userList: action.users, error: false, loading: false };

    case userConstants.GETALL_FAILURE:
      return { ...state, userList: [], error: true, loading: false };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        userList: state.userList.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
}
