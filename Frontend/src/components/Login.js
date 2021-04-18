import React from "react";
import '../styles/login_style.css';
function Login() {
    return (
        <div className="full-screen-container">
          <div className="login-container">
            <h3 className="login-title">Welcome</h3>
            <form>
              <div className="input-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" />
              </div>
              <button type="submit" className="login-button">Sign In</button>
            </form>
          </div>
        </div>
      );
    }
    
    export default Login;