import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
/*
FIX:
- Icons in cards
*/


// names and descriptions for Join.json taken taken from kickstarter.com

const firebaseConfig = {
     apiKey: "AIzaSyB1uhAPijI883T9rJF3oAA5NRrqFfzifEE",
     authDomain: "project-hub-2020.firebaseapp.com",
     databaseURL: "https://project-hub-2020.firebaseio.com",
     projectId: "project-hub-2020",
     storageBucket: "project-hub-2020.appspot.com",
     messagingSenderId: "219620520860",
     appId: "1:219620520860:web:068aac9e0dfdc88e408e59",
     measurementId: "G-29YQEBWSEY"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// paste below body before using firebase s
/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.10.0/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

 */