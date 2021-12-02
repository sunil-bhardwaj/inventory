import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddDesignation(props) {
  const dispatch = useDispatch();
  const newDesignation = useSelector((state) => state.userData.designation);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/adddesignation" } };
  const [designation, setInputsDesignation] = useState({
    designame: "",
  });
  const { designame } = setInputsDesignation;

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsDesignation((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewDesignation = (e) => {
    
    e.preventDefault();
    setSubmitted(true);

    if (designation.designame) {
      dispatch(adminActions.addNewDesignation(designation, from));
    }
  };
  const updateDesignation = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (designation.designame) {
      dispatch(adminActions.updateDesignation(designation, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Designation</h3>
              ) : (
                <h3>Add New Designation</h3>
              )}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='designame'
                    placeholder='Designation Name'
                    value={designame}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => updateDesignation()}
                      className='btn btn-warning'
                    >
                      Update User
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => addNewDesignation()}
                      className='btn btn-warning'
                    >
                      Add Designation
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

export default AddDesignation;
