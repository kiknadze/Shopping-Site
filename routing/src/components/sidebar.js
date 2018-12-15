import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css';
import 'antd/dist/antd.css';

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
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Product</Link>
            </li>
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Home</Link>
            </li>
          </ul>
        </nav>
        <div className="amado-btn-group mt-30 mb-100">
          <a href="#" className="btn ">
            button 1
          </a>
          <a href="#" className="btn ">
            button 2
          </a>
        </div>
        <div className="cart-fav-search mb-100">
          <a href="#" className="search-nav">
            Search
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
