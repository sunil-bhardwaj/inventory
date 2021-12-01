import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";

import { useLocation } from "react-router-dom";
import "../css/admin.css";
import ListGroup from "react-bootstrap/ListGroup";
import Icon from "@material-ui/core/Icon";

import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import AddUser from "../add/AddUser";
function ViewUsers(props) {

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.userList);
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/viewusers" } };
  const [searchKeywords, setSearchKeywords] = useState("");
   const [newUserWindow, setnewUserWindow] = useState(false);
   const [userId, setUserId] = useState("");
  useEffect(() => {
    dispatch(userActions.getAll())
  }, []);
 const add = (e) => {
    e.preventDefault()
    setnewUserWindow(!newUserWindow);
 
 };

  return (
    <>
      {!props.redirected ? (
        <div className='container'>
          <div className='row'>
            <h4>Existing Users</h4>

            <div className='col-md-4 float-left'>
              <button
                className='btn btn-success'
                style={{ marginBottom: "6px", marginRight: "50%" }}
                onClick={(e) => add()}
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
                  {userInfo
                    .filter((val) => {
                      if (searchKeywords === "") return val;
                      else if (
                        val.name
                          .toLowerCase()
                          .includes(searchKeywords.toLowerCase())
                      )
                        return val;
                    })
                    .map((user, index) => (
                      <ListGroup.Item
                        key={user.id}
                        style={{ backgroundColor: "#e7f3f3" }}
                      >
                        {user.id}
                        --{user.name}
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
              {newUserWindow ? (
                <AddUser closehandler={(e) => add()}  isupdate={isUpdate} />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className='form-body'>
          <div className='row'>
            <div className='form-holder'>
              <div className='form-content'>
                <div className='form-items'>
                  <Icon
                    className='fa fa-close'
                    onClick={() =>
                      props.closehandler(null, { action: "/closebutton" })
                    }
                  />

                  <p>
                    Select User To Allot This Set
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
                  </p>

                  <ListGroup>
                    {userInfo
                      .filter((val) => {
                        if (searchKeywords === "") return val;
                        else if (
                          val.name
                            .toLowerCase()
                            .includes(searchKeywords.toLowerCase())
                        )
                          return val;
                      })
                      .map((user, index) => (
                        <ListGroup.Item
                          key={user.id + index}
                          style={{
                            backgroundColor: "#e7f3f3",
                          }}
                          onClick={() =>
                            props.closehandler(user, {
                              action: "/viewusers",
                              oldsetid: props.oldsetid,
                              oldsetname: props.oldsetname,
                            })
                          }
                        >
                          {user.id}--{user.name}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewUsers;
