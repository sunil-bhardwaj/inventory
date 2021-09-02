import React from "react";
import RightBar from "../../mycomponents/RightBar";
import "../css/admin.css";
import ViewBranches from "../view/ViewBranches";
function AddBranch() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
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
                          className='form-control'
                          type='text'
                          name='name'
                          placeholder='Branch Name'
                          required
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
        </div>
        <div className='col-md-6'>
          <ViewBranches />
        </div>
      </div>
    </div>
  );
}

export default AddBranch;
