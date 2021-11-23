import { invConstants } from "../_constants";
import { inventoryService } from "../_services";


export const inventoryActions = {
  getById,
  update,
  getAllSets,
  getSetById,
  getAllInventory,
  getSetItems,
  updateSet,
  delete: _delete,
  deleteSet: _deleteSet,
  addNewSet,
  getStoreInventory,
  addItemToSet,
  removeItemFromSet,
  releaseAllSetItems,
  transferSet,
};

function getStoreInventory() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getStoreInventory().then(
      (store) => dispatch(success(store)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GETALL_STORE_REQUEST };
  }
  function success(store) {
    return { type: invConstants.GETALL_STORE_SUCCESS, store };
  }
  function failure(error) {
    return { type: invConstants.GETALL_STORE_FALIURE, error };
  }
}

function addItemToSet(itemId,setId) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.addItemToSet(itemId,setId).then(
      (setIds) =>{ 
       dispatch(success(setIds))
      
       dispatch(inventoryActions.getStoreInventory())
       
       dispatch(inventoryActions.getSetItems(setId));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.ADD_SET_ITEM_REQUEST };
  }
  function success(setIds) {
    return { type: invConstants.ADD_SET_ITEM_SUCCESS, setIds };
  }
  function failure(error) {
    return { type: invConstants.ADD_SET_ITEM_FALIURE, error };
  }
}

function releaseAllSetItems(setId) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.releaseAllSetItems(setId).then(
      (setIds) => {
        dispatch(success(setIds));

        dispatch(inventoryActions.getStoreInventory());

        dispatch(inventoryActions.getSetItems(setId));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.RELEASE_ALL_SET_ITEM_REQUEST };
  }
  function success(setIds) {
    return { type: invConstants.RELEASE_ALL_SET_ITEM_SUCCESS, setIds };
  }
  function failure(error) {
    return { type: invConstants.RELEASE_ALL_SET_ITEM_FALIURE, error };
  }
}
function transferSet(sidebarItems,oldUserId,newUserId) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.transferSet(sidebarItems, oldUserId, newUserId).then(
      (itemIds) => {
        dispatch(success(itemIds));

        dispatch(inventoryActions.getStoreInventory());

        dispatch(inventoryActions.getSetItems(oldUserId));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.TRANSFER_SET_REQUEST };
  }
  function success(setIds) {
    return { type: invConstants.TRANSFER_SET_SUCCESS, setIds };
  }
  function failure(error) {
    return { type: invConstants.TRANSFER_SET_FALIURE, error };
  }
}
function removeItemFromSet(itemId, setId) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.removeItemFromSet(itemId).then(
      (itemIds) => {
        dispatch(success(itemIds));

        dispatch(inventoryActions.getStoreInventory());

        dispatch(inventoryActions.getSetItems(setId));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.REMOVE_SET_ITEM_REQUEST };
  }
  function success(setIds) {
    return { type: invConstants.REMOVE_SET_ITEM_SUCCESS, setIds };
  }
  function failure(error) {
    return { type: invConstants.REMOVE_SET_ITEM_FALIURE, error };
  }
}
function getAllInventory() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getAllInventory().then(
      (inventory) => dispatch(success(inventory)),
      (error) => dispatch(failure(error.toString()))
    );
  };



  function request() {
    
    return { type: invConstants.GETALL_REQUEST };
  }
  function success(inventory) {
    
    return { type: invConstants.GETALL_SUCCESS, inventory };
  }
  function failure(error) {
    
    return { type: invConstants.GETALL_FAILURE, error };
  }
}


function getSetItems(setid) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getSetItems(setid).then(
      (set) => dispatch(success(set)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.REQUEST_SET_ITEMS };
  }
  function success(set) {
    return { type: invConstants.REQUEST_SET_ITEMS_SUCCESS, set };
  }
  function failure(error) {
   
    return { type: invConstants.REQUEST_SET_ITEMS_FALIURE, error };
  }
}
function getAllSets() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getAllSets().then(
      (sets) => dispatch(success(sets)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.REQUEST_ALL_SETS };
  }
  function success(sets) {
    return { type: invConstants.REQUEST_ALL_SETS_SUCCESS, sets };
  }
  function failure(error) {
    return { type: invConstants.REQUEST_ALL_SETS_FALIURE, error };
  }
}
function updateSet(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.updateSet(id).then(
      (set) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: invConstants.UPDATE_SET_REQUEST, id };
  }
  function success(id) {
    return { type: invConstants.UPDATE_SET_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: invConstants.UPDATE_SET_FAILURE, id, error };
  }
}
function getSetById(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.getSetById(id).then(
      (set) => dispatch(success(set)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GET_SET_BYID_REQUEST };
  }
  function success(set) {
   
    return { type: invConstants.GET_SET_BYID_SUCCESS, set };
  }
  function failure(error) {
    return { type: invConstants.GET_SET_BYID_FAILURE, error };
  }
}
function addNewSet(set) {
  
  return (dispatch) => {
    dispatch(request());

    inventoryService.addNewSet(set).then(
      (set) => {
       dispatch(success(set))
       dispatch(inventoryActions.getAllSets()) 
      
      },
      (error) => dispatch(failure( error.toString()))
    );
  };

  function request() {
    return { type: invConstants.ADD_SET_REQUEST };
  }
  function success(set) {
    
    return { type: invConstants.ADD_SET_SUCCESS, set };
  }
  function failure( error) {
    return { type: invConstants.ADD_SET_FALIURE, error };
  }
}
function _deleteSet(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.deleteSet(id).then(
      (set) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: invConstants.DELETE_SET_REQUEST, id };
  }
  function success(id) {
    return { type: invConstants.DELETE_SET_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: invConstants.DELETE_SET_FAILURE, id, error };
  }
}


function getById(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.getById(id).then(
      (inventory) => dispatch(success(inventory)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GETBYID_REQUEST };
  }
  function success(inventory) {
    return { type: invConstants.GETBYID_SUCCESS, inventory };
  }
  function failure(error) {
    return { type: invConstants.GETBYID_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.delete(id).then(
      (inventory) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: invConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: invConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: invConstants.DELETE_FAILURE, id, error };
  }
}
function update(id) {
  return (dispatch) => {
    dispatch(request(id));

    inventoryService.update(id).then(
      (inventory) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: invConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: invConstants.UPDATE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: invConstants.UPDATE_FAILURE, id, error };
  }
}
