import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
//import "../../dashboard/Users.css";
//import RightBar from "../../mycomponents/RightBar";
//import Product from "../components/Product";
//import { inventoryActions } from "../../_actions/";
//import SetSideBar from "../components/SetSideBar";
import { useDispatch, useSelector } from "react-redux";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
function Testing() {
    const [searchKeywords, setSearchKeywords] = useState("");
    const [value, setValue] = React.useState(0);
     var redirected = false; 
    return (
      <div className='container'>
        <Paper square>
          <Tabs
            value={value}
            textColor='primary'
            indicatorColor='primary'
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Tab label='Items' />
            <Tab label='Sets' />
          </Tabs>
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
          {value === 0 ? (
            redirected ? (
              <div
                style={{
                  position: "relative",
                  float: "right",
                  marginRight: "160px",
                  fontSize: "x-large",
                  textDecoration: "underline",
                  textDecorationColor: "olive",
                }}
              >
                <Link to='/viewsets'>Back</Link>
              </div>
            ) : null
          ) : value === 1 ? (
            <h2>Sets Page</h2>
          ) : (
            <h2>To tab found</h2>
          )}
        </Paper>
      </div>
    );
}

export default Testing
