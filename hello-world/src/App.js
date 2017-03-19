import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import getRequest from './HTTPHandler.js';

class App extends Component {

    submit(event){
        var url = "http://206.87.157.28:8000/users/";

        event.preventDefault();
        console.log(event, this);
        var user = this.refs.username.value;
        var pass = this.refs.password.value;

        console.log({username:user, password:pass});

        var cb = function(){
            console.log("WORKS");
        }

        getRequest(url, cb);

    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World</h2>
        </div>
          <form id="login" onSubmit={this.submit.bind(this)}>
              <h1>Sign In</h1>
              <br></br>
              <input id="username" ref="username" type="text" placeholder="Username"/>
              <br></br>
              <input id="password" ref="password" type="password" placeholder="Password"/>
              <br></br>
              <button>Log In</button>
          </form>
      </div>
    );
  }
}

export default App;
