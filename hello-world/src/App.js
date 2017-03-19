import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import male_img from './male.png';
import female_img from './female.jpeg';
import Post from './Post';
import './App.css';

import 'whatwg-fetch';

const url = "https://helloworldapi.herokuapp.com/token-auth/";
const getUrl  = "https://helloworldapi.herokuapp.com/profiles/search/name=";
const feedUrl = "https://helloworldapi.herokuapp.com/posts/newsfeed/";
const postsUrl = "";
const userurl="https://helloworldapi.herokuapp.com/users/add/";
const profurl="https://helloworldapi.herokuapp.com/profiles/add/";
const getUrl2 = "https://helloworldapi.herokuapp.com/users/fetchdetails/";
var searchurl="https://helloworldapi.herokuapp.com/profiles/search/name=";

var furl="https://helloworldapi.herokuapp.com/profiles/search/userpids=";
const getselfposts="https://helloworldapi.herokuapp.com/posts/search/username="; // TODO
var followers=[];
var pfollowers=[];
var token = null;
var user = null;

class NewsFeed extends React.Component {


    constructor() {

        super();

        this.state = {
            posts: null,
            search: false,
            data: []
        };
        this.getNewsFeed();

    }

    async getNewsFeed() {

        console.log(token, user);

        const response = await fetch(feedUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        });

        const posts = await response.json();

        console.log(posts);
        this.setState({posts: posts});

        console.log("POSTS", this.state.posts);

    }

    async search(event) {
        event.preventDefault();
        console.log("In search");

        const {search : {value: search}} = this.refs;
        var surl = searchurl;
        surl = surl + search + "/";
        console.log(surl);
        const response = await fetch(surl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        });


        const data2 = await response.json();
        console.log(JSON.stringify(data2));

        this.setState({
            search: true,
            data: data2
        });


    }


    render() {
        if (this.state.search) {
            return (
                <div>
                    <ul>{ this.state.data.map(function (i) {
                        console.log(i);
                        return <div>{i.first_name} {i.last_name}{i.username}<br></br></div>;
                    }) }</ul>
                    <Link to="/createAcc">Join the revolution today</Link>
                </div>
            );
        }
        else {

            return (
                this.state.posts ?
                    <div>
                        <h1>News Feed</h1>
                        <div id="posts">
                            <ul>
                                {this.state.posts.map((post)=> {
                                    return <Post post={post}/>
                                })}
                            </ul>
                        </div>
                        <Link to="/profile">Link</Link>
                        <form id="search" onSubmit={this.search.bind(this)}>
                            <br></br>
                            <input id="search" ref="search" type="text" placeholder="Search"/>
                            <button>Search</button>
                        </form>
                    </div>
                    : <p>Loading...</p>
            );

        }
    }
}

class UserProfile extends React.Component{


    constructor(){

        super();
        followers=[];
        this.state = {  status:null,
            first:null,
            last:null,
            birthday:null,
            gender:null,
            bio:"",
            followers:[],
            following:[],
            email:""
        };

        this.getUser();


    }


    async getUser(){
        console.log(name);
        const response = await fetch(getUrl + user + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        });
        const response2 = await fetch(getUrl2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        });

        var resp = await response.json();
        const resp2=await response2.json();
        console.log(resp);
        // console.log(JSON.stringify(resp));
        // console.log(JSON.stringify(resp2));

        resp = resp[0];
        var pic;
        if(resp.gender === "F"){
            pic = female_img;
        }else{
            pic = male_img;
        }

        console.log("RESP",resp)


        var state={ status:"done",
            first:resp.first_name,
            last:resp.last_name,
            birthday:resp.birth_date,
            gender:resp.gender,
            bio:resp.bio,
            followers:resp.followers.length,
            following:resp.followings.length,
            profile_pic:pic,
            email:resp2.email
        };

        for(var i=0;i<resp.followings.length;i++){
            console.log(JSON.stringify(resp.followings[i]));
            followers.push(resp.followings[i]);
        }

        this.setState(state);

        console.log(this.state);
    }

    render(){


        if(this.state.status === "done") {
            return (

                <div>
                    <img className="profile_pic" src={this.state.profile_pic}></img>
                    <br></br>
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <br></br>
                    Followers: {this.state.followers}
                    <br></br>
                    <Link to="/f1">Following: </Link> {this.state.following}
                    <br></br>
                    Email: {this.state.email}
                    <br></br>
                    Bio: {this.state.bio === '' ? "Nothing yet ..." : this.state.bio}

                </div>

            );
        }else{
            return <div>Loading...</div>
        }
    }

};

class f1 extends React.Component{

    constructor(){
        pfollowers=[];
        super();
        this.state = {
            done:false,
        }
        this.submit2(this);
    }



    async submit2(event) {
        var cfurl=furl;
        for(var i=0;i<followers.length-1;i++){
            cfurl=cfurl+JSON.stringify(followers[i])+",";
            console.log(furl);
        }
        cfurl=cfurl+JSON.stringify(followers[followers.length-1])+"/";
        console.log(furl);

        const response = await fetch(cfurl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        });

        const data = await response.json();
        console.log(JSON.stringify(data));

        for (var i=0;i<data.length;i++){
            var obj=data[i];
            var h={};
            h.username=obj.username;
            h.firstname=obj.first_name;
            h.lastname=obj.last_name;
            pfollowers.push(h);
        }

        this.setState({
            done:true
        });

        // console.log(JSON.stringify(pfollowers));

    }

    render() {

        if(followers.length==0){
            return (
                <div>
                    <h1>Get a life!</h1>
                    <Link to="/profile">Go to your news feed</Link>
                </div>
            );
        }
        else {
            return (
                this.state.done ?
                    <div>
                        <ul>{ pfollowers.map(function (i) {
                            console.log(i);
                            return <div>{i.firstname} {i.lastname}<br></br></div>;
                        }) }</ul>
                    </div> :
                    <div>
                        <h1>Welcome!</h1>
                        <Link to="/profile">Go to your news feed</Link>
                    </div>
            );
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
                <div id="container" className="container">
                    <div className="col-xs-4"></div>
                    <div className="col-xs-4">
                    <form id="login" onSubmit={this.submit.bind(this)}>
                        <h1>Sign In</h1>
                        <br></br>
                        <input id="username" className="form-control" ref="username" type="text" placeholder="Username"/>
                        <br></br>
                        <input id="password" className="form-control" ref="password" type="password" placeholder="Password"/>
                        <br></br>
                        <br></br>
                        <button className="btn btn-danger btn-block">Log In</button>
                        <br></br>
                    </form>
                    <Link to="/createAcc">Join the revolution today</Link>
                    </div>
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
                <div className="container">
                    <div className="col-xs-4"></div>
                    <div className="col-xs-4">
                    <form id="create" onSubmit={this.submitacc.bind(this)}>
                        <h1>Create Account</h1>

                        <input id="username" className="form-control" ref="username" type="text" placeholder="Username"/>
                        <br></br>
                        <input id="password" className="form-control" ref="password" type="password" placeholder="Password"/>
                        <br></br>
                        <input id="first_name" className="form-control" ref="first_name" type="text" placeholder="First Name"/>
                        <br></br>
                        <input id="last_name" className="form-control" ref="last_name" type="text" placeholder="Last Name"/>
                        <br></br>
                        <input id="email" className="form-control" ref="email" type="email" placeholder="Email"/>
                        <br></br>
                        <button className="btn btn-danger btn-block">Create Account</button>
                    </form>
                    </div>
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
            <img src={logo} ></img>
          <Router>
              <div>
                <Route exact path="/" component={Login} />
                <Route path="/news" component={NewsFeed} />
                <Route path="/profile" component={UserProfile}/>
                <Route path="/createAcc" component={createAcc}/>
                <Route path="/f1" component={f1}/>
              </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
