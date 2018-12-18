import React from "react";
import { Link } from "react-router-dom";

//Navigation on the product's page.

export default function Navigation(props) {
  return (
    <div className="product--navigation">
      <Link to={"/"} className="link">
        Home
      </Link>
      <i className="fas fa-angle-double-right" />
      <Link to={`/products/${props.category}`} className="link">
        {props.category}
      </Link>
      <i className="fas fa-angle-double-right" />
      <Link
        to={`/products/${props.category}/${Number(props.productID)}`}
        className="link"
      >
        {props.productName}
      </Link>
    </div>
  );
}
