import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Users.css";

import Loading from "../mycomponents/Loading";
import RightBar from "../mycomponents/RightBar";
import { useDispatch, useSelector } from "react-redux";
import {inventoryActions, userActions} from "../_actions"

export default function Users() {
  const [searchKeywords, setSearchKeywords] = useState("");
  const dispatch = useDispatch();
 const inventoryInfo = useSelector((state) => state.inventoryData);
 const userInfo = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory());
    dispatch(userActions.getAll())
  }, []);
  let totitems = 0
  const invList = (filteredStock, srno) => {
    return(
    <li
      key={filteredStock.uniqueId + srno}
      data-toggle='tooltip'
      data-placement='top'
      title={`OrderNo/OrderName:${filteredStock.orderno}/${filteredStock.ordername}\n \
                                    Item Serial No:${filteredStock.serialno}\n \
                                    Warranty Ends:${filteredStock.warranty_ends_on}`}
      className={filteredStock.isdeallocated ? "my-alert-danger" : ""}
      style={{ fontSize: "12px" }}
    >
      
      {`${srno + 1} - ${filteredStock.itemname}`}
      {!filteredStock.isdeallocated ? (
        <i
          className='fa fa-eye'
          style={{
            float: "right",
            cursor: "pointer",
          }}
        />
      ) : (
        <>
          <i
            className='fa fa-eye-slash'
            style={{
              float: "right",
              cursor: "pointer",
            }}
          />
        </>
      )}
    </li>)
  };
 const filteredInventory = (userid)=>{
      return totitems = inventoryInfo.inventoryList
        .filter((stock) => stock.id === userid)
        .map((filteredStock, srno) => <>{invList(filteredStock, srno)}</>);
       
 } 
 const allusers = userInfo.userList
   .filter((val) => {
     if (searchKeywords === "") return val;
     else if (val.name.toLowerCase().includes(searchKeywords.toLowerCase()))
       return val;
     else if (
       val.designame.toLowerCase().includes(searchKeywords.toLowerCase())
     )
       return val;
   })
   .map((user, index) => (
     <>
       <br />
       <div className='col-12' style={{}} key={user.uniqueId}>
         <Card border='primary' style={{ height: "auto" }}>
           <Card.Header>
             <b style={{ cursor: "pointer" }}>{user.name}</b>
           </Card.Header>
           <Card.Body>
             <Card.Title>User ID-{user.id}</Card.Title>
             <Card.Text>
               <div className='container2'>
                 <div className='row'>
                   <div className='col-md-3'>
                     Branch - {user.branchname}
                     <br />
                     Designation - {user.designame}
                   </div>
                   <div className='col-md-6 alert alert-success'>
                     <i
                       className='fa fa-close'
                       style={{ float: "right", cursor: "pointer" }}
                     />
                     Items in Possesion
                     <br />
                     {filteredInventory(user.id)}
                   </div>
                   <div className='col-md-3 alert alert-primary'>
                     <b>Stock Info </b>
                     <br />
                     <li style={{ fontSize: "13px" }}>
                       Total Items ({totitems.length})
                       <br />
                       Total Sets ({0})
                     </li>
                   </div>
                 </div>
               </div>
             </Card.Text>
           </Card.Body>
         </Card>
       </div>
     </>
   ));



  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-9'>
          <input
            style={{
              width: "90%",
              border: "3px solid #00b4cc",
              borderRight: "3px solid #00b4cc",
              padding: "5px",
              height: "40px",
              borderRadius: "5px 5px 5px 5px",
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
          (
            {allusers}
        </div>
      </div>
    </div>
  );
}
