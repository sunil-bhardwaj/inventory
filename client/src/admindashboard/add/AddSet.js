import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/admin.css";
import { AdminContext } from "../AdminContext";

function AddSet(props) {
  const history = useHistory();
  const Admin = useContext(AdminContext);
  const token = localStorage.getItem("token");

  const [setname, setSetName] = useState("");
 const [setremark, setSetRemark] = useState("")
  const addnewset = async (e) => {
  
    e.preventDefault();

    const response = await axios
      .post("http://localhost:3001/api/admin/sets/add", {
        setname,setremark
      })
      .then("Addition Successfull")
      .catch((err) => err + "Error State during Addition of Branch");
    
  };

  const updateSet = async (e) => {
    e.preventDefault();
   
    const response = await axios
      .put(
        `http://localhost:3001/api/admin/sets/update/${props.brId}`,
        {
          setname,setremark
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then("Updation Successfull")
      .catch((err) => err + "Error State during Deletion of Branch");
   
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Set</h3>
              ) : (
                <h3>Add New Set</h3>
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
                      onChange={(e) => setSetName(e.target.value)}
                    />
                  ) : (
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='name'
                      placeholder='Set Name'
                      value={setname}
                      onChange={(e) => setSetName(e.target.value)}
                    />
                  )}
                     <input
                      required
                      className='form-control'
                      type='text'
                      name='name'
                      placeholder='Set Remark'
                      value={setremark}
                      onChange={(e) => setSetRemark(e.target.value)} />
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
                      onClick={updateSet}
                      className='btn btn-warning'
                    >
                      Update Set
                    </button>
                  </div>
                ) : (
                  <div className='form-button mt-3'>
                    <button
                      id='submit'
                      type='submit'
                      onClick={addnewset}
                      className='btn btn-warning'
                    >
                      Add Set
                    </button>

                    <button
                      id='submit'
                      type='button'
                      onClick={props.closehandler}
                      className='btn btn-danger'
                      style={{ marginLeft: "15px", minWidth: "120px" }}
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

export default AddSet;
