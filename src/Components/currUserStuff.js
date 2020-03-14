import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
// import {} from './Components/'

export class currUserStuff extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: firebase.auth().currentUser
        };
    }

    handleSignOut = () => {
        this.setState({errorMessage:null}); 
    
        firebase.auth().signOut();
      }

    render() {
        let database = firebase.database().ref('userData');
        let email = this.state.user.email.replace('.', '');
        let liked = database.child(email).ref('liked');

        // liked is an array of card data liked by user
        let likedCards;// pass in array of card data to card rendering function
        //// card stuff import
        ////
        ////

        if (liked == null || liked.length == 0) {
            likeCards = (<div><p>Nothing liked yet.</p></div>)
        }
        // uploaded is an array of card data uploaded by user
        let uploaded = database.child(email).ref('uploaded');
        if (uploaded == null || uploaded.length == 0) {
            uploadedCards = (<div><p>Nothing uploaded yet.</p></div>)
        }
        let uploadedCards;
        // messages sent by user
        let messageArray = database.child(email).ref('messages');
        let messages = messageArray.map((i) => {
            return <p>{i}</p>
        });
        let msg = "Welcome, " + this.state.user.displayName + "!";

        let content = (
            // log out option
            <div className="sign">
            <div>
            <h1>{msg}</h1>
            <div className="submit-button">
            <label for="submitbutton" aria-label="submit button"></label>
            <button id="button-submit" type="submit" className="btn btn-dark submit" onClick={this.handleSignOut}>Log Out</button></div>          
            </div>
            // content
            <div>
                <h1>Your Liked Projects</h1>
                {likedCards}
            </div>
            <div>
                <h1>Your Uploaded Projects</h1>
                {uploadedCards}
            </div>
            <div>
                <h1>Your Messages</h1>
                {messages}
            </div>
            </div>
        )

        return (
            { content }
        );


    }
}