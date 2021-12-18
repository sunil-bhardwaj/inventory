import React, { useEffect, useState } from "react";
import { alertActions } from "../../_actions";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert";
import AddItemType from "../add/AddItemType";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";

function ViewItemTypes() {
  useEffect(() => {
    console.log("dispatch");
    dispatch(adminActions.viewAllItemTypes());
  }, []);
  const dispatch = useDispatch();

  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newItemtypeWindow, setnewItemtypeWindow] = useState(false);
  const [itemtype, setItemtype] = useState([]);

  const itemtypessInfo = useSelector((state) => state.adminData.itemtypeList);
  const alert = useSelector((state) => state.helperData);
  const add = (e) => {
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewItemtypeWindow(!newItemtypeWindow);
  };
  const updateItem = (selecteditemtype) => {
    dispatch(alertActions.clear());
    setItemtype(selecteditemtype);
    setIsUpdate(true);
    setnewItemtypeWindow(!newItemtypeWindow);
  };
  const deleteItem = (selecteditemtype) => {
    dispatch(alertActions.clear());
    setItemtype(selecteditemtype);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "viewitemtype" } };
      confirmAlert({
        title: "Delete Itemtype Request",
        message: `Delete Itemtype '${selecteditemtype.typename}'`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteItemType(selecteditemtype, action));
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
        <h4>Existing Itemtypes</h4>

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
              {itemtypessInfo
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.typename
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((itemtype, index) => (
                  <ListGroup.Item
                    key={itemtype.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {itemtype.id}
                    --{itemtype.typename}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => updateItem(itemtype)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteItem(itemtype)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newItemtypeWindow ? (
            <AddItemType closehandler={add} itemtype={itemtype} isUpdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewItemTypes;
