import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CheckoutItems from './CheckoutItems';

const usersUrl = 'http://localhost:5000/db/users';
const userID = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : 0;

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableTitles: ['', 'Name', 'Price', 'Quantity'],
            user: {},
            totalPrice: 0,
            IsAddCart: false,
            IsBuying: false,
            modal: false
        }
    }

    componentDidMount() {
        this.GetUser();
    };

    Toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    OnCheckout = () => {
        this.setState({ IsBuying: true })
        setTimeout(() => this.setState({ IsBuying: false, modal: true }), 2000);
    }

    GetUser = () => {
        fetch(usersUrl)
            .then(users => users.json())
            .then(users => {
                let user = users.filter(user => user.id === userID)
                let totalPrice = 0;
                for (let i = 0; i < user[0].cart.length; i++) {
                    totalPrice += user[0].cart[i].price * user[0].cart[i].quantity;
                }
                this.setState({ totalPrice, user: user[0] });
            })
            .catch(err => console.log(err))
    };

    TotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < this.state.user.cart.length; i++) {
            totalPrice += this.state.user.cart[i].price * this.state.user.cart[i].quantity;
        }
        this.setState({ totalPrice });
    }

    MinusProduct = (e) => {
        let user = this.state.user;
        user.cart[e.target.id].quantity = Number(user.cart[e.target.id].quantity) - 1;
        if (user.cart[e.target.id].quantity === 0) user.cart.splice(e.target.id, 1)
        this.setState({ user })
        this.TotalPrice();
    }

    PliusProduct = (e) => {
        let user = this.state.user;
        user.cart[e.target.id].quantity = Number(user.cart[e.target.id].quantity) + 1;
        this.setState({ user, IsAddCart: true });
        setTimeout(() => this.setState({ IsAddCart: false }), 1500);
        this.TotalPrice();
    }

    DeleteProduct = (e) => {
        let user = this.state.user;
        user.cart.splice(e.target.id, 1)
        this.setState({ user })
        this.TotalPrice();
    }

    render() {
        return (
            <div className="checkout">
                <div className="checkout__head">
                    <h1>Shopping Cart</h1>
                    <div class="cart__image">
                        {
                            this.state.IsAddCart ?
                                <img src="/addCart.gif" alt="No Cart" /> :
                                <img src="/addCart.jpg" alt="No Cart" />
                        }
                    </div>
                </div>
                <div className="checkout--details">
                    <div className="chekout--ShoppingCart__products">
                        <div className="ShoppingCart--products__head">
                            {
                                this.state.tableTitles.map(title =>
                                    <div key={title} className="ShoppingCart--products__head--title">{title}</div>)
                            }
                        </div>
                        <div className="ShoppingCart--products__body">
                            {
                                this.state.user.cart &&
                                <CheckoutItems
                                    MinusProduct={this.MinusProduct}
                                    PliusProduct={this.PliusProduct}
                                    DeleteProduct={this.DeleteProduct}
                                    cart={this.state.user.cart} />
                            }
                        </div>
                    </div>
                    <div className="chekout--ShoppingCart__buy">
                        <h2><i class="fas fa-cart-arrow-down"></i> Cart Total</h2>
                        <hr />
                        <div className="buy__details">
                            <h3><i class="fas fa-money-bill-alt"></i> subtotal:</h3>
                            <h3><i class="fas fa-coins"></i> {this.state.totalPrice} ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i class="fas fa-map-marked-alt"></i> Address:</h3>
                            <h3>{this.state.user.address}</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i class="fas fa-truck"></i> Delivery:</h3>
                            <h3><i class="fas fa-coins"></i> 0 ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i class="fas fa-money-check"></i> Your Balance:</h3>
                            <h3>
                                {
                                    this.state.user.balance < this.state.totalPrice ?
                                        <i class="fas fa-credit-card" style={{"animation": "pulse 1s infinite", "color": "red"}}></i> :
                                        <i class="fas fa-credit-card" ></i>
                                 } {this.state.user.balance} ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i class="fas fa-money-check"></i> Total: </h3>
                            <h3><i class="fas fa-coins"></i> {this.state.totalPrice} ₾</h3>
                        </div>
                        <div className="buying--loading">
                            {this.state.IsBuying && <img src="./loading.gif" alt="NO LOADING" />}
                        </div>
                        <button className="btn-checkout" disabled={this.state.user.balance < this.state.totalPrice} onClick={this.OnCheckout}>Buy</button>
                        <Modal isOpen={this.state.modal}>
                            <ModalHeader>Order Status</ModalHeader>
                            <ModalBody>Your Order Has Completed!</ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.Toggle}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>

            </div>
        )
    }
}