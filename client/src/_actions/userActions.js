import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    getById,
    addNewUser,
    updateUser,
};
function updateUser(updateuserid,user,from) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateUser(updateuserid,user).then(
      (user) => {
        dispatch(success(user))
        dispatch(userActions.getAll())
        dispatch(alertActions.success("User Updated Scucessfully"));
      }
      ,
      (error) => dispatch(failure(user, error.toString()))
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_USER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_USER_SUCCESS, user };
  }
  function failure(user, error) {
    return { type: userConstants.UPDATE_USER_FAILURE, user, error };
  }
}
function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                     dispatch(alertActions.success("User Login Scucessfully"));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(username) { return { type: userConstants.LOGIN_REQUEST, username } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function getById(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.getById(id).then(
      (set) => dispatch(success(set)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GET_BY_ID_REQUEST };
  }
  function success(set) {
    return { type: userConstants.GET_BY_ID_SUCCESS, set };
  }
  function failure(error) {
    return { type: userConstants.GET_BY_ID_FAILURE, error };
  }
}
function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addNewUser(user) {
  return (dispatch) => {
    dispatch(request());

    userService.addNewUser(user).then(
      (user) => {
        dispatch(success(user));
        dispatch(userActions.getAll())
        dispatch(alertActions.success("User Addition successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
       
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.CREATE_USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.CREATE_USER_SUCCESS,user };
  }
  function failure(error) {
    return { type: userConstants.CREATE_USER_FAILURE, error };
  }
}
function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(user) {
  console.log(user)
    return dispatch => {
        dispatch(request(user.userid));

        userService.delete(user.userid).then(
          (user) => 
          {
            dispatch(success(user.userid))
            dispatch(userActions.getAll())
            dispatch(alertActions.success("User Deleted ScucessFully"))
          },
          (error) => 
          {
            dispatch(failure(user.userid, error.toString()))
            dispatch(alertActions.success("Error Deleting User !"));
          }
        );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}