import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Registration extends Component {
    constructor(props) {
        super(props)

        this.name = React.createRef();
        this.lastname = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.birthdate = React.createRef();
        this.balance = React.createRef();

        this.state = {
            user: {}
        }
    }

    RegisterSubmit = (e) => {
        e.preventDefault();
        this.AddProducts(
            this.name.current.value,
            this.lastname.current.value,
            this.username.current.value,
            this.password.current.value,
            this.email.current.value,
            this.birthdate.current.value,
            this.balance.current.value
        )
    };

    //Adding user
    AddProducts = (name, lastname, username, password, email, birthdate, balance) => {
        fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, lastname, username, password, email, birthdate, balance })
        })
            .then(res => res.json())
            .then(user => {
                this.setState({ user })
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                {localStorage.getItem('User') ?
                    <Redirect to="/login" /> :
                    <form className="form--registration" onSubmit={this.RegisterSubmit}>
                        <label>
                            <input className="form--input" type="text" placeholder="name" name="name" ref={this.name} required />
                        </label>
                        <label>
                            <input className="form--input" type="text" placeholder="lastname" name="lastname" ref={this.lastname} required />
                        </label>
                        <label>
                            <input className="form--input" type="text" placeholder="username" name="username" ref={this.username} required />
                        </label>
                        <label>
                            <input className="form--input" type="password" placeholder="password" name="password" ref={this.password} required />
                        </label>
                        <label>
                            <input className="form--input" type="text" placeholder="email" name="email" ref={this.email} required />
                        </label>
                        <label>
                            <input className="form--input" type="date" placeholder="birthdate" name="birthdate" ref={this.birthdate} required />
                        </label>
                        <label>
                            <input className="form--input" type="number" placeholder="balance" name="balance" ref={this.balance} required />
                        </label>
                        <button className="btn form--btn">Register</button>
                    </form>
                }
            </div>
        )
    }
}
