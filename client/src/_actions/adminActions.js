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
  addNewLocation,
  viewAllLocations,
  updateLocation,
  deleteLocation: _deleteLocation,
  addNewItem,
  viewAllItems,
  updateItem,
  deleteItem: _deleteItem,
  addNewItemType,
  viewAllItemTypes,
  updateItemType,
  deleteItemType: _deleteItemType,
};

function addNewBranch(branch, from) {
  return (dispatch) => {
    dispatch(request({ branch }));

    adminService.addNewBranch(branch).then(
      (branch) => {
        dispatch(success(branch));
        dispatch(alertActions.success("Branch Added Scucessfully"));
        dispatch(adminActions.viewBranches());
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
      (branches) => {
        dispatch(success(branches));
      },
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
function updateBranch(id, branch) {
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
        dispatch(adminActions.viewBranches());
        dispatch(alertActions.success("Branch Deleted Scucessfully"));
      },
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
        dispatch(adminActions.viewAllDesignations());
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
    return { type: adminConstants.ADD_DESIGNATION_REQUEST };
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
function updateDesignation(id, designation, from) {
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
      },

      (error) => {
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
function updateBrand(brandid, brand, from) {
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
      (brand) => {
        dispatch(success(id));
        dispatch(adminActions.viewAllBrands());
        dispatch(alertActions.success("Brand Updation Scucessfull"));
      },
      (error) => {
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

/////////////////sOURCE/////////////////////

function addNewSource(source, orderdate, from) {
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
      (updatesourceid) => {
        dispatch(success(updatesourceid));
        dispatch(adminActions.viewAllSources());
        dispatch(alertActions.success("Source Updation Scucessfull"));
      },
      (error) => {
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
      (source) => {
        dispatch(success(source.id));
        dispatch(adminActions.viewAllSources());
        dispatch(alertActions.success("Source Deletion Scucessfull"));
      },
      (error) => {
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
/////////////////LOCATIONS/////////////////////

function addNewLocation(location, from) {
  console.log(location);
  return (dispatch) => {
    dispatch(request());

    adminService.addNewLocation(location).then(
      (location) => {
        dispatch(success(location));
        dispatch(adminActions.viewAllLocations());
        dispatch(alertActions.success("Location Addition Scucessfull"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        dispatch(alertActions.error("Eror Adding Location"));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_LOCATION_REQUEST };
  }
  function success(location) {
    return { type: adminConstants.ADD_LOCATION_SUCCESS, location };
  }
  function failure(error) {
    return { type: adminConstants.ADD_LOCATION_FALIURE, error };
  }
}

function viewAllLocations() {
  console.log("here");
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllLocations().then(
      (locations) => dispatch(success(locations)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_LOCATION_REQUEST };
  }
  function success(locations) {
    return { type: adminConstants.VIEW_LOCATION_SUCCESS, locations };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_LOCATION_FALIURE, error };
  }
}
function updateLocation(updatelocationid, location) {
  return (dispatch) => {
    dispatch(request(updatelocationid));

    adminService.updateLocation(updatelocationid, location).then(
      (updatelocationid) => {
        dispatch(success(updatelocationid));
        dispatch(adminActions.viewAllLocations());
        dispatch(alertActions.success("Location Updation Scucessfull"));
      },
      (error) => {
        dispatch(alertActions.error("Location Updation Faliure"));
        dispatch(failure(updatelocationid, error.toString()));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_LOCATION_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_LOCATION_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_LOCATION_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteLocation(location) {
  return (dispatch) => {
    dispatch(request(location.id));

    adminService.deleteLocation(location.id).then(
      (location) => {
        dispatch(success(location.id));
        dispatch(adminActions.viewAllLocations());
        dispatch(alertActions.success("Location Deletion Scucessfull"));
      },
      (error) => {
        dispatch(failure(location.id, error.toString()));
        dispatch(alertActions.error("Error Deleting Location"));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_LOCATION_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_LOCATION_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_LOCATION_FAILURE, id, error };
  }
}
/////////////////ITEMS/////////////////////

function addNewItem(item, from) {
  console.log(item);
  return (dispatch) => {
    dispatch(request());

    adminService.addNewItem(item).then(
      (item) => {
        dispatch(success(item));
        dispatch(adminActions.viewAllItems());
        dispatch(alertActions.success("Item Addition Scucessfull"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        dispatch(alertActions.error("Eror Adding Item"));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_ITEM_REQUEST };
  }
  function success(item) {
    return { type: adminConstants.ADD_ITEM_SUCCESS, item };
  }
  function failure(error) {
    return { type: adminConstants.ADD_ITEM_FALIURE, error };
  }
}

function viewAllItems() {
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllItems().then(
      (items) => dispatch(success(items)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_ITEM_REQUEST };
  }
  function success(items) {
    return { type: adminConstants.VIEW_ITEM_SUCCESS, items };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_ITEM_FALIURE, error };
  }
}
function updateItem(updateitemid, item) {
  return (dispatch) => {
    dispatch(request(updateitemid));

    adminService.updateItem(updateitemid, item).then(
      (updateitemid) => {
        dispatch(success(updateitemid));
        dispatch(adminActions.viewAllItems());
        dispatch(alertActions.success("Item Updation Scucessfull"));
      },
      (error) => {
        dispatch(alertActions.error("Item Updation Faliure"));
        dispatch(failure(updateitemid, error.toString()));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_ITEM_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_ITEM_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_ITEM_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteItem(item) {
  return (dispatch) => {
    dispatch(request(item.id));

    adminService.deleteItem(item.id).then(
      (item) => {
        dispatch(success(item.id));
        dispatch(adminActions.viewAllItems());
        dispatch(alertActions.success("Item Deletion Scucessfull"));
      },
      (error) => {
        dispatch(failure(item.id, error.toString()));
        dispatch(alertActions.error("Error Deleting Item"));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_ITEM_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_ITEM_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_ITEM_FAILURE, id, error };
  }
}
/////////////////ITEM TYPES/////////////////////

function addNewItemType(itemtype, from) {
  console.log(itemtype);
  return (dispatch) => {
    dispatch(request());

    adminService.addNewItemType(itemtype).then(
      (itemtype) => {
        dispatch(success(itemtype));
        dispatch(adminActions.viewAllItemTypes());
        dispatch(alertActions.success("Itemtype Addition Scucessfull"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        dispatch(alertActions.error("Eror Adding Itemtype"));
      }
    );
  };

  function request() {
    return { type: adminConstants.ADD_ITEMTYPE_REQUEST };
  }
  function success(itemtype) {
    return { type: adminConstants.ADD_ITEMTYPE_SUCCESS, itemtype };
  }
  function failure(error) {
    return { type: adminConstants.ADD_ITEMTYPE_FALIURE, error };
  }
}

function viewAllItemTypes() {
  return (dispatch) => {
    dispatch(request());

    adminService.viewAllItemTypes().then(
      (itemtypes) => dispatch(success(itemtypes)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: adminConstants.VIEW_ITEMTYPE_REQUEST };
  }
  function success(itemtypes) {
    return { type: adminConstants.VIEW_ITEMTYPE_SUCCESS, itemtypes };
  }
  function failure(error) {
    return { type: adminConstants.VIEW_ITEMTYPE_FALIURE, error };
  }
}
function updateItemType(updateitemid, itemtype) {
  return (dispatch) => {
    dispatch(request(updateitemid));

    adminService.updateItemType(updateitemid, itemtype).then(
      (updateitemid) => {
        dispatch(success(updateitemid));
        dispatch(adminActions.viewAllItemTypes());
        dispatch(alertActions.success("Itemtype Updation Scucessfull"));
      },
      (error) => {
        dispatch(alertActions.error("Itemtype Updation Faliure"));
        dispatch(failure(updateitemid, error.toString()));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.UPDATE_ITEMTYPE_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.UPDATE_ITEMTYPE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.UPDATE_ITEMTYPE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteItemType(itemtype) {
  return (dispatch) => {
    dispatch(request(itemtype.id));

    adminService.deleteItemType(itemtype.id).then(
      (itemtype) => {
        dispatch(success(itemtype.id));
        dispatch(adminActions.viewAllItemTypes());
        dispatch(alertActions.success("Itemtype Deletion Scucessfull"));
      },
      (error) => {
        dispatch(failure(itemtype.id, error.toString()));
        dispatch(alertActions.error("Error Deleting Itemtype"));
      }
    );
  };

  function request(id) {
    return { type: adminConstants.DELETE_ITEMTYPE_REQUEST, id };
  }
  function success(id) {
    return { type: adminConstants.DELETE_ITEMTYPE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: adminConstants.DELETE_ITEMTYPE_FAILURE, id, error };
  }
}
