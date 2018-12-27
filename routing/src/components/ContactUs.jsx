import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
const users = "http://localhost:5000/db/users";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.name = React.createRef();
    this.email = React.createRef();
    this.subject = React.createRef();
    this.message = React.createRef();

    this.state = {
      modal: false,
      message: {},
      user: "",
      alert: "",
      isLoggedIn: false,
      name: "",
      email: "",
      subject: "",
      text: "",
      confirmAlert: "Please fill All the Inputs"
    };
  }

  //if there is a person, already logged in,
  //the email address will be automatically filled in

  getUser = () => {
    if (localStorage.getItem("User")) {
      let test = JSON.parse(localStorage.getItem("User"));
      let testUsername = test.username;

      fetch(users)
        .then(res => res.json())
        .then(users => {
          let user = users.find(usr => usr.username === testUsername);
          let email = user.email;
          this.setState({
            email: email
          });
        })
        .catch(err => console.log(err.message));
    } else {
      this.setState({
        email: ""
      });
    }
  };

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //send data to the back, then renew the state of component
  addMessage = (name, email, subject, message) => {
    fetch("http://localhost:5000/addmessage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, subject, message })
    })
      .then(res => res.json())
      .then(message => {
        this.setState({ message });
      })
      .catch(err => console.log(err));
  };

  //if there is a person already logged in,
  //name in the contact form, will get automatically filled in

  checkIsLoggedIn = name => {
    if (localStorage.getItem("User")) {
      name = JSON.parse(localStorage.getItem("User")).username;
      if (name) {
        this.setState({
          name
        });
      } else {
        this.setState({
          name: ""
        });
      }
    }
  };

  //set the value to the key, depending on user input
  changeHandler = e => {
    this.validateEmail(this.state.email);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //toggle between the show/hide of modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (
      this.state.name !== "" &&
      this.state.text !== "" &&
      this.validateEmail(this.state.email)
    ) {
      this.setState({
        confirmAlert: "Your message has been sent Successfully!"
      });
    }
  };

  //on submiting the form, all the input fields to set to empty
  registerSubmit = e => {
    e.preventDefault();

    this.addMessage(
      this.name.current.value,
      this.email.current.value,
      this.subject.current.value,
      this.message.current.value
    );

    this.setState({
      alert: "Your message Has been sent!",
      name: "",
      email: "",
      subject: "",
      text: ""
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.validateEmail(this.state.email);
    this.checkIsLoggedIn(this.state.name);
    this.getUser();
  }

  render() {
    return (
      <div className="form--contactUs--wrapper">
        <h1>Contact Us:</h1>
        <div className="form--contactUs--container">
          <form onSubmit={this.registerSubmit} className="form--contactUs">
            <label>
              <i className="fas fa-user" />
              <input
                type="text"
                name="name"
                required
                value={
                  this.state.name.charAt(0).toUpperCase() +
                  this.state.name.slice(1)
                }
                onChange={this.changeHandler}
                placeholder="Enter your name, please"
                ref={this.name}
              />
            </label>
            <br />
            <label>
              <i className="fas fa-at" />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={this.state.email}
                onChange={this.changeHandler}
                placeholder="Enter your Email, please"
                ref={this.email}
              />
            </label>
            <br />
            <label>
              <i className="fas fa-tag" />
              <input
                type="text"
                name="subject"
                value={this.state.subject}
                onChange={this.changeHandler}
                placeholder="On which topic are you writing to us?"
                ref={this.subject}
              />
            </label>

            <br />
            <label>
              <i className="fas fa-pen" />

              <textarea
                rows="3"
                type="text"
                name="text"
                required
                value={this.state.text}
                onChange={this.changeHandler}
                placeholder="Enter your Message here..."
                ref={this.message}
              />
            </label>
            <button onClick={this.toggle}>Send!</button>

            <Modal isOpen={this.state.modal}>
              <ModalHeader>{this.state.confirmAlert}</ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </form>

          <div className="contactus--contact--info">
            <div className="contact--info contact--info__address--wrapper">
              <i className="fas fa-map-marker-alt" />
              <div className="contact--info__address">
                Tbilisi 0162, Georgia I. Chavchavadze Avenue N82
              </div>
            </div>
            <div className="contact--info contact--info__number--wrapper">
              <i className="fas fa-phone" />
              <div className=" contact--info__number">(+995 32) 230 80 55</div>
            </div>
            <div className="contact--info contact--info__email--wrapper">
              <i className="fas fa-envelope" />
              <div className="contact--info__email">info@btu.edu.ge</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
