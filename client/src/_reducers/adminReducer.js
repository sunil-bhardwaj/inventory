import { adminConstants } from "../_constants";
const initialState = {
  branchData: [],
 
};
export function admin(state = initialState, action) {
  switch (action.type) {
    case adminConstants.VIEW_BRANCH_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.VIEW_BRANCH_SUCCESS:
      return {
        ...state,
        branchData: action.branches,
        error: false,
        loading: false,
      };

    case adminConstants.VIEW_BRANCH_FAILURE:
      return { ...state, error: true, loading: false };

    case adminConstants.ADD_BRANCH_REQUEST:
      return { ...state, error: false, loading: true };
    case adminConstants.ADD_BRANCH_SUCCESS:
      return {
        ...state,
        branchData: action.branch,
        error: false,
        loading: false,
      };

    case adminConstants.ADD_BRANCH_FAILURE:
      return { ...state, error: true, loading: false };
////////////////////////////////////////////////////////
    case adminConstants.UPDATE_BRANCH_REQUEST:
      // add 'deleting:true' property to inventory being deleted
      return {
        ...state,
        branchData: state.branchData.map((branch) =>
          branch.id === action.id
            ? { ...branch, updating: true }
            : branch
        ),
      };
    case adminConstants.UPDATE_BRANCH_SUCCESS:
      // update inventory from state
      return {
        branchData: state.branchData.filter((branch) => branch.id !== action.id),
      };
    case adminConstants.UPDATE_BRANCH_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to inventory
      return {
        ...state,
        branchData: state.branchData.map((branch) => {
          if (branch.id === action.id) {
            // make copy of inventory without 'deleting:true' property
            const { updating, ...branchCopy } = branch;
            // return copy of inventory with 'deleteError:[error]' property
            return { ...branchCopy, updateError: action.error };
          }

          return branch;
        }),
      };
///////////////////////////////////////////////
    case adminConstants.DELETE_BRANCH_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        branchData: state.branchData.map((branch) =>
          branch.id === action.id ? { ...branch, deleting: true } : branch
        ),
      };
    case adminConstants.DELETE_BRANCH_SUCCESS:
      // remove deleted user from state
      return {
        branchData: state.branchData.filter(
          (branch) => branch.id !== action.id
        ),
      };
    case adminConstants.DELETE_BRANCH_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        branchData: state.branchData.map((branch) => {
          if (branch.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = branch;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return branch;
        }),
      };
    default:
      return state;
  }
}
