import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
import { ShowcaseCards } from './projectCards';
import {JoinCards} from './Join';
import {Redirect} from 'react-router-dom';

export class currUserStuff extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user: firebase.auth().currentUser,
            likedProjects: {},
            showcaseProjects: {},
            requestedProjects: {},
        });
        this.showcaseProjects={};
        this.requestedProjects={};
        if(this.state.user === null) {
            console.log("NO");
            return <Redirect to ="/signin"/>
        }
    }



    componentDidMount() {
        // this.authUnRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
        //     if (currentUser) {
        //       this.setState({ user: currentUser });
        let showcaseProjects = {};
        let requestedProjects = {};

        let email = this.state.user.email.replace('.', '');
        let database = firebase.database();
        let userData = database.ref('userData').child(email);
        if (userData !== null && userData.length !== 0) {
            // user exists 
            console.log("User exists");
            // put all showcase cards for the user into this
            let showcase = userData.child('showcaseProj')
            if (showcase !== undefined) {
                console.log("HERE");
                // DEBUG: Doesn't enter this loop?
                showcase.on('value', (snapshot) => {
                    let data = snapshot.val();
                    if(data === null) {return;}
                    console.log("HERE2");
                    showcaseProjects = Object.keys(data).map((key) => {
                        console.log("HERE3");
                        let projObj = data[key];
                        projObj.id = key;
                        return projObj;
                    });
                });
            }
             //check if array is correct
           console.log(showcaseProjects)
           this.setState({showcaseProjects: showcaseProjects});
           console.log(this.state.showcaseProjects);

            // put all requested proj cards for the user into this
            let requested = userData.child('requestedProj');
            if (requested!== undefined) {
                 // DEBUG: Doesn't enter this loop?
                requested.on('value', function(snapshot) {
                    let data = snapshot.val();
                    if(data === null) {return;}
                    requestedProjects = Object.keys(data).map((key) => {
                        let projObj = data[key];
                        projObj.id = key;
                        return projObj;
                    });
                });
                //check if array is correct
                console.log(requestedProjects);
                this.setState({requestedProjects: requestedProjects});
                console.log(this.state.showcaseProjects)
            }
        } // ends if user does exist
        


    }

    // componentWillUnmount() {
    //     this.database.off()
    // }

    handleSignOut = () => {
        this.setState({ errorMessage: null });
        firebase.auth().signOut();
    }


    render() {

        let requestedCards;
        let showcaseCards;
        if (Object.keys(this.state.showcaseProjects).length === 0) {
            showcaseCards = (<h1>You don't have any showcased projects</h1>);
            console.log("showcase no")
        } else {
            console.log("showcase yes")
            showcaseCards = (<ShowcaseCards cardData={this.state.showcaseProjects} />)
        }
        
        if (Object.keys(this.state.requestedProjects).length === 0) {
            requestedCards = (<h1>You don't have any requested projects :( </h1>);
            console.log("req no")
        } else {
            console.log("req yes")
            requestedCards = (<JoinCards cardData={this.state.requestedProjects} />)
        }
        // } else {
        //     requestedCards = (<div><p>Nothing requested yet.</p></div>)
        // }


        /*  // messages sent by user
         let messageArray = database.child(email).ref('messages');
         let messages = messageArray.map((i) => {
             return <p>{i}</p>
         });
         */
        let msg = "Welcome, " + this.state.user.displayName + "!";

           

        return (
            <div>
                <h2>Dashboard</h2>
                {/* <div>
                    <h1>Your Liked Projects</h1>
                    {likedCards}
                </div> */}
                <div className = "newSec">
                    <h1>Your Uploaded Projects</h1>
                    {showcaseCards}
                </div>
                <div className = "newSec">
                    <h1>Your Requested Projects</h1>
                    {requestedCards}
                </ div>
                {/* <div>
                        <h1>Your Messages</h1>
                        {messages}
                    </div>  */}
            </div>
        );

    }
}


export default currUserStuff;