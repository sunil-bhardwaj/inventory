import React, {useContext, useState} from 'react'
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../App';
function Navbar(props) {
    const {isLoggedIn, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [message, setMessage] = useState('');
   
    const logout = ()=>{
        localStorage.removeItem("token");
        setMessage('Logged Out ScucessFully')
        dispatch({type:'isLoggedIn', payload:false})
        console.log("Am inside Logged Out");
        history.push("/login");
    }
   
    return (
      
   <nav className="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
    <div className="container">
      <a className="navbar-brand" rel="nofollow" target="_blank" href="#" >HP HIGH COURT SHIMLA</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        {isLoggedIn?
        <ul className="navbar-nav ml-auto">

          <li className="nav-item active">
            <Link className="nav-link" to="/">Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>

         

         <li className="nav-item">
            <Link className="nav-link" to="/computers">Desktops</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/prnters">Printers</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/displayboards">Display Boards</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/tabs" >Tablets</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/laptops">Laptops</Link>
          </li>
          
          <li className="nav-item">
          <Link className="nav-link" style={{cursor:"pointer"}} onClick={logout}>LogOut</Link>
         </li>
         
          
        </ul>
        : <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
      
        
        </ul>
        }
      </div>
    </div>
  </nav>
       
    )
}

export default Navbar
