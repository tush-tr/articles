import React, { useContext, useState } from "react";
import '../styles/contactstyle.css';

function Contact(){
    return(
        <div className="Contact-screen">
            
            <div className="Contact-screen-1">

            <div className="heading-contact"> 
            <h5> Contact Us</h5>               
            <p>Thank you for choosing Readerspot!</p>
            <p>Reach out to us at </p>
            <p>readerspot101@gmail.com</p>
            <p>or</p>
            </div> 
            <form>
            <div className="input-group-contact">
            <label>Name</label>
            <input type="text" /*onChange={e => setName(e.target.value) }*/ required/>
          </div>
                 
          <div className="input-group-contact">
            <label>Message</label>
            <input type="text" /*onChange={e => setMessage(e.target.value)}*/ required  />
          </div>
          <button type="submit" className="contact-button">Send</button>
            </form>                
            </div>
        </div>
    );
}


export default Contact;