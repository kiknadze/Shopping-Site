import React, { Component } from "react";
import { Link } from "react-router-dom";
const userURL = "http://localhost:5000/db/users";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      edit: false
    };
  }

  componentDidMount() {
    console.log("shevida");
    this.getUsers();
  }
  // componentDidUpdate() {
  //     console.log("shevida")
  //     this.getUsers();
  // }
  OnChangeState = () => {
    console.log(this.state.userData);
    this.setState(() => ({ userData: [] }));
  };

  getUsers = () => {
    fetch(userURL)
      .then(userData => userData.json())
      .then(userData => {
        this.setState({ userData });
        // console.log(userData);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { userData } = this.state;
    return (
      <div>
        <table>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">LASTNAME</th>
            <th scope="col">USERNAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">BIRTHDATE</th>
            <th scope="col">BALANCE</th>
            <th scope="col">PRODUCT CART</th>
            <th scope="col">BALANCE</th>
            <th scope="col">EDIT</th>
          </tr>
        </table>
        {userData.map(user => {
          if (user.level !== 0) {
            return (
              <div>
                <table>
                  <tr>
                    <th scope="row">{user.id}</th>
                    <th scope="row">{user.name}</th>
                    <th scope="row">{user.lastname}</th>
                    <th scope="row">{user.username}</th>
                    <th scope="row">{user.email}</th>
                    <th scope="row">{user.birthdate}</th>
                    <th scope="row">{user.balance}</th>
                    <th scope="row">
                      <Link to={"/user/" + user.id}>EDIT</Link>
                    </th>
                  </tr>
                </table>
              </div>
            );
          }
        })}
        <button onClick={this.OnChangeState}>Change</button>
      </div>
    );
  }
}
