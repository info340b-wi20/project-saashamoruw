import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';

export class currUserStuff {
    constructor(props) {
        super(props)
        this.state = {user: firebase.auth().currentUser};
        let database = firebase.database().ref('userData');
        // if there exists an object for this.state.user then render that shit
    }

    // code to add to database

    let database = firebase.database().ref('userData');
    let email = this.state.user.email.replace('.', ''); // can't have special characters like .
    database.child(email).set({ // will create if doesn't exist
        po: "poop"
    });

    render() {
        
    }
}