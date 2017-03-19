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
const userurl="https://helloworldapi.herokuapp.com/users/add/";
const profurl="https://helloworldapi.herokuapp.com/profiles/add/";
const getUrl = "https://helloworldapi.herokuapp.com/profiles/fetchdetails/";
const getUrl2 = "https://helloworldapi.herokuapp.com/users/fetchdetails/";
var furl="https://helloworldapi.herokuapp.com/profiles/search/userpids=";
var token = null;
var name = null;
var followers=[];
var pfollowers=[];

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
        const response = await fetch(getUrl, {
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

        const resp = await response.json();
        const resp2=await response2.json();
        console.log(JSON.stringify(resp));
        console.log(JSON.stringify(resp2));

        var pic;
        if(resp.gender === "F"){
            pic = female_img;
        }else{
            pic = male_img;
        }


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

                <div className="col-xs-4">
                    <img className="profile_pic" src={this.state.profile_pic}></img>
                    <br></br>
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <br></br>
                    Followers: {this.state.followers}
                    <br></br>
                    <Link to="/f1">Followers</Link> {this.state.following}
                    <br></br>
                    Email: {this.state.email}
                    <br></br>
                    Bio: {this.state.bio === '' ? "Nothing yet 😞" : this.state.bio}

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
                    <Link to="/createAcc">Join the revolution today</Link>
                </div> :
                <div>
                    <h1>Welcome!</h1>
                    <Link to="/profile">Go to your news feed</Link>
                </div>
        );


    }


}

class f1 extends React.Component{

    constructor(){
        pfollowers=[];
        super();
        this.state = {
            done:false,
        }
        this.submit2(this);
    }

    getToken(){
        return this.token;
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

        console.log(JSON.stringify(pfollowers));

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
                            return <li>{JSON.stringify(i)}</li>;
                        }) }</ul>
                        <Link to="/createAcc">Join the revolution today</Link>
                    </div> :
                    <div>
                        <h1>Welcome!</h1>
                        <Link to="/profile">Go to your news feed</Link>
                    </div>
            );
        }


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
        name=data2.username;
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
                            <Route path="/f1" component={f1}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;