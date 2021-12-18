import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddItem(props) {
  useEffect(() => {
    dispatch(adminActions.viewAllItemTypes());
  }, []);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.helperData);
  const ItemTypesInfo = useSelector((state) => state.adminData.itemtypeList);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/additem" } };
  const [item, setInputsItem] = useState({
    itemname: props.item.itemname ? props.item.itemname : "",
    typeid: props.item.typeid ? props.item.typeid : "",
  });
  const [itemid, setItemId] = useState(
    props.item.id ? props.item.id : ""
  );
  const { itemname, typeid } = setInputsItem;

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(alertActions.clear());
    setInputsItem((inputs) => ({ ...inputs, [name]: value }));
  }
  

  const addNewItem = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Item being Saved."));
    setSubmitted(true);
    if (item.itemname) {
      dispatch(adminActions.addNewItem(item, from));
    }
  };
  const updateItem = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(alertActions.loading("Please Wait While Item being Updated."));
    setSubmitted(true);
    if (item.locationname) {
      dispatch(adminActions.updateItem(itemid, item, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Item</h3>
              ) : (
                <h3>Add New Item</h3>
              )}
              <p className={alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='itemname'
                    placeholder='Item Name'
                    value={item.itemname}
                    onChange={handleChange}
                  />
                    <select value={item.typename}  onChange={handleChange} name='typeid' className='list-group-item-action btn-style-1  rounded'>
                    <option value='null'> Select Item Type</option>
                    {ItemTypesInfo.map((itemtype, index) => (
                      <option
                        className='list-group-item-action btn-style-1  rounded'
                        value={`${itemtype.id}`}
                        key={index}
                      >
                        {itemtype.typename}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateItem}
                      className='btn btn-warning'
                    >
                      Update Item
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewItem}
                      className='btn btn-warning'
                    >
                      Add Item
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

export default AddItem;
