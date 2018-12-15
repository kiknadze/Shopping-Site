import React, { Component } from 'react';

import Sidebar from '../sidebar';
import ExtraFooter from '../extraFooter';
import ProductList  from "../productPage"



class IndexProduct extends Component {
  render() {
    return (
      <div className="index">
        <Sidebar />

        <div className="product-page">
        <ProductList />
        </div>

        <ExtraFooter />
      </div>
    );
  }
}

export default IndexProduct;
