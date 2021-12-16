import React, {  useEffect, useState } from "react";
import { alertActions } from "../../_actions";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert"; 
import AddBranch from "../add/AddBranch";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";


function ViewBranches(props) {
  const dispatch = useDispatch();
  const branchesInfo = useSelector((state) => state.adminData.branchList);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newBranchWindow, setnewBranchWindow] = useState(false);
  const [branch, setBranch] = useState([]);
  useEffect(() => {
    dispatch(adminActions.viewBranches());
  }, []);
 const alert = useSelector((state)=>state.helperData)
  const add = (e) => {
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewBranchWindow(!newBranchWindow);
  };
  const updateBranch = (selectedbranch) => {
    dispatch(alertActions.clear());
    setBranch(selectedbranch);
    setIsUpdate(true);
    setnewBranchWindow(!newBranchWindow);
  };
  const deleteBranch = (selectedbranch) => {
    
    dispatch(alertActions.clear());
    setBranch(selectedbranch);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "deletebranch" } };
      confirmAlert({
        title: "Delete Branch Request",
        message: `Delete Branch '${selectedbranch.branchname}'` ,
          buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteBranch(selectedbranch, action));
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
        <h4>Existing Branches</h4>

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
              dispatch(alertActions.clear())
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
            <p className={alert.type}>{alert.message}</p>
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
                      onClick={() => updateBranch(branch)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteBranch(branch)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newBranchWindow ? (
            <AddBranch closehandler={add} branch={branch} isUpdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewBranches;
