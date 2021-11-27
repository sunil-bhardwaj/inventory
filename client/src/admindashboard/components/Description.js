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
              This Item Is Alloted To {}
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
                <i className='fas fa-play mr-2'></i>Play Episode
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
