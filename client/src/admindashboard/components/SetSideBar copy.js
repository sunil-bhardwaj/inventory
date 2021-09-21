import React, { useContext } from "react";
import { AdminContext } from "../AdminContext";
import { Link } from "react-router-dom";
import "./SetSideBar.css";
function SetSideBar(props) {
  const Admin = useContext(AdminContext);
  console.log(props);
  return (
    <>
      <div id='mobile-filter'>
        <div>
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
          <ul>
            {Admin.box.map((bo, srno) => (
              <li key={srno} className='btn-style-2'>
                <Link to='#'>{bo.brandname}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6
            className='p-1 border-bottom'
            style={{
              color: "#c0d2ea",
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Actions
          </h6>
          <p className='mb-2'></p>
          <ul className='list-group'>
            <li className=' list-group-item-action btn-style-1 mb-2 rounded'>
              <Link to='/viewsets'>
                {" "}
                <span className='fas fa-upload'></span> Publish Set{" "}
              </Link>
            </li>
            <li className='list-group-item-action btn-style-1 mb-2 rounded'>
              <Link to='/viewsets'>
                {" "}
                <span className='fa fa-close'></span> Close{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SetSideBar;
