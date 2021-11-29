import React, {  useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import SideBar from "../Sidebar"
import AddBranch from "../add/AddBranch";
import StoreIcon from "@material-ui/icons/Store";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSet from "../add/AddSet";
import ViewUsers from "./ViewUsers"
import { useLocation } from "react-router-dom";
import Description from "../components/Description";
import SetSideBar from "../components/SetSideBar";
import { Redirect } from "react-router-dom";
import {inventoryActions} from "../../_actions"
import {useDispatch, useSelector} from "react-redux"
import "./ViewSets.css"
import { confirmAlert } from 'react-confirm-alert'; 


function ViewSets() {
  let redirected = 'false'
  const location = useLocation()
  if(location.state)
  redirected = location.state.redirected
  const dispatch = useDispatch()
  const setsInfo = useSelector((state)=>state.inventoryData.sets) 
  const [selectUser, setSelectUser] = useState(false)
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("");
  const setItemsInfo = useSelector((state)=>state.inventoryData.setItems)
  const inventoryInfo = useSelector((state) => state.inventoryData);
  const [newSetWindow, setnewSetWindow] = useState(false);
   const [viewSetWindow, setViewSetWindow] = useState(false);
   const [setId, setSetId] = useState("");
   const [setName, setSetName] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  console.log(redirected)
  //const [showSetTab, setShowSetTab] = useState(false);
  let totitems = 0;
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory()); 
   dispatch(inventoryActions.getAllSets())
   
  }, []);
 
  const add = (edit,set)=>{
   
      if(edit)
      {
         setSetId(set.id);
         setSetName(set.setname);
        setIsUpdate(true)
        setnewSetWindow(!newSetWindow);

      }else{
        setIsUpdate(false);
        setnewSetWindow(!newSetWindow);  
      }
  }
  const viewsetitems = (set) => {
      console.log(set)
      setSetId(set.id);
      setSetName(set.setname);
      setViewSetWindow(!viewSetWindow);
   
  }
  const selectuser=(user,from)=>{
   
    if(from.action === '/storeicon')
    {
      setSetId(user.id);
      setSetName(user.setname);
    }
     if (from.action === "/viewusers")
      {
       //console.log(user.id, user.name, from.oldsetid, from.oldsetname);
        allocateset(user.id,user.name,from.oldsetid, from.oldsetname);


      }
    
      setSelectUser(!selectUser);
      
     }
         
       
  
  const allocateset = (newUserId, newUserName, oldUserId, oldUserName) => {
    
    console.log(newUserId, newUserName, oldUserId, oldUserName);
    //e.preventDefault();
    const { action } = {
      action: { action: "/allocateset", payload: { newsetid:newUserId, newsetname:newUserName, oldsetid:oldUserId } },
    };
    confirmAlert({
      title: "Allocate Set Request",
      message: `Allocate entire Set '${oldUserName}' to '${newUserName}' store!Are You Sure?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
           

             dispatch(inventoryActions.getSetItems(oldUserId, action));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  
  const movesettostore = (set) => {
    
    //e.preventDefault();
    const { action } = { action: { action: "/movesettostore" } };
    confirmAlert({
      title: "Move Set Request",
      message: `Move entire Set '${set.setname}' to store!Are You Sure?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("clicked")
            
           dispatch(inventoryActions.getSetItems(set.id,action));
           
          
          },
        },
        {
          label: "No",
        },
      ],
    })
    
  };
  const deleteset = (e,set) => {
    
    e.preventDefault()
    const { action } = { action: { action: "/deleteset" } };
     confirmAlert({
       title: "Delete Set Request",
       message: `Delete Set '${set.setname}'. All alloted items to ${set.setname} set will go to store! Are You Sure?`,
       buttons: [
         {
           label: "Yes",
           onClick: () =>{ 
             dispatch(inventoryActions.releaseAllSetItems(set.id, action));
                         
            },

         },
         {
           label: "No",
         },
       ],
     });
 };
   const filteredInventory = (setid) => {
    
     return (totitems = inventoryInfo.inventoryList
       .filter((stock) => stock.setid === setid )
       .map((filteredStock, srno) => <>{invList(filteredStock, srno)}</>));
   };
 
 const invList = (filteredStock, srno) => {
   
   return (
     <li
       key={filteredStock.uniqueId + srno}
       data-toggle='tooltip'
       data-placement='top'
       title={`OrderNo/OrderName:${filteredStock.orderno}/${filteredStock.ordername}\n \
                                    Item Serial No:${filteredStock.serialno}\n \
                                    Warranty Ends:${filteredStock.warranty_ends_on}`}
       className={filteredStock.isdeallocated ? "my-alert-danger" : ""}
       style={{ fontSize: "12px" }}
     >
       {`${srno + 1} - ${filteredStock.itemname}`}
       {!filteredStock.isdeallocated ? (
         <i
           className='fa fa-eye'
           style={{
             float: "right",
             cursor: "pointer",
           }}
         />
       ) : (
         <>
           <i
             className='fa fa-eye-slash'
             style={{
               float: "right",
               cursor: "pointer",
             }}
           />
         </>
       )}
     </li>
   );
 };
  
  // console.log(Admin.branches);
  return (
    <div className='container'>
      <div className='row'>
        <h4>Existing Sets</h4>

        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
            onClick={() => add(false)}
          >
            Create New Set
          </button>
        </div>
        <div className='col-md-4 text-center float-right'>
          <input
            style={{
              width: "90%",
              border: "3px solid #00b4cc",
              borderRight: "3px solid #00b4cc",
              padding: "5px",
              height: "40px",
              borderRadius: "5px 5px 5px 5px",
              outline: "none",
              color: "#9dbfaf",
            }}
            type='search'
            value={searchKeywords}
            onChange={(e) => {
              setSearchKeywords(e.target.value);
            }}
            className='input'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='mainDiv'>
        <div
          className='rightDiv'
          /*style={{
            display: "flex",
            //width: 700,
            padding: 30,
            height: "75vh",
          }}*/
        >
          <div className='itemscontainer'>
            {setsInfo
              .filter((val) => {
                if (searchKeywords === "") return val;
                else if (
                  val.setname
                    .toLowerCase()
                    .includes(searchKeywords.toLowerCase())
                )
                  return val;
              })
              .map((set, index) => (
                <>
                  <div className='st-box'>
                    <article class='card' style={{ position: "inherit" }}>
                      {set.instore ? (
                        <div>
                          <p
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontSize: "25px",
                              padding: "10px 10px 10px 10px",
                            }}
                          >
                            InStore
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              fontSize: "25px",
                              padding: "10px 10px 10px 10px",
                            }}
                          >
                            Allocated
                          </p>
                        </div>
                      )}

                      <div
                        style={{ backgroundColor: "cadetblue" }}
                        class='card-content'
                      >
                        <h5>{set.setname}</h5>
                        <p> </p>
                      </div>
                      <div
                        style={{
                          border: "3px solid black",
                          //display: "inline-block",
                          backgroundColor: "seagreen",
                        }}
                      >
                        <p style={{ fontSize: "2.0rem" }}>
                          {" "}
                          <AddIcon
                            style={{
                              //float: "right",
                              cursor: "pointer",
                            }}
                            color='primary'
                            onClick={() => viewsetitems(set)}
                          />{" "}
                          <EditIcon
                            style={{
                              marginLeft: "2rem",
                              // float: "right",
                              cursor: "pointer",
                            }}
                            color='primary'
                            onClick={() => add(true, set)}
                          />{" "}
                          <DeleteIcon
                            onClick={(e) => deleteset(e, set)}
                            style={{
                              marginLeft: "2rem",
                              // float: "right",
                              color: "red",
                              cursor: "pointer",
                            }}
                          />
                          {set.instore ? (
                            <StoreIcon
                              onClick={() =>
                                selectuser(set, { action: "/storeicon" })
                              }
                              style={{
                                marginLeft: "2rem",
                                // float: "right",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <StoreIcon
                              onClick={() => movesettostore(set)}
                              style={{
                                marginLeft: "2rem",
                                // float: "right",
                                color: "red",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </p>
                      </div>
                      <picture class='thumbnail'>
                        <div
                          style={{ backgroundColor: "#3c2a2a" }}
                          class='card-content'
                        >
                          <h5>ITEMS IN SET</h5>
                        </div>
                        <div style={{ backgroundColor: "#033a4c" }}>
                          {filteredInventory(set.id)}
                        </div>
                      </picture>
                    </article>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div
          className='leftDiv'
          //style={{ border: "2px solid green" }}
        >
          Second Window
          {newSetWindow ? (
            <AddSet
              closehandler={() => add()}
              isUpdate={isUpdate}
              setid={setId}
            />
          ) : null}
          {selectUser ? (
            <ViewUsers
              //allocateset={() => allocateset()}
              oldsetid={setId}
              oldsetname={setName}
              closehandler={selectuser}
            />
          ) : null}
          {viewSetWindow ? (
            <Redirect
              to={{
                pathname: `/viewstore/`,
                state: { redirected: true, setName: setName, setId: setId },
              }}
            />
          ) : null}
          <RightBar/>
        </div>
      </div>
    </div>
  );
}

export default ViewSets;
