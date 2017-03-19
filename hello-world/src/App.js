import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import getRequest from './HTTPHandler.js';

class App extends Component {



    submit(event){


            var cb = function(){
                if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                    console.log(req.responseText);
                }
            }


        var testApi = "http://api.open-notify.org/iss-now.json";
        var url = "https://helloworldapi.herokuapp.com/users/";

        event.preventDefault();
        console.log(event, this);
        var user = this.refs.username.value;
        var pass = this.refs.password.value;

        console.log({username:user, password:pass});

        // var resp = getRequest(testApi);
        //
        // console.log(resp);

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = cb;
        req.send();
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
