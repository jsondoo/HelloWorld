import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
// import getRequest from './HTTPHandler.js';
import Login from './login.jsx';
import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
const getUrl = "https://helloworldapi.herokuapp.com/profiles/search/userpids=1/";
var token = null;
var name = null;

const NewsFeed = (props) => (
    <div>
        Hello NewsFeed.
    </div>
);

class UserProfile extends React.Component{


    constructor(){

        super();

        this.state = {status:null,first:null, last:null, bday:null};

        this.getUser();

    }


    async getUser(){

        const response = await fetch(getUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token a94226c96a965eb6a173288ccaef27ecc01e55f6'
            }
        })

        const data = await response.json();
        console.log(data);

        var state={status:"done",first:data[0].first_name, last:data[0].last_name,bday:data[0].birth_date};

        this.setState(state);

        console.log(this.state);
    }

    render(){


        return(
            <div className="col-xs-4">
                Name: {this.state.first} {this.state.last} {this.state.bday}
            </div>
        );
    }

};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Router>
              <div>
                <Route exact path="/" component={Login} />
                <Route path="/news" component={NewsFeed} />
                <Route path="/profile" component={UserProfile}/>
              </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
