import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';

export class currUserStuff {
    constructor(props) {
        super(props)
        let user = firebase.auth().currentUser;
        let email = user.email.replace('.', '');
        this.state = {user: user, 
            userData: firebase.database().ref('userData').child(email)};
        
        
    }

    render() {
        console.log(this.state);
    }
}