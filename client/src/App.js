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
import jwtDecode from "jwt-decode";
import Logout from "./registration/Logout";
import Sidebar from "./admindashboard/Sidebar";
import AddBranch from "./admindashboard/add/AddBranch";
import AddDesignation from "./admindashboard/add/AddDesignation";
import AddBrand from "./admindashboard/add/AddBrand";
import AddLocation from "./admindashboard/add/AddLocation";
import AddItemType from "./admindashboard/add/AddItemType";
import AddOs from "./admindashboard/add/AddOs";
import AddUser from "./admindashboard/add/AddUser";
import AddSource from "./admindashboard/add/AddSource";
import AddItem from "./admindashboard/add/AddItem";


const history = createBrowserHistory();
const Footer = lazy(() => import("./mycomponents/Footer"));

//const Dashnew = lazy(() => import("./dashboard/dashnew"));
//const token = localStorage.getItem("token");

//app.use(cors())
function App() {
  
  const User = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token)
    User.setUserName(decoded.username)
    User.setIsLoggedIn(true);
    if(decoded.userrole === 'admin')
        User.setIsAdmin(true)    
  }

  //console.warn(User);
  // const User = useContext(UserContext);

  //const [isLoggedIn, setisLoggedIn] = useState(User.isLoggedIn);
  // const [isAdmin, setuserName] = useState(User.isAdmin);

  return (
    <BrowserRouter history={history}>
      <Header />
      {User.isAdmin ? <Sidebar /> : <Navbar />}
      <Switch>
        <PublicRoute path='/' exact={true} component={Login}></PublicRoute>
        <Route path='/logout' exact={true} component={Logout}></Route>
        <PrivateRoute path='/dashboard' exact component={Users}></PrivateRoute>
        <PrivateRoute
          path='/displayinventory'
          exact
          component={displayinventory}
        ></PrivateRoute>

        <PrivateRoute path='/home' exact component={Dashnew}></PrivateRoute>
        <RestrictedRoute  path='/admin'  exact component={Admin} ></RestrictedRoute>
        <RestrictedRoute  path='/addbranch'  exact component={AddBranch} ></RestrictedRoute>
        <RestrictedRoute  path='/adddesignation'  exact component={AddDesignation} ></RestrictedRoute>
        <RestrictedRoute  path='/addbrands'  exact component={AddBrand} ></RestrictedRoute>
        <RestrictedRoute  path='/addlocation'  exact component={AddLocation} ></RestrictedRoute>
        <RestrictedRoute  path='/additemtype'  exact component={AddItemType} ></RestrictedRoute>
        <RestrictedRoute  path='/addos'  exact component={AddOs} ></RestrictedRoute>
        <RestrictedRoute  path='/adduser'  exact component={AddUser} ></RestrictedRoute>
        <RestrictedRoute  path='/addsource'  exact component={AddSource} ></RestrictedRoute>
        <RestrictedRoute  path='/additem'  exact component={AddItem} ></RestrictedRoute>
        <Route path='/printers' exact component={Contact}></Route>
        <Route path='/displayboards' exact component={Contact}></Route>
        <Route path='/tabs' exact component={Contact}></Route>
        <Route path='/laptops' exact component={Contact}></Route>

        <Route path='/contact' exact component={Contact}></Route>
        <Route path='/unauthorized' exact component={Unauthorized}></Route>
        <Route path='*' exact component={Pagenotfound}></Route>
      </Switch>

      <Suspense fallback={<div>Loading... </div>}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
