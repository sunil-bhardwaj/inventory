import React, {useContext} from "react";
import {AdminContext} from '../AdminContext'
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./SetSideBar.css";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";
function SetSideBar(props) {
  
const Admin = useContext(AdminContext); 
const User = useContext(UserContext); 
const closeBox = () => {
  //props.setShowSideBar(false)
  Admin.setBox([])
}; 
console.log(props)
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
            >{`Items Added To ${props.setName}`}</h6>
            <h6
              className='p-1 border-bottom'
              style={{
                color: "#c0d2ea",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
              }}
            >{`Total Items In Set ${Admin.box.length}`}</h6>
          </div>
          {Array.isArray(Admin.box) && Admin.box.length ? (
            <div className='row col-md-12'>
              {Admin.box.map((stock, srno) => (
                <Product
                  
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
                <Link to='/viewsets'>
                  {" "}
                  <span className='fas fa-upload'></span> Publish Set{" "}
                </Link>
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
