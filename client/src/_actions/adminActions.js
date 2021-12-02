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
  addNewSource,
  updateSource,
  viewAllSources,
  deleteSource: _deleteSource,
  addNewBrand,
  updateBrand,
  viewAllBrands,
  deleteBrand: _deleteBrand,
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

///////////////////////////////////////////////////////////

function addNewBrand(brand, from) {
  return (dispatch) => {
    dispatch(request());

    adminService.addNewBrand(brand).then(
      (brand) => {
        dispatch(success(brand));
        dispatch(adminActions.viewAllBrands());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_BRAND_REQUEST };
  }
  function success(brand) {
    return { type: adminConstants.ADD_BRAND_SUCCESS, brand };
  }
  function failure(error) {
    return { type: adminConstants.ADD_BRAND_FALIURE, error };
  }
}

function viewAllBrands() {
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllBrands().then(
      (brands) => dispatch(success(brands)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_BRAND_REQUEST };
  }
  function success(brands) {
    return { type: adminConstants.VIEW_BRAND_SUCCESS, brands };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_BRAND_FALIURE, error };
  }
}
function updateBrand(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.updateBrand(id).then(
      (brand) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_BRAND_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_BRAND_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_BRAND_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteBrand(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.deleteBrand(id).then(
      (brand) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_BRAND_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_BRAND_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_BRAND_FAILURE, id, error };
  }
}

///////////////////////////////////////////

function addNewSource(source, from) {
  return (dispatch) => {
    dispatch(request());

    adminService.addNewSource(source).then(
      (source) => {
        dispatch(success(source));
        dispatch(adminActions.viewAllSources());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_SOURCE_REQUEST };
  }
  function success(source) {
    return { type: adminConstants.ADD_SOURCE_SUCCESS, source };
  }
  function failure(error) {
    return { type: adminConstants.ADD_SOURCE_FALIURE, error };
  }
}

function viewAllSources() {
 
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllSources().then(
      (sources) => dispatch(success(sources)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_SOURCE_REQUEST };
  }
  function success(sources) {
    return { type: adminConstants.VIEW_SOURCE_SUCCESS, sources };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_SOURCE_FALIURE, error };
  }
}
function updateSource(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.updateSource(id).then(
      (source) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_SOURCE_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_SOURCE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_SOURCE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteSource(id) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.deleteSource(id).then(
      (source) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_SOURCE_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_SOURCE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_SOURCE_FAILURE, id, error };
  }
}
