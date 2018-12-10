import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import Registration from './components/Registration';
import Login from './components/Login';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Registration />
        <Login />
      </div>
      </Router>
    );
  }
}

export default App;
