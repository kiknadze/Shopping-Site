import React, { Component } from "react";
import MyModal from "./MyModal";

export default class MessagesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requiredItem: "",
      show: false
    };
  }

  //toggle between modal show/hide, set the value of required message
  showMessage = message => {
    this.setState({
      show: !this.state.show,
      requiredItem: message.message
    });
  };

  render() {
    return (
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              {this.props.headings.map(item => (
                <th key={item} scope="col">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.messagesData.map((message, index) => (
              <tr key={index}>
                <th scope="row">{message.id}</th>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>
                  <i 
                    class="fas fa-envelope-open show--message"
                    onClick={() => this.showMessage(message)}
                  ></i>
                </td>
                <td>
                  <i 
                    className="far fa-trash-alt delete-message" 
                    onClick={() => this.props.DeleteMessageHandler(message.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <MyModal
          show={this.state.show}
          message={this.state.requiredItem}
          showMessage={this.showMessage}
        />
      </div>
    );
  }
}
