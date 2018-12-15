import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList  extends Component {
  render() {
    return (
        <div className="productCategories"> 
      <div className="categories"> Categories
      
        <nav className="categories-nav">
          <ul>
            <li>
              <Link to="#">Chairs</Link>
            </li>
            <li>
              <Link to="#">Beds</Link>
            </li>
            <li>
              <Link to="#">Accesories</Link>
            </li>
            <li>
              <Link to="#">Tables</Link>
            </li>
            <li>
              <Link to="#">Furniture</Link>
            </li>
          </ul>
        </nav>
        <div className="color"> colors  here

        </div>

        <div className="price"> prices  here

        </div>
      </div>
      </div>
    );
  }
}

export default ProductList ;
