import React,{useState} from "react";
import Navbar from "../mycomponents/Navbar";
import jwtDecode from 'jwt-decode'
import { Link } from "react-router-dom";
import Sidebar from "../admindashboard/Sidebar";
import { useSelector } from "react-redux";

export default function Header() {
  // const [loginStatus, setLoginStatus] = useState(false);
   var [decoded, setdecoded] = useState({
     userrole: "",
     username: "",
     fullname: "",
   });
   var { userrole, username, fullname } = setdecoded;
   // const token =  localStorage.getItem('token')
   const User = useSelector((state) => state.authenticationData);
 if (User) {
  
   if (User.loggedIn) {
     decoded = jwtDecode(User.user.token);
     userrole = decoded.userrole;
     username = decoded.username;
     fullname = decoded.fullname;
   }
 }
 
  
 
  // const token =  localStorage.getItem('token')
 
  return (
    <>
      {userrole === "admin" ? (
        <Sidebar />
      ) : userrole === "user" ? (
        <Navbar status={User.user.loggedIn} />
      ) : null}
      <nav className='navbar navbar-expand-lg navbar-dark mx-background-top-linear'>
        <div className='container'>
          {userrole === "admin" ? (
            <Link
              className='navbar-brand'
              rel='nofollow'
              target='_blank'
              to='#'
            >
              HP HIGH COURT ADMIN
            </Link>
          ) : (
            <Link
              className='navbar-brand'
              rel='nofollow'
              target='_blank'
              to='#'
            >
              {userrole == null
                ? `HP HIGH COURT- INVENTORY`
                : `HP HIGH COURT- INVENTORY (Welcome: ${username})`}
            </Link>
          )}
        </div>
      </nav>
      <div className='fixed-top'>
       
       
        <header className='topbar'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
                <ul className='social-network'>
                  <li>
                    <Link className='waves-effect waves-dark' to='#'>
                      <i className='fa fa-facebook'></i>
                    </Link>
                  </li>
                  <li>
                    <Link className='waves-effect waves-dark' to='#'>
                      <i className='fa fa-twitter'></i>
                    </Link>
                  </li>
                  <li>
                    <Link className='waves-effect waves-dark' to='#'>
                      <i className='fa fa-linkedin'></i>
                    </Link>
                  </li>
                  <li>
                    <Link className='waves-effect waves-dark' to='#'>
                      <i className='fa fa-pinterest'></i>
                    </Link>
                  </li>
                  <li>
                    <Link className='waves-effect waves-dark' to='#'>
                      <i className='fa fa-google-plus'></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
