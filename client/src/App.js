import "./App.css";
import Header from "./mycomponents/Header";
import React, { useEffect } from "react";

import QueryBuilder from "./mycomponents/QueryBuilder";
import LoginPage from "./registration/Login";


import HomePage from "./admindashboard/Dashboard";
import { Suspense, lazy } from "react";
import { Router } from "react-router";
import {  Route, Switch } from "react-router-dom";
import Pagenotfound from "./mycomponents/Pagenotfound";
import {alertActions} from './_actions'
import {PrivateRoute} from "./PrivateRoute";
import UsersWiseReport from "./dashboard/Users";

import ViewBranch from "./admindashboard/view/ViewBranches";
import ViewUsers from "./admindashboard/view/ViewUsers";
import ViewStore from "./admindashboard/view/ViewStore";
import ViewInventory from "./admindashboard/view/ViewInventory";
import Testing from "./admindashboard/Testing";


import ViewSets from "./admindashboard/view/ViewSets";
import {history } from "./_helpers"
import { useDispatch, useSelector } from "react-redux";

import ViewDesignations from "./admindashboard/view/ViewDesignations";
import ViewSource from "./admindashboard/view/ViewSource";
import ViewBrands from "./admindashboard/view/ViewBrands";



const Footer = lazy(() => import("./mycomponents/Footer"));

function App() {
  


 
 
         
  
  
  const alert = useSelector((state) => state.alertData);
 

 // const token =  localStorage.getItem('token')


  
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <Router history={history}>
      <Header />

      <Switch>
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route exact path='/userwisereport' component={UsersWiseReport}></Route>
        <Route exact path='/viewbranch' component={ViewBranch}></Route>
        <Route exact path='/viewusers' component={ViewUsers}></Route>
        <Route exact path='/querybuilder' component={QueryBuilder}></Route>
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
