import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            message: '',
            user: {}
        }

        this.OnSubmitHandler = this.OnSubmitHandler.bind(this);
        this.logemail = React.createRef();
        this.logpassword = React.createRef();
        this.name = React.createRef();
        this.lastname = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.address = React.createRef();
        this.birthdate = React.createRef();
        this.balance = React.createRef();
    }
    OnSubmitHandler(event) {
        event.preventDefault();
        this.login(this.logemail.current.value, this.logpassword.current.value);
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
                    this.setState({ isLoggedIn: true, message: '' });
                } else {
                    this.setState({ message: 'Login or password is not Correct' });
                    setTimeout(() => { this.setState({ message: '' }); }, 3000);
                }
            })
            .catch(err => console.log(err))
    }

    RegisterSubmit = e => {
        e.preventDefault();
        this.Validation(
            this.name.current.value,
            this.lastname.current.value,
            this.username.current.value,
            this.password.current.value,
            this.email.current.value,
            this.address.current.value,
            this.birthdate.current.value,
            this.balance.current.value
        );

        this.Adduser(
            this.name.current.value,
            this.lastname.current.value,
            this.username.current.value,
            this.password.current.value,
            this.email.current.value,
            this.address.current.value,
            this.birthdate.current.value,
            this.balance.current.value
        );
    };

    //Adding user
    Adduser = (name, lastname, username, password, email, address, birthdate, balance) => {
    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            Accept: 
                "application/json",
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            lastname,
            username,
            password,
            email,
            address,
            birthdate,
            balance
        })
    })
        .then(res => res.json())
        .then(user => {
        this.setState({ user, message: 'You Successfully Register!' });
        setTimeout(() => { this.setState({ message: '' }); }, 3000);
        })
        .catch(err => console.log(err));
    };


    render() {
        if (localStorage.getItem('User') && JSON.parse(localStorage.getItem('User')).level === '0') {
            return <Redirect to={`/admin`} />
        } else if (localStorage.getItem('User') && JSON.parse(localStorage.getItem('User')).level === '1') {
            return <Redirect to={`/`} />
        }
        return (
            <div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Never Give Up!</p>
                    </div>
                    <div class="col-md-9 register-right">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Register</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <form class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" onSubmit={this.OnSubmitHandler}>
                                <h3 class="register-heading">Login</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="logemail" placeholder="Email *" ref={this.logemail} />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="logpassword" placeholder="Password *" ref={this.logpassword} />
                                        </div>
                                        <input type="submit" class="btnRegister" value="Log In" />
                                    </div>
                                    <div class="col-md-12 login--message">
                                        {
                                            this.state.message !== '' &&
                                            <div class="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </form>
                            <form class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab" onSubmit={this.RegisterSubmit}>
                                <h3 class="register-heading">Register</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Name *" ref={this.name} required/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" ref={this.lastname} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email *" ref={this.email} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="UserName *" ref={this.username} required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" ref={this.password} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Address *" ref={this.address} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="date" class="form-control" placeholder="Birthday *" ref={this.birthdate} required />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control" placeholder="Balance *" ref={this.balance} required />
                                        </div>
                                        <input type="submit" class="btnRegister" value="Register" />
                                    </div>
                                    <div class="col-md-12 login--message">
                                        {
                                            this.state.message !== '' &&
                                            <div class="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
