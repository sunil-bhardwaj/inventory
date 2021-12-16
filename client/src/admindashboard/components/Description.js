import React from "react";
import { Link } from "react-router-dom";
import "./Description.css";
function Description(props) {
  console.log(props)
  return (
    <>
      <div className='container py-4' style={{ position: "fixed", zIndex: 99 }}>
        <article className='postcard dark blue'>
          <img
            className='postcard__img'
            src={props.image}
            alt=''
          />

          <div className='postcard__text'>
            <h1 className='postcard__title blue'>{props.serialno}</h1>
            <div className='postcard__subtitle small'>
              <i className='fas fa-calendar-alt mr-2'></i>
              {props.product.warranty_end_date}
            </div>
            <div className='postcard__bar'></div>
            <div className='postcard__preview-txt'>
              <p>This Item Is Belongs To Set :- {props.product.setid?props.product.setid:'N/A'}</p>
              <p>Warranty Ends On :- {props.product.warranty_end_date?props.product.warranty_end_date:'N/A'}</p>
              <p>This Item Is Belongs To User :- {props.product.name?props.product.name:'N/A'}</p>
              <p>This Item Is Belongs Order Number :- {props.product.ordername?props.product.ordername:'N/A'}</p>
              <p>This Item unique Serial No :- {props.product.serialno?props.product.serialno:'N/A'}</p>
              <p>This Item Type is :- {props.product.itemtype?props.product.itemtype:'N/A'}</p>
              <p>This Item Name is :- {props.product.itemname?props.product.itemname:'N/A'}</p>
            </div>
            <ul className='postcard__tagbox'>
              <li className='tag__item'>
                <i className='fas fa-tag mr-2'></i>
                {props.product.itemname}
              </li>
              <li className='tag__item'>
                <i className='fas fa-clock mr-2'></i>
                {props.product.itemtype}
              </li>
              <li className='tag__item play blue'>
                <i className='fas fa-play mr-2'></i>{props.product.ordername}
              </li>
            </ul>
          </div>

          <i
            style={{ cursor: "pointer", zIndex: "89", padding: "15px" }}
            className='fas fa-times'
            onClick={props.viewDetails}
          >
            &nbsp;Close
          </i>
        </article>
      </div>
    </>
  );
}

export default Description;
