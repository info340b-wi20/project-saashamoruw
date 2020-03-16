import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


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
  
   firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
