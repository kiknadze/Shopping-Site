import React from "react";

export default function ProductProduct(props) {
  return props.product.map(product => (
    <div className="product--details" key={product}>
      <div className="product--details--wrapper">
        <div className="product--details--line" />
        <div className="product--details__price">₾{product.price}</div>
        <div className="product--details__title">{product.name}</div>
        <div className="product--details__description">{product.desc}</div>

        {/* //qty */}
        <div className="product--details__quantity">
          <span className="qty">Qty:</span>
          <div className="quantity--wrapper">
            <div className="buttons--wrapper">
              <button onClick={props.increaseQuantity}>
                <i className="fas fa-angle-up" />
              </button>
              <button onClick={props.decreaseQuantity}>
                <i className="fas fa-angle-down" />
              </button>
            </div>
            <span>{props.quantity}</span>
          </div>
        </div>
        {/* btn */}
        <div className="product--details__cart">
          <button
            disabled={!props.isEnabled}
            onClick={() => {
              props.addToCart(
                props.userID,
                props.product0id[0].id,
                props.quantity
              );
            }}
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  ));
}
