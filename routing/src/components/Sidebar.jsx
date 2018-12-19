import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import ShowOrders from "./admin/ShowOrders";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
const usersUrl = 'http://localhost:5000/db/users';
const userID = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : 0;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      cart: 0,
      orderTableItems: ['#', 'IMAGE', 'NAME', 'DESCRIPTION', 'PRICE', 'QUANTITY'],
      orders: [],
      message: '',
      name: '',
      lastname: '',
      address: '',
      birthdate: '',
      balance: '',
      email: '',
      username: ''
    }
  }

  componentDidMount() {
    this.GetUser();
  }

  GetUser = () => {
    fetch(usersUrl)
      .then(users => users.json())
      .then(users => {
        let user = users.filter(user => user.id === userID)
        let cart = 0;
        for (let i = 0; i < user[0].cart.length; i++) {
          cart += Number(user[0].cart[i].quantity)
        }

        this.setState({ user: user[0], cart });
      })
      .catch(err => console.log(err))
  };

  ShowOrders = () => {
    let orders = this.state.user.orders;
    this.setState({ orders });
  }

  ShowProfile = () => {
    this.name = React.createRef();
    this.lastname = React.createRef();
    this.address = React.createRef();
    this.birthdate = React.createRef();
    this.balance = React.createRef();

    this.setState({
    name: this.state.user.name,
    lastname: this.state.user.lastname,
    email: this.state.user.email,
    username: this.state.user.username,
    address: this.state.user.address,
    birthdate: this.state.user.birthdate,
    balance: this.state.user.balance
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  Logout = () => {
    localStorage.removeItem('User');
    this.setState({ user: {} });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="logo" >
          <img src="https://colorlib.com/preview/theme/amado/img/core-img/logo.png" alt="No Logo" />
        </div>
        <div className="sidebar-nav">
          <nav>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/aboutus">About Us</Link>
            </div>
            <div>
              <Link to="/shop">Product</Link>
            </div>
            <div>
              <Link to="/contactus">Contact Us</Link>
            </div>
          </nav>
        </div>
        {
          localStorage.getItem('User') ?
            <div className="sidebar-btn-group">
              <button className="menu__hi">Hi {this.state.user.name}</button>
              <button
                className="menu__profile"
                data-toggle="modal"
                data-target=".bd-example-modal-lg-profile"
                onClick={this.ShowProfile}
              >
                PROFILE
              </button>
              <Link to="/checkout"><button className="menu__cart">CART<sup>{this.state.cart}</sup></button></Link>
              <button
                className="menu__orders"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={this.ShowOrders}
              >
                ORDERS
              </button>
              <button
                className="menu__logout"
                onClick={this.Logout}
              >
                LOGOUT
              </button></div>
            :
            <div className="sidebar-btn-group">
              <Link to="/login"><button className="menu__login">LOGIN</button></Link>
              <Link to="/login#profile"><button className="menu__register">REGISTRATION</button></Link>
            </div>
        }
        <div className="icons-list">
          <Icon className="social" type="instagram" />
          <Icon className="social" type="linkedin" />
          <IconFont className="social" type="icon-facebook" />
          <IconFont className="social" type="icon-twitter" />
        </div>
        <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <ShowOrders
                orders={this.state.orders}
                orderTableItems={this.state.orderTableItems}
              />
            </div>
          </div>
        </div>

        <div className="modal fade bd-example-modal-lg-profile" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header profile--modal">
                <h5 className="modal-title" id="exampleModalLabel">PROFILE</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="tab-pane fade show edit__profile--form" role="tabpanel" aria-labelledby="profile-tab" onSubmit={this.EditProfile}>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        Name: <input type="text" className="form-control" name="name" onChange={this.onChange} ref={this.name} value={this.state.name} required />
                      </div>
                      <div className="form-group">
                        LastName: <input type="text" className="form-control" name="lastname" onChange={this.onChange} ref={this.lastname} value={this.state.lastname} required />
                      </div>
                      <div className="form-group">
                        E-mail: <input type="email" className="form-control" value={this.state.email} disabled />
                      </div>
                      <div className="form-group">
                        Username: <input type="text" className="form-control" value={this.state.username} disabled />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        Password: <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onChange} ref={this.password} required />
                      </div>
                      <div className="form-group">
                        Address: <input type="text" className="form-control" name="address" onChange={this.onChange} ref={this.address} value={this.state.address} required />
                      </div>
                      <div className="form-group">
                        Birthday: <input type="date" className="form-control" name="birthday" onChange={this.onChange} ref={this.birthdate} value={this.state.birthdate} required />
                      </div>
                      <div className="form-group">
                        Balance: <input type="number" className="form-control" name="balance" onChange={this.onChange} ref={this.balance} value={this.state.balance} required />
                      </div>
                    </div>
                    <div className="col-md-12 login--message">
                      {
                        this.state.message !== '' &&
                        <div className="alert alert-warning" role="alert">
                          {this.state.message}
                        </div>
                      }
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;