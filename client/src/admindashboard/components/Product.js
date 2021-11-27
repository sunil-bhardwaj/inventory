import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import dateFormat from "dateformat";
import Description from "./Description";
import Keyboard from "../../admindashboard/images/keyboard.jpg";
import AllInOne from "../../admindashboard/images/allinone.jpg";
import Mouse from "../../admindashboard/images/mouse.jpg";
import Monitor from "../../admindashboard/images/monitor.jpg";
import Printer from "../../admindashboard/images/printer.jpg";
import CPUs from "../../admindashboard/images/cpu.jpg";
import UPSs from "../../admindashboard/images/ups.jpg";
import Laptop from "../../admindashboard/images/laptop.jpg";
import Tab from "../../admindashboard/images/tab.jpg";
import Scanner from "../../admindashboard/images/scanner.jpg";
import Servers from "../../admindashboard/images/server.jpg";
import Projector from "../../admindashboard/images/projector.jpg";
import VC from "../../admindashboard/images/vc.jpg";
import { GetCurrentDate } from "../utils/GetCurrentDate";
import {inventoryActions} from "../../_actions"
import WarrantyExpired from "../../admindashboard/images/warrantyexpired.png";
import "./Product.css";


function Product(props) {

  
  const dispatch = useDispatch()
  const [showDescriptionTab, setShowDescriptionTab] = useState(false);
  const [showRemovebutton, setShowRemovebutton] = useState(false);
  const viewDetails = () => {
   
    setShowDescriptionTab(!showDescriptionTab);
  };
   const addtoset = () => {
       dispatch(inventoryActions.addItemToSet(props.product.inventoryid, props.setId),
         //dispatch(inventoryActions.getStoreInventory()),
         //dispatch(inventoryActions.getSetItems(props.seId))
       );
   };
   const removefromset = () => {
     dispatch(
       inventoryActions.removeItemFromSet(props.product.inventoryid, props.setId)
       //dispatch(inventoryActions.getStoreInventory()),
       //dispatch(inventoryActions.getSetItems(props.seId))
     );
   };
  
  var cusimage =
    "data:image/jpeg;base64,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";

  if (props.product.itemtype === "Mouse") cusimage = Mouse;
  if (props.product.itemtype === "Keyboard") cusimage = Keyboard;
  if (props.product.itemtype === "CPU") cusimage = CPUs;
  if (props.product.itemtype === "Monitors") cusimage = Monitor;
  if (props.product.itemtype === "Printers") cusimage = Printer;
  if (props.product.itemtype === "UPS") cusimage = UPSs;
  if (props.product.itemtype === "Laptop") cusimage = Laptop;
  if (props.product.itemtype === "Tab") cusimage = Tab;
  if (props.product.itemtype === "Scanner") cusimage = Scanner;
  if (props.product.itemtype === "Servers") cusimage = Servers;
  if (props.product.itemtype === "Projector") cusimage = Projector;
  if (props.product.itemtype === "VC") cusimage = VC;
  if (props.product.itemname === "All In One") cusimage = AllInOne;

  return (
    <>
  
      <div class='productdiv' style={{ float: "left", padding: "10px" }}>
        <div className='card-image'>
          {props.in === "sidebar" ? null : (
            <img
              src={cusimage} 
              alt='img not found'
              width='100%'
              style={{ padding: "10px", height: "200px", width: "200px" }}
            />
          )}
          
        </div>

        <i
          className='card-action '
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, rgb(114 150 195) 0%, rgb(229 236 236 / 59%) 35%, rgb(136 154 158) 100%)",
          }}
        >
          {`${props.srno}`}
        </i>
        <div className='card-heading'>{props.product.brandname}</div>
        <div className='card-text'>{props.product.itemtype}</div>
        <div className='card-text'>{props.product.itemname}</div>
        <div className='card-text'>{props.product.serialno}</div>
        <div className='card-text'>
          Warranty Ends:
          {props.warranty_end_date ? (
            GetCurrentDate() > props.product.warranty_end_date ? (
              <i className='alert-danger'>
                {dateFormat(props.product.warranty_end_date, "mmmm dS yyyy")}
              </i>
            ) : (
              <i className='alert-success'>
                {dateFormat(props.product.warranty_end_date, "mmmm dS yyyy")}
              </i>
            )
          ) : (
            "N/A"
          )}
        </div>

        {props.redirect ? (
          (showRemovebutton && props.in === "viewstore") ||
          props.in === "sidebar" ? (
            <>
              <button onClick={() => viewDetails()} className='card-button'>
                View Details
              </button>
              {props.in !== "sidebar" ? null : (
                <button
                  className='card-button bg-color-red'
                  onClick={() => removefromset()}
                >
                  Remove From Set
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => viewDetails()} className='card-button'>
                View Details
              </button>
              <button className='card-button' onClick={() => addtoset()}>
                Add To Set
              </button>
            </>
          )
        ) : (
          <>
            <button onClick={() => viewDetails()} className='card-button'>
              View Details
            </button>
          </>
        )}
      </div>
      {showDescriptionTab ? (
        <Description
          product={props.product}
          key={props.key}
          viewDetails={() => viewDetails()}
          image={cusimage}
        />
      ) : null}
    </>
  );
}

export default Product;
