import { userConstants } from "../_constants";
const initialState = {
  userList: [],
  user:'',
  loading: false,
  error: false,
};
export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,

        error: false,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return { ...state, userList: action.users, error: false, loading: false };

    case userConstants.GETALL_FAILURE:
      return { ...state, error: true, loading: false };

    case userConstants.GET_BY_ID_REQUEST:
      return { loading: true };
    case userConstants.GET_BY_ID_SUCCESS:
      return { ...state, user: action.user, error: false, loading: false };
    case userConstants.GET_BY_ID_FAILURE:
      return { error: action.error };

    case userConstants.CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case userConstants.CREATE_USER_SUCCESS:
      return { ...state, user: action.user, error: false, loading: false };
    case userConstants.CREATE_USER_FAILURE:
      return { ...state, error: action.error };
    ////////////////////////////////////////
    case userConstants.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case userConstants.UPDATE_USER_SUCCESS:
      return { ...state, user: action.user, error: false, loading: false };
    case userConstants.UPDATE_USER_FAILURE:
      return { ...state, error: action.error };
//////////////////////////////////////////////
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
