import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import male_img from './male.png';
import female_img from './female.jpeg';
import './App.css';
// import getRequest from './HTTPHandler.js';
//import Login from './login.jsx';
import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
const getUrl = "https://helloworldapi.herokuapp.com/profiles/search/userpids=12/";
var token = null;
var name = null;

class NewsFeed extends React.Component{


    async getNewsFeed(){




    }

    constructor(){

        super();
        this.state = {};

        this.getNewsFeed();

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
                'Authorization': 'Token ' + token
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
                    {this.state.first} {this.state.last}
                    </h1>
                    <br></br>
                    Followers: {this.state.followers}
                    <br></br>
                    Following: {this.state.following}
                    <br></br>
                    Bio: {this.state.bio === '' ? "Nothing yet :(" : this.state.bio}

                </div>
            );
        }else{
            return <div>Loading...</div>
        }
    }

};

class Login extends React.Component{

    constructor(){

        super();
        this.state = {
            loggedIn:false,
            token:null
        }
    }

    getToken(){
        return this.token;
    }

    async submit(event) {
        event.preventDefault();

        const { username: { value: username }, password: { value: password }} = this.refs;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        name = {value:username};

        const data = await response.json();

        token = data.token;

        if(token) {
            console.log(token);
            this.setState({
                loggerIn:true,
                token:token
            });

        }else{
            alert("Incorrect user or password");
        }

    }

    render() {

        return(
            !this.state.token ?
                <div>
                    <form id="login" onSubmit={this.submit.bind(this)}>
                        <h1>Sign In</h1>
                        <br></br>
                        <input id="username" ref="username" type="text" placeholder="Username"/>
                        <br></br>
                        <input id="password" ref="password" type="password" placeholder="Password"/>
                        <br></br>
                        <button>Log In</button>


                    </form>
                </div> :
                <div>
                    <h1>Welcome!</h1>
                    <Link to="/profile">Go to your news feed</Link>
                </div>
        );


    }


}

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
