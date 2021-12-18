import React, { useEffect, useState } from "react";
import { alertActions } from "../../_actions";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert";
import AddLocation from "../add/AddLocation";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";

function ViewLocations() {
     useEffect(() => {
       console.log("dispatch");
       dispatch(adminActions.viewAllLocations());
     }, []);
  const dispatch = useDispatch();
 
  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newLocationWindow, setnewLocationWindow] = useState(false);
  const [loc, setLoc] = useState([]);
 
   const locationsInfo = useSelector((state) => state.adminData.locationList);
  const alert = useSelector((state) => state.helperData);
  const add = (e) => {
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewLocationWindow(!newLocationWindow);
  };
  const updateLocation = (selectedlocation) => {
    dispatch(alertActions.clear());
    setLoc(selectedlocation);
    setIsUpdate(true);
    setnewLocationWindow(!newLocationWindow);
  };
  const deleteLocation = (selectedlocation) => {
    dispatch(alertActions.clear());
    setLoc(selectedlocation);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "deletelocation" } };
      confirmAlert({
        title: "Delete Location Request",
        message: `Delete Location '${selectedlocation.locationname}'`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteLocation(selectedlocation, action));
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
        <h4>Existing Locations</h4>

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
              dispatch(alertActions.clear());
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
              {locationsInfo
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.locationname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((loc, index) => (
                  <ListGroup.Item
                    key={loc.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {loc.id}
                    --{loc.locationname}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => updateLocation(loc)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteLocation(loc)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newLocationWindow ? (
            <AddLocation closehandler={add} loc={loc} isUpdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewLocations;
