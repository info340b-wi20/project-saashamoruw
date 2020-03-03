import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// names and descriptions for Join.json taken taken from kickstarter.com
 import CARDS from './cards.js'; 
//import CARDS from './Join.json'; 

ReactDOM.render(<App cardsData={CARDS} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
