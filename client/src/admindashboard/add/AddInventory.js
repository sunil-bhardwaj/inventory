import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inventoryActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";
import DatePicker from "react-datepicker";
function AddInventoryItem(props) {
  //console.log(props.inventoryItem.warranty_ends_on);
  const dispatch = useDispatch();
  const inventoryInfo = useSelector((state) => state.adminData);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addinventory" } };
  const [warranty_ends_on, setWarrantyEndsOn] = useState(props.inventoryItem.warranty_ends_on?Date.parse(props.inventoryItem.warranty_ends_on):null);
  const [date_of_purchase, setDateOfPurchase] = useState(props.inventoryItem.date_of_purchase?Date.parse(props.inventoryItem.date_of_purchase):null);
  const [inventoryitem, setInputsInventoryItem] = useState({
    itemid: props.inventoryItem.itemid ? props.inventoryItem.itemid : '',
    brandid: props.inventoryItem.brandid ? props.inventoryItem.brandid : '',
    sourceid: props.inventoryItem.sourceid ? props.inventoryItem.sourceid : '',
    serialno: props.inventoryItem.serialno ? props.inventoryItem.serialno : null,
    servicetagno: props.inventoryItem.servicetagno ? props.inventoryItem.servicetagno : null,
    imeino: props.inventoryItem.imeino ? props.inventoryItem.imeino : null,
    osid: props.inventoryItem.osid ? props.inventoryItem.osid : 7,
    ipaddress: props.inventoryItem.ipaddress ? props.inventoryItem.ipaddress : null,
    remarks: props.inventoryItem.remarks ? props.inventoryItem.remarks : null,
    isactive: props.inventoryItem.isactive ? props.inventoryItem.isactive : true,
    image: props.inventoryItem.image ? props.inventoryItem.image : null,
    price: props.inventoryItem.price ? props.inventoryItem.price : null,
    color: props.inventoryItem.color ? props.inventoryItem.color : null,
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
   
    isactive,
    image,
    price,
    color,
  } = setInputsInventoryItem;

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsInventoryItem((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {
    dispatch(adminActions.viewAllItems());
    dispatch(adminActions.viewAllBrands());
    dispatch(adminActions.viewAllSources());
  }, []);
//////////////////LEFT HERE//////////////////////////
  const addNewInventoryItem = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (inventoryitem.serialno) {
      dispatch(inventoryActions.addNewInventoryItem(inventoryitem,warranty_ends_on, from,date_of_purchase));
    }
  };
  const updateInventoryItem = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (inventoryitem.serialno && inventoryitem.itemid && inventoryitem.brandid && inventoryitem.sourceid) {
      dispatch(
        inventoryActions.updateInventoryItem(
          inventoryitem,
          warranty_ends_on,
          from,
          date_of_purchase,
          
        )
      );
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
                <div className='container' style={{ display: "flex" }}>
                  <div className='col-md-6'>
                    <select
                      value={inventoryitem.itemid}
                      onChange={handleChange}
                      name='itemid'
                      className='list-group-item-action btn-style-1  rounded'
                    >
                      <option value='null'> Item Type</option>
                      {inventoryInfo.itemList.map((item, index) => (
                        <option
                          className='list-group-item-action btn-style-1  rounded'
                          value={item.id}
                          key={index}
                        >
                          {item.itemname}
                        </option>
                      ))}
                    </select>
                    <select
                      value={inventoryitem.brandid}
                      onChange={handleChange}
                      name='brandid'
                      className='list-group-item-action btn-style-1  rounded'
                    >
                      <option value='null'> Brand Name</option>
                      {inventoryInfo.brandList.map((brand, index) => (
                        <option
                          className='list-group-item-action btn-style-1  rounded'
                          value={brand.id}
                          key={index}
                        >
                          {brand.brandname}
                        </option>
                      ))}
                    </select>
                    <select
                      value={inventoryitem.sourceid}
                      onChange={handleChange}
                      name='sourceid'
                      className='list-group-item-action btn-style-1  rounded'
                    >
                      <option value='null'> Source Name</option>
                      {inventoryInfo.sourceList.map((source, index) => (
                        <option
                          className='list-group-item-action btn-style-1  rounded'
                          value={source.id}
                          key={index}
                        >
                          {source.ordername}
                        </option>
                      ))}
                    </select>

                    <input
                      required
                      className='form-control'
                      type='text'
                      name='serialno'
                      placeholder='Serial No'
                      value={inventoryitem.serialno}
                      onChange={handleChange}
                    />
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='servicetagno'
                      placeholder='Service Tag No'
                      value={inventoryitem.servicetagno}
                      onChange={handleChange}
                    />
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='imeino'
                      placeholder='IMEI No'
                      value={inventoryitem.imeino}
                      onChange={handleChange}
                    />
                    <select
                      value={inventoryitem.osid}
                      onChange={handleChange}
                      name='osid'
                      className='list-group-item-action btn-style-1  rounded'
                    >
                      <option value='1'> Windows 8</option>
                      <option value='2'> Windows 10</option>
                      <option value='3'> Windows 11</option>
                      <option value='4'> Ubuntu</option>
                      <option value='5'> Android</option>
                      <option value='6'> Apple OS</option>
                      <option value='7'> Other</option>
                    </select>
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='ipaddress'
                      placeholder='IP Address'
                      value={inventoryitem.ipaddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='col-md-6'>
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='remarks'
                      placeholder='Remarks'
                      value={inventoryitem.remarks}
                      onChange={handleChange}
                    />
                    <DatePicker
                      selected={warranty_ends_on}
                      dateFormat='yyyy-MM-dd'
                      // onChange={(date) => setOrderDate(date)}
                      onChange={(date) => setWarrantyEndsOn(date)}
                    />

                    <DatePicker
                      dateFormat='yyyy-MM-dd'
                      selected={date_of_purchase}
                      // onChange={(date) => setOrderDate(date)}
                      onChange={(date) => setDateOfPurchase(date)}
                    />

                    <select
                      value={inventoryitem.isactive}
                      onChange={handleChange}
                      name='isactive'
                      className='list-group-item-action btn-style-1  rounded'
                    >
                      <option value='true'> True</option>
                      <option value='false'> False</option>
                    </select>

                    <input
                      required
                      className='form-control'
                      type='text'
                      name='image'
                      placeholder='Image'
                      value={inventoryitem.image}
                      onChange={handleChange}
                    />
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='price'
                      placeholder='Price'
                      value={inventoryitem.price}
                      onChange={handleChange}
                    />
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='color'
                      placeholder='Color'
                      value={inventoryitem.color}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='container col-md-12 form-button mt-3'>
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
