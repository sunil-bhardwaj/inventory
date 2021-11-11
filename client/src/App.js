import "./App.css";
import Header from "./mycomponents/Header";
import React, { useContext } from "react";
//import Footer from "./mycomponents/Footer";
import Contact from "./mycomponents/Contact";
import Login from "./registration/Login";
import Dashnew from "./dashboard/dashnew";
import Admin from "./admindashboard/index";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagenotfound from "./mycomponents/Pagenotfound";
import Unauthorized from "./mycomponents/Unauthorized";
import Navbar from "./mycomponents/Navbar";
import Users from "./dashboard/Users";
import displayinventory from "./dashboard/displayinventory";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import RestrictedRoute from "./RestrictedRoute";
import { createBrowserHistory } from "history";
import { UserContext } from "./UserContext";
import { AdminProvider } from "./admindashboard/AdminContext";
import { UserProvider } from "./UserContext";
import jwtDecode from "jwt-decode";
import Logout from "./registration/Logout";
import Sidebar from "./admindashboard/Sidebar";
import ViewBranch from "./admindashboard/view/ViewBranches";
import ViewStore from "./admindashboard/view/ViewStore";
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
import store from "./store/Store";
import { addInventory } from "./actions";
//import Alert from "./admindashboard/utils/Alert";

const history = createBrowserHistory();
const Footer = lazy(() => import("./mycomponents/Footer"));

//const Dashnew = lazy(() => import("./dashboard/dashnew"));
//const token = localStorage.getItem("token");

//app.use(cors())
function App() {
  
  const User = useContext(UserContext);
  const token = localStorage.getItem("token");
  console.log(User);
  store.subscribe(() => console.log("Look ma, Redux!!"));
  store.dispatch(
    addInventory({ title: "React Redux Tutorial for Beginners", id: 1 })
  );
  if (token) {
    const decoded = jwtDecode(token);
    User.setUserName(decoded.username);
    User.setIsLoggedIn(true);
    if (decoded.userrole === "admin") {
      User.setIsAdmin(true);
      console.log(decoded, User);
    }
  }
 
 
  // const User = useContext(UserContext);

  //const [isLoggedIn, setisLoggedIn] = useState(User.isLoggedIn);
  // const [isAdmin, setuserName] = useState(User.isAdmin);

  return (
    <BrowserRouter history={history}>
      <Header />
      {User.isLoading ? null : User.isAdmin ? <Sidebar /> : <Navbar />}

      <Switch>
        <PublicRoute path='/' exact={true} component={Login}></PublicRoute>
        <Route path='/dashboard' exact component={Users}></Route>

        <Route
          exact
          path='/displayinventory'
          component={displayinventory}
        ></Route>
        <Route path='/home' exact component={Dashnew}></Route>

        <Route path='/logout' exact component={Logout}></Route>
        <Route path='/printers' exact component={Contact}></Route>
        <Route path='/displayboards' exact component={Contact}></Route>
        <Route path='/tabs' exact component={Contact}></Route>
        <Route path='/laptops' exact component={Contact}></Route>
        <Route path='/contact' exact component={Contact}></Route>
        <Route path='/unauthorized' exact component={Unauthorized}></Route>

        <AdminProvider>
          <Route path='/admin' exact component={Admin}></Route>
          <Route exact path='/viewbranch' component={ViewBranch}></Route>
          <Route
            exact
            path='/viewstore'
            component={ViewStore}
           
          ></Route>
          <Route exact path='/testing' component={Testing}></Route>
          <Route exact path='/allotitems' component={AllocateInventory}></Route>
          <Route exact path='/viewsets' component={ViewSets}></Route>
          <Route
            exact
            path='/adddesignation'
            component={AddDesignation}
          ></Route>
          <Route exact path='/addbrands' component={AddBrand}></Route>
          <Route exact path='/addlocation' component={AddLocation}></Route>
          <Route exact path='/additemtype' component={AddItemType}></Route>
          <Route path='/addos' exact component={AddOs}></Route>
          <Route exact path='/adduser' component={AddUser}></Route>
          <Route exact path='/addsource' component={AddSource}></Route>
          <Route exact path='/additem' component={AddItem}></Route>
        </AdminProvider>
        <Route path='*' component={Pagenotfound}></Route>
      </Switch>

      <Suspense fallback={<div>Loading... </div>}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
