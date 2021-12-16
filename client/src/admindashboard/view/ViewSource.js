import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, alertActions } from "../../_actions";

import { useLocation } from "react-router-dom";
import "../css/admin.css";
import ListGroup from "react-bootstrap/ListGroup";
import Icon from "@material-ui/core/Icon";
import { confirmAlert } from "react-confirm-alert";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSource from "../add/AddSource";
function ViewSource(props) {

  const dispatch = useDispatch();
  const sourceInfo = useSelector((state) => state.adminData.sourceList);
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);
   
  const { from } = location.state || { from: { pathname: "/viewsources" } };
  const [searchKeywords, setSearchKeywords] = useState("");
  const [newSourceWindow, setnewSourceWindow] = useState(false);
  const [source, setSource] = useState([]);
  useEffect(() => {
    dispatch(adminActions.viewAllSources());
  }, []);
  
  const alert = useSelector((state) => state.helperData);
  const add = (e) => {
    dispatch(alertActions.clear());
    setSource([]);
    e.preventDefault();
    setIsUpdate(false);
    setnewSourceWindow(!newSourceWindow);
  };
  const updateSource = (selectedsource) => {
    //  console.log(selecteduser)
    dispatch(alertActions.clear());
    setSource(selectedsource);
    setIsUpdate(true);
    setnewSourceWindow(!newSourceWindow);
  };
  const deleteSource = (selectedsource) => {
    console.log(selectedsource);
    dispatch(alertActions.clear());
    setSource(selectedsource);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "deletesource" } };
      confirmAlert({
        title: "Delete Source Request",
        message: `Delete Source '${selectedsource.ordername}'`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteSource(selectedsource, action));
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };
  return (
   
        <div className='container'>
          <div className='row'>
            <h4>Existing Sources</h4>

            <div className='col-md-4 float-left'>
              <button
                className='btn btn-success'
                style={{ marginBottom: "6px", marginRight: "50%" }}
                onClick={add}
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
                  //dispatch(alertActions.clear());
                }}
                className='input'
                placeholder='Search...'
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8'>
              <div style={{ display: "block", width: 700, padding: 30 }}>
                <p className={alert.type}>{alert.message}</p>
                <ListGroup>
                  {sourceInfo
                    .filter((val) => {
                     
                      if (searchKeywords === "") return val;
                      else if (
                        val.ordername
                          .toLowerCase()
                          .includes(searchKeywords.toLowerCase())
                      )
                        return val;
                    })
                    .map((source, index) => (
                      <ListGroup.Item
                        key={source.id}
                        style={{ backgroundColor: "#e7f3f3" }}
                      >
                        {source.id}
                        --{source.ordername}
                        <EditIcon
                          onClick={() => updateSource(source)}
                          style={{
                            marginLeft: "3rem",
                            float: "right",
                            cursor: "pointer",
                          }}
                          color='primary'
                        />
                        <DeleteIcon
                          style={{
                            marginLeft: "3rem",
                            float: "right",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteSource(source)}
                        />
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </div>
            </div>
            <div className='col-md-4'>
              {newSourceWindow ? (
                <AddSource
                  closehandler={add}
                  source={source}
                  isUpdate={isUpdate}
                />
              ) : null}
            </div>
          </div>
        </div>
  )
}

export default ViewSource;
