import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { MyContext } from './MyContext';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CheckoutItems from './CheckoutItems';

const userID = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : 0;

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableTitles: ['', 'Name', 'Price', 'Quantity'],
            redirect: false
        }
    }

    //redirect to main page after checkout completed
    redirect = () => {
        this.setState({ redirect: true})
    }

    render() {
        //if order completed or user not logged in redirect main route
        if (this.state.redirect || userID === 0) {
            return <Redirect to="/" />
        }
        return (
            
            <MyContext.Consumer>
                {(context) =>
                    (<div className="checkout">
                        <div className="checkout__head">
                            <h1>Shopping Cart</h1>
                            <div className="cart__image">
                                {
                                    context.state.IsAddCart ?
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
                                        context.state.user.cart &&
                                        <CheckoutItems
                                            MinusProduct={context.minusProduct}
                                            PliusProduct={context.pliusProduct}
                                            DeleteProduct={context.deleteProduct}
                                            cart={context.state.user.cart}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="chekout--ShoppingCart__buy">
                                <h2><i className="fas fa-cart-arrow-down"></i> Cart Total</h2>
                                <hr />
                                <div className="buy__details">
                                    <h3><i className="fas fa-money-bill-alt"></i> Subtotal:</h3>
                                    <h3><i className="fas fa-coins"></i> {context.state.totalPrice} ₾</h3>
                                </div>
                                <div className="buy__details">
                                    <h3><i className="fas fa-map-marked-alt"></i> Address:</h3>
                                    <h3>
                                        <i
                                            className="fas fa-pen-square"
                                            onClick={context.onEditAddress}
                                            style={{ "color": "red" }}
                                        ></i> {context.state.user.address}
                                    </h3>
                                </div>
                                <div className="buy__details">
                                    <h3><i className="fas fa-truck"></i> Delivery:</h3>
                                    <h3><i className="fas fa-coins"></i> {context.state.shipping} ₾</h3>
                                </div>
                                <div className="buy__details">
                                    <h3><i className="fas fa-money-check"></i> Your Balance:</h3>
                                    <h3>
                                        {
                                            context.state.user.balance < context.state.totalPrice ?
                                                <i 
                                                    className="fas fa-credit-card" 
                                                    onClick={context.onAddBalance} 
                                                    style={{ "animation": "pulse 1s infinite", "color": "red" }}
                                                ></i> :
                                                <i 
                                                    className="fas fa-credit-card" 
                                                    onClick={context.onAddBalance}
                                                ></i>
                                        } {context.state.user.balance} ₾</h3>
                                </div>
                                <div className="buy__details">
                                    <h3><i className="fas fa-money-check"></i> Total: </h3>
                                    <h3><i className="fas fa-coins"></i> {context.state.totalPrice} ₾</h3>
                                </div>
                                <div className="buying--loading">
                                    {context.state.IsBuying && <img src="./loading.gif" alt="NO LOADING" />}
                                </div>
                                <button 
                                    className="btn-checkout" 
                                    disabled={context.state.user.balance < context.state.totalPrice} 
                                    onClick={context.onCheckout}
                                >Buy</button>
                                {/* modal for showing orders */}
                                <Modal isOpen={context.state.modalOrderComplite}>
                                    <ModalHeader className="modalheader">Order Status</ModalHeader>
                                    <ModalBody>Your Order Has Completed!</ModalBody>
                                    <ModalFooter className="modalfooter">
                                        <Button 
                                            color="danger" 
                                            onClick={(event) => { context.onComplete(); this.redirect(); }}
                                        >Close
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                {/* modal for add balance */}
                                <Modal isOpen={context.state.balanceModal}>
                                    <ModalHeader className="modalheader">Add Balance</ModalHeader>
                                    <ModalBody>
                                        <input 
                                            className="form-control" 
                                            type="number" 
                                            name="balance" 
                                            placeholder="Enter Money" 
                                            ref={context.balance} 
                                        />
                                    </ModalBody>
                                    <ModalFooter className="modalfooter">
                                        <Button 
                                            color="success" 
                                            onClick={context.addBalance}
                                        >Add Balance
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            onClick={context.toggleBalance}
                                        >Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                {/* modal for edit shipping address */}
                                <Modal isOpen={context.state.addressModal}>
                                    <ModalHeader className="modalheader">Edit Address</ModalHeader>
                                    <ModalBody>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            onChange={context.onChangeAddress} 
                                            value={context.state.user.address} 
                                            name="address" 
                                            ref={context.address} 
                                        />
                                    </ModalBody>
                                    <ModalFooter className="modalfooter">
                                        <Button 
                                            color="success" 
                                            onClick={context.editAddress}
                                        >Save Address
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            onClick={context.toggleAddress}
                                        >Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>)
                }
            </MyContext.Consumer>
        )
    }
}