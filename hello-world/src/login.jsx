import React, { PropTypes } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import 'whatwg-fetch';

// const testApi = "http://api.open-notify.org/iss-now.json";
const url = "https://helloworldapi.herokuapp.com/token-auth/";
var name = null;


export default class Login extends React.Component{


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

        console.log(data);

        if(data.token) {

            this.token = data.token;

        }else{
            alert("Incorrect user or password");
        }

    }

    render() {

        return(
            !this.token ?
            <div>
                <form id="login" onSubmit={this.submit.bind(this)}>
                    <h1>Sign In</h1>
                    <br></br>
                    <input id="username" ref="username" type="text" placeholder="Username"/>
                    <br></br>
                    <input id="password" ref="password" type="password" placeholder="Password"/>
                    <br></br>
                    <button>Log In</button>

                    <Link to="/hello">Log In</Link>

                </form>
            </div> :
            <div>
                <h1>Welcome!</h1>
            </div>
        );


    }


}