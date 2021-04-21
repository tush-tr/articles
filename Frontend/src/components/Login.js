import React, { useContext, useState } from "react";
import '../styles/login_style.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const history = useHistory();

  const [ user, setUser ] = useContext(UserContext);

  if (user.isLoggedIn) {
    history.push("/");
  }

  const loginUser = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.warning("Password length must be greater than 5 characters.");
      return;
    }

    api.post("/user/login", { email, password })
      .then((res) => {
        const status = res.data.status;
        // if there is some error in validation
        if (status === 0) {
          toast.warning(res.data.data);
        } else {
          toast.success(res.data.message);
          setUser({
            isLoggedIn: true,
            id: res.data.data.user.id,
            name: res.data.data.user.name,
            email: res.data.data.user.email,
            token: res.data.data.token
          });
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("id", res.data.data.user.id);
          localStorage.setItem("name", res.data.data.user.name);
          localStorage.setItem("email", res.data.data.user.email);
          history.goBack();
        }
      }).catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h3 className="login-title">Welcome</h3>
        <form onSubmit={loginUser}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} required  />
          </div>
          <button type="submit" className="login-button">Sign In</button>
          <div className="login-to-register">
            <span>Do not have an account?</span> 
            <Link to="/Signup"> Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;