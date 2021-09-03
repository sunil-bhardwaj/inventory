import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  
  const User = useContext(UserContext);
  console.log(User);
  return (
    <div
      style={{
        display: "flex",
        float: "left",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar textColor='#fff' backgroundColor='#333'>
        <CDBSidebarHeader
          style={{ backgroundColor: "green", textColor: "fff" }}
          prefix={<i className='fa fa-bars fa-large'></i>}
        >
          <Link
            to='/'
            className='text-decoration-none'
            style={{ color: "inherit" }}
          ></Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            <NavLink exact to='/admin' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='columns'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/viewbranch' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='table'>Branches</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/adddesignation' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='user'>Designations</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/addbrands' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='chart-line'>Brands</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/addlocation' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='bars'>Locations</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/additemtype' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='amazon'>Item Types</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/addos' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='apple'>
                Operating System
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/adduser' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='angellist'>Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/addsource' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='american-sign-language-interpreting'>
                Sources
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/additem' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='anchor'>Items</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/logout' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='assistive-listening-systems'>
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
              backgroundColor: "green",
              textColor: "fff",
            }}
          >
            <p>Ravenswood, Shimla 171001</p>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
