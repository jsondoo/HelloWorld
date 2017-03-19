import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
// import getRequest from './HTTPHandler.js';
import Login from './login.jsx';
import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
var token = null;
var name = null;

const NewsFeed = (props) => (
    <div>

    </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
              <div>
                <Route exact path="/" component={Login} />
                <Route path="/news" component={NewsFeed} />
              </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
