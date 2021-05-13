import React, { useContext, useState } from "react";
import api from "../helpers/api";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import "../styles/contactstyle.css";

function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const body = { name, email, message }
    await api.post("/contact-message", body)
    .then((res) => {
        const status = res.data.status;
        if (status === 0) {
            toast(res.data.message);
        } else {
            toast(res.data.message);
            history.push("/");
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  return (
    <div className="Contact-screen">
      <div className="Contact-screen-1">
        <div className="heading-contact">
          <h2>Contact Us</h2>
          <p>Thank you for choosing Readerspot!</p>
          <p>Reach out to us at </p>
          <p>
            <b>readerspot101@gmail.com</b>
          </p>
          <p>or</p>
        </div>
        <form onSubmit={submitForm}>
          <div className="input-group-contact">
            <label>Name</label>
            <input
              type="text"
              onChange={e => setName(e.target.value) } required
            />
          </div>
          <div className="input-group-contact">
            <label>Email</label>
            <input
              type="email"
              onChange={e => setEmail(e.target.value) } required
            />
          </div>
          <div className="input-group-contact">
            <label>Message</label>
            <textarea onChange={e => setMessage(e.target.value)} required />
          </div>
          <button type="submit" className="contact-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
