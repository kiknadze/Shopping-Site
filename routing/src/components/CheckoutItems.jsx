import React from 'react'

export default function CheckoutItems(props) {
  return (
    props.cart.map(product =>
      <div className="ShoppingCart--products__bodyDetail">
        <div className="ShoppingCart--products__body--img"><img src={product.url} alt="NO PRODACT" /></div>
        <div className="ShoppingCart--products__body--name">{product.name}</div>
        <div className="ShoppingCart--products__body--price">₾ {product.price}</div>
        <div className="ShoppingCart--products__body--quantity">{product.quantity}</div>
      </div>
    )
  )
}
