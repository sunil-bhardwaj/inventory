import React,{useContext} from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  // const [loginStatus, setLoginStatus] = useState(false);

  // const token =  localStorage.getItem('token')
 const User = useContext(UserContext);
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark mx-background-top-linear'>
        <div className='container'>
          <Link className='navbar-brand' rel='nofollow' target='_blank' to='#'>
            HP HIGH COURT- Inventory (Welcome: {User.userName})
          </Link>
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
