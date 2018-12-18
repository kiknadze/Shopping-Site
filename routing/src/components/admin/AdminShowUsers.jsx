import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ShowOrders from './ShowOrders';
import 'react-confirm-alert/src/react-confirm-alert.css';

const userURL = "http://localhost:5000/db/users";

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userTable: ['#', 'Name', 'Lastname', 'Username', 'Email', 'Birthdate', 'Balance', 'Shopping Cart', 'Orders', "Edit"],
            orderTableItems: ['#', 'IMAGE', 'NAME', 'DESCRIPTION', 'PRICE', 'QUANTITY'],
            input: "",
            modalOrders: false,
            orders: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    ToggleOrders = () => {
        this.setState({
            modalOrders: !this.state.modalOrders
        });
    }

    OnShowOrders = (id) => {
        this.ToggleOrders()
        let orders = this.state.userData[id].orders;
        this.setState({ orders })
    }

    OnChangeState = () => {
        this.setState(() => ({ userData: [] }))
    }

    getUsers = () => {
        fetch(userURL)
            .then(userData => userData.json())
            .then(userData => {
                this.setState({ userData })
            })
            .catch(err => console.log(err));
    }

    handleClickEdit = (id) => {
        let newUsername = this.state.input;
        fetch(`http://localhost:5000/admin/user/edit`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, newUsername }),

        })
            .then(res => res.json())
            .then(userData => {
                this.setState({ userData })
            })
            .catch(err => console.log(err))


    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }

    EditUserHandler = (id, username) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>EDIT USER....!</h1>
                        <h1>CHANGE USERNAME</h1>
                        <input type="text" name="fname" placeholder={username} onChange={this.handleChange}></input>
                        <button onClick={onClose}>Close</button>
                        <button onClick={() => {
                            this.handleClickEdit(id, username)
                            onClose()
                        }}>Submit!</button>
                    </div>
                )
            }
        })
    }

    render() {
        return (
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        {this.state.userTable.map(user => <th key={user} scope="col">{user}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.userData
                            .filter(user => user.level > 0)
                            .map((user, index) =>
                                <tr key={index}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.birtddate}</td>
                                    <td>{user.balance}</td>
                                    <td><i className="fas fa-shopping-cart user--cart" ></i></td>
                                    <td><i className="fas fa-truck user--orders" onClick={() => this.OnShowOrders(index)}></i></td>
                                    <td><i class="fas fa-edit" onClick={() => this.EditUserHandler(user.id, user.username)}></i></td>
                                </tr>
                            )
                    }
                </tbody>
                <Modal isOpen={this.state.modalOrders}>
                    <ModalHeader className="modalheader">Order Status</ModalHeader>
                    <ModalBody>
                        <ShowOrders
                            orders={this.state.orders}
                            orderTableItems={this.state.orderTableItems}
                        />
                    </ModalBody>
                    <ModalFooter className="modalfooter">
                        <Button color="danger" onClick={this.ToggleOrders}>
                            Close
                                </Button>
                    </ModalFooter>
                </Modal>
            </table>
        )
    }
}