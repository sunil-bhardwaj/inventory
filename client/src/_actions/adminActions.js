import { adminConstants } from "../_constants";
import { adminService } from "../_services";
import { alertActions } from "./";

export const adminActions = {
  addNewBranch,
  updateBranch,
  viewBranches,
  deleteBranch: _deleteBranch,
  addNewDesignation,
  updateDesignation,
  viewAllDesignations,
  deleteDesignation: _deleteDesignation,
};

function addNewBranch(branch, from) {
  return (dispatch) => {
    dispatch(request({ branch }));

    adminService.addNewBranch(branch).then(
      (branch) => {
        dispatch(success(branch));
        dispatch(adminActions.viewBranches())
        // history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(branch) {
    return { type: adminConstants.ADD_BRANCH_REQUEST, branch };
  }
  function success(branch) {
    return { type: adminConstants.ADD_BRANCH_SUCCESS, branch };
  }
  function failure(error) {
    return { type: adminConstants.ADD_BRANCH_FALIURE, error };
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
function addNewDesignation(designation, from) {
  return (dispatch) => {
    dispatch(request());

    adminService.addNewDesignation(designation).then(
      (designation) => {
        dispatch(success(designation));
         dispatch(adminActions.viewAllDesignations())
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_DESIGNATION_REQUEST  };
  }
  function success(designation) {
    return { type: adminConstants.ADD_DESIGNATION_SUCCESS, designation };
  }
  function failure(error) {
    return { type: adminConstants.ADD_DESIGNATION_FALIURE, error };
  }
}

function viewAllDesignations() {
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllDesignations().then(
      (designations) => dispatch(success(designations)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_DESIGNATION_REQUEST };
  }
  function success(designations) {
    return { type: adminConstants.VIEW_DESIGNATION_SUCCESS, designations };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_DESIGNATION_FALIURE, error };
  }
}
function updateDesignation(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.updateDesignation(id).then(
      (designation) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_DESIGNATION__REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_DESIGNATION__SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_DESIGNATION__FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteDesignation(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.delete(id).then(
      (designation) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_DESIGNATION__REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_DESIGNATION__SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_DESIGNATION__FAILURE, id, error };
  }
}
