import React from 'react'
import '../registration/css/Login.css'
function Login1() {

   
          
    return (
  
<div className="login-reg-panel">
		<div className="login-info-box">
			<h2>Have an account?</h2>
			<p>Lorem ipsum dolor sit amet</p>
			<label id="label-register" for="log-reg-show">Login</label>
			<input type="radio" name="active-log-panel" id="log-reg-show"  checked="checked"/>
		</div>
							
		<div className="register-info-box">
			<h2>Don't have an account?</h2>
			<p>Lorem ipsum dolor sit amet</p>
			<label id="label-login" for="log-login-show">Register</label>
			<input type="radio" name="active-log-panel" id="log-login-show"/>
		</div>
							
		<div className="white-panel">
			<div className="login-show">
				<h2>LOGIN</h2>
				<input type="text" placeholder="Email"/>
				<input type="password" placeholder="Password"/>
				<input type="button" value="Login"/>
				<a href="">Forgot password?</a>
			</div>
			<div className="register-show">
				<h2>REGISTER</h2>
				<input type="text" placeholder="Email"/>
				<input type="password" placeholder="Password"/>
				<input type="password" placeholder="Confirm Password"/>
				<input type="button" value="Register"/>
			</div>
		</div>
	</div>
  
    )
}

export default Login1

