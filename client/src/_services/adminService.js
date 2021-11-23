import { authHeader } from "../_helpers";
import {userService} from "../_services"
export const adminService = {
  addBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch: _deleteBranch,
};

function addBranch(branchname, branchid) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ branchname }),
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



function updateBranch(branch) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  };

  return fetch(
    `http://10.146.19.127:3001/api/users/update/${branch.id}`,
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