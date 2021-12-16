import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions, alertActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddUser(props) {
  
  const dispatch = useDispatch();
  const alert = useSelector((state)=>state.helperData)
  const branchesInfo = useSelector((state) => state.adminData.branchList);
 const designationInfo = useSelector((state) => state.adminData.designationList);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addusers" } };
  const [updateuserid, serUpdateUserId] = useState( props.user.userid ? props.user.userid : '')
  const [user, setInputsUser] = useState({
    username: props.user.username ? props.user.username : '',
    phoneno: props.user.phoneno?props.user.phoneno:'',
    email: props.user.email?props.user.email:'',
    designationid: props.user.designationid?props.user.designationid:null,
    branchid: props.user.branchid?props.user.branchid:null,
  });
             /* username = props.user.name
              phoneno=props.user.phoneno
              email= props.user.email
              designationid=props.user.designationid
              branchid= props.user.branchid*/
  const { username,phoneno,email,designationid,branchid} = setInputsUser;
 
  function handleChange(e) {
    e.preventDefault();
    dispatch(alertActions.clear());
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
   dispatch(alertActions.loading("Please Wait While User being Saved."))
    setSubmitted(true);

    if (user.username) {
      
      dispatch(userActions.addNewUser(user, from));
    }
  };
  const updateUser = (e) => {
   e.preventDefault();
    dispatch(alertActions.loading("Please Wait While Updating User."));
    setSubmitted(true);

    if (user.username) {
      dispatch(userActions.updateUser(updateuserid,user, from));
    }
  };
   console.log(user, updateuserid);
  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate 
              ? 
              <>
              <h3>Update User</h3> 
              
              
             
              </>
              : 
              <h3>Add New User</h3>
              }
              <p class = {alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='username'
                    placeholder='User Name'
                    value={user.username}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='email'
                    placeholder='User Email'
                    value={user.email}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='phoneno'
                    placeholder='User Phone No'
                    value={user.phoneno}
                    onChange={handleChange}
                  />
                  <select value={user.designationid}  onChange={handleChange} name='designationid' className='list-group-item-action btn-style-1  rounded'>
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
                  <select  value={user.branchid}  onChange={handleChange} name = 'branchid' className='list-group-item-action btn-style-1  rounded'>
                    <option value='null'> Select Branch</option>
                    {branchesInfo.map((branch, index) => (
                      <option
                        className='list-group-item-action btn-style-1  rounded'
                        value={branch.id}
                        key={index}
                      >
                        {branch.branchname}
                      </option>
                    ))}
                  </select>
                  
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateUser}
                      className='btn btn-warning'
                    >
                      Update User
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewUser}
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
