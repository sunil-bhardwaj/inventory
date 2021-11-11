import React, {useContext, useEffect} from "react";
import {AdminContext} from '../AdminContext'
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./SetSideBar.css";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";
function SetSideBar(props) {
   const history = useHistory();
  const token = localStorage.getItem("token");
const Admin = useContext(AdminContext); 
const User = useContext(UserContext); 
const closeBox = () => {
  User.setStocks([...User.stocks, User.stocks]);
  //props.setShowSideBar(false)
  Admin.setBox([])
}
 const fetchSetItems = async () => {
   const results = await axios(
     `http://localhost:3001/api/admin/sets/view/${props.setid}`,
     {
       headers: {
         "x-access-token": token,
       },
     }
   )
     .then((rrr) => Admin.setBox([...rrr.data]))
     .catch((err) => {
       if (err.response.status === 401) {
         history.push("/unauthorized");
       }
     });
  // console.log(Admin.box);
 };
 /*useEffect(() => {
    fetchSetItems();
  }, []);*/
  const publishSet = async (e) => {
    //if(Admin.box.length <0){Admin.setBox([])}
       // console.log(Admin.box);
        const response = await axios
          .post(
            `http://localhost:3001/api/admin/sets/publish/${props.setid}`,
            {
              box: Admin.box,
            },
            {
              headers: {
                "x-access-token": token,
              },
            }
          )
          .then("Updation Successfull")
          .catch((err) => err + "Error State during publishing of Set");
    
   
    //e.preventDefault();
    
  };
//console.log(props)
//console.log(Admin.box);
  return (
    <>
      <div id='mobile-filter'>
        <div className='row'>
          <div className='col-md-12'>
            <h6
              className='p-1 border-bottom'
              style={{
                color: "#c0d2ea",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
              }}
            >{`Items Alloted To ${props.setName}`}</h6>
            <h6
              className='p-1 border-bottom'
              style={{
                color: "#c0d2ea",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
              }}
            >{`Total Items In Set ${Admin.box.length>0?Admin.box.length:0}`}</h6>
          </div>
          {Array.isArray(Admin.box) && Admin.box.length>0 ? (
            <div className='row col-md-12'>
              {Admin.box.map((stock, srno) => (
                <Product
                  redirect={true}
                  key={uuidv4()}
                  in='sidebar'
                  srno={srno + 1}
                  inventoryid={stock.inventoryid}
                  image={stock.image}
                  brandname={stock.brandname}
                  serialno={stock.serialno}
                  itemtype={stock.itemtype}
                  itemname={stock.itemname}
                  warranty_end_date={stock.warranty_ends_on}
                  orderno={stock.orderno}
                  ordername={stock.ordername}
                />
              ))}
            </div>
          ) : (
            <h6
              className='p-1 border-bottom'
              style={{
                color: "#c0d2ea",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Empty Set
            </h6>
          )}

          <div className='row col-md-12'>
            {" "}
            <ul className='list-group'>
              <li className=' list-group-item-action btn-style-1 mb-2 rounded'>
                <button className='list-group-item-action btn-style-1  rounded' onClick={() => publishSet()}>
                  {" "}
                  Publish Set
                </button>
              </li>
              <li className='list-group-item-action btn-style-1 mb-2 rounded'>
                <i onClick={() => closeBox()}>
                  {" "}
                  <span className='fa fa-close'></span> Clear{" "}
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetSideBar;
