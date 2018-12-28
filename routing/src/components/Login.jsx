import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

    onSubmitHandler(event) {
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
                    this.setState({ message: '' });
                    window.location.reload();
                } else {
                    this.setState({ message: 'Login or password is not Correct' });
                    setTimeout(() => { this.setState({ message: '' }); }, 3000);
                }
            })
            .catch(err => console.log(err))
    }

    registerSubmit = e => {
        e.preventDefault();
        this.addUser(
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
    addUser = (name, lastname, username, password, email, address, birthdate, balance) => {
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
            if(user.reg) {
                this.setState({ message: user.message });
            } else {
                this.setState({ message: user.message });
            }
            setTimeout(() => { this.setState({ message: '' }); }, 3000);
        })
        .catch(err => console.log(err));
    };


    render() {
        //if user loggin person is admin redirect to admin page or user is logged in redirect to main page
        if (localStorage.getItem('User') && JSON.parse(localStorage.getItem('User')).level === '0') {
            return <Redirect to={`/admin`} />
        } else if (localStorage.getItem('User') && JSON.parse(localStorage.getItem('User')).level === '1') {
            return <Redirect to={`/`} />
        }
        return (
            <>
            <div id="login__header"></div>
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Never Give Up!</p>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Register</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <form className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" onSubmit={this.onSubmitHandler}>
                                <h3 className="register-heading">Login</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="logemail" placeholder="Email *" ref={this.logemail} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="logpassword" placeholder="Password *" ref={this.logpassword} />
                                        </div>
                                        <input type="submit" className="btnRegister" value="Log In" />
                                    </div>
                                    <div className="col-md-12 login--message">
                                        {
                                            this.state.message !== '' &&
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </form>
                            <form className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab" onSubmit={this.registerSubmit}>
                                <h3 className="register-heading">Register</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *" ref={this.name} required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" ref={this.lastname} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" ref={this.email} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="UserName *" ref={this.username} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" ref={this.password} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Address *" ref={this.address} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="date" className="form-control" placeholder="Birthday *" ref={this.birthdate} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Balance *" ref={this.balance} required />
                                        </div>
                                        <input type="submit" className="btnRegister" value="Register" />
                                    </div>
                                    <div className="col-md-12 login--message">
                                        {
                                            this.state.message !== '' &&
                                            <div className="alert alert-warning" role="alert">
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
        </>
        )
    }
}
