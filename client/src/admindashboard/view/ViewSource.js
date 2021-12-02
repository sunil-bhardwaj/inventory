import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";

import AddSource from "../add/AddSource";

function ViewSource() {
  const dispatch = useDispatch();
  const sourcesInfo = useSelector((state) => state.adminData.sourceList);

  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newSourceWindow, setnewSourceWindow] = useState(false);
  useEffect(() => {
      console.log("Iam here")
    dispatch(adminActions.viewAllSources());
  }, []);

  const add = (e) => {
    e.preventDefault();
    setnewSourceWindow(!newSourceWindow);
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
            }}
            className='input'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          <div style={{ display: "block", width: 700, padding: 30 }}>
            <ListGroup>
              {sourcesInfo
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
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newSourceWindow ? (
            <AddSource closehandler={add} isupdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewSource;
