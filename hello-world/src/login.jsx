import React from 'react';

import 'whatwg-fetch';

// const testApi = "http://api.open-notify.org/iss-now.json";
const url = "https://helloworldapi.herokuapp.com/token-auth/";

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

        const data = await response.json();

        console.log(data);



        // var cb = function(){
        //     if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        //         console.log(req.responseText);
        //     }
        // }
        //
        //


        //
        //
        // console.log(event, this);
        // var user = this.refs.username.value;
        // var pass = this.refs.password.value;
        //
        // console.log({username:user, password:pass});
        //
        // var resp = getRequest(testApi);

        // console.log(resp);
        //
        // var req = new XMLHttpRequest();
        // req.open("GET", url, true);
        // req.onreadystatechange = cb;
        // req.send();
    }

    render(){

        return(
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
            </div>
        );


    }


}