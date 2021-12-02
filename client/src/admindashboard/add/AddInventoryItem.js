import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { inventoryActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";

function AddInventoryItem(props) {
  const dispatch = useDispatch();
 
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addinventory" } };
  const [inventoryitem, setInputsInventoryItem] = useState({
    itemid: "",
    brandid:"",
    sourceid:"",
    serialno:"",
    servicetagno:"",
    imeino:"",
    osid:"",
    ipaddress:"",
    remarks:"",
    warranty_ends_on:"",
    date_of_purchase:"",
    isactive:"",
    image:"",
  });
  const {
    itemid,
    brandid,
    sourceid,
    serialno,
    servicetagno,
    imeino,
    osid,
    ipaddress,
    remarks,
    warranty_ends_on,
    date_of_purchase,
    isactive,
    image,
  } = setInputsInventoryItem;

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsInventoryItem((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewInventoryItem = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (inventoryitem.serialno) {
      dispatch(inventoryActions.addNewInventoryItem(inventoryitem, from));
    }
  };
  const updateInventoryItem = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (inventoryitem.serialno) {
      dispatch(inventoryActions.updateInventoryItem(inventoryitem, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Inventory</h3>
              ) : (
                <h3>Add New Inventory</h3>
              )}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='itemid'
                    placeholder='Item Name'
                    value={itemid}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='brandid'
                    placeholder='Brande Name'
                    value={brandid}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='sourceid'
                    placeholder='Source Name'
                    value={sourceid}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='serialno'
                    placeholder='Serial No'
                    value={serialno}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='servicetagno'
                    placeholder='Service Tag No'
                    value={servicetagno}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='imeino'
                    placeholder='IMEI No'
                    value={imeino}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='osid'
                    placeholder='OS Name'
                    value={osid}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='ipaddress'
                    placeholder='IP Address'
                    value={ipaddress}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='remarks'
                    placeholder='Remarks'
                    value={remarks}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='warranty_ends_on'
                    placeholder='Warranty End Date'
                    value={warranty_ends_on}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='date_of_purchase'
                    placeholder='Date Of Purchase'
                    value={date_of_purchase}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='isactive'
                    placeholder='Is Active'
                    value={isactive}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='image'
                    placeholder='Image'
                    value={image}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateInventoryItem}
                      className='btn btn-warning'
                    >
                      Update Inventory
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewInventoryItem}
                      className='btn btn-warning'
                    >
                      Add Inventory
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

export default AddInventoryItem;
