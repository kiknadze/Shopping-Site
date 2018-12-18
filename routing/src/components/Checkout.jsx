// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
// import CheckoutItems from './CheckoutItems';

// const usersUrl = 'http://localhost:5000/db/users';
// const userID = JSON.parse(localStorage.getItem('User')).id;

// export default class Checkout extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             tableTitles: ['', 'Name', 'Price', 'Quantity'],
//             user: []
//         }
//     }

//     componentDidMount() {
//         this.GetUser();
//     };

//     OnCheckout = (e) => {
//         e.PreventDefault();
//     }

//     GetUser = () => {
//         fetch(usersUrl)
//             .then(users => users.json())
//             .then(users => {
//                 let user = users.filter( user => user.id === userID)
//                 this.setState({ user })
//                 console.log(this.state.user[0].cart)
//             })
//             .catch(err => console.log(err))
//     };

//     render() {
//         return (
//             <div className="checkout">
//                 <h1>Shopping Cart</h1>
//                 <div className="checkout--details">
//                     <div className="chekout--ShoppingCart__products">
//                         <div className="ShoppingCart--products__head">
//                             {
//                                 this.state.tableTitles.map(title =>
//                                     <div key={title} className="ShoppingCart--products__head--title">{title}</div>)
//                             }
//                         </div>
//                         <div className="ShoppingCart--products__body">
//                         { this.state.user.length && <CheckoutItems cart={this.state.user[0].cart} /> }
//                         </div>
//                     </div>
//                     <div className="chekout--ShoppingCart__buy">
//                         <button className="btn checkout" onClick={this.OnCheckout}>Buy</button>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }
