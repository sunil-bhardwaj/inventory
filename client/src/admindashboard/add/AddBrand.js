import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddBrand(props) {
  const dispatch = useDispatch();
  const newBrand = useSelector((state) => state.userData.brand);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addbrand" } };
  const [brand, setInputsBrand] = useState({
    brandname: "",
  });
  const { brandname } = setInputsBrand;

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsBrand((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewBrand = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (brand.brandname) {
      dispatch(adminActions.addNewBrand(brand, from));
    }
  };
  const updateBrand = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (brand.brandname) {
      dispatch(adminActions.updateBrand(brand, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Brand</h3>
              ) : (
                <h3>Add New Brand</h3>
              )}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='brandname'
                    placeholder='Brand Name'
                    value={brandname}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateBrand}
                      className='btn btn-warning'
                    >
                      Update User
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewBrand}
                      className='btn btn-warning'
                    >
                      Add Brand
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

export default AddBrand;
