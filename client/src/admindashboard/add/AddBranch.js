import React, { useContext, useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import "../css/admin.css";
import { AdminContext } from "../AdminContext";
import { retreiveBranches } from "../view/ViewBranches";
function AddBranch(props) {
  

  
  const history = useHistory()
  const Admin = useContext(AdminContext);
  const token = localStorage.getItem("token");
  
  
  const [branchname, setBranchName] = useState("");
  
 
  
  const addnewbranch = async (e) => {
    var [_allBranches] = []; 
    e.preventDefault();
    

    const response = await axios
      .post("http://localhost:3001/api/admin/branches/add", {
        branchname,
      })
      .then("Addition Successfull")
      .catch((err) => err + "Error State during Addition of Branch")
   /* if (response.data === 1) {
        _allBranches = await retreiveBranches()
         console.log("_allBranches");
        console.log(_allBranches)
        if (_allBranches) {
          const newBranch = [..._allBranches];
           Admin.setBranches(newBranch);
    //        console.log(Admin.branches);
        }
     
     // history.push('/viewbranch')
    }*/
    // const response = await api.get("/api/branches/all");
    //Admin.setBranches( ...response.data);
  }
  
 
   const updateBranch = async (e) => {
     e.preventDefault()
      console.log(props);
     
     var [_allBranches] = [];
     const response = await axios.put(
       `http://localhost:3001/api/admin/branches/update/${props.brId}`, {
        branchname,
      },
       {
         headers: {
           "x-access-token": token,
         },
       }
     )
       .then("Updation Successfull")
       .catch((err) => err + "Error State during Deletion of Branch");
     // const response = await api.get("/api/branches/all");
     // console.log(response.data);
     
    /*   _allBranches = await retreiveBranches();
       if (_allBranches) {
         const newBranch = [..._allBranches];
         Admin.setBranches(newBranch);
         //        console.log(Admin.branches);
       }*/
    
   };



  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Branch</h3>
              ) : (
                <h3>Add New Branch</h3>
              )}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  {props.isUpdate ? (
                    <input
                      required
                      className='form-control'
                      type='text'
                      placeholder={props.brName}
                      onChange={(e) => setBranchName(e.target.value)}
                    />
                  ) : (
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='name'
                      placeholder='Branch Name'
                      value={branchname}
                      onChange={(e) => setBranchName(e.target.value)}
                    />
                  )}

                  <div className='valid-feedback'>
                    Branchname field is valid!
                  </div>
                  <div className='invalid-feedback'>
                    Branchname field cannot be blank!
                  </div>
                </div>
                {props.isUpdate ? (
                  <div className='form-button mt-3'>
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateBranch}
                      className='btn btn-warning'
                    >
                      Update Branch
                    </button>
                    
                  </div>
                ) : (
                  <div className='form-button mt-3'>
                    <button
                      id='submit'
                      type='submit'
                      onClick={addnewbranch}
                      className='btn btn-warning'
                    >
                      Add Branch
                    </button>
                   
                      <button
                        id='submit'
                        type='button'
                        onClick={props.closehandler}
                        className='btn btn-danger'
                        style={{marginLeft:'15px', minWidth:'120px'}}
                        
                      >
                        Close
                      </button>
                   
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBranch;
