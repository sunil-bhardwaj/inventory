import {userActions} from '../_actions'
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'

function Navbar(props) {
  const dispatch = useDispatch()
   const logout = () => {
     dispatch(userActions.logout());
   };
  const navlink = {
    color: "white",
   
  }
  return (
    <nav className='navbar-expand-lg navbar-dark1'>
      <div className='container'>
        <div
          className='collapse navbar-collapse'
          id='navbarResponsive'
          style={{ top: "44px", position: "fixed", left: "0%" }}
        >
          <ul className='navbar-nav ml-auto' style = {{marginLeft: '36%'}}>
           
              <>
                <li className='nav-item active'>
                  <Link className='navlink ' to='/home'>
                    Home
                    <span className='sr-only'>(current)</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='navlink' to='/dashboard'>
                    Dashboard
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='navlink' to='/printers'>
                    Printers
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='navlink' to='/displayboards'>
                    DisplayBoards
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='navlink' to='/tabs'>
                    Tablets
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='navlink' to='/laptops'>
                    Laptops
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    to='#'
                    className='navlink'
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    LogOut
                  </Link>
                </li>
              </>
          
          
           
          </ul>

         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
