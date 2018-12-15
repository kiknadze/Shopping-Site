import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="left">
            <div className="logo" />
            <div className="copy">Copyright ©2018 All rights reserved</div>
          </div>

          <div className="right">
            <nav className="footer-nav">
              <ul>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">Home</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
