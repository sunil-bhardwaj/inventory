import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddLocation(props) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.helperData);
  const newLoc = useSelector((state) => state.userData.loc);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addlocation" } };
  const [loc, setInputsLoc] = useState({
    locationname: props.loc.locationname ? props.loc.locationname : "",
  });
  const [locationid, setLocationId] = useState(props.loc.id ? props.loc.id : "");
  const { locationname } = setInputsLoc;

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(alertActions.clear());
    setInputsLoc((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewLocation = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Location being Saved."));
    setSubmitted(true);
    if (loc.locationname) {
      dispatch(adminActions.addNewLocation(loc, from));
    }
  };
  const updateLocation = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Location being Updated."));
    setSubmitted(true);
    if (loc.locationname) {
      dispatch(adminActions.updateLocation(locationid, loc, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? <h3>Update Location</h3> : <h3>Add New Location</h3>}
              <p className={alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='locationname'
                    placeholder='Location Name'
                    value={loc.locationname}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateLocation}
                      className='btn btn-warning'
                    >
                      Update Location
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewLocation}
                      className='btn btn-warning'
                    >
                      Add Location
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

export default AddLocation;
