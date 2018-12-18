import React from "react";

export default function ProductImage(props) {
  return props.product.map(product => (
    <div className="product--image" key={product}>
      <img src={product.url} alt="NO PRODUCT" />
    </div>
  ));
}
