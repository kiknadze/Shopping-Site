import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="left">
          <div className="footer__logo">
            <img
              src="https://colorlib.com/preview/theme/amado/img/core-img/logo2.png"
              alt="No Logo"
            />
          </div>
          <div className="copy">Copyright ©2018 All rights reserved </div>
        </div>

        <div className="right">
          <nav className="footer-nav">
            <ul>
              <li>
                <Link className="footerHome" to="/">
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/contactus">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}



export default Footer;
