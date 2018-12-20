import React from 'react'

export default function CheckoutItems(props) {
  return (
    props.cart.map((product, index) =>
      <div key={index+index}className="ShoppingCart--products__bodyDetail">
        <div key={product.url} className="ShoppingCart--products__body--img"><img src={product.url} alt="NO PRODACT" /></div>
        <div key={product.name} className="ShoppingCart--products__body--name">{product.name}</div>
        <div key={product.price} className="ShoppingCart--products__body--price">₾ {product.price}</div>
        <div key={index+index+index} className="ShoppingCart--products__body--quantity">
          <ul>
            <li key={index}><i className="fas fa-cart-arrow-down yellow"></i></li>
            <li key={props.MinusProduct}><i className="fas fa-minus-square black" onClick={props.MinusProduct} id={index}></i></li>
            <li key={product.quantity} className="prod--quantity">{product.quantity}</li>
            <li key={props.PliusProduct}><i className="fas fa-plus-square green" onClick={props.PliusProduct} id={index}></i></li>
            <li key={props.DeleteProduct}><i className="fas fa-trash-alt red" onClick={props.DeleteProduct} id={index}></i></li>
          </ul>
        </div>
      </div>
    )
  )
}