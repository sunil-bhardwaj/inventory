import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../../dashboard/Users.css";
import RightBar from "../../mycomponents/RightBar";
import Product from "../components/Product";
import { inventoryActions } from "../../_actions/";
import SetSideBar from "../components/SetSideBar";
import { useDispatch, useSelector } from "react-redux";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import ViewSets from "./ViewSets";
function ViewStore(props) {

 console.log(props)
  const dispatch = useDispatch();
 
  const storeItemsInfo = useSelector((state) => state.inventoryData.storeItems);
  //const setItemsInfo = useSelector((state) => state.inventoryData.setItems);
  useEffect(() => {
    dispatch(inventoryActions.getStoreInventory());
  }, []);

  const [searchKeywords, setSearchKeywords] = useState("");

  var redirected = false;
  var selectedSetId = null;
  var selectedSetName = "";
  if (props.location.state) {
    redirected = props.location.state.redirected;
    selectedSetId = props.location.state.setId;
    selectedSetName = props.location.state.setName;
    console.log(selectedSetId, selectedSetName, redirected);
  }

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
});*/ .filter(
      (fstock, index) => fstock.setid === null
    )
    .map((stock, srno) => (
      <>
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
  const tabs = {
    items: {
      title: "Items",
      content: (
        <>
          {" "}
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
            {redirected ? (
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
            ) : null}
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
                <div
                  style={{ position: "absolute", right: "109px" }}
                  className='col-md-2'
                >
                  <RightBar />
                </div>
              )}
            </div>
          </div>
        </>
      ),
    },
    sets: {
      title: "Sets",
      content: (
        <ViewSets
          redirectedfromtabs={true}
          setName={selectedSetName}
          setId={selectedSetId}
        />
      ),
    },
  };
  const [activeTab, setActiveTab] = useState("items");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className='row p-4'>
      <div className='col-lg-12'>
        <h2 className='mb-4'>Store</h2>

        <Nav tabs>
          {Object.entries(tabs).map((tab) => (
            <NavItem key={tab[0]}>
              <NavLink
                className={activeTab === tab[0] ? "active" : ""}
                onClick={() => {
                  toggle(tab[0]);
                }}
                role='button'
              >
                {tab[1].title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent activeTab={activeTab}>
          {Object.entries(tabs).map((tab) => (
            <TabPane key={tab[0]} tabId={tab[0]}>
              {tab[1].content}
            </TabPane>
          ))}
        </TabContent>
      </div>
    </div>
  );
}

export default ViewStore;
