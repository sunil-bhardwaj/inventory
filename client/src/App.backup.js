import "./App.css";
import Header from "./mycomponents/Header";
import { createContext, useReducer } from "react";
import Footer from "./mycomponents/Footer";
import Contact from "./mycomponents/Contact";
import Login from "./registration/Login";
import Users from "./dashboard/Users";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { initialState, reducer } from "./reducers/Userreducer";
import Pagenotfound from "./mycomponents/Pagenotfound";
import Unauthorized from "./mycomponents/Unauthorized";
import Navbar from "./mycomponents/Navbar";

export const UserContext = createContext();
//app.use(cors())
function App() {
  ///const [isLoggedIn, setisLoggedIn] = useState('')
  //const [userName, setuserName] = useState('')
  const [isLoggedIn, dispatch] = useReducer(reducer, initialState);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
        }
      />
    );
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLoggedIn, dispatch }}>
        <Header />
        <Navbar />
        <Route path='/' exact component={Login}></Route>
        <Switch>
          <Route path='/login' exact component={Login}></Route>
          <PrivateRoute path='/home' exact component={Users}></PrivateRoute>
          <PrivateRoute
            path='/dashboard'
            exact
            component={Dashboard}
          ></PrivateRoute>

          <Route path='/contact' exact component={Contact}></Route>
          <Route path='/unauthorized' exact component={Unauthorized}></Route>
          <Route path='*' exact component={Pagenotfound}></Route>
        </Switch>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
