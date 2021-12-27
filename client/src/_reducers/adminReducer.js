import { adminConstants } from "../_constants";
const initialState = {
 
  branchList: [],
  branch:'',
  designation:'',
  brandList:[],
  brand:"",
  sourceList:[],
  source:"",
  designationList: [],
  loc:"",
  locationList:[],
  item:"",
  itemList:[],
  itemtype:"",
  itemtypeList:[],
};
export function admin(state = initialState, action) {
  switch (action.type) {
    //////////////BRANCH///////////////////
    //VIEW BRANCH/////////////////////////////////
    case adminConstants.VIEW_BRANCH_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_BRANCH_SUCCESS:
      return {
        ...state,
        branchList: action.branches,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_BRANCH_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD BRANCH/////////////////////////////////
    case adminConstants.ADD_BRANCH_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_BRANCH_SUCCESS:
      return {
        ...state,
        branch: action.branch,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_BRANCH_FALIURE:
      return { ...state, error: true, loading: false };
    //UPDATE BRANCH/////////////////////////////////
    case adminConstants.UPDATE_BRANCH_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        branchList: state.branchList.map((branch) =>
          branch.id === action.id ? { ...branch, updating: true } : branch
        ),
      };
    case adminConstants.UPDATE_BRANCH_SUCCESS:
      // update inventory from state
      return {
        branchList: state.branchList.filter(
          (branch) => branch.id !== action.id
        ),
      };
    case adminConstants.UPDATE_BRANCH_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        branchList: state.branchList.map((branch) => {
          if (branch.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...branchCopy } = branch;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...branchCopy, updateError: action.error };
          }

          return branch;
        }),
      };
    //DELETE BRANCH/////////////////////////////////
    case adminConstants.DELETE_BRANCH_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        branchList: state.branchList.map((branch) =>
          branch.id === action.id ? { ...branch, deleting: true } : branch
        ),
      };
    case adminConstants.DELETE_BRANCH_SUCCESS:
      // remove deleted user from state
      return {
        branchList: state.branchList.filter(
          (branch) => branch.id !== action.id
        ),
      };
    case adminConstants.DELETE_BRANCH_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        branchList: state.branchList.map((branch) => {
          if (branch.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = branch;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return branch;
        }),
      };
    //////////////LOCATION///////////////////
    //VIEW LOCATION/////////////////////////////////
    case adminConstants.VIEW_LOCATION_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_LOCATION_SUCCESS:
      return {
        ...state,
        locationList: action.locations,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_LOCATION_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD LOCATION/////////////////////////////////
    case adminConstants.ADD_LOCATION_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loc: action.loc,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_LOCATION_FALIURE:
      return { ...state, error: true, loading: false };
    //UPDATE LOCATION/////////////////////////////////
    case adminConstants.UPDATE_LOCATION_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        locationList: state.locationList.map((loc) =>
          loc.id === action.id ? { ...loc, updating: true } : loc
        ),
      };
    case adminConstants.UPDATE_LOCATION_SUCCESS:
      // update inventory from state
      return {
        locationList: state.locationList.filter(
          (loc) => loc.id !== action.id
        ),
      };
    case adminConstants.UPDATE_LOCATION_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        locationList: state.locationList.map((loc) => {
          if (loc.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...locCopy } = loc;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...locCopy, updateError: action.error };
          }

          return loc;
        }),
      };
    //DELETE LOCATION/////////////////////////////////
    case adminConstants.DELETE_LOCATION_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        locationList: state.locationList.map((loc) =>
          loc.id === action.id ? { ...loc, deleting: true } : loc
        ),
      };
    case adminConstants.DELETE_LOCATION_SUCCESS:
      // remove deleted user from state
      return {
        locationList: state.locationList.filter(
          (loc) => loc.id !== action.id
        ),
      };
    case adminConstants.DELETE_LOCATION_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        locationList: state.locationList.map((loc) => {
          if (loc.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...locCopy } = loc;
            // return copy of user with 'deleteError:[error]' property
            return { ...locCopy, deleteError: action.error };
          }

          return loc;
        }),
      };
    //////////////ITEM///////////////////
    //VIEW ITEM/////////////////////////////////
    case adminConstants.VIEW_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_ITEM_SUCCESS:
      return {
        ...state,
        itemList: action.items,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_ITEM_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD ITEM/////////////////////////////////
    case adminConstants.ADD_ITEM_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_ITEM_SUCCESS:
      return {
        ...state,
        item: action.item,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_ITEM_FALIURE:
      return { ...state, error: true, loading: false };
    //UPDATE ITEM/////////////////////////////////
    case adminConstants.UPDATE_ITEM_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        itemList: state.itemList.map((item) =>
          item.id === action.id ? { ...item, updating: true } : item
        ),
      };
    case adminConstants.UPDATE_ITEM_SUCCESS:
      // update inventory from state
      return {
        itemList: state.itemList.filter((item) => item.id !== action.id),
      };
    case adminConstants.UPDATE_ITEM_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        itemList: state.itemList.map((item) => {
          if (item.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...itemCopy } = item;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...itemCopy, updateError: action.error };
          }

          return item;
        }),
      };
    //DELETE ITEM/////////////////////////////////
    case adminConstants.DELETE_ITEM_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        itemList: state.itemList.map((item) =>
          item.id === action.id ? { ...item, deleting: true } : item
        ),
      };
    case adminConstants.DELETE_ITEM_SUCCESS:
      // remove deleted user from state
      return {
        itemList: state.itemList.filter((item) => item.id !== action.id),
      };
    case adminConstants.DELETE_ITEM_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        itemList: state.itemList.map((item) => {
          if (item.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of user with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        }),
      };
    //////////////ITEMTYPE///////////////////
    //VIEW ITEMTYPE/////////////////////////////////
    case adminConstants.VIEW_ITEMTYPE_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_ITEMTYPE_SUCCESS:
      return {
        ...state,
        itemtypeList: action.itemtypes,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_ITEMTYPE_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD ITEMTYPE/////////////////////////////////
    case adminConstants.ADD_ITEMTYPE_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_ITEMTYPE_SUCCESS:
      return {
        ...state,
        itemtype: action.itemtype,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_ITEMTYPE_FALIURE:
      return { ...state, error: true, loading: false };
    //UPDATE ITEMTYPE/////////////////////////////////
    case adminConstants.UPDATE_ITEMTYPE_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        itemtypeList: state.itemtypeList.map((itemtype) =>
          itemtype.id === action.id ? { ...itemtype, updating: true } : itemtype
        ),
      };
    case adminConstants.UPDATE_ITEMTYPE_SUCCESS:
      // update inventory from state
      return {
        itemtypeList: state.itemtypeList.filter((itemtype) => itemtype.id !== action.id),
      };
    case adminConstants.UPDATE_ITEMTYPE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        itemtypeList: state.itemtypeList.map((itemtype) => {
          if (itemtype.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...itemtypeCopy } = itemtype;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...itemtypeCopy, updateError: action.error };
          }

          return itemtype;
        }),
      };
    //DELETE ITEMTYPE/////////////////////////////////
    case adminConstants.DELETE_ITEMTYPE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        itemtypeList: state.itemtypeList.map((itemtype) =>
          itemtype.id === action.id ? { ...itemtype, deleting: true } : itemtype
        ),
      };
    case adminConstants.DELETE_ITEMTYPE_SUCCESS:
      // remove deleted user from state
      return {
        itemtypeList: state.itemtypeList.filter((itemtype) => itemtype.id !== action.id),
      };
    case adminConstants.DELETE_ITEMTYPE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        itemtypeList: state.itemtypeList.map((itemtype) => {
          if (itemtype.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...itemtypeCopy } = itemtype;
            // return copy of user with 'deleteError:[error]' property
            return { ...itemtypeCopy, deleteError: action.error };
          }

          return itemtype;
        }),
      };
    //////////////DESIGNATION///////////////////
    //VIEW DESIGNATION/////////////////////////////////
    case adminConstants.VIEW_DESIGNATION_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_DESIGNATION_SUCCESS:
      return {
        ...state,
        designationList: action.designations,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_DESIGNATION_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD DESIGNATION/////////////////////////////////
    case adminConstants.ADD_DESIGNATION_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_DESIGNATION_SUCCESS:
      return {
        ...state,
        designation: action.designation,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_DESIGNATION_FALIURE:
      return { ...state, error: true, loading: false };
    //UPDATE DESIGNATION/////////////////////////////////
    case adminConstants.UPDATE_DESIGNATION_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        designationList: state.designationList.map((designation) =>
          designation.id === action.id
            ? { ...designation, updating: true }
            : designation
        ),
      };
    case adminConstants.UPDATE_DESIGNATION_SUCCESS:
      // update inventory from state
      return {
        designationList: state.designationList.filter(
          (designation) => designation.id !== action.id
        ),
      };
    case adminConstants.UPDATE_DESIGNATION_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        designationList: state.designationList.map((designation) => {
          if (designation.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...branchCopy } = designation;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...branchCopy, updateError: action.error };
          }

          return designation;
        }),
      };
    //////////////BRAND///////////////////
    //VIEW BRAND/////////////////////////////////
    case adminConstants.VIEW_BRAND_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_BRAND_SUCCESS:
      return {
        ...state,
        brandList: action.brands,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_BRAND_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD BRAND/////////////////////////////////
    case adminConstants.ADD_BRAND_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.brand,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_BRAND_FALIURE:
      return { ...state, error: true, loading: false };
    //////////////SOURCE///////////////////
    //VIEW SOURCE/////////////////////////////////
    case adminConstants.VIEW_SOURCE_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_SOURCE_SUCCESS:
      return {
        ...state,
        sourceList: action.sources,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_SOURCE_FALIURE:
      return { ...state, error: true, loading: false };
    //ADD SOURCE/////////////////////////////////
    case adminConstants.ADD_SOURCE_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_SOURCE_SUCCESS:
      return {
        ...state,
        source: action.source,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_SOURCE_FALIURE:
      return { ...state, error: true, loading: false };

    default:
      return state;
  }
}
