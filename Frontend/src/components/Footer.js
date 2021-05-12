import React from "react";
import { Link } from "react-router-dom";
import '../styles/custom.css'

function Footer () {

  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="footer-pad">
                <h4>About Us</h4>
                <p>A platform for digital publishing of articles. It’s an environment where everyone can contribute their thoughts and ideas.</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="footer-pad">
                <h4 className="useful-links-heading">Useful Links</h4>
                <ul className="useful-links-list">
                  <li><Link className="useful-links-item" to="/about">About Us</Link></li>
                  <li><Link className="useful-links-item" to="/contact">Contact Us</Link></li>
                  <li><Link className="useful-links-item" to="/">Terms & Conditions</Link></li>
                  <li><Link className="useful-links-item" to="/">Privacy Policy</Link></li>
                </ul>
                {/* <form>
                  <p>Send us a message</p>
                  <input type="text" name="name" placeholder="Name"/>
                  <textarea name="message" placeholder="Message"></textarea><br></br>
                  <button>Send</button>
                </form> */}
              </div>
            </div>
            <div className="col-sm-4">
              <ul className="list-inline text-center">
                <h4>Follow Us</h4>
                <li className="list-inline-item">
                    <a href="http://www.twitter.com">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="http://www.facebook.com">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="http://www.github.com">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </li>
              </ul>			
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 copy">
              <p className="copyright text-muted">Copyright &copy; ReaderSpot 2021</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;