import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            message: ''
}

        this.OnSubmitHandler = this.OnSubmitHandler.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
    }
    OnSubmitHandler(event) {
        event.preventDefault();
        this.login(this.email.current.value, this.password.current.value);
    }

    login = (email, password) => {
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(result => {
                if (result.auth) {
                    localStorage.setItem('User', JSON.stringify(result));
                    this.setState({isLoggedIn: true, message: ''});
                } else {
                    this.setState({message: 'Login or password is not Correct'});
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        const { isLoggedIn } = this.state;
        if (isLoggedIn) {
            return <Redirect to={`/profile`} />
        }
        return (
            <form className="form--login" onSubmit={this.OnSubmitHandler}>
                <div className="login--username">
                    <label>
                        Username:
                        <br />
                        <input
                            type="text"
                            placeholder="Email"
                            className="login--input"
                            name="email"
                            ref={this.email}
                        />
                    </label>
                </div>

                <div className="login--password">
                    <label>
                        Password:
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            className="login--input"
                            name="password"
                            ref={this.password}
                        />
                    </label>
                </div>
                <div className="login--message">
                    {this.state.message}
                </div>
                <div className="login--submit">
                    <button className="btn btn--login">Login</button>
                </div>

            </form>
        )
    }
}
