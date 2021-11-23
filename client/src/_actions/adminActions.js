import {  adminConstants } from "../_constants";
import { adminService } from "../_services";
import { alertActions } from "./";


export const adminActions = {
  addBranch,
  updateBranch,
  viewBranches,
  deleteBranch: _deleteBranch,
};

function addBranch(branchname, branchid, from) {
  return (dispatch) => {
    dispatch(request({ branchname,branchid }));

    adminService.addBranch(branchname, branchid).then(
      (branch) => {
        dispatch(success(branch));

       // history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(branch) {
    return { type: adminConstants.ADMIN_ADD_BRANCH_REQUEST, branch };
  }
  function success(branch) {
    return { type: adminConstants.ADMIN_ADD_BRANCH_SUCCESS, branch };
  }
  function failure(error) {
    return { type: adminConstants.ADMIN_ADD_BRANCH_FALIURE, error };
  }
}




function viewBranches() {
  return (dispatch) => {
    dispatch(request());

    adminService.getAllBranches().then(
      (branches) => dispatch(success(branches)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_BRANCH_REQUEST };
  }
  function success(branches) {
    return { type: adminConstants.VIEW_BRANCH_SUCCESS, branches };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_BRANCH_FALIURE, error };
  }
}
function updateBranch(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.update(id).then(
      (branch) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_BRANCH__REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_BRANCH__SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_BRANCH__FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteBranch(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.delete(id).then(
      (branch) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_BRANCH__REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_BRANCH__SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_BRANCH__FAILURE, id, error };
  }
}
