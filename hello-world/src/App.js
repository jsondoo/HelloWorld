import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import male_img from './male.png';
import female_img from './female.jpeg';
import './App.css';
// import getRequest from './HTTPHandler.js';
import Login from './login.jsx';
import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
const getUrl = "https://helloworldapi.herokuapp.com/profiles/search/userpids=1/";
var token = null;
var name = null;

class NewsFeed extends React.Component{


    constructor(){

        super();
        this.state = {};


    }

    render(){

        return(
            <div>

            </div>
        );
    }
}

class UserProfile extends React.Component{


    constructor(){

        super();

        this.state = {  status:null,
                        first:null,
                        last:null,
                        birthday:null,
                        gender:null,
                        bio:"",
                        followers:[],
                        following:[]
                        };

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

        const resp = await response.json();
        const data = resp[0];
        console.log(data);

        var pic;
        if(data.gender === "F"){
            pic = female_img;
        }else{
            pic = male_img;
        }


        var state={ status:"done",
                    first:data.first_name,
                    last:data.last_name,
                    birthday:data.birth_date,
                    gender:data.gender,
                    bio:data.bio,
                    followers:data.followers.length,
                    following:data.followings.length,
                    profile_pic:pic
        };

        this.setState(state);

        console.log(this.state);
    }

    render(){


        if(this.state.status === "done") {
            return (
                <div className="col-xs-4">
                    <img className="profile_pic" src={this.state.profile_pic}></img>
                    <br></br>
                    <h1>
                    {this.state.first} {this.state.last} {this.state.bday}
                    </h1>
                    <br></br>
                    Followers: {this.state.followers}
                    <br></br>
                    Following: {this.state.following}
                    <br></br>
                    Bio: {this.state.bio}

                </div>
            );
        }else{
            return <div>Loading...</div>
        }
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
