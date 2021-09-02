import React, { useContext, useState } from "react";
import axios from "axios";
import "../registration/css/Login.css";
import jwt_decode from "jwt-decode";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function Login() {
  const User = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regusername, setRegusername] = useState("");
  const [regpassword, setRegpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [userrole, setUserrole] = useState("user");
  const [message, setMessage] = useState("Fill Mandatory Fields");
  const history = useHistory();
 console.log(User)
  //if (User.isLoggedIn) history.push("/dashboard");
  const register = () => {
    axios
      .post("http://localhost:3001/auth/register", {
        username: regusername,
        password: regpassword,
        fullname: fullname,
        userrole: userrole,
      })
      .then((response) => {
        if (response.data.auth) {
          setMessage(response.data.message);
          localStorage.setItem("token", response.data.token);

          User.setIsLoggedIn(true);
          User.setIsAdmin(true);
        } else {
          setMessage(response.data.message);
          User.setIsLoggedIn(false);
          User.setIsAdmin(false);
        }
      });
  };
  const login = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.auth) {
          setMessage(response.data.message);
          var decoded = jwt_decode(response.data.token);
          //console.log(decoded.userrole);
          localStorage.setItem("token", response.data.token);
          User.setIsLoggedIn(true);
          if (decoded.userrole === "user") {
            User.setUserName(decoded.username);
            User.setIsAdmin(false);
            history.push("/dashboard");
          }
          if (decoded.userrole === "admin") {
            User.setIsAdmin(true);
            User.setUserName(decoded.username);
            history.push("/admin");
          }
        } else {
          setMessage(response.data.message);
          User.setIsLoggedIn(false);
          User.setIsAdmin(false);
        }
      });
  };
  //background-color: #185d5d;
  // console.log(User);
  return (
    <div className='row' style={{ backgroundColor: "#185d5d" }}>
      <div className='col-md-6 mx-auto p-0'>
        <div
          className='cardw'
          style={{ backgroundColor: "brown", opacity: "0.7" }}
        >
          <div className='login-box'>
            <div
              className='login-snip'
              style={{ backgroundColor: "black", opacity: "0.8" }}
            >
              <input
                id='tab-1'
                type='radio'
                name='tab'
                className='sign-in'
                defaultChecked
              />
              <label htmlFor='tab-1' className='tab'>
                Login
              </label>
              <input id='tab-2' type='radio' name='tab' className='sign-up' />
              <label htmlFor='tab-2' className='tab'>
                Sign Up
              </label>
              <div className='login-space'>
                <div className='login'>
                  <div className='group'>
                   
                    <label htmlFor='user' className='label'>
                      Username
                    </label>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      type='text'
                      className='input'
                      placeholder='Enter your username'
                    />
                  </div>
                  <div className='group'>
                   
                    <label htmlFor='pass' className='label'>
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      className='input'
                      data-type='password'
                      placeholder='Enter your password'
                    />
                  </div>

                  <div
                    className='group'
                    style={{
                      textAlign: "center",
                      color: "chartreuse",
                      marginTop: "10%",
                    }}
                  >
                    <input
                      onClick={login}
                      type='submit'
                      className='button'
                      value='Sign In'
                    />
                    <br />
                    {message}
                  </div>
                  <div className='hr'> </div>
                  <div className='foot'>
                  
                    <Link to='#'>Forgot Password?</Link>
                  </div>
                </div>
                <div className='sign-up-form'>
                  <div className='group'>
                   
                    <label htmlFor='user' className='label'>
                      Username
                    </label>
                    <input
                      onChange={(e) => setRegusername(e.target.value)}
                      type='text'
                      className='input'
                      placeholder='Create your Username'
                    />
                  </div>
                  <div className='group'>
                   
                    <label htmlFor='pass' className='label'>
                      Password
                    </label>
                    <input
                      onChange={(e) => setRegpassword(e.target.value)}
                      type='password'
                      className='input'
                      data-type='password'
                      placeholder='Create your password'
                    />
                  </div>
                  <div className='group'>
                   
                    <label htmlFor='pass' className='label'>
                      Repeat Password
                    </label>
                    <input
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      type='password'
                      className='input'
                      data-type='password'
                      placeholder='Repeat your password'
                    />
                  </div>
                  <div className='group'>
                   
                    <label htmlFor='pass' className='label'>
                      Full Name
                    </label>
                    <input
                      onChange={(e) => setFullname(e.target.value)}
                      type='text'
                      className='input'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div className='group'>
                   
                    <label htmlFor='pass' className='label'>
                      User Role
                    </label>
                    <select
                      className='input'
                      onChange={(e) => setUserrole(e.target.value)}
                      name='cars'
                    >
                      <option value='volvo'>User</option>
                    </select>
                  </div>

                  <div
                    className='group'
                    style={{
                      textAlign: "center",
                      color: "chartreuse",
                      marginTop: "10%",
                    }}
                  >
                    <input
                      onClick={register}
                      type='submit'
                      className='button'
                      value='Sign Up'
                    />
                    <br />
                    {message}
                  </div>

                  <div className='hr'></div>

                  <div className='foot'>
                   
                    <label htmlFor='tab-1'>Already Member?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
