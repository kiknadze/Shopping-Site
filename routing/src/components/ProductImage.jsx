//simple functional component for product images
import React from "react";

export default function ProductImage(props) {
  return (
    <div className="product--image">
      <img src={props.product.url} alt="NO PRODUCT" />
    </div>
  );
}
