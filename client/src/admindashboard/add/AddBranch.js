import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions,adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddBranch(props) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.helperData);
  const newBranch = useSelector((state) => state.userData.branch);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addbranch" } };
  const [branch, setInputsBranch] = useState({
    branchname: props.branch.branchname ? props.branch.branchname : '',
   
    
  });
  const [branchid, setBranchId] = useState(props.branch.id ? props.branch.id : '')
  const {
   
    branchname,
   
  } = setInputsBranch;

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(alertActions.clear());
    setInputsBranch((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewBranch = (e) => {
   
    e.preventDefault();
    setSubmitted(true);
  dispatch(alertActions.loading("Please Wait While Branch being Saved."));
  setSubmitted(true);
    if (branch.branchname) {
     
      dispatch(adminActions.addNewBranch(branch, from));
    }
  };
  const updateBranch= (e) => {
    e.preventDefault();
    setSubmitted(true);
 dispatch(alertActions.loading("Please Wait While Branch being Updated."));
 setSubmitted(true);
    if (branch.branchname) {
      dispatch(adminActions.updateBranch(branchid,branch, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? <h3>Update Branch</h3> : <h3>Add New Branch</h3>}
              <p className={alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='branchname'
                    placeholder='Branch Name'
                    value={branch.branchname}
                    onChange={handleChange}
                  />
                 
                 
                 
                 
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateBranch}
                      className='btn btn-warning'
                    >
                      Update Branch
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewBranch}
                      className='btn btn-warning'
                    >
                      Add Branch
                    </button>
                  )}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBranch;
