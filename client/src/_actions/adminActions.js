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
        dispatch(alertActions.success("Branch Added Scucessfully"));
        dispatch(adminActions.viewBranches())
        // history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error("Error Saving Branch"));
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
      (branches) => {dispatch(success(branches))},
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
function updateBranch(id,branch) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.updateBranch(id, branch).then(
      (branch) => {
        dispatch(success(id));
        dispatch(adminActions.viewBranches());
        dispatch(alertActions.success("Branch Updated Scucessfully"));
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        dispatch(alertActions.error("Error Updating Branch"));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_BRANCH_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_BRANCH_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_BRANCH_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteBranch(branch) {
  return (dispatch) => {
    dispatch(request(branch.id));

    adminService.deleteBranch(branch.id).then(
      (id) => {
          dispatch(success(id));
           dispatch(adminActions.viewBranches())
            dispatch(alertActions.success("Branch Deleted Scucessfully"));
      }
     ,
      (error) => {
         dispatch(failure(branch.id, error.toString()));
         dispatch(alertActions.error("Branch Deleted Scucessfully"));
      }
      
     
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_BRANCH_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_BRANCH_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_BRANCH_FAILURE, id, error };
  }
}
function addNewDesignation(designation, from) {
  return (dispatch) => {
    dispatch(request());

    adminService.addNewDesignation(designation).then(
      (designation) => {
        dispatch(success(designation));
         dispatch(adminActions.viewAllDesignations())
         dispatch(alertActions.success("Designation Saved Scucessfully"));
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        dispatch(alertActions.error("Error Saving Designation"));
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
function updateDesignation(id,designation,from) {
  return (dispatch) => {
    dispatch(request(id));

    adminService.updateDesignation(id, designation).then(
      (designation) => {
        dispatch(success(id));
        dispatch(adminActions.viewAllDesignations());
        dispatch(alertActions.success("Designation Updated Scucessfully"));
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        dispatch(alertActions.error("Error Updating Designation"));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_DESIGNATION_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_DESIGNATION_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_DESIGNATION_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteDesignation(designation) {
  return (dispatch) => {
    dispatch(request(designation.id));

    adminService.deleteDesignation(designation.id).then(
      (id) => {
          dispatch(success(id));
          dispatch(adminActions.viewAllDesignations());
          dispatch(alertActions.success("Designation Deleted Scucessfully"));
      }
      
      ,
      (error) =>{
           dispatch(failure(designation.id, error.toString()));
           dispatch(alertActions.error("Error Deleting Designation"));
      }
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
        
        dispatch(alertActions.success("Brand Addition Scucessfull"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
         dispatch(alertActions.success("Error Adding Brand"));
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
function updateBrand(brandid,brand,from) {
  
  return (dispatch) => {
    dispatch(request(brandid));

    adminService.updateBrand(brandid, brand).then(
      (brand) => {
        dispatch(success(brandid));
        dispatch(adminActions.viewAllBrands());
        dispatch(alertActions.success("Brand Updation Scucessfull"));
      },
      (error) => {
        dispatch(failure(brandid, error.toString()));
        dispatch(alertActions.error("Brand Updation Faliure"));
      }
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
      (brand) =>{
        dispatch(success(id));
        dispatch(adminActions.viewAllBrands());
        dispatch(alertActions.success("Brand Updation Scucessfull"));
      } ,
      (error) =>{
        dispatch(failure(id, error.toString()));
        dispatch(alertActions.error("Brand Updation Faliure"));
      } 
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

function addNewSource(source,orderdate, from) {
  console.log(source, orderdate);
  return (dispatch) => {
    dispatch(request());

    adminService.addNewSource(source, orderdate).then(
      (source) => {
        dispatch(success(source));
        dispatch(adminActions.viewAllSources());
        dispatch(alertActions.success("Source Addition Scucessfull"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        dispatch(alertActions.error("Eror Adding Source"));
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
function updateSource(updatesourceid, source, orderdate) {
  return (dispatch) => {
    dispatch(request(updatesourceid));

    adminService.updateSource(updatesourceid, source, orderdate).then(
      (updatesourceid) =>{
         dispatch(success(updatesourceid));
          dispatch(adminActions.viewAllSources());
         dispatch(alertActions.success("Source Updation Scucessfull"));
      } ,
      (error) =>{
        dispatch(alertActions.error("Source Updation Faliure"));
        dispatch(failure(updatesourceid, error.toString()));
      } 
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
function _deleteSource(source) {
  return (dispatch) => {
    dispatch(request(source.id));

    adminService.deleteSource(source.id).then(
      (source) =>{

          dispatch(success(source.id));
           dispatch(adminActions.viewAllSources());
           dispatch(alertActions.success("Source Deletion Scucessfull"));
      } ,
      (error) =>{
          dispatch(failure(source.id, error.toString()));
         dispatch(alertActions.error("Error Deleting Source"));
      } 
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
