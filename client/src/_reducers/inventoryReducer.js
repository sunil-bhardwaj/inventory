import { invConstants } from "../_constants";
const initialState = {
  inventoryItem: [],
  setUpdated: false,
  inventoryList: [],
  set: { id: "", setname: "", setremark: "" },
  sets: [],
  setItems: [],
  storeItems: [],
  loading: false,
  error: false,
  chartdata: [],
  chartdata2: [],
  reportdata: [],
};
export function inventory(state = initialState, action) {
  switch (action.type) {
    case invConstants.GETALL_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case invConstants.GETALL_SUCCESS:
      return {
        ...state,
        inventoryList: action.inventory,
        error: false,
        loading: false,
      };

    case invConstants.GETALL_FAILURE:
      return { ...state, inventoryList: [], error: true, loading: false };

    case invConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case invConstants.GETBYID_SUCCESS:
      return {
        items: action.inventory,
      };
    case invConstants.GETBYID_FAILURE:
      return {
        error: action.error,
      };

    case invConstants.DELETE_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        inventoryList: state.inventoryList.map((inventory) =>
          inventory.id === action.id
            ? { ...inventory, deleting: true }
            : inventory
        ),
      };
    case invConstants.DELETE_SUCCESS:
      // remove deleted inventory from state
      return {
        inventoryList: state.inventoryList.filter(
          (inventory) => inventory.id !== action.id
        ),
      };
    case invConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        inventoryList: state.inventoryList.map((inventory) => {
          if (inventory.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { deleting, ...userCopy } = inventory;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return inventory;
        }),
      };
    case invConstants.UPDATE_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        inventoryList: state.inventoryList.map((inventory) =>
          inventory.id === action.id
            ? { ...inventory, updating: true }
            : inventory
        ),
      };
    case invConstants.UPDATE_SUCCESS:
      // update inventory from state
      return {
        inventoryList: state.inventoryList.filter(
          (inventory) => inventory.id !== action.id
        ),
      };
    case invConstants.UPDATE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        inventoryList: state.inventoryList.map((inventory) => {
          if (inventory.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...inventoryCopy } = inventory;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...inventoryCopy, updateError: action.error };
          }

          return inventory;
        }),
      };
    case invConstants.REQUEST_SET_ITEMS:
      return { ...state, error: false, loading: true };
    case invConstants.REQUEST_SET_ITEMS_SUCCESS:
      return { ...state, setItems: action.set, error: false, loading: false };

    case invConstants.REQUEST_SET_ITEMS_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.GETALL_STORE_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.GETALL_STORE_SUCCESS:
      return {
        ...state,
        storeItems: action.store,
        error: false,
        loading: false,
      };

    case invConstants.GETALL_STORE_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.REQUEST_ALL_SETS:
      return { ...state, error: false, loading: true };
    case invConstants.REQUEST_ALL_SETS_SUCCESS:
      return { ...state, sets: action.sets, error: false, loading: false };
    case invConstants.REQUEST_ALL_SETS_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.ADD_SET_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.ADD_SET_SUCCESS:
      return { ...state, set: action.set, error: false, loading: false };
    case invConstants.ADD_SET_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.ADD_SET_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.ADD_SET_ITEM_SUCCESS:
      return { ...state, error: false, loading: false };
    case invConstants.ADD_SET_ITEM_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.REMOVE_SET_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.REMOVE_SET_ITEM_SUCCESS:
      return { ...state, error: false, loading: false };
    case invConstants.REMOVE_SET_ITEM_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.TRANSFER_SET_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.TRANSFER_SET_SUCCESS:
      return { ...state, error: false, loading: false };
    case invConstants.TRANSFER_SET_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.SAVE_SET_TO_STORE_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.SAVE_SET_TO_STORE_SCUCESS:
      return { ...state, error: false, loading: false };
    case invConstants.SAVE_SET_TO_STORE_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.RELEASE_ALL_SET_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.RELEASE_ALL_SET_ITEM_SUCCESS:
      return { ...state, error: false, loading: false };
    case invConstants.RELEASE_ALL_SET_ITEM_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.ALLOCATE_SET_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.ALLOCATE_SET_SCUCESS:
      return { ...state, error: false, loading: false };
    case invConstants.ALLOCATE_SET_FALIURE:
      return { ...state, error: true, loading: false };

    case invConstants.GET_SET_BYID_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.GET_SET_BYID_SUCCESS:
      return { ...state, set: action.set, error: false, loading: false };
    case invConstants.GET_SET_BYID_FAILURE:
      return { ...state, error: true, loading: false };
    /////////////////////////////////
    case invConstants.GET_BAR_CHART_DATA_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.GET_BAR_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartdata: action.chartdata,
        error: false,
        loading: false,
      };

    case invConstants.GET_BAR_CHART_DATA_FALIURE:
      return { ...state, error: true, loading: false };
    //////////////////////////////////////

    case invConstants.ADD_INVENTORY_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.ADD_INVENTORY_ITEM_SUCCESS:
      return { ...state, inventoryItem: action.inventoryItem, error: false, loading: false };
    case invConstants.ADD_INVENTORY_ITEM_FALIURE:
      return { ...state, error: true, loading: false };

    /////////////////////////////////
    case invConstants.GETALL_INVENTORY_REPORT_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.GETALL_INVENTORY_REPORT_SUCCESS:
      return {
        ...state,
        reportdata: action.report,
        error: false,
        loading: false,
      };

    case invConstants.GETALL_INVENTORY_REPORT_FALIURE:
      return { ...state, error: true, loading: false };
    //////////////////////////////////////

    case invConstants.GET_BAR_CHART_DATA2_REQUEST:
      return { ...state, error: false, loading: true };
    case invConstants.GET_BAR_CHART_DATA2_SUCCESS:
      return {
        ...state,
        chartdata2: action.chartdata2,
        error: false,
        loading: false,
      };

    case invConstants.GET_BAR_CHART_DATA2_FALIURE:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}
