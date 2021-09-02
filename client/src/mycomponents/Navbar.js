import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Users from "../dashboard/dashnew";

import { UserContext } from "../UserContext";
function Navbar(props) {
  const User = useContext(UserContext);
  const history = useHistory();
  const [message, setMessage] = useState("");

  return (
    <nav className='navbar-expand-lg navbar-dark1'>
      <div className='container'>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          {User.isLoggedIn ? (
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/home'>
                  Home
                  <span className='sr-only'>(current)</span>
                </Link>
              </li>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  Login
                  <span className='sr-only'>(current)</span>
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/printers'>
                  Printers
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/displayboards'>
                  Display Boards
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/tabs'>
                  Tablets
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/laptops'>
                  Laptops
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  to='/logout'
                  className='nav-link'
                  style={{ cursor: "pointer" }}
                >
                  LogOut
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/contact'>
                  Contact
                </Link>
              </li>
              <Link className='nav-link' style={{ cursor: "pointer" }} to='/'>
                LogIn
              </Link>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
