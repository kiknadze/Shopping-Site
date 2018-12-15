import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

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
      alert: "",
      isLoggedIn: false,
      name: "",
      email: "",
      subject: "",
      text: "",

      confirmAlert: "Please fill All the Inputs"
    };
  }

  // toggle between the show/hide of modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.text !== ""
    ) {
      this.setState({
        confirmAlert: "Your message has been sent Successfully!"
      });
    }
  };

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
  //set the value to the key, depending on user input

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="form--contactUs--wrapper">
        <form onSubmit={this.registerSubmit} className="form--contactUs">
          <h1>Contact us:</h1>
          <label>
            <i className="fas fa-user" />
            <input
              type="text"
              name="name"
              required
              value={this.state.name}
              onChange={this.changeHandler}
              placeholder="Enter your name, please"
              ref={this.name}
            />
          </label>
          <br />
          <label>
            <i className="fas fa-at" />
            <input
              type="text"
              name="email"
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
      </div>
    );
  }
}
