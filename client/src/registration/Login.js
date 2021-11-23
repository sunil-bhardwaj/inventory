import React, { useState, useEffect } from "react";
import "../registration/css/Login.css";
import {userActions} from "../_actions";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [inputsLogin, setInputsLogin] = useState({
    username: "",
    password: "",
  });
   const [inputsReg, setInputsReg] = useState({
     regusername: "",
     regpassword: "",
     confirmpassword:"",
     fullname:"",
     userrole:"",
   });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const { username, password } = inputsLogin;
  const { regusername,regpassword,confirmpassword,fullname,userrole } = inputsReg;
   
  const loggingIn = useSelector((state) => state.authenticationData.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChangeLogin(e) {
      
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsLogin((inputs) => ({ ...inputs, [name]: value }));
  }
  function handleChangeReg(e) {
    const { name, value } = e.target;
    //console.log(name, value);
    setInputsReg((inputs) => ({ ...inputs, [name]: value }));
  }
  function handleSubmit(e) {
    
    e.preventDefault();
   
    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/login" } };

      dispatch(userActions.login(username, password, from));
    }
    if (regusername && regpassword && confirmpassword) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/login" } };
      dispatch(
        userActions.register(
          username,
          password,
          confirmpassword,
          fullname,
          userrole,
          from
        )
      );
    }
  }

  
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
              <form name='form' onSubmit={handleSubmit}>
                {" "}
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
                        onChange={handleChangeLogin}
                        type='text'
                        className='input'
                        value={username}
                        placeholder='Enter your username'
                        name='username'
                      />
                      {submitted && !username && (
                        <div className='invalid-feedback'>
                          Username is required
                        </div>
                      )}
                    </div>
                    <div className='group'>
                      <label htmlFor='pass' className='label'>
                        Password
                      </label>
                      <input
                        onChange={handleChangeLogin}
                        type='password'
                        className='input'
                        data-type='password'
                        name='password'
                        value={password}
                        placeholder='Enter your password'
                      />
                      {submitted && !password && (
                        <div className='invalid-feedback'>
                          Password is required
                        </div>
                      )}
                    </div>

                    <div
                      className='group'
                      style={{
                        textAlign: "center",
                        color: "chartreuse",
                        marginTop: "10%",
                      }}
                    >
                      {loggingIn && (
                        <span className='spinner-border spinner-border-sm mr-1'></span>
                      )}
                      <input type='submit' name='signin' id='signin' className='button' value='Sign In' />
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
                        onChange={handleChangeReg}
                        type='text'
                        className='input'
                        name='regusername'
                        value={regusername}
                        placeholder='Create your Username'
                      />
                      {submitted && !regusername && (
                        <div className='invalid-feedbacku'>
                          Username is required
                        </div>
                      )}
                    </div>
                    <div className='group'>
                      <label htmlFor='pass' className='label'>
                        Password
                      </label>
                      <input
                        onChange={handleChangeReg}
                        type='password'
                        value={regpassword}
                        className='input'
                        data-type='password'
                        name='regpassword'
                        placeholder='Create your password'
                      />
                      {submitted && !regpassword && (
                        <div className='invalid-feedbacku'>
                          Password is required
                        </div>
                      )}
                    </div>
                    <div className='group'>
                      <label htmlFor='pass' className='label'>
                        Repeat Password
                      </label>
                      <input
                        onChange={handleChangeReg}
                        type='password'
                        className='input'
                        data-type='password'
                        value={confirmpassword}
                        name='confirmpassword'
                        placeholder='Repeat your password'
                      />
                      {submitted && !confirmpassword && (
                        <div className='invalid-feedback'>
                          Confirmation Password is required
                        </div>
                      )}
                    </div>
                    <div className='group'>
                      <label htmlFor='pass' className='label'>
                        Full Name
                      </label>
                      <input
                        onChange={handleChangeReg}
                        type='text'
                        className='input'
                        name='fullname'
                        value={fullname}
                        placeholder='Enter your full name'
                      />
                      {submitted && !fullname && (
                        <div className='invalid-feedback'>
                          Your Name is required
                        </div>
                      )}
                    </div>
                    <div className='group'>
                      <label htmlFor='pass' className='label'>
                        User Role
                      </label>
                      <select
                        className='input'
                        onChange={handleChangeReg}
                        name='userrole'
                      >
                        <option value={userrole}>User</option>
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
                      {loggingIn && (
                        <span className='spinner-border spinner-border-sm mr-1'></span>
                      )}
                      <input type='submit' name='signup' id = 'signup' className='button' value='Sign Up' />
                      <br />
                      {message}
                    </div>

                    <div className='hr'></div>

                    <div className='foot'>
                      <label htmlFor='tab-1'>Already Member?</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
