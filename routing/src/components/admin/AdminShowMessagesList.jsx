import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import MessagesComponent from "./MessagesComponent";

const messagesURL = "http://localhost:5000/db/messages";

export default class AdminShowMessagesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesData: [],
      headings: ["#", "Name", "Email", "Subject", "Messages", "Delete"]
    };
  }

  //Get data from the database (JSON file)
  getData = () => {
    fetch(messagesURL)
      .then(res => res.json())
      .then(messagesData => this.setState({ messagesData }))
      .catch(err => console.log(err.message));
  };

  componentDidMount() {
    this.getData();
  }

  //using confirm alert
  DeleteMessageHandler = id => {
    confirmAlert({
      title: "Delete Message",
      message: "Are you sure to do Delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.DeleteMessage(id)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  //Delete message by ID
  DeleteMessage = id => {
    fetch(`http://localhost:5000/admin/messages/delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(messagesData => {
        this.setState({ messagesData });
      })
      .catch(err => console.log(err));
  };

  render() {
    let { messagesData } = this.state;
    return (
      <div>
        {messagesData.length ? (
          <div>
            {
              <MessagesComponent
                headings={this.state.headings}
                messagesData={this.state.messagesData}
                showTable={this.showTable}
                DeleteMessageHandler={this.DeleteMessageHandler}
              />
            }
          </div>
        ) : (
          <div>
            <h1>No data found :(</h1>
          </div>
        )}
      </div>
    );
  }
}
