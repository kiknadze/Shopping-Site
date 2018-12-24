import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CheckoutItems from './CheckoutItems';

const usersUrl = 'http://localhost:5000/db/users';
const userID = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : 0;

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.balance = React.createRef();
        this.address = React.createRef();

        this.state = {
            tableTitles: ['', 'Name', 'Price', 'Quantity'],
            user: {},
            totalPrice: 0,
            IsAddCart: false,
            IsBuying: false,
            modalOrderComplite: false,
            balanceModal: false,
            addressModal: false,
            redirect: false,
            shipping: 5,
        }
    }

    componentDidMount() {
        this.GetUser();
        this.mounted = true;
    };

    componentWillUnmount() {
        this.mounted = false;
    }

    OnComplete = () => {
        let user = this.state.user;
        user.balance -= this.state.totalPrice;
        this.OrderCompleted(user);
        this.setState({
            totalPrice: 0,
            shipping: 5,
            modalOrderComplite: !this.state.modalOrderComplite,
            redirect: true
        });
    }

    OrderCompleted = (user) => {
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
                if(this.mounted) {
                    this.setState({ user })
                }
            })
            .catch(err => console.log(err))
    }

    ToggleBalance = () => {
        this.setState({
            balanceModal: !this.state.balanceModal
        });
    }

    ToggleAddress = () => {
        this.setState({
            addressModal: !this.state.addressModal
        });
    }

    onChange = (e) => {
        let user = this.state.user;
        user.address = e.target.value;
        this.setState({ user })
    };

    OnCheckout = () => {
        this.setState({ IsBuying: true })
        setTimeout(() => this.setState({ IsBuying: false, modalOrderComplite: true }), 2000);
    }

    GetUser = () => {
        fetch(usersUrl)
            .then(users => users.json())
            .then(users => {
                let user = users.filter(user => user.id === userID)
                let totalPrice = 0;
                let shipping = 5;
                for (let i = 0; i < user[0].cart.length; i++) {
                    totalPrice += user[0].cart[i].price * user[0].cart[i].quantity;
                }
                if(totalPrice > 500) shipping = 0;
                totalPrice = totalPrice + shipping;
                this.setState({ totalPrice, shipping, user: user[0] });
            })
            .catch(err => console.log(err))
    };

    TotalPrice = () => {
        let totalPrice = 0;
        let shipping = 5;
        for (let i = 0; i < this.state.user.cart.length; i++) {
            totalPrice += this.state.user.cart[i].price * this.state.user.cart[i].quantity;
        }
        if(totalPrice > 500) shipping = 0;
        totalPrice = totalPrice + shipping;
        this.setState({ totalPrice, shipping });
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

    OnAddBalance = () => {
        this.setState({ balanceModal: true });
    }

    OnEditAddress = () => {
        this.setState({ addressModal: true });
    }

    AddBalance = () => {
        let user = this.state.user;
        user.balance = Number(user.balance) + Number(this.balance.current.value);
        this.setState( { user, balanceModal: false } )
    }

    EditAddress = () => {
        let user = this.state.user;
        user.address = this.address.current.value;
        this.setState( { user, addressModal: false } )
    }

    render() {
        
        if (this.state.redirect === true) {
            return <Redirect to="/" />
        } 
        
        return (
            <div className="checkout">
                <div className="checkout__head">
                    <h1>Shopping Cart</h1>
                    <div className="cart__image">
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
                        <h2><i className="fas fa-cart-arrow-down"></i> Cart Total</h2>
                        <hr />
                        <div className="buy__details">
                            <h3><i className="fas fa-money-bill-alt"></i> Subtotal:</h3>
                            <h3><i className="fas fa-coins"></i> {this.state.totalPrice} ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i className="fas fa-map-marked-alt"></i> Address:</h3>
                            <h3><i className="fas fa-pen-square" onClick={this.OnEditAddress} style={{"color": "red"}}></i> {this.state.user.address}</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i className="fas fa-truck"></i> Delivery:</h3>
                            <h3><i className="fas fa-coins"></i> {this.state.shipping} ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i className="fas fa-money-check"></i> Your Balance:</h3>
                            <h3>
                                {
                                    this.state.user.balance < this.state.totalPrice ?
                                        <i className="fas fa-credit-card" onClick={this.OnAddBalance} style={{"animation": "pulse 1s infinite", "color": "red"}}></i> :
                                        <i className="fas fa-credit-card" onClick={this.OnAddBalance}></i>
                                 } {this.state.user.balance} ₾</h3>
                        </div>
                        <div className="buy__details">
                            <h3><i className="fas fa-money-check"></i> Total: </h3>
                            <h3><i className="fas fa-coins"></i> {this.state.totalPrice} ₾</h3>
                        </div>
                        <div className="buying--loading">
                            {this.state.IsBuying && <img src="./loading.gif" alt="NO LOADING" />}
                        </div>
                        <button className="btn-checkout" disabled={this.state.user.balance < this.state.totalPrice} onClick={this.OnCheckout}>Buy</button>
                        <Modal isOpen={this.state.modalOrderComplite}>
                            <ModalHeader className="modalheader">Order Status</ModalHeader>
                            <ModalBody>Your Order Has Completed!</ModalBody>
                            <ModalFooter className="modalfooter">
                                <Button color="danger" onClick={this.OnComplete}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.balanceModal}>
                            <ModalHeader className="modalheader">Add Balance</ModalHeader>
                            <ModalBody>
                                <input className="form-control" type="number" name="balance" placeholder="Enter Money" ref={this.balance} />
                            </ModalBody>
                            <ModalFooter className="modalfooter">
                                <Button color="success" onClick={this.AddBalance}>
                                    Add Balance
                                </Button>
                                <Button color="danger" onClick={this.ToggleBalance}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.addressModal}>
                            <ModalHeader className="modalheader">Edit Address</ModalHeader>
                            <ModalBody>
                                <input className="form-control" type="text" onChange={this.onChange} value={this.state.user.address} name="address" ref={this.address} />
                            </ModalBody>
                            <ModalFooter className="modalfooter">
                                <Button color="success" onClick={this.EditAddress}>
                                    Save Address
                                </Button>
                                <Button color="danger" onClick={this.ToggleAddress}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>

            </div>
        )
    }
}