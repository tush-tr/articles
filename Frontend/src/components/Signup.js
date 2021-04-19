import React from "react";
import '../styles/login_style.css';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="full-screen-container">
      <div className="signup-container">
        <h3 className="signup-title">Create your account</h3>
        <form>
          <div className="input-group">
            <label>Name</label>
            <input type="text" />
            </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" />
          </div>
          <button type="submit" className="signup-button">Register</button>
          <div className="login-to-register">
            <span>Already Registered?</span> 
            <Link to="/login"> Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
    
export default Signup;