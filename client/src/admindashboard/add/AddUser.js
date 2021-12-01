import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddUser(props) {
  const dispatch = useDispatch();
  
  const branchesInfo = useSelector((state) => state.adminData.branchList);
 const designationInfo = useSelector((state) => state.adminData.designationList);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/viewusers" } };
  const [user, setInputsUser] = useState({
    username: "",
    phoneno: "",
    email: "",
    designationid: "",
    branchid: "",
    usertype:""
  });
  const { username,phoneno,email,designationid,branchid,usertype} = setInputsUser;

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsUser((inputs) => ({ ...inputs, [name]: value }));
    
  }
  useEffect(() => {
    dispatch(adminActions.viewBranches());
    dispatch(adminActions.viewAllDesignations());
  }, []);

  const addNewUser = (e) => {
   
    e.preventDefault();
    setSubmitted(true);

    if (user.username) {
      
      dispatch(userActions.addNewUser(user, from));
    }
  };
  const updateUser = (e) => {
   e.preventDefault();
    setSubmitted(true);

    if (user.username) {
      dispatch(userActions.updateUser(user, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? <h3>Update User</h3> : <h3>Add New User</h3>}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='username'
                    placeholder='User Name'
                    value={username}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='email'
                    placeholder='User Email'
                    value={email}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='phoneno'
                    placeholder='User Phone No'
                    value={phoneno}
                    onChange={handleChange}
                  />
                  <select value={designationid}  onChange={handleChange} name='designationid' className='list-group-item-action btn-style-1  rounded'>
                    <option value='null'> Select Designation</option>
                    {designationInfo.map((designation, index) => (
                      <option
                        className='list-group-item-action btn-style-1  rounded'
                        value={`${designation.id}`}
                        key={index}
                      >
                        {designation.designame}
                      </option>
                    ))}
                  </select>
                  <select  value={branchid}  onChange={handleChange} name = 'branchid' className='list-group-item-action btn-style-1  rounded'>
                    <option value='null'> Select Branch</option>
                    {branchesInfo.map((branch, index) => (
                      <option
                        className='list-group-item-action btn-style-1  rounded'
                        value={`${branch.id}`}
                        key={index}
                      >
                        {branch.branchname}
                      </option>
                    ))}
                  </select>
                  <select  value={usertype} onChange={handleChange} name='usertype' className='list-group-item-action btn-style-1  rounded'>
                    <option value='null'> Select Type</option>

                    <option
                      className='list-group-item-action btn-style-1  rounded'
                      value='1'
                    >
                      Admin
                    </option>
                    <option
                      className='list-group-item-action btn-style-1  rounded'
                      value='0'
                    >
                      User
                    </option>
                  </select>
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => updateUser()}
                      className='btn btn-warning'
                    >
                      Update User
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => addNewUser()}
                      className='btn btn-warning'
                    >
                      Add User
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

export default AddUser;
