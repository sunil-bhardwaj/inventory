import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../../dashboard/Users.css";
import RightBar from "../../mycomponents/RightBar";
import { AdminContext } from "../AdminContext";
import { UserContext } from "../../UserContext";
import { Prompt, useHistory } from "react-router";
import Product from "../components/Product";
import SetSideBar from "../components/SetSideBar";
import { Prev } from "react-bootstrap/esm/PageItem";

function ViewStore(props) {
  const history = useHistory();
  const User = useContext(UserContext);
  const Admin = useContext(AdminContext);
  const token = localStorage.getItem("token");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [showSideBar, setShowSideBar] = useState(true);
  const [resetStock, setResetStock] = useState(false);
  const [published, setPublished] = useState(false);
  const [inCart, setInCart] = useState([])
  
  console.log("Start")
  
  const fetchSetItems = async () => {
   
    const results = await axios(
      `http://localhost:3001/api/admin/sets/view/${props.location.state.setId}`,
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
    
  };

  useEffect(() => {
    if (props.location.state !== undefined) {
      fetchSetItems();
      
    }
  }, []);
  
  
  
  const addtocart = (stock) => {
  
 
  Admin.setBox([...Admin.box, stock]);
  
  //let result = User.stocks.filter((o1) => Admin.box.some((o2) => o1.id !== o2.id));
  //res = listItems.filter((f) => !Admin.box.includes(f));
  //setArr([res]);
  setResetStock(true)
    // console.log(Admin.box, listItems, res, result);
    
 //console.log(Admin.box)
    //User.setStocks([...arr]);
    //setShowRemovebutton(true);
  };
  useEffect(() => {
    
    console.log(User.stocks,Admin.box,resetStock);
    //addtocart
        if(resetStock){
           
         User.setStocks(
           User.stocks.filter(function (stock) {
             return Admin.box.some(function (o2) {
               return stock.inventoryid === o2.inventoryid;
             });
           })
         );
          
          console.log(User.stocks,Admin.box,"Reset Stock="+ resetStock);
           //User.setStocks([User.stock]);
            setResetStock(false)
        }
          
    //addtocart()
  }, [resetStock]);
  
  
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
    /*var result = result1.filter(function (o1) {
    return result2.some(function (o2) {
        return o1.id === o2.id; // return the ones with equal id
   });
});*/.filter(function(stock) {
         return Admin.box.some(function(o2){ 
          return (
            stock.inventoryid !== o2.inventoryid &&
            (stock.isdeallocated === true ||
              stock.setid === null ||
              stock.setid === 0)
          );
        })
    
      

       
      })
    .map((stock, srno) => (
      <>
        {
          /*Admin.box.find(()=>{
            
    })*/
          // Admin.box.some((o2) => stock.inventoryId === o2.inventoryId?setInCart(true):setInCart(false))



          
        }
        <Product
          inCart={inCart}
          addcart={() => addtocart(stock)}
          stock={stock}
          in='viewstore'
          redirect={redirected}
          key={uuidv4()}
          srno={srno + 1}
          image={stock.image}
          inventoryid={stock.inventoryid}
          brandname={stock.brandname}
          serialno={stock.serialno}
          itemtype={stock.itemtype}
          itemname={stock.itemname}
          warranty_end_date={stock.warranty_ends_on}
          orderno={stock.orderno}
          ordername={stock.ordername}
        />
      </>
    ));
// var arr = listItems;
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

        {redirected && showSideBar ? (
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
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
              setName={props.location.state.setName}
              setId={props.location.state.setId}
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
