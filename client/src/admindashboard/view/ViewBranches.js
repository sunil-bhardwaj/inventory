import React, { useContext, useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import ReactPaginate from "react-paginate";
import AddBranch from "../add/AddBranch";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";
const token = localStorage.getItem("token");

function ViewBranches(props) {
  const dispatch = useDispatch();
  const branchesInfo = useSelector((state) => state.adminData.branchData);
  const [searchKeywords, setSearchKeywords] = useState("");

  useEffect(() => {dispatch(adminActions.viewBranches());}, []);

  return (
    <div className='container'>
      <div className='row'>
        <h4>Existing Branches</h4>

        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
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
              {branchesInfo
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.branchname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((branch, index) => (
                  <ListGroup.Item
                    key={branch.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {branch.id}
                    --{branch.branchname}
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
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}

export default ViewBranches;
