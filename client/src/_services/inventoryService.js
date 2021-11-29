import { authHeader } from "../_helpers";
import {userActions} from "../_actions/"


export const inventoryService = {
  getAllInventory,
  getSetItems,
  getAllSets,
  getSetById,
  deleteSet: _deleteSet,
  addNewSet,
  getById,
  update,
  delete: _delete,
  getStoreInventory,
  addItemToSet,
  removeItemFromSet,
  releaseAllSetItems,
  transferSet,
  moveSetToStore,
  allocateSetFromStore,
};


function getAllInventory() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`http://10.146.19.127:3001/api/inventory/all`, requestOptions).then(
    handleResponse
  );
}
function getStoreInventory() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
 
  return fetch(`http://localhost:3001/api/inventory/store/all`, requestOptions).then(
    handleResponse
  );
}
function addNewSet(set) {
  console.log(set)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(set),
  };

  return fetch(`http://localhost:3001/api/admin/sets/add`, requestOptions).then(
    handleResponse
  );
}

function addItemToSet(itemId,setId) {
  const objectPayload = { itemId: itemId, setId: setId };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectPayload),
  };

  return fetch(`http://localhost:3001/api/admin/sets/additem`, requestOptions).then(
    handleResponse
  );
}

function releaseAllSetItems(setId) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ setId }),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/removeallitems`,
    requestOptions
  ).then(handleResponse);
}
function transferSet(sidebarItems, oldUserId, newUserId) {
  const objectyfy = { sidebarItems, oldUserId, newUserId };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectyfy)
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/transfer`,
    requestOptions
  ).then(handleResponse);
}
function moveSetToStore(setid,items) {
  
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({setid,items}),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/movetostore`,
    requestOptions
  ).then(handleResponse);
}
function allocateSetFromStore(newsetid, items, oldsetid, newsetname) {
  console.log(newsetid, items, oldsetid, newsetname);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newsetid, items, oldsetid, newsetname }),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/allocate`,
    requestOptions
  ).then(handleResponse);
}
function removeItemFromSet(itemId) {
  
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/removeitem`,
    requestOptions
  ).then(handleResponse);
}
function getSetItems(setId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/view/${setId}`,
    requestOptions
  ).then(handleResponse);
}

function getAllSets() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`http://localhost:3001/api/admin/sets/all`, requestOptions).then(
    handleResponse
  );
}
function _deleteSet(setid) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://localhost:3001/api/admin/sets/delete/${setid}`,
    requestOptions
  ).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://10.146.19.127:3001/api/inventory/${id}`,
    requestOptions
  ).then(handleResponse);
}
function getSetById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `http://10.146.19.127:3001/api/admin/sets/edit/view/${id}`,
    requestOptions
  ).then(handleResponse);
}

function update(id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };

  return fetch(
    `http://10.146.19.127:3001/api/inventory/update/${id}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `http://10.146.19.127:3001/api/inventory/delete/${id}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  
  return response.text().then((text) => {
  
    const data = text && JSON.parse(text);
  
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userActions.logout();
        Location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    
    return data;
  });
}
