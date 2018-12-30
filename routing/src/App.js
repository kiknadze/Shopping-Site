import React, { Component } from 'react';
import AppRouter from './routers/AppRouter';
import { MyContext } from './components/MyContext';
import { confirmAlert } from "react-confirm-alert";

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const usersUrl = "http://localhost:5000/db/users";
const renewCartUrl = "http://localhost:5000/renewcart";
//get user id from localstorage
const userID = localStorage.getItem("User")
  ? JSON.parse(localStorage.getItem("User")).id
  : 0;


class App extends Component {
  constructor(props) {
    super(props);

    this.address = React.createRef();
    this.balance = React.createRef();

    this.state = {
      user: {},
      totalPrice: 0,
      shipping: 5,
      cart: 0,
      IsAddCart: false,
      IsBuying: false,
      modalOrderComplite: false,
      addressModal: false,
      balanceModal: false,
      updateStyle: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  //get user from DB
  getUser = () => {
    userID &&
      fetch(usersUrl)
        .then(users => users.json())
        .then(users => {
          let user = users.find(user => user.id === userID);
          let totalPrice = 0;
          let shipping = 5;
          let cart = 0;
          for (let i = 0; i < user.cart.length; i++) {
              totalPrice += user.cart[i].price * user.cart[i].quantity;
              cart += Number(user.cart[i].quantity);
          }
          if(totalPrice > 500) shipping = 0;
          totalPrice = totalPrice + shipping;
          this.setState({ totalPrice, shipping, user, cart });
        })
        .catch(err => console.log(err));
  };

  //renew cart for Checkout component
  renewCart = (user) => {
    fetch(renewCartUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(user => {
      let cart = 0;
      for (let i = 0; i < user.cart.length; i++) {
          cart += Number(user.cart[i].quantity);
      }
      this.setState({ user, cart });
    })
    .catch(err => console.log(err))
  }

  //plius product quantity for Checkout component
  pliusProduct = (e) => {
    let user = this.state.user;
    user.cart[e.target.id].quantity = Number(user.cart[e.target.id].quantity) + 1;
    this.renewCart(user);
    this.setState({ IsAddCart: true });
    setTimeout(() => this.setState({ IsAddCart: false }), 1500);
    this.totalPrice();
  }

  //minus product quantity for Checkout component
  minusProduct = (e) => {
    let user = this.state.user;
    user.cart[e.target.id].quantity = Number(user.cart[e.target.id].quantity) - 1;
    if (user.cart[e.target.id].quantity === 0) user.cart.splice(e.target.id, 1)
    this.renewCart(user);
    this.totalPrice();
  }

  //delete product from cart for Checkout component
  deleteProduct = (e) => {
    let user = this.state.user;
    user.cart.splice(e.target.id, 1)
    this.renewCart(user);
    this.totalPrice();
  }

  //total price for checkout component
  totalPrice = () => {
    let totalPrice = 0;
    let shipping = 5;
    for (let i = 0; i < this.state.user.cart.length; i++) {
        totalPrice += this.state.user.cart[i].price * this.state.user.cart[i].quantity;
    }
    if(totalPrice > 500) shipping = 0;
    totalPrice = totalPrice + shipping;
    this.setState({ totalPrice, shipping });
  }

  //edit address fro checkout component 
  editAddress = () => {
    let user = this.state.user;
    user.address = this.address.current.value;
    this.setState({ user, addressModal: false })
  }

  //address input change by type for checkout component
  onChangeAddress = (e) => {
    let user = this.state.user;
    user.address = e.target.value;
    this.setState({ user });
  };

  //open address modal for checkout component
  onEditAddress = () => {
    this.setState({ addressModal: true });
  }

  //close address modal for checkout component
  toggleAddress = () => {
    this.setState({
        addressModal: !this.state.addressModal
    });
  }

  //open add balance modal for checkout component
  onAddBalance = () => {
    this.setState({ balanceModal: true });
  }
  
  //add balance for checkout component
  addBalance = () => {
    let user = this.state.user;
    user.balance = Number(user.balance) + Number(this.balance.current.value);
    this.setState({ user, balanceModal: false })
  }

  //close balance modal for checkout component
  toggleBalance = () => {
    this.setState({
        balanceModal: !this.state.balanceModal
    });
  }

  //make order completed for checkout component
  onComplete = () => {
    let user = this.state.user;
    user.balance -= this.state.totalPrice;
    this.orderCompleted(user);
    this.setState({
        totalPrice: 0,
        shipping: 5,
        modalOrderComplite: !this.state.modalOrderComplite,
        cart: 0,
        updateStyle: { "animation": "pulse 1s infinite", "color": "red" }
    });
    setTimeout(() => this.setState({ updateStyle: {} }), 5000);
  }

  //write order to database for checkout component
  orderCompleted = (user) => {
    fetch('http://localhost:5000/ordercompleted', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    })
        .then(res => res.json())
        .then(user => {
                this.setState({ user })
        })
        .catch(err => console.log(err))
  }

  //make checkout for checkout component
  onCheckout = () => {
    this.setState({ IsBuying: true })
    setTimeout(() => this.setState({ IsBuying: false, modalOrderComplite: true }), 2000);
  }

  //add to cart for product component
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
        //renew cart quantity
        let cart = 0;
        for (let i = 0; i < result.user.cart.length; i++) {
            cart += Number(result.user.cart[i].quantity);
        }
        this.setState({user: result.user, cart})
        this.totalPrice();
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h1>{quantity + " " + result.message}</h1>
                <button
                  className="btn btn-success editUser__input"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Continiue Shopping
                </button>
              </div>
            );
          }
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <MyContext.Provider 
        value={{
          state: this.state, 
          pliusProduct: this.pliusProduct,
          minusProduct: this.minusProduct,
          deleteProduct: this.deleteProduct,
          editAddress: this.editAddress,
          onChangeAddress: this.onChangeAddress,
          address: this.address,
          balance: this.balance,
          onEditAddress: this.onEditAddress,
          toggleAddress: this.toggleAddress,
          onAddBalance: this.onAddBalance,
          addBalance: this.addBalance,
          toggleBalance: this.toggleBalance,
          onComplete: this.onComplete,
          onCheckout: this.onCheckout,
          addToCart: this.addToCart
          }}
        >
        <AppRouter />
      </MyContext.Provider>
    );
  }
}

export default App;
