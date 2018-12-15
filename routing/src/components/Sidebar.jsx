import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="#" className="btn">
            button 1
          </Link>
          <Link to="#" className="btn">
            button 2
          </Link>
        </div>
        <div className="cart-fav-search mb-100">
          <Link to="#" className="search-nav">
            Search
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
