import React from "react";
import '../styles/custom.css'
// this is not a final footer, need to be changed
function Footer () {
    return (
       
        <footer class="mainfooter" role="contentinfo">
        <div class="footer-middle">
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
             
              <div class="footer-pad">
              <h3>About Us</h3>
                    <p>A platform for digital publishing of articles. It’s an environment where everyone can contribute their thoughts and ideas.</p>
              </div>
            </div>
            <div class="col-sm-4">
             
              <div class="footer-pad">
              <h4>Contact Us</h4>
              <form>
        <p>Send us a message</p>
        <input type="text" name="name" placeholder="Name"/>
        <textarea name="message" placeholder="Message"></textarea><br></br>
                <button>Send</button>
                </form>
               
              </div>
            </div>
           
              <div class="col-sm-4">
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
          <div class="row">
              <div class="col-md-12 copy">
              <p className="copyright text-muted">Copyright &copy; ReaderSpot 2021</p>
              </div>
          </div>
      
      
        </div>
        </div>
      </footer>
    );

}

export default Footer;