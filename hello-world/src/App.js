import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import male_img from './male.png';
import female_img from './female.jpeg';
import Post from './Post';
import './App.css';

// import getRequest from './HTTPHandler.js';
//import Login from './login.jsx';
import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
const getUrl  = "https://helloworldapi.herokuapp.com/profiles/search/name=";
const feedUrl = "https://helloworldapi.herokuapp.com/posts/newsfeed/";
const postsUrl = "";
const userurl="https://helloworldapi.herokuapp.com/users/add/";
const profurl="https://helloworldapi.herokuapp.com/profiles/add/";
var token = null;
var user = null;

class NewsFeed extends React.Component{


    constructor(){

        super();

        this.state = {posts:null};
        this.getNewsFeed();

    }

    async getNewsFeed(){

        console.log(token,user);

        const response = await fetch(feedUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })

        const posts = await response.json();

        console.log(posts);
        this.setState({posts: posts.length < 1 ? {none:true} : posts});

        console.log("POSTS",this.state.posts);

    }

    render(){

        return(
            this.state.posts ?
            <div>
                <h1>News Feed</h1>
                <div id="posts">
                    <ul>
                        {this.state.posts.map((post)=>{
                            return <Post post={post}/>
                        })}
                    </ul>
                </div>
                <Link to="/profile">Link</Link>
            </div>
                : <p>Loading...</p>
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


        console.log(token);
        const response = await fetch(getUrl + user + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })

        const resp = await response.json();
        const data = resp[0];
        console.log(resp);
        var pic;
        if(data.gender === "F"){
            pic = female_img;
        }else{
            pic = male_img;
        }

        console.log(token,user);

        // CHANGE TO USER'S POSTS
        const response2 = await fetch(feedUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })

        const resp2 = await response2.json();
        const posts = resp2;

        console.log(posts);


        var state={ status:"done",
                    first:data.first_name,
                    last:data.last_name,
                    birthday:data.birth_date,
                    gender:data.gender,
                    bio:data.bio,
                    followers:data.followers.length,
                    following:data.followings.length,
                    profile_pic:pic,
                    posts:posts
        };

        this.setState(state);

        // console.log(this.state);
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
                    <div id="posts">
                        <h2>Posts</h2>
                        <ul>
                            {this.state.posts.map((post)=>{
                                return <Post post={post}/>
                            })}
                        </ul>
                    </div>
                </div>
            );
        }else{
            return <div>{token ?
                "Loading..." :
                ("You are not logged in!"
                )}</div>
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

            user = username;
            console.log(user);
            // console.log(token);
            this.setState({
                loggerIn:true,
                token:token
            });

        }else{
            alert("Incorrect username or password");
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
                    <Link to="/createAcc">Join the revolution today</Link>
                </div> :
                <div>
                    <h1>Welcome!</h1>
                    <Link to="/profile">Go to your profile</Link>
                    <br></br>
                    <Link to="/news">Go to your news feed</Link>
                </div>
        );


    }


}

class createAcc extends React.Component{

    constructor(){

        super();
        this.state = {
            loggedIn:false,
            token:null
        }
    }


    async submitacc(event) {
        event.preventDefault();
        console.log("Launched");
        const { username: { value: username }, password: { value: password }, first_name: { value: first_name },
            last_name: { value: last_name }, email : { value: email }} = this.refs;

        const response = await fetch(userurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                first_name,
                last_name,
                email
            })
        });


        const data = await response.json();
        if(!data.hasOwnProperty("id")){
            alert("Username already exists in system");
            return;
        }
        var id=data.id;
        console.log(JSON.stringify(id));
        console.log(JSON.stringify(data));
        const response2 = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data2 = await response2.json();
        token = data2.token;
        console.log(JSON.stringify(token));
        console.log(JSON.stringify(data2));

        const response3 = await fetch(profurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + token
            },
            body: JSON.stringify({
                "user": id
            })
        });

        const data3 = await response3.json();
        console.log(JSON.stringify(data3));
        this.setState({
            loggerIn:true,
            token:token
        });

        user = username;


    }

    render() {

        return(
            !this.state.token ?
                <div>
                    <form id="create" onSubmit={this.submitacc.bind(this)}>
                        <h1>Create Account</h1>
                        <br></br>
                        <input id="username" ref="username" type="text" placeholder="Username"/>
                        <br></br>
                        <input id="password" ref="password" type="password" placeholder="Password"/>
                        <br></br>
                        <input id="first_name" ref="first_name" type="text" placeholder="First name"/>
                        <br></br>
                        <input id="last_name" ref="last_name" type="text" placeholder="Last Name"/>
                        <br></br>
                        <input id="email" ref="email" type="email" placeholder="Email"/>
                        <br></br>
                        <button>Create Account</button>
                    </form>
                </div> : <div>
                    <h1>Welcome to the Revolution!</h1>
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
                <Route path="/createAcc" component={createAcc}/>
              </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
