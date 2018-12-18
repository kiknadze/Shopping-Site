import React, { Component } from 'react';
import AppRouter from './routers/AppRouter';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

class App extends Component {
  render() {
    return (
        <AppRouter />
    );
  }
}

export default App;
