import { authHeader } from "../_helpers";
import {userService} from "../_services"
export const adminService = {
  addNewBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch: _deleteBranch,
  addNewDesignation,
  viewAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation: _deleteDesignation,
  addNewBrand,
  viewAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand: _deleteBrand,
  addNewSource,
  viewAllSources,
  getSourceById,
  updateSource,
  deleteSource: _deleteSource,

  addNewLocation,
  viewAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation: _deleteLocation,
  addNewItem,
  viewAllItems,
  getItemById,
  updateItem,
  deleteItem: _deleteItem,
  addNewItemType,
  viewAllItemTypes,
  getItemTypeById,
  updateItemType,
  deleteItemType: _deleteItemType,
};

function addNewBranch(branch) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ branch }),
  };

  return fetch(`http://localhost:3001/api/admin/branches/add`, requestOptions)
    .then(handleResponse)
    .then((branch) => {
      

      return branch;
    });
}



function getAllBranches() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`http://localhost:3001/api/admin/branches/all`, requestOptions).then(
    handleResponse
  );
}

function getBranchById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/branches/${id}`,
    requestOptions
  ).then(handleResponse);
}



function updateBranch(id,branch) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/branches/update/${id}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteBranch(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/branches/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}
function addNewDesignation(designation) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ designation }),
  };

  return fetch(`http://localhost:3001/api/admin/designation/add`, requestOptions)
    .then(handleResponse)
    .then((branch) => {
      return branch;
    });
}

function viewAllDesignations() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/designation/all`,
    requestOptions
  ).then(handleResponse);
}

function getDesignationById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/designation/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateDesignation(id,designation) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(designation),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/designation/update/${id}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteDesignation(designationid) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/designation/delete/${designationid}`,
    requestOptions
  ).then(handleResponse);
}

/////////////////////////////
function addNewSource(source, orderdate) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, orderdate }),
  };

  return fetch(`http://localhost:3001/api/admin/source/add`, requestOptions)
    .then(handleResponse)
    .then((source) => {
      return source;
    });
}

function viewAllSources() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/source/all`,
    requestOptions
  ).then(handleResponse);
}

function getSourceById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/source/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateSource(updatesourceid, source, orderdate) {
  console.log(updatesourceid, source, orderdate);
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({source, orderdate}),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/source/update/${updatesourceid}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteSource(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/source/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}


//////////////BRAND//////////////////
function addNewBrand(brand) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brand }),
  };

  return fetch(
    `http://localhost:3001/api/admin/brand/add`,
    requestOptions
  )
    .then(handleResponse)
    .then((brand) => {
      return brand;
    });
}

function viewAllBrands() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/brand/all`,
    requestOptions
  ).then(handleResponse);
}

function getBrandById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/brand/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateBrand(brandid,brand) {
  
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(brand),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/brand/update/${brandid}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteBrand(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/brand/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}

//////////////LOCATIONS//////////////////
function addNewLocation(location) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location }),
  };

  return fetch(
    `http://localhost:3001/api/admin/locations/add`,
    requestOptions
  )
    .then(handleResponse)
    .then((location) => {
      return location;
    });
}

function viewAllLocations() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/locations/all`,
    requestOptions
  ).then(handleResponse);
}

function getLocationById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/locations/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateLocation(locationid,location) {
  
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({location}),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/locations/update/${locationid}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteLocation(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/locations/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}

//////////////ITEMS//////////////////
function addNewItem(item) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  };

  return fetch(
    `http://localhost:3001/api/admin/items/add`,
    requestOptions
  )
    .then(handleResponse)
    .then((item) => {
      return item;
    });
}

function viewAllItems() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/items/all`,
    requestOptions
  ).then(handleResponse);
}

function getItemById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/items/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateItem(itemid,item) {
  
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(item),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/items/update/${itemid}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteItem(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/items/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}

//////////////ITEM TYPES//////////////////
function addNewItemType(itemtype) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemtype }),
  };

  return fetch(`http://localhost:3001/api/admin/itemtypes/add`, requestOptions)
    .then(handleResponse)
    .then((itemtype) => {
      return itemtype;
    });
}

function viewAllItemTypes() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/itemtypes/all`,
    requestOptions
  ).then(handleResponse);
}

function getItemTypeById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/itemtypes/${id}`,
    requestOptions
  ).then(handleResponse);
}

function updateItemType(typeid,itemtype) {
  
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({itemtype}),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/itemtypes/update/${typeid}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteItemType(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/itemtypes/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}



///////////////////////////////
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    // console.log(data)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        Location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
