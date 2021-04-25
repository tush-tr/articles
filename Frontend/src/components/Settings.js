import React, { useContext, useState } from "react";
import "../styles/profile_Settings.css";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";

function Settings() {
    const [ user, setUser ] = useContext(UserContext);
    // const [ email, setEmail ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ name, setName ] = useState('');
    // const [ bio, setBio ] = useState('');

    // const savedetails = (e) => {
    //   e.preventDefault();
  
    //   if (password.length < 6) {
    //     toast.warning("Password length must be greater than 5 characters.");
    //     return;
    //   }
  
    //   api.post("/user/savedetails", { name ,email, password ,bio})
    //     .then((res) => {
    //       const status = res.data.status;
    //       // if there is some error in validation
    //       if (status === 0) {
    //         toast.warning(res.data.data);
    //       } else {
    //         toast.success(res.data.message);
    //         setUser({
    //           isLoggedIn: true,
    //           name: res.data.data.user.name,
    //           email: res.data.data.user.email,
    //           token: res.data.data.token
    //         });
    //         localStorage.setItem("token", res.data.data.token);
    //         localStorage.setItem("name", res.data.data.user.name);
    //         localStorage.setItem("email", res.data.data.user.email);
    //         history.push("/");
    //       }
    //     }).catch((err) => {
    //       console.log(err.message);
    //     });
    // }

  return (
    <div className="full-screen">
      <div className="full-screen-1">
        <h3 className="settings-title">Personal Information</h3>
        <img src={user.pic} className="user-image" alt="user profile" />
        <div className="image-button">
          <br></br>
          <form>
            <label for="img">Select image : </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="choose-file"
            />
            <button type="submit" className="details-button">
              Change Image
            </button>
          </form>
        </div>
        <hr className="hr-rule"></hr>
        <div className="detail-container">
          <form>
            <div className="input-group-settings">
              <label>Name</label>
              <input
                type="text"
                /*onChange={e => setName(e.target.value) }*/ required
              />
            </div>
            <div className="input-group-settings">
              <label>Email</label>
              <input
                type="email"
                /* onChange={e => setEmail(e.target.value)} */ required
              />
            </div>
            <div className="input-group-settings">
              <label>Password</label>
              <input
                type="password"
                /* onChange={e => setPassword(e.target.value)}*/ required
              />
            </div>
            <div className="input-group-settings">
              <label>Bio</label>
              <input
                type="text"
                /*onChange={e => setBio(e.target.value)}*/ required
              />
            </div>
            <button type="submit" className="details-button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
