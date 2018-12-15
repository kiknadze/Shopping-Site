import React, { Component } from "react"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const userURL = "http://localhost:5000/db/users";



export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userTable: ['#', 'Name', 'Lastname', 'Username', 'Email', 'Birthdate', 'Balance', 'Shopping Cart', 'Orders', "Edit"],
            input: ""
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    OnChangeState = () => {
        console.log(this.state.userData)
        this.setState(() => ({ userData: [] }))
    }


    getUsers = () => {
        fetch(userURL)
            .then(userData => userData.json())
            .then(userData => {
                this.setState({ userData })
                // console.log(userData);
            })
            .catch(err => console.log(err));
    }
    handleClickEdit = (id) => {
        let newUsername = this.state.input;
        console.log(id)
        console.log(newUsername)
        fetch(`http://localhost:5000/admin/user/edit`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id , newUsername}),
            
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
                    {this.state.userData.map((user, index) => {
                        if (user.level != 0) {
                            return (
                                <tr key={index}>
                                    <th scope="row">{user.id}</th>
                                    <th scope="row">{user.name}</th>
                                    <th scope="row">{user.lastname}</th>
                                    <th scope="row">{user.username}</th>
                                    <th scope="row">{user.email}</th>
                                    <th scope="row">{user.birthdate}</th>
                                    <th scope="row">{user.balance}</th>
                                    <td><i class="fas fa-shopping-cart fa-2x" ></i></td>
                                    <td><i class="fas fa-truck fa-2x" ></i></td>



                                    <td><button type="button" className="btn btn-warning" onClick={() => this.EditUserHandler(user.id, user.username)}>Edit</button></td>



                                </tr>
                            )




                        }
                    })}
                </tbody>

            </table>

        )
    }
}
