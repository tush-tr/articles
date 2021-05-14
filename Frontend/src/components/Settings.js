import React, { useContext, useState } from "react";
import "../styles/profile_Settings.css";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";

function Settings() {

  const [ user, setUser ] = useContext(UserContext);
  const [ email, setEmail ] = useState(user.email);
  const [ name, setName ] = useState(user.name);
  const [ bio, setBio ] = useState(user.bio);

  const history = useHistory();
  
    if (!user.isUserLoggedIn) {
      toast.warning("Please login to access settings.");
      history.push("/login");
    }

  const updateProfile = (e) => {
    e.preventDefault();

    api.patch("/user/update-profile", {name, email, bio}, { headers: { "auth-token": user.user_token }})
      .then((res) => {
        console.log(res.data);
        const status = res.data.status;
        // if there is some error in validation
        if (status === 0) {
          toast.warning(res.data.message);
        } else {
          toast.success(res.data.message);
          setUser({
            ...user,
            name: name,
            email: email,
            bio: bio
          });
          localStorage.setItem("bio", name);
          localStorage.setItem("name", email);
          localStorage.setItem("email", bio);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(
      "file",
      file,
      file.name
    );
    await api.post("/user-image-upload", formData, { headers: { "auth-token": user.user_token }})
    .then((res) => {
      setUser({
        ...user,
        pic: res.data.file.url
      });
      localStorage.setItem("pic", res.data.file.url);
      toast.success("Profile picture updated");
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="full-screen">
      <div className="full-screen-1">
        <h3 className="settings-title">Personal Information</h3>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload">
            <img for="photo-upload" src={user.pic} alt="profile"/>
          </div>
          <input id="photo-upload" type="file" onChange={e => uploadImage(e)} accept="image/*"/>
        </label>
        <hr className="hr-rule"></hr>
        <div className="detail-container">
          <form onSubmit={updateProfile}>
            <div className="input-group-settings">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value) } required
              />
            </div>
            <div className="input-group-settings">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} required
              />
            </div>
            {/* <div className="input-group-settings">
              <label>Password</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)} required
              />
            </div> */}
            <div className="input-group-settings">
              <label>Bio</label>
              <textarea
                type="text"
                value={bio}
                onChange={e => setBio(e.target.value)}
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
