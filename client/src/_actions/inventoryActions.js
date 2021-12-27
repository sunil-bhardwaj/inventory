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
  moveSetToStore,
  allocateSetFromStore,
  addNewInventoryItem,
  getBarChartData,
  getBarChartData2,
  getAllInventoryReport,
};
function getBarChartData() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getBarChartData().then(
      (chartdata) => dispatch(success(chartdata)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GET_BAR_CHART_DATA_REQUEST };
  }
  function success(chartdata) {
    return { type: invConstants.GET_BAR_CHART_DATA_SUCCESS, chartdata };
  }
  function failure(error) {
    return { type: invConstants.GET_BAR_CHART_DATA_FALIURE, error };
  }
}
function getBarChartData2() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getBarChartData2().then(
      (chartdata2) => dispatch(success(chartdata2)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GET_BAR_CHART_DATA2_REQUEST };
  }
  function success(chartdata2) {
    return { type: invConstants.GET_BAR_CHART_DATA2_SUCCESS, chartdata2 };
  }
  function failure(error) {
    return { type: invConstants.GET_BAR_CHART_DATA2_FALIURE, error };
  }
}

function getAllInventoryReport() {
  return (dispatch) => {
    dispatch(request());

    inventoryService.getAllInventoryReport().then(
      (report) => dispatch(success(report)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.GETALL_INVENTORY_REPORT_REQUEST };
  }
  function success(report) {
    return { type: invConstants.GETALL_INVENTORY_REPORT_SUCCESS, report };
  }
  function failure(error) {
    return { type: invConstants.GETALL_INVENTORY_REPORT_FALIURE, error };
  }
}
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
   const { action } = { action: { action: "/additemtoset" } };
  return (dispatch) => {
    dispatch(request());

    inventoryService.addItemToSet(itemId,setId).then(
      (setIds) =>{ 
       dispatch(success(setIds))
      
       dispatch(inventoryActions.getStoreInventory())
       
       dispatch(inventoryActions.getSetItems(setId, action));
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

function releaseAllSetItems(setId,from) {
  const { action } = { action: { action: "/releaseallsetitems" } };
  
  return (dispatch) => {
    dispatch(request())

    inventoryService.releaseAllSetItems(setId).then(
      (setIds) => {
        dispatch(success(setIds));
        if (from.action === "/releaseallitems")
          dispatch(inventoryActions.getStoreInventory());
        if (from.action === '/deleteset'){
          dispatch(inventoryActions.deleteSet(setId));
          
          
        }
        dispatch(inventoryActions.getAllSets());  
        dispatch(inventoryActions.getSetItems(setId,action));
      },
      (error) => dispatch(failure(error.toString()))
    )
  }

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
   const { action } = { action: { action: "/transferset" } };
  return (dispatch) => {
    dispatch(request());

    inventoryService.transferSet(sidebarItems, oldUserId, newUserId).then(
      (itemIds) => {
        dispatch(success(itemIds));

        dispatch(inventoryActions.getStoreInventory());

        dispatch(inventoryActions.getSetItems(oldUserId,action));
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
function allocateSetFromStore(oldsetid, items, newsetid, newsetname,from) {
  console.log(newsetid, items, oldsetid,newsetname, from)

  return (dispatch) => {
    dispatch(request());

    inventoryService
      .allocateSetFromStore(newsetid, items, oldsetid, newsetname)
      .then(
        (set) => {
          dispatch(success(set));
          if (from === "/allocateset") dispatch(inventoryActions.getAllSets());
          //dispatch(inventoryActions.getStoreInventory());

          //dispatch(inventoryActions.getSetItems(set));
        },
        (error) => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: invConstants.ALLOCATE_SET_REQUEST };
  }
  function success(set) {
    return { type: invConstants.ALLOCATE_SET_SCUCESS, set };
  }
  function failure(error) {
    return { type: invConstants.ALLOCATE_SET_FALIURE, error };
  }
}
function moveSetToStore(setid,items,from) {
  
  
  return (dispatch) => {
    dispatch(request());
    
    inventoryService.moveSetToStore(setid, items).then(
      (set) => {
        dispatch(success(set));
        if(from.action === '/movesettostore')
          dispatch(inventoryActions.getAllSets());
        //dispatch(inventoryActions.getStoreInventory());

        //dispatch(inventoryActions.getSetItems(set));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.SAVE_SET_TO_STORE_REQUEST };
  }
  function success(set) {
    return { type: invConstants.SAVE_SET_TO_STORE_SCUCESS, set };
  }
  function failure(error) {
    return { type: invConstants.SAVE_SET_TO_STORE_FALIURE, error };
  }
}
function removeItemFromSet(itemId, setId) {
   const { action } = { action: { action: "/removeitemfromset" } };
  return (dispatch) => {
    dispatch(request());

    inventoryService.removeItemFromSet(itemId).then(
      (itemIds) => {
        dispatch(success(itemIds));

        dispatch(inventoryActions.getStoreInventory());

        dispatch(inventoryActions.getSetItems(setId,action));
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


function getSetItems(setid,from) {
  
 console.log(setid,from)
  return (dispatch) => {
    dispatch(request());

    inventoryService.getSetItems(setid).then(
      (items) => {
        
        dispatch(success(items))
        if(from.action === '/movesettostore')
        {
          dispatch(inventoryActions.moveSetToStore(setid,items,from))
        }
        if (from.action === "/allocateset") {
          dispatch(
            inventoryActions.allocateSetFromStore(
              setid,
              items,
              from.payload.newsetid,
              from.payload.newsetname,
              from.action
            )
          );
        }
      },
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

function addNewInventoryItem(inventoryItem,warranty_ends_on, from,date_of_purchase) {
  return (dispatch) => {
    dispatch(request());

    inventoryService.addNewInventoryItem(inventoryItem,warranty_ends_on, date_of_purchase).then(
      (inventoryItem) => {
        dispatch(success(inventoryItem));
        dispatch(inventoryActions.getAllInventory());
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: invConstants.ADD_INVENTORY_ITEM_REQUEST };
  }
  function success(inventoryItem) {
    return { type: invConstants.ADD_INVENTORY_ITEM_SUCCESS, inventoryItem };
  }
  function failure(error) {
    return { type: invConstants.ADD_INVENTORY_ITEM_FALIURE, error };
  }
}


function _deleteSet(setid) {
  return (dispatch) => {
    dispatch(request(setid));

    inventoryService.deleteSet(setid).then(
      (set) => dispatch(success(setid)),
      (error) => dispatch(failure(setid, error.toString()))
    );
  };

  function request(setid) {
    return { type: invConstants.DELETE_SET_REQUEST, setid };
  }
  function success(setid) {
    return { type: invConstants.DELETE_SET_SUCCESS, setid };
  }
  function failure(setid, error) {
    return { type: invConstants.DELETE_SET_FAILURE, setid, error };
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
