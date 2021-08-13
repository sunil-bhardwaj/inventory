import axios from 'axios';
import React, {useState} from 'react'

import { useHistory } from "react-router-dom";


export default function Header() {
  const history = useHistory();
 // const [loginStatus, setLoginStatus] = useState(false);
  const [message, setMessage] = useState('');
 // const token =  localStorage.getItem('token')
 
 


  
return (
		  <div className="fixed-top">
  <header className="topbar">
      <div className="container">
        <div className="row">
         
          <div className="col-sm-12">
            <ul className="social-network">
              <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-linkedin"></i></a></li>
              <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-pinterest"></i></a></li>
              <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-google-plus"></i></a></li>
            </ul>
          </div>

        </div>
      </div>
  </header>
 
</div>
	)
}