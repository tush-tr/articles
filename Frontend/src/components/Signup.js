import React, { useContext, useState } from "react";
import '../styles/login_style.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Signup() {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  const history = useHistory();

  const [ user, setUser ] = useContext(UserContext);

  if (user.isLoggedIn) {
    history.push("/");
  }

  const registerUser = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.warning("Password length must be greater than 5 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    
    api.post("/user/register", { name, email, password })
      .then((res) => {
        const status = res.data.status;
        // if there is some error in validation
        if (status === 0) {
          toast.warning(res.data.data);
        } else {
          toast(res.data.message);
          history.push("/login");
        }
      }).catch((err) => {
        console.log(err.message);
      });

  }

  return (
    <div className="full-screen-container">
      <div className="signup-container">
        <h3 className="signup-title">Create your account</h3>
        <form onSubmit={registerUser}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" onChange={e => setConfirmPassword(e.target.value)} required/>
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