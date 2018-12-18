import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="logo" />
        logo
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Shop</Link>
            </li>
            <li>
              <Link to="#">Product</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-btn-group ">
          <Link to="#" className="btn">
            Sign In
          </Link>
          <Link to="#" className="btn">
            Join
          </Link>
        </div>
        <div className="icons-list">
          <Icon className="social" type="instagram" />
          <Icon className="social" type="linkedin" />
          <IconFont className="social" type="icon-facebook" />
          <IconFont className="social" type="icon-twitter" />
        </div>
      </div>
    );
  }
}

export default Sidebar;
