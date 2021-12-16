import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; 
import ListGroup from "react-bootstrap/ListGroup";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, alertActions } from "../../_actions";
import AddDesignation from "../add/AddDesignation";

function ViewDesignations(props) {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [designation, setDesignation] = useState([]);
  const designationInfo = useSelector(
    (state) => state.adminData.designationList
  );
  const [searchKeywords, setSearchKeywords] = useState("");
const alert = useSelector((state) => state.helperData);
  const [newDesignationsWindow, setnewDesignationWindow] = useState(false);
  useEffect(() => {
    dispatch(adminActions.viewAllDesignations());
  }, []);
  const add = (e) => {
    setDesignation([]);
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewDesignationWindow(!newDesignationsWindow);
  };
  const updateDesignation = (selecteddesignation) => {
    dispatch(alertActions.clear());
    setDesignation(selecteddesignation);
    setIsUpdate(true);
    setnewDesignationWindow(!newDesignationsWindow);
  };
const deleteDesignation = (selecteddesignation) => {
  dispatch(alertActions.clear());
  setDesignation(selecteddesignation);
  setIsUpdate(false);
  {
    const { action } = { action: { action: "deletedesignation" } };
    confirmAlert({
      title: "Delete Designation Request",
      message: `Delete Designation '${selecteddesignation.designame}'`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(adminActions.deleteDesignation(selecteddesignation, action));
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
        <h4>Existing Designations</h4>

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
               dispatch(alertActions.clear());
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
              {designationInfo
                .filter((val) => {
                 
                  if (searchKeywords === "") return val;
                  else if (
                    val.designame
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((designation, index) => (
                  <ListGroup.Item
                    key={designation.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {designation.id}
                    --{designation.designame}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => updateDesignation(designation)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteDesignation(designation)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newDesignationsWindow ? (
            <AddDesignation
              closehandler={add}
              designation={designation}
              isUpdate={isUpdate}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewDesignations;
