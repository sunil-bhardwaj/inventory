import React, {  useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import SideBar from "../Sidebar"
import AddBranch from "../add/AddBranch";

import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSet from "../add/AddSet";
import Description from "../components/Description";
import SetSideBar from "../components/SetSideBar";
import { Redirect } from "react-router-dom";
import {inventoryActions} from "../../_actions"
import {useDispatch, useSelector} from "react-redux"


function ViewSets() {
  const dispatch = useDispatch()
  const setsInfo = useSelector((state)=>state.inventoryData.sets) 
  
  const [newSetWindow, setnewSetWindow] = useState(false);
   const [viewSetWindow, setViewSetWindow] = useState(false);
   const [setId, setSetId] = useState("");
   const [setName, setSetName] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  
  //const [showSetTab, setShowSetTab] = useState(false);
  
  useEffect(() => {
    
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
            Add New
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

      <div className='row'>
        <div className='col-md-8'>
          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
              height: "75vh",
              overflowY: "scroll",
            }}
          >
            <ListGroup>
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
                  <ListGroup.Item
                    key={set.id + index}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {set.id}--{set.setname}
                    <AddIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => viewsetitems(set)}
                    />
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => add(true, set)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>
        <div className='col-md-4' style={{ border: "2px solid green" }}>
          {newSetWindow ? (
            <AddSet
              closehandler={() => add()}
              isUpdate={isUpdate}
              setid={setId}
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
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default ViewSets;
