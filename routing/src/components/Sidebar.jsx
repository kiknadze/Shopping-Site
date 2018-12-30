import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import ShowOrders from "./admin/ShowOrders";
import { MyContext } from "./MyContext";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
const usersUrl = "http://localhost:5000/db/users"; //userDB
//get user id from localstorage
const userID = localStorage.getItem("User")
  ? JSON.parse(localStorage.getItem("User")).id
  : 0;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      cart: 0,
      orderTableItems: [
        "#",
        "IMAGE",
        "NAME",
        "DESCRIPTION",
        "PRICE",
        "QUANTITY"
      ],
      message: "",
      name: "",
      lastname: "",
      address: "",
      birthdate: "",
      balance: "",
      email: "",
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.GetUser();
  }
  //get user from database
  GetUser = () => {
    userID &&
      fetch(usersUrl)
        .then(users => users.json())
        .then(users => {
          let user = users.filter(user => user.id === userID);
          let cart = 0;
          for (let i = 0; i < user[0].cart.length; i++) {
            cart += Number(user[0].cart[i].quantity);
          }

          this.setState({ user: user[0], cart });
        })
        .catch(err => console.log(err));
  };
  //edit profile
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
  };
  //update profile
  editProfile = e => {
    e.preventDefault();
    this.editUser(
      this.state.user.id,
      this.state.name,
      this.state.lastname,
      this.state.password,
      this.state.address,
      this.state.birthdate,
      this.state.balance
    );
  };

  editUser = (id, name, lastname, password, address, birthdate, balance) => {
    fetch("http://localhost:5000/editUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        name,
        lastname,
        password,
        address,
        birthdate,
        balance
      })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({ user, message: "You Successfully Edited!" });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 3000);
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logout = () => {
    localStorage.removeItem("User");
    this.setState({ user: {} });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="sidebar">
              <div className="logo">
                <Link to="/">
                  <img
                    src="https://colorlib.com/preview/theme/amado/img/core-img/logo.png"
                    alt="No Logo"
                  />
                </Link>
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
                    <Link to="/shop">Products</Link>
                  </div>
                  <div>
                    <Link to="/contactus">Contact Us</Link>
                  </div>
                </nav>
              </div>
              {localStorage.getItem("User") ? (
                <div className="sidebar-btn-group">
                  <button className="menu__hi">
                    Hi {this.state.user.name}
                  </button>
                  <button
                    className="menu__profile"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg-profile"
                    onClick={this.ShowProfile}
                  >
                    PROFILE
                  </button>

                  {context.state.cart > 0 ? (
                    <Link to="/checkout">
                      <button
                        className="menu__cart"
                        style={{ animation: "pulse 1s infinite", color: "red" }}
                      >
                        CART<sup>{context.state.cart}</sup>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/checkout">
                      <button className="menu__cart">
                        CART<sup>{context.state.cart}</sup>
                      </button>
                    </Link>
                  )}

                  <button
                    className="menu__orders"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    style={context.state.updateStyle}
                  >
                    ORDERS
                  </button>
                  <button className="menu__logout" onClick={this.logout}>
                    LOGOUT
                  </button>
                </div>
              ) : (
                <div className="sidebar-btn-group">
                  <Link to="/login">
                    <button className="menu__login">LOGIN</button>
                  </Link>
                  <Link to="/login#profile">
                    <button className="menu__register">REGISTRATION</button>
                  </Link>
                </div>
              )}
              <div className="icons-list">
                <Icon className="social" type="instagram" />
                <Icon className="social" type="linkedin" />
                <IconFont className="social" type="icon-facebook" />
                <IconFont className="social" type="icon-twitter" />
              </div>
            </div>

            <div
              className="accordion accordion-3 z-depth-1-half"
              id="accordionEx1"
              role="tablist"
              aria-multiselectable="true"
            >
              <div className="logo">
                <img
                  src="https://colorlib.com/preview/theme/amado/img/core-img/logo.png"
                  alt="No Logo"
                />
              </div>
              <hr className="mb-0" />
              <div className="card">
                <div className="card-header" role="tab" id="heading4">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordionEx1"
                    href="#collapse4"
                    aria-expanded="true"
                    aria-controls="collapse4"
                  >
                    <h3 className="mb-0 mt-3 red-text">MENU</h3>
                  </a>
                </div>

                <div
                  id="collapse4"
                  className="collapse show"
                  role="tabpanel"
                  aria-labelledby="heading4"
                  data-parent="#accordionEx1"
                >
                  <div className="card-body pt-0">
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
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" role="tab" id="heading5">
                  <a
                    className="collapsed"
                    data-toggle="collapse"
                    data-parent="#accordionEx1"
                    href="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    <h3 className="mb-0 mt-3 red-text">Profile</h3>
                  </a>
                </div>

                <div
                  id="collapse5"
                  className="collapse"
                  role="tabpanel"
                  aria-labelledby="heading5"
                  data-parent="#accordionEx1"
                >
                  <div className="card-body pt-0">
                    {localStorage.getItem("User") ? (
                      <div className="sidebar-btn-group">
                        <button className="menu__hi">
                          Hi {this.state.user.name}
                        </button>
                        <button
                          className="menu__profile"
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg-profile"
                          onClick={this.ShowProfile}
                        >
                          PROFILE
                        </button>
                        {context.state.cart > 0 ? (
                          <Link to="/checkout">
                            <button
                              className="menu__cart"
                              style={{
                                animation: "pulse 1s infinite",
                                color: "red"
                              }}
                            >
                              CART<sup>{context.state.cart}</sup>
                            </button>
                          </Link>
                        ) : (
                          <Link to="/checkout">
                            <button className="menu__cart">
                              CART<sup>{context.state.cart}</sup>
                            </button>
                          </Link>
                        )}

                        <button
                          className="menu__orders"
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg"
                          style={context.state.updateStyle}
                        >
                          ORDERS
                        </button>
                        <button className="menu__logout" onClick={this.Logout}>
                          LOGOUT
                        </button>
                      </div>
                    ) : (
                      <div className="sidebar-btn-group">
                        <Link to="/login">
                          <button className="menu__login">LOGIN</button>
                        </Link>
                        <Link to="/login#profile">
                          <button className="menu__register">
                            REGISTRATION
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" role="tab" id="heading6">
                  <a
                    className="collapsed"
                    data-toggle="collapse"
                    data-parent="#accordionEx1"
                    href="#collapse6"
                    aria-expanded="false"
                    aria-controls="collapse6"
                  >
                    <h3 className="mb-0 mt-3 red-text">Social Media</h3>
                  </a>
                </div>

                <div
                  id="collapse6"
                  className="collapse"
                  role="tabpanel"
                  aria-labelledby="heading6"
                  data-parent="#accordionEx1"
                >
                  <div className="card-body pt-0">
                    <div className="icons-list">
                      <Icon className="social" type="instagram" />
                      <Icon className="social" type="linkedin" />
                      <IconFont className="social" type="icon-facebook" />
                      <IconFont className="social" type="icon-twitter" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade bd-example-modal-lg"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <ShowOrders
                    orders={context.state.user.orders}
                    orderTableItems={this.state.orderTableItems}
                  />
                </div>
              </div>
            </div>

            <div
              className="modal fade bd-example-modal-lg-profile"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <form className="modal-content" onSubmit={this.editProfile}>
                  <div className="modal-header profile--modal">
                    <h5 className="modal-title" id="exampleModalLabel">
                      PROFILE
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div
                      className="tab-pane fade show edit__profile--form"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="row register-form">
                        <div className="col-md-6">
                          <div className="form-group">
                            Name:{" "}
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              onChange={this.onChange}
                              ref={this.name}
                              value={this.state.name}
                              required
                            />
                          </div>
                          <div className="form-group">
                            LastName:{" "}
                            <input
                              type="text"
                              className="form-control"
                              name="lastname"
                              onChange={this.onChange}
                              ref={this.lastname}
                              value={this.state.lastname}
                              required
                            />
                          </div>
                          <div className="form-group">
                            E-mail:{" "}
                            <input
                              type="email"
                              className="form-control"
                              value={this.state.email}
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            Username:{" "}
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.username}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            Password:{" "}
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              onChange={this.onChange}
                              ref={this.password}
                            />
                          </div>
                          <div className="form-group">
                            Address:{" "}
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              onChange={this.onChange}
                              ref={this.address}
                              value={this.state.address}
                              required
                            />
                          </div>
                          <div className="form-group">
                            Birthday:{" "}
                            <input
                              type="date"
                              className="form-control"
                              name="birthdate"
                              onChange={this.onChange}
                              ref={this.birthdate}
                              value={this.state.birthdate}
                              required
                            />
                          </div>
                          <div className="form-group">
                            Balance:{" "}
                            <input
                              type="number"
                              className="form-control"
                              name="balance"
                              onChange={this.onChange}
                              ref={this.balance}
                              value={this.state.balance}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12 login--message">
                          {this.state.message !== "" && (
                            <div className="alert alert-warning" role="alert">
                              {this.state.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Sidebar;
