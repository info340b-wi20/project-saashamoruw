import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';

export class currUserStuff {
    constructor(props) {
        super(props)
        this.state = {user: firebase.auth().currentUser};
        let database = firebase.database().ref('userData');
        // if there exists an object for this.state.user then render that shit

        // from https://firebase.google.com/docs/reference/js/firebase.database.Reference
        var adaRef = firebase.database().ref('users/ada');
        adaRef.transaction(function(currentData) {
        if (currentData === null) {
            return { name: { first: 'Ada', last: 'Lovelace' } };
        } else {
            console.log('User ada already exists.');
            return; // Abort the transaction.
        }
        }, function(error, committed, snapshot) {
        if (error) {
            console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
            console.log('We aborted the transaction (because ada already exists).');
        } else {
            console.log('User ada added!');
        }
        console.log("Ada's data: ", snapshot.val());
        });
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