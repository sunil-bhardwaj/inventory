import React, {  useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../dashboard/Users.css";
import RightBar from "../../mycomponents/RightBar";
import Product from "../components/Product";
import {inventoryActions} from "../../_actions/"
import SetSideBar from "../components/SetSideBar";
import { useDispatch, useSelector } from "react-redux";
function ViewStore(props) {

  const dispatch = useDispatch();
   //const InventoryInfo = useSelector((state) => state.inventoryData.inventoryList)
   
   const storeItemsInfo = useSelector((state) => state.inventoryData.storeItems);
  //const setItemsInfo = useSelector((state) => state.inventoryData.setItems);
   useEffect(() => {
     dispatch(inventoryActions.getStoreInventory());
     
   }, []);
 
  
 
  const [searchKeywords, setSearchKeywords] = useState("");
  
  
 
  var redirected = false 
  var selectedSetId = null 
  var selectedSetName = ''
  if (props.location.state) {
    redirected = props.location.state.redirected
    selectedSetId = props.location.state.setId;
    selectedSetName = props.location.state.setName;
  }
 console.log(selectedSetId,selectedSetName)
  const listItems = storeItemsInfo
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
          redirect={redirected}
          key={uuidv4()}
          srno={srno + 1}
          setName={selectedSetName}
          setId={selectedSetId}
        />
      </>
    ));
// var arr = listItems;
  return (
    <div className='container'>
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
      <div className='row'>
        <div className='col-md-11'>{listItems}</div>

        {redirected ? (
          <div
            className='col-md-2'
            style={{
              position: "fixed",
              right: "1px",
              border: "2px solid green",
              top: "29px",
              bottom: "10px",
              overflowY: "scroll",
              backgroundColor: "#254063",
              zIndex: 9999,
            }}
          >
            <SetSideBar
             // addtoset={(item) => addtoset(item)}
              setName={selectedSetName}
              setId={selectedSetId}
            />
          </div>
        ) : (
          <div className='col-md-2'>
            <RightBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStore;
