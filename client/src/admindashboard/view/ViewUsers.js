import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";

import { useLocation } from "react-router-dom";
import "../css/admin.css";
import ListGroup from "react-bootstrap/ListGroup";
import Icon from "@material-ui/core/Icon";
import { Redirect } from "react-router-dom";
function ViewUsers(props) {
  console.log(props)
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.userList);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/viewusers" } };
  const [searchKeywords, setSearchKeywords] = useState("");

  useEffect(() => {
    dispatch(userActions.getAll())
  }, []);
 

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              <Icon className='fa fa-close' onClick={()=>props.closehandler(null,{action:"/closebutton"})} />

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
                        props.closehandler(user, { action: "/viewusers",oldsetid:props.oldsetid,oldsetname:props.oldsetname })
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
  );
}

export default ViewUsers;
