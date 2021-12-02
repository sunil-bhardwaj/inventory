import "./App.css";
import Header from "./mycomponents/Header";
import React, { useEffect, useState } from "react";
//import Footer from "./mycomponents/Footer";
import Contact from "./mycomponents/Contact";
import LoginPage from "./registration/Login";
import Dashnew from "./dashboard/dashnew";
import HomePage from "./admindashboard/index";
import { Suspense, lazy } from "react";
import { Router } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagenotfound from "./mycomponents/Pagenotfound";
import Unauthorized from "./mycomponents/Unauthorized";
import Navbar from "./mycomponents/Navbar";
import Users from "./dashboard/Users";
import displayinventory from "./dashboard/displayinventory";
import {PrivateRoute} from "./PrivateRoute";

import jwtDecode from "jwt-decode"
import Sidebar from "./admindashboard/Sidebar";
import ViewBranch from "./admindashboard/view/ViewBranches";
import ViewUsers from "./admindashboard/view/ViewUsers";
import ViewStore from "./admindashboard/view/ViewStore";
import ViewInventory from "./admindashboard/view/ViewInventory";
import Testing from "./admindashboard/Testing";
import AddBranch from "./admindashboard/add/AddBranch";
import AddDesignation from "./admindashboard/add/AddDesignation";
import AddBrand from "./admindashboard/add/AddBrand";
import AddLocation from "./admindashboard/add/AddLocation";
import AddItemType from "./admindashboard/add/AddItemType";
import AddOs from "./admindashboard/add/AddOs";
import AddUser from "./admindashboard/add/AddUser";
import AddSource from "./admindashboard/add/AddSource";
import AddItem from "./admindashboard/add/AddItem";

import ViewSets from "./admindashboard/view/ViewSets";
import {history } from "./_helpers"
import { useDispatch, useSelector } from "react-redux";
import {userConstants} from "./_constants"
import { alertActions } from "./_actions";
import ViewDesignations from "./admindashboard/view/ViewDesignations";
import ViewSource from "./admindashboard/view/ViewSource";
import ViewBrands from "./admindashboard/view/ViewBrands";



const Footer = lazy(() => import("./mycomponents/Footer"));

function App() {
  
 const [decoded, setdecoded] = useState({
   userrole: "",
   username: "",
   fullname: "",
 });
 const { userrole, username, fullname } = setdecoded;
 // const token =  localStorage.getItem('token')
 const User = useSelector((state) => state.authenticationData);

 if (User) {
   console.log("here");
   if (User.loggedIn) {
     decoded = jwtDecode(User.user.token);
     userrole = decoded.userrole;
     username = decoded.username;
     fullname = decoded.fullname;
   }
 }
 
         
  
  
  const alert = useSelector((state) => state.alertData);
  const userInfo = useSelector((state) => state.authenticationData);
   
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      // dispatch(alertActions.clear());
    });
  }, []);

  return (
    <Router history={history}>
      <Header />
    
      <Switch>
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />

        <Route exact path='/viewbranch' component={ViewBranch}></Route>
        <Route exact path='/viewusers' component={ViewUsers}></Route>
        <Route
          exact
          path='/viewdesignation'
          component={ViewDesignations}
        ></Route>
        <Route exact path='/viewstore' component={ViewStore}></Route>
        <Route exact path='/viewsources' component={ViewSource}></Route>
        <Route exact path='/viewbrands' component={ViewBrands}></Route>
        <Route exact path='/viewinventory' component={ViewInventory}></Route>
        <Route exact path='/testing' component={Testing}></Route>
        <Route exact path='/viewsets' component={ViewSets}></Route>
        <Route path='*' component={Pagenotfound}></Route>
      </Switch>

      <Suspense fallback={<div>Loading... </div>}>
        <Footer />
      </Suspense>
    </Router>
  );
}
export default App;
