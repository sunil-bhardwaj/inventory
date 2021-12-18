import React, { useEffect, useState } from "react";
import { alertActions } from "../../_actions";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert";
import AddItem from "../add/AddItem";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";

function ViewItems() {
  useEffect(() => {
    
    dispatch(adminActions.viewAllItems());
  }, []);
  const dispatch = useDispatch();

  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newItemWindow, setnewItemWindow] = useState(false);
  const [item, setItem] = useState([]);

  const itemsInfo = useSelector((state) => state.adminData.itemList);
  const alert = useSelector((state) => state.helperData);
  const add = (e) => {
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewItemWindow(!newItemWindow);
  };
  const updateItem = (selecteditem) => {
    dispatch(alertActions.clear());
    setItem(selecteditem);
    setIsUpdate(true);
    setnewItemWindow(!newItemWindow);
  };
  const deleteItem = (selecteditem) => {
    dispatch(alertActions.clear());
    setItem(selecteditem);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "viewitem" } };
      confirmAlert({
        title: "Delete Item Request",
        message: `Delete Item '${selecteditem.itemname}'`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteLocation(selecteditem, action));
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
        <h4>Existing Items</h4>

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
              {itemsInfo
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.itemname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((item, index) => (
                  <ListGroup.Item
                    key={item.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {item.id}
                    --{item.itemname}
                    --{item.typename}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => updateItem(item)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteItem(item)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newItemWindow ? (
            <AddItem closehandler={add} item={item} isUpdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewItems;
