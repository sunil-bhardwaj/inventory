import "./App.css";
import Header from "./mycomponents/Header";
import React, { useEffect } from "react";
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

import Logout from "./registration/Logout";
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
import AllocateInventory from "./admindashboard/view/AllocateInventory";
import ViewSets from "./admindashboard/view/ViewSets";
import {history } from "./_helpers"
import { useDispatch, useSelector } from "react-redux";
import {userConstants} from "./_constants"
import { alertActions } from "./_actions";
import ViewDesignations from "./admindashboard/view/ViewDesignations";



const Footer = lazy(() => import("./mycomponents/Footer"));

function App() {
  const token = localStorage.getItem("token")
  const alert = useSelector((state) => state.alertData);
  const user = useSelector((state) => state.authenticationData);
  //console.log(user)
  const dispatch = useDispatch();
 
  
   useEffect(() => {
     history.listen((location, action) => {
       // clear alert on location change
      // dispatch(alertActions.clear());
     });
   }, [])
  
  return (
    <Router history={history}>
      <Header />
      {user.userRole === "admin" ? <Sidebar /> : <Navbar />}
      <Switch>
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route exact path='/viewbranch' component={ViewBranch}></Route>
        <Route exact path='/viewusers' component={ViewUsers}></Route>
        <Route exact path='/viewdesignation' component={ViewDesignations}></Route>
        <Route exact path='/viewstore' component={ViewStore}></Route>
        <Route exact path='/viewinventory' component={ViewInventory}></Route>
        <Route exact path='/testing' component={Testing}></Route>
        <Route exact path='/allotitems' component={AllocateInventory}></Route>
        <Route exact path='/viewsets' component={ViewSets}></Route>
        <Route exact path='/addbrands' component={AddBrand}></Route>
        <Route exact path='/addlocation' component={AddLocation}></Route>
        <Route exact path='/additemtype' component={AddItemType}></Route>
        <Route path='/addos' exact component={AddOs}></Route>
        <Route exact path='/adduser' component={AddUser}></Route>
        <Route exact path='/addsource' component={AddSource}></Route>
        <Route exact path='/additem' component={AddItem}></Route>
        <Route path='*' component={Pagenotfound}></Route>
      </Switch>

      <Suspense fallback={<div>Loading... </div>}>
        <Footer />
      </Suspense>
    </Router>
  );
}
export default App;
