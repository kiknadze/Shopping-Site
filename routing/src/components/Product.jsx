import React, { Component } from "react";
import ProductProduct from "./ProductProduct";
import Review from "./Review";
import Navigation from "./Navigation";
import ProductImage from "./ProductImage";

let productsURL = "http://localhost:5000/db/products";
let categoryURL = "http://localhost:5000/db/category";
let productID = "1";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      quantity: 3,
      userID: null,
      category: "",
      productName: "",
      productID: null
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
        let product = products.filter(product => product.id === productID);
        this.setState({ product });
        console.log(this.state.product[0].id);
      })
      .catch(err => console.log(err.message));
  };

  getProductName = () => {
    fetch(productsURL)
      .then(res => res.json())
      .then(products => {
        let productName = products.find(
          product => product.name === this.state.product[0].name
        ).name;
        this.setState({ productName });
        console.log(this.state.productName);
      })
      .catch(err => console.log(err.message));
  };

  getCategory = () => {
    this.state.product &&
      fetch(categoryURL)
        .then(res => res.json())
        .then(categories => {
          let category = categories.find(
            category => category.id === this.state.product[0].category
          ).name;
          this.setState({ category });
        })
        .catch(err => console.log(err.message));
  };

  addToCart = (userID, productID, quantity) => {
    fetch("http://localhost:5000/admin/user/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userID, productID, quantity })
    });
  };

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

    return (
      <>
        <div className="product--container">
          <Navigation
            category={this.state.category}
            productID={productID}
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
              />
            )}
          </div>
        </div>
        {this.state.userID && (
          <Review
            onSubmit={this.props.onSubmit}
            reviews={this.props.reviews}
            productID={this.props.productID}
            userID={this.props.userID}
          />
        )}
      </>
    );
  }
}
