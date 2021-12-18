import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddItemType(props) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.helperData);
  const newItemType = useSelector((state) => state.userData.itemtype);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/additemtype" } };
  const [itemtype, setInputsItemType] = useState({
    typename: props.itemtype.typename ? props.itemtype.typename : "",
    
  });
  const [itemtypeid, setItemTypeId] = useState(props.itemtype.id ? props.itemtype.id : "");
  const { typename, typeid } = setInputsItemType;

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(alertActions.clear());
    setInputsItemType((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewItemType = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Item Type being Saved."));
    setSubmitted(true);
    if (itemtype.typename) {
      dispatch(adminActions.addNewItemType(itemtype, from));
    }
  };
  const updateItemType = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Item Type being Updated."));
    setSubmitted(true);
    if (itemtype.typename) {
      dispatch(adminActions.updateItemType(itemtypeid, itemtype, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? <h3>Update Item Type</h3> : <h3>Add New Item Type</h3>}
              <p className={alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='typename'
                    placeholder='Item Name'
                    value={itemtype.typename}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateItemType}
                      className='btn btn-warning'
                    >
                      Update Item Type
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewItemType}
                      className='btn btn-warning'
                    >
                      Add Item Type
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

export default AddItemType;
