import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import jwtDecode from "jwt-decode";
import "react-pro-sidebar/dist/css/styles.css";
import React, {useContext, useState} from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const [userOName, setUserOName] = useState("Guest");
  const [showSideBar, setShowSideBar] = useState(true)
  const token = localStorage.getItem("token");
  var decoded=''
  if (token) {
   decoded = jwtDecode(token);
    
    }
  const closeSideBar=()=>{
    setShowSideBar(!showSideBar)
  }
  const User = useContext(UserContext);
  return (
    <div
      style={{
        display: "flex",
        float: "left",
        overflow: "scroll initial",
      }}
    >
      {showSideBar ? (
        <ProSidebar>
          <SidebarHeader>
            {" "}
            <div className='sidebar-brand'>
              <Link to='#'>INVENTORY</Link>
              <div id='close-sidebar'>
                <i className='fas fa-times' onClick={closeSideBar}></i>
              </div>
            </div>
            <div className='sidebar-header'>
              <div className='user-pic' style={{ color: "#fff" }}>
                <i className='fa fa-user-circle fa-4x' aria-hidden='true'></i>
              </div>
              <div className='user-info'>
                <span className='user-name'>
                  {" "}
                  <strong>{decoded.fullname}</strong>
                </span>
                {User.isAdmin ? (
                  <span className='user-role'>Administrator</span>
                ) : (
                  <span className='user-role'>User</span>
                )}

                <span className='user-status'>
                  <i className='fa fa-circle'></i> <span>Online</span>
                </span>
              </div>
            </div>
            <div className='sidebar-search'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control search-menu'
                  placeholder='Search...'
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>
                    <i className='fa fa-search' aria-hidden='true'></i>
                  </span>
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape='square'>
              <MenuItem icon=''>
                Dashboard
                <Link to='/' />
              </MenuItem>

              <SubMenu title='Masters'>
                <MenuItem>
                  Inventory
                  <Link to='/viewinventory' />
                </MenuItem>
                <MenuItem>
                  Branches
                  <Link to='/viewbranch' />
                </MenuItem>
                <MenuItem>
                  Designation <Link to='/adddesignation' />
                </MenuItem>
                <MenuItem>
                  Source
                  <Link to='/addsource' />
                </MenuItem>
                <MenuItem>
                  Brands
                  <Link to='/addbrands' />
                </MenuItem>
              </SubMenu>
              <SubMenu title='Stocks'>
                <MenuItem>
                  Store
                  <Link to='/viewstore' />
                </MenuItem>
                <MenuItem>
                  Component Testing <Link to='/testing' />
                </MenuItem>
                <MenuItem>
                  Sets
                  <Link to='/viewsets' />
                </MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>
              <SubMenu title='Allotments'>
                <MenuItem>
                  Allocate Inventory
                  <Link to='/allotitems' />
                </MenuItem>
                <MenuItem>Component 2</MenuItem>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>
              <SubMenu title='Reports'>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>
              <MenuItem>
                Logout
                <Link to='/logout' />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <div className='sidebar-footer'>
              <Link to='#'>
                <i className='fa fa-bell'></i>
                <span className='badge badge-pill badge-warning notification'>
                  3
                </span>
              </Link>
              <Link to='#'>
                <i className='fa fa-envelope'></i>
                <span className='badge badge-pill badge-success notification'>
                  7
                </span>
              </Link>
              <Link to='#'>
                <i className='fa fa-cog'></i>
                <span className='badge-sonar'></span>
              </Link>
              <Link to='/logout'>
                <i className='fa fa-power-off'></i>
              </Link>
            </div>
          </SidebarFooter>
        </ProSidebar>
      ) : (
        <DoubleArrowIcon onClick={closeSideBar} style={{ cursor: "pointer" }} />
      )}
    </div>
  );
}

export default Sidebar;
