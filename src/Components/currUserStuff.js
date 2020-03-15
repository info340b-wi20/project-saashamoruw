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
        //this.showcaseProjects={};
        //this.requestedProjects={};
        
    }


    componentWillMount() {
        if(this.state.user === null) {
            return <Redirect to="/signin"/>
        }
    }
    componentDidMount() {
        if(this.state.user === null) {
            return <Redirect to="/signin"/>
        }
        // this.authUnRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
        //     if (currentUser) {
        //       this.setState({ user: currentUser });
        this.showcaseProjects = {};
        this.requestedProjects = {};
        let email = this.state.user.email.replace('.', '');
        let userData = firebase.database().ref('userData')
        if (userData !== null && userData.length !== 0) {
            // user now exists 
            // put all showcase cards for the user into this
            let showcase = firebase.database().ref('userData').child(email).child('showcaseProj')
            this.showcaseProjects = showcase.on('value', (snapshot) => {
                let data = snapshot.val();
                // no ref basically
                if(data === null) {return;}
                let array = Object.keys(data).map((key) => {
                    let projObj = data[key];
                    projObj.id = key;
                    return projObj;
                });
                this.setState({showcaseProjects: array});
            });

            // put all requested proj cards for the user into this
            let requested = firebase.database().ref('userData').child(email).child('requestedProj');
            this.requestedProjects = requested.on('value', (snapshot) => {
                let data = snapshot.val();
                if(data === null) { return;}
                let reqArray = Object.keys(data).map((key) => {
                    let projObj = data[key];
                    projObj.id = key;
                    return projObj;
                });
                this.setState({requestedProjects: reqArray});
            });
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
            showcaseCards = (<h2>You don't have any showcased projects</h2>);
        } else {
            showcaseCards = (<ShowcaseCards cardsData={this.state.showcaseProjects} />)
        }

        if (Object.keys(this.state.requestedProjects).length === 0) {
            requestedCards = (<h2>You don't have any requested projects :( </h2>);
        } else {
            requestedCards = (<JoinCards cardsData={this.state.requestedProjects} />)
        }
        // } else {
        //     requestedCards = (<div><p>Nothing requested yet.</p></div>)
        // }


        /*  // messages sent by user
         let messageArray = database.child(email).ref('messages');
         let messages = messageArray.map((i) => {
             return <p>{i}</p>
         });
          let msg = "Welcome, " + this.state.user.displayName + "!";
         */
       

           

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