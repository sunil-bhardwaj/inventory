export const ADD_INVENTORY = "ADD_INVENTORY";
export const REMOVE_INVENTORY = "REMOVE_INVENTORY";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SHOW_STORE_STOCK = "SHOW_STORE_STOCK";
export const SHOW_TOTAL_INVENTORY = "SHOW_TOTAL_INVENTORY";
export const SHOW_USERS = "SHOW_USERS";
//export const alertConstants = "ALERT_CONSTANTS"
export const alertConstants = {
  SUCCESS: "ALERT_SUCCESS",
  ERROR: "ALERT_ERROR",
  CLEAR: "ALERT_CLEAR",
  LOADING: "ALERT_LOADING",
};
export const userConstants = {
UPDATE_USER_REQUEST:'UPDATE_USER_REQUEST',
UPDATE_USER_SUCCESS:'UPDATE_USER_SUCCESS',
UPDATE_USER_FAILURE:'UPDATE_USER_FAILURE',



  REGISTER_REQUEST: "USERS_REGISTER_REQUEST",
  REGISTER_SUCCESS: "USERS_REGISTER_SUCCESS",
  REGISTER_FAILURE: "USERS_REGISTER_FAILURE",

  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

  LOGOUT: "USERS_LOGOUT",

  GETALL_REQUEST: "USERS_GETALL_REQUEST",
  GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
  GETALL_FAILURE: "USERS_GETALL_FAILURE",

  GET_BY_ID_REQUEST: "USERS_GET_BY_ID_REQUEST",
  GET_BY_ID_SUCCESS: "USERS_GET_BY_ID_SUCCESS",
  GET_BY_ID_FAILURE: "USERS_GET_BY_ID_FAILURE",

  DELETE_REQUEST: "USERS_DELETE_REQUEST",
  DELETE_SUCCESS: "USERS_DELETE_SUCCESS",
  DELETE_FAILURE: "USERS_DELETE_FAILURE",

 

  CREATE_USER_REQUEST: "USERS_CREATE_REQUEST",
  CREATE_USER_SUCCESS: "USERS_CREATE_SUCCESS",
  CREATE_USER_FAILURE: "USERS_CREATE_FAILURE",
};

export const adminConstants = {
  // Designation, Source, Brand, Branch

  VIEW_BRANCH_REQUEST: "ADMIN_VIEW_BRANCHES_REQUEST",
  VIEW_BRANCH_SUCCESS: "ADMIN_VIEW_BRANCHES_SUCCESS",
  VIEW_BRANCH_FALIURE: "ADMIN_VIEW_BRANCHES_FALIURE",

  ADD_BRANCH_REQUEST: "ADMIN_ADD_BRANCH_REQUEST",
  ADD_BRANCH_SUCCESS: "ADMIN_ADD_BRANCH_SUCCESS",
  ADD_BRANCH_FALIURE: "ADMIN_ADD_BRANCH_FALIURE",

  DELETE_BRANCH_REQUEST: "ADMIN_DELETE_BRANCH_REQUEST",
  DELETE_BRANCH_SUCCESS: "ADMIN_DELETE_BRANCH_SUCCESS",
  DELETE_BRANCH_FAILURE: "ADMIN_DELETE_BRANCH_FAILURE",

  UPDATE_BRANCH_REQUEST: "ADMIN_UPDATE_BRANCH_REQUEST",
  UPDATE_BRANCH_SUCCESS: "ADMIN_UPDATE_BRANCH_SUCCESS",
  UPDATE_BRANCH_FAILURE: "ADMIN_UPDATE_BRANCH_FAILURE",

  VIEW_DESIGNATION_REQUEST: "ADMIN_VIEW_DESIGNATION__REQUEST",
  VIEW_DESIGNATION_SUCCESS: "ADMIN_VIEW_DESIGNATION__SUCCESS",
  VIEW_DESIGNATION_FALIURE: "ADMIN_VIEW_DESIGNATION__FALIURE",

  ADD_DESIGNATION_REQUEST: "ADMIN_ADD_DESIGNATION_REQUEST",
  ADD_DESIGNATION_SUCCESS: "ADMIN_ADD_DESIGNATION_SUCCESS",
  ADD_DESIGNATION_FALIURE: "ADMIN_ADD_DESIGNATION_FALIURE",

  DELETE_DESIGNATION__REQUEST: "ADMIN_DELETE_DESIGNATION_REQUEST",
  DELETE_DESIGNATION__SUCCESS: "ADMIN_DELETE_DESIGNATION_SUCCESS",
  DELETE_DESIGNATION__FAILURE: "ADMIN_DELETE_DESIGNATION_FAILURE",

  UPDATE_DESIGNATION_REQUEST: "ADMIN_UPDATE_DESIGNATION_REQUEST",
  UPDATE_DESIGNATION_SUCCESS: "ADMIN_UPDATE_DESIGNATION_SUCCESS",
  UPDATE_DESIGNATION_FAILURE: "ADMIN_UPDATE_BDESIGNATION_FAILURE",

  VIEW_SOURCE_REQUEST: "ADMIN_VIEW_SOURCE_REQUEST",
  VIEW_SOURCE_SUCCESS: "ADMIN_VIEW_SOURCE_SUCCESS",
  VIEW_SOURCE_FALIURE: "ADMIN_VIEW_SOURCE_FALIURE",

  ADD_SOURCE_REQUEST: "ADMIN_ADD_SOURCE_REQUEST",
  ADD_SOURCE_SUCCESS: "ADMIN_ADD_SOURCE_SUCCESS",
  ADD_SOURCE_FALIURE: "ADMIN_ADD_SOURCE_FALIURE",

  DELETE_SOURCE_REQUEST: "ADMIN_DELETE_SOURCE_REQUEST",
  DELETE_SOURCE_SUCCESS: "ADMIN_DELETE_SOURCE_SUCCESS",
  DELETE_SOURCE_FAILURE: "ADMIN_DELETE_SOURCE_FAILURE",

  UPDATE_SOURCE_REQUEST: "ADMIN_UPDATE_SOURCE_REQUEST",
  UPDATE_SOURCE_SUCCESS: "ADMIN_UPDATE_SOURCE_SUCCESS",
  UPDATE_SOURCE_FAILURE: "ADMIN_UPDATE_SOURCE_FAILURE",

  VIEW_BRAND_REQUEST: "ADMIN_VIEW_BRAND_REQUEST",
  VIEW_BRAND_SUCCESS: "ADMIN_VIEW_BRAND_SUCCESS",
  VIEW_BRAND_FALIURE: "ADMIN_VIEW_BRAND_FALIURE",

  ADD_BRAND_REQUEST: "ADMIN_ADD_BRAND_REQUEST",
  ADD_BRAND_SUCCESS: "ADMIN_ADD_BRAND_SUCCESS",
  ADD_BRAND_FALIURE: "ADMIN_ADD_BRAND_FALIURE",

  DELETE_BRAND_REQUEST: "ADMIN_DELETE_BRAND_REQUEST",
  DELETE_BRAND_SUCCESS: "ADMIN_DELETE_BRAND_SUCCESS",
  DELETE_BRAND_FAILURE: "ADMIN_DELETE_BRAND_FAILURE",

  UPDATE_BRAND_REQUEST: "ADMIN_UPDATE_BRAND_REQUEST",
  UPDATE_BRAND_SUCCESS: "ADMIN_UPDATE_BRAND_SUCCESS",
  UPDATE_BRAND_FAILURE: "ADMIN_UPDATE_BRAND_FAILURE",

 
};
export const invConstants = {

GETALL_INVENTORY_REPORT_REQUEST:'GETALL_INVENTORY_REPORT_REQUEST',
GETALL_INVENTORY_REPORT_SUCCESS:'GETALL_INVENTORY_REPORT_SUCCESS',
GETALL_INVENTORY_REPORT_FALIURE:'GETALL_INVENTORY_REPORT_FALIURE',


  GETALL_REQUEST: "INVENTORY_GET_REQUEST",
  GETALL_SUCCESS: "INVENTORY_GET_SUCCESS",
  GETALL_FAILURE: "INVENTORY_GET_FAILURE",

  GETBYID_REQUEST: "INVENTORY_GET_BY_ID_REQUEST",
  GETBYID_SUCCESS: "INVENTORY_GET_BY_ID_SUCCESS",
  GETBYID_FAILURE: "INVENTORY_GET_BY_ID_FAILURE",

  DELETE_REQUEST: "INVENTORY_DELETE_REQUEST",
  DELETE_SUCCESS: "INVENTORY_DELETE_SUCCESS",
  DELETE_FAILURE: "INVENTORY_DELETE_FAILURE",

  UPDATE_REQUEST: "INVENTORY_UPDATE_REQUEST",
  UPDATE_SUCCESS: "INVENTORY_UPDATE_SUCCESS",
  UPDATE_FAILURE: "INVENTORY_UPDATE_FAILURE",

  GETALL_STORE_REQUEST: "INVENTORY_GETALL_STORE_REQUEST",
  GETALL_STORE_SUCCESS: "INVENTORY_GETALL_STORE_SUCCESS",
  GETALL_STORE_FALIURE: "INVENTORY_GETALL_STORE_FALIURE",

  INVENTORY_ALLOT_REQUEST: "INVENTORY_ALLOT_REQUEST",
  INVENTORY_ALLOT_SUCCESS: "INVENTORY_ALLOT_SUCCESS",
  INVENTORY_ALLOT_FALIURE: "INVENTORY_ALLOT_FALIURE",

  INVENTORY_RETURN_REQUEST: "INVENTORY_RETURN_REQUEST",
  INVENTORY_RETURN_SUCCESS: "INVENTORY_RETURN_SUCCESS",
  INVENTORY_RETURN_FALIURE: "INVENTORY_RETURN_FALIURE",

  REQUEST_SET_ITEMS: "INVENTORY_REQUEST_SET_ITEMS",
  REQUEST_SET_ITEMS_SUCCESS: "INVENTORY_REQUEST_SET_ITEMS_SUCCESS",
  REQUEST_SET_ITEMS_FALIURE: "INVENTORY_REQUEST_SET_ITEMS_FALIURE",

  REQUEST_ALL_SETS: "REQUEST_ALL_SETS",
  REQUEST_ALL_SETS_SUCCESS: "REQUEST_ALL_SETS_SUCCESS",
  REQUEST_ALL_SETS_FALIURE: "REQUEST_ALL_SETS_FALIURE",

  ADD_SET_REQUEST: "REQUEST_ADD_SET",
  ADD_SET_SUCCESS: "REQUEST_ADD_SET_SUCCESS",
  ADD_SET_FALIURE: "REQUEST_ADD_SET_FALIURE",

  GET_SET_BYID_REQUEST: "GET_SET_BYID_REQUEST",
  GET_SET_BYID_SUCCESS: "GET_SET_BYID_SUCCESS",
  GET_SET_BYID_FAILURE: "GET_SET_BYID_FAILURE",

  ADD_SET_ITEM_REQUEST: "ADD_SET_ITEM_REQUEST",
  ADD_SET_ITEM_SUCCESS: "ADD_SET_ITEM_SUCCESS",
  ADD_SET_ITEM_FALIURE: "ADD_SET_ITEM_FALIURE",

  REMOVE_SET_ITEM_REQUEST: "REMOVE_SET_ITEM_REQUEST",
  REMOVE_SET_ITEM_SUCCESS: "REMOVE_SET_ITEM_SUCCESS",
  REMOVE_SET_ITEM_FALIURE: "REMOVE_SET_ITEM_FALIURE",

  RELEASE_ALL_SET_ITEM_REQUEST: "RELEASE_ALL_SET_ITEM_REQUEST",
  RELEASE_ALL_SET_ITEM_SUCCESS: "RELEASE_ALL_SET_ITEM_SUCCESS",
  RELEASE_ALL_SET_ITEM_FALIURE: "RELEASE_ALL_SET_ITEM_FALIURE",

  TRANSFER_SET_REQUEST: "TRANSFER_SET_REQUEST",
  TRANSFER_SET_SUCCESS: "TRANSFER_SET_SUCCESS",
  TRANSFER_SET_FALIURE: "TRANSFER_SET_FALIURE",

  DELETE_SET_REQUEST: "DELETE_SET_REQUEST",
  DELETE_SET_SUCCESS: "DELETE_SET_SUCCESS",
  DELETE_SET_FAILURE: "DELETE_SET_FALIURE",

  SAVE_SET_TO_STORE_REQUEST: "MOVE_SET_TO_STORE_REQUEST",
  SAVE_SET_TO_STORE_SCUCESS: "MOVE_SET_TO_STORE_SCUCESS",
  SAVE_SET_TO_STORE_FALIURE: "MOVE_SET_TO_STORE_FALIURE",

  ALLOCATE_SET_REQUEST: "ALLOCATE_ENTIRE_SET_REQUEST",
  ALLOCATE_SET_SCUCESS: "ALLOCATE_ENTIRE_SET_SCUCESS",
  ALLOCATE_SET_FALIURE: "ALLOCATE_ENTIRE_SET_FALIURE",

  GET_BAR_CHART_DATA_REQUEST: "GET_BAR_CHART_DATA_REQUEST",
  GET_BAR_CHART_DATA_SUCCESS: "GET_BAR_CHART_DATA_SUCCESS",
  GET_BAR_CHART_DATA_FALIURE: "GET_BAR_CHART_DATA_FALIURE",

  GET_BAR_CHART_DATA2_REQUEST: "GET_BAR_CHART_DATA2_REQUEST",
  GET_BAR_CHART_DATA2_SUCCESS: "GET_BAR_CHART_DATA2_SUCCESS",
  GET_BAR_CHART_DATA2_FALIURE: "GET_BAR_CHART_DATA2_FALIURE",
};