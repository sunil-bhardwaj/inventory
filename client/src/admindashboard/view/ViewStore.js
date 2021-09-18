import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../dashboard/Users.css";
import RightBar from "../../mycomponents/RightBar";
import { UserContext } from "../../UserContext";
import Product from "../components/Product";
import SetSideBar from "../components/SetSideBar";
function ViewStore(props) {
  const User = useContext(UserContext);

  const [searchKeywords, setSearchKeywords] = useState("");

  //console.log(User);
  var redirected = false;
  if (props.location.state) redirected = props.location.state.redirected;

  const listItems = User.stocks
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
    .filter((stock) => stock.id == null || stock.isdeallocated === true)
    .map((stock, srno) => (
      <Product
        redirect={redirected}
        key={uuidv4()}
        srno={srno + 1}
        image={stock.image}
        brandname={stock.brandname}
        serialno={stock.serialno}
        itemtype={stock.itemtype}
        itemname={stock.itemname}
        warranty_end_date={stock.warranty_ends_on}
        orderno={stock.orderno}
        ordername={stock.ordername}
      />
    ));

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
              top: "10px",
              bottom: "10px",
              overflowY: "scroll",
              backgroundColor: "#254063",
            }}
          >
            <SetSideBar
              setName={props.location.state.setname}
              setid={props.location.state.id}
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
