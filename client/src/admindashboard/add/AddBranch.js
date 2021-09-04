import React, { useContext, useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import "../css/admin.css";
import { AdminContext } from "../AdminContext";
import { retreiveBranches } from "../view/ViewBranches";
function AddBranch() {
  const history = useHistory()
  const Admin = useContext(AdminContext);
  const token = localStorage.getItem("token");
  var [_allBranches] = useState([]);
  const [branchname, setBranchName] = useState("");
  const addnewbranch = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:3001/api/admin/branches/add", {
        branchname,
      })
      .then("Updation Successfull")
      .catch((err) => err + "Error State")
    if (response.data === 1) {
      _allBranches = retreiveBranches()
       Admin.setBranches(_allBranches)
      console.log(Admin.branches)
      history.push('/viewbranch')
    }
    // const response = await api.get("/api/branches/all");
    //Admin.setBranches( ...response.data);
  }



  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              <h3>Add New Branch</h3>
              <p>Fill in the data below.</p>
              <form className='requires-validation' novalidate>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='name'
                    placeholder='Branch Name'
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                  <div className='valid-feedback'>
                    Branchname field is valid!
                  </div>
                  <div className='invalid-feedback'>
                    Branchname field cannot be blank!
                  </div>
                </div>

                <div className='form-button mt-3'>
                  <button
                    id='submit'
                    type='submit'
                    onClick={addnewbranch}
                    className='btn btn-primary'
                  >
                    Add Branch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBranch;
