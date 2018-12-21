import React, { Component } from "react";
import ProductProduct from "./ProductProduct";
import Review from "./Review";
import Navigation from "./Navigation";
import ProductImage from "./ProductImage";
import { confirmAlert } from "react-confirm-alert";
import { Redirect } from 'react-router-dom';

let productsURL = "http://localhost:5000/db/products";
let categoryURL = "http://localhost:5000/db/category";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      quantity: 1,
      userID: null,
      category: "",
      productName: "",
      productID: props.match.params.id,
      addToCartPr: 3
    };
  }
  componentDidMount() {
    this.getProducts();
    this.setUser();
    this.getCategory();
    this.getProductName();
  }

  setUser = () => {
    if (localStorage.getItem("User")) {
      let userID = JSON.parse(localStorage.getItem("User")).id;
      this.setState({
        userID
      });
    }
  };

  getProducts = () => {
    fetch(productsURL)
      .then(res => res.json())
      .then(products => {
        let product = products.find(product => product.id === this.state.productID);
        this.setState({ product });
      })
      .catch(err => console.log(err.message));
  };

  getProductName = () => {
    fetch(productsURL)
      .then(res => res.json())
      .then(products => {
        let productName = products.find(
          product => product.name === this.state.product.name
        ).name;
        this.setState({ productName });
      })
      .catch(err => console.log(err.message));
  };

  getCategory = () => {
    this.state.product &&
      fetch(categoryURL)
        .then(res => res.json())
        .then(categories => {
          let category = categories.find(
            category => category.id === this.state.product.category
          ).name;
          this.setState({ category });
        })
        .catch(err => console.log(err.message));
  };

  addToCart = (userID, productID, quantity) => {
    fetch("http://localhost:5000/user/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userID, productID, quantity })
    })
      .then(res => res.json())
      .then(result => {
            confirmAlert({
              customUI: ({ onClose }) => {
                  return (
                      <div className='custom-ui'>
                          <h1>{this.state.quantity + ' ' + result.message}</h1>
                          <button className="btn btn-success editUser__input" 
                              onClick={() => {
                              this.setState({ addToCartPr: 2 });
                              onClose()
                          }}>Go To Checkout</button>
                          <button className="btn btn-success editUser__input" 
                              onClick={() => {
                              this.setState({ addToCartPr: 1 });
                              onClose()
                          }}>Continiue Shopping</button>
                      </div>
                  )
              }
          })
      })
      .catch(err => console.log(err));
  }

  increaseQuantity = () => {
    this.setState({
      quantity: this.state.quantity + 1
    });
  };

  decreaseQuantity = () => {
    this.setState({
      quantity: this.state.quantity - 1
    });
  };

  render() {
    const { userID } = this.state;
    const isEnabled = userID !== null;

    if (this.state.addToCartPr === 1) {
      this.setState({
        addToCartPr: 3
      });
      return <Redirect to={`/shop`} />
    } 
    else if (this.state.addToCartPr === 2) {
      this.setState({
        addToCartPr: 3
      });
      return <Redirect to={`/checkout`} />
    }
    return (
      <>
        <div className="product--container">
          <Navigation
            category={this.state.category}
            productID={this.state.productID}
            productName={this.state.productName}
          />
          <div className="product--image--details--wrapper">
            <ProductImage product={this.state.product} />

            {this.state.product && (
              <ProductProduct
                product={this.state.product}
                quantity={this.state.quantity}
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
                addToCart={this.addToCart}
                userID={this.state.userID}
                product0id={this.state.product}
                isEnabled={isEnabled}
                message={this.state.message}
              />
            )}
          </div>
        </div>
        {this.state.userID && (
          <Review
            onSubmit={this.props.onSubmit}
            reviews={this.props.reviews}
            productID={this.state.productID}
            userID={this.state.userID}
          />
        )}
      </>
    );
  }
}
