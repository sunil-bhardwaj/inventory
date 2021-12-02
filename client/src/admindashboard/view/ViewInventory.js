import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../dashboard/Users.css";
import RightBar from "../../mycomponents/RightBar";
import Product from "../components/Product";
import { inventoryActions } from "../../_actions/";
import SetSideBar from "../components/SetSideBar";
import { useDispatch, useSelector } from "react-redux";
import AddInventoryItem from "../add/AddInventoryItem";
function ViewInventory() {
  const dispatch = useDispatch();
  //const InventoryInfo = useSelector((state) => state.inventoryData.inventoryList)
const [newInventoryWindow, setnewInventoryWindow] = useState(false);
const [isUpdate, setIsUpdate] = useState(false);
  const inventoryInfo = useSelector((state) => state.inventoryData.inventoryList);
  //const setItemsInfo = useSelector((state) => state.inventoryData.setItems);
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory());
  }, []);

  const [searchKeywords, setSearchKeywords] = useState("");

  const addNewInventory = () => {
    console.log(newInventoryWindow);
    setnewInventoryWindow(!newInventoryWindow);
  };
  const listItems = inventoryInfo
    .filter((val) => {
      if (searchKeywords === "") return val;
      else if (
        val.serialno.toLowerCase().includes(searchKeywords.toLowerCase())
      )
        return val;
      else if (
        val.brandname.toLowerCase().includes(searchKeywords.toLowerCase())
      )
        return val;
      else if (
        val.itemname.toLowerCase().includes(searchKeywords.toLowerCase())
      )
        return val;
      else if (
        val.itemtype.toLowerCase().includes(searchKeywords.toLowerCase())
      )
        return val;
    })
    /*var result = result1.filter(function (o1) {
    return result2.some(function (o2) {
        return o1.id === o2.id; // return the ones with equal id
   });
});*/
    .map((stock, srno) => (
      <>
        {
          /*Admin.box.find(()=>{
            
    })*/
          // Admin.box.some((o2) => stock.inventoryId === o2.inventoryId?setInCart(true):setInCart(false))
        }
        <Product
          product={stock}
          in='viewstore'
          key={uuidv4()}
          srno={srno + 1}
          
        />
      </>
    ));
  // var arr = listItems;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
            onClick={addNewInventory}
          >
            Add New
          </button>
        </div>
        <div className='col-md-4 text-center float-right'>
          <input
            style={{
              width: "90%",
              border: "3px solid #00b4cc",
              borderRight: "3px solid #00b4cc",
              padding: "5px",
              height: "40px",
              borderRadius: "5px 5px 5px 5px;",
              outline: "none",
              color: "#9dbfaf",
              marginBottom: "5px",
            }}
            type='search'
            value={searchKeywords}
            onChange={(e) => {
              setSearchKeywords(e.target.value);
            }}
            className='input'
            placeholder='Search...'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-10'>{listItems}</div>
        <div className='col-md-2 float-left'>
          {newInventoryWindow ? (
            <AddInventoryItem
              closehandler={addNewInventory}
              isupdate={isUpdate}
            />
          ) : (
            <div
              style={{ position: "absolute", right: "109px" }}
              className='col-md-2'
            >
              <RightBar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInventory;
