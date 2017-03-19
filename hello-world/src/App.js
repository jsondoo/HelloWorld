import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getRequest from './HTTPHandler.js';
import Login from './login.jsx';

class App extends Component {





  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World</h2>
            <Login></Login>
        </div>
      </div>
    );
  }
}

export default App;
