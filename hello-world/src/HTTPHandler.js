// import React, { Component } from 'react';
//
// class HTTPHandler extends Component {
// // function post(url, ) {
// //
// // }

    export default function getRequest(url, callback) {

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = callback;
        req.send();

    }
// }
//
// export default HTTPHandler;