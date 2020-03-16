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
    
        let email = this.state.user.email.replace('.', '');
        let userData = firebase.database().ref('userData')

        if (userData !== null && userData.length !== 0) {
            // user now exists 

            // SHOWCASED
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

            // REQUESTED for user
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

            //LIKED
            let liked= firebase.database().ref('userData').child(email).child('likedProjects');
            this.requestedProjects = requested.on('value', (snapshot) => {
                let data = snapshot.val();
                if(data === null) { return;}
                let likeArray = Object.keys(data).map((key) => {
                    let projObj = data[key];
                    projObj.id = key;
                    return projObj;
                });
                this.setState({likedProjects: likeArray});
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
        let requestedCards = (<h2>You don't have any requested projects :( </h2>);
        let showcaseCards = (<h2>You don't have any showcased projects</h2>);
        let likedCards = (<h2>You don't have any liked projects</h2>);
        if (Object.keys(this.state.showcaseProjects).length !== 0) {
            showcaseCards = (<ShowcaseCards cardsData={this.state.showcaseProjects} />)
        }

        if (Object.keys(this.state.requestedProjects).length !== 0) {
            requestedCards = (<JoinCards cardsData={this.state.requestedProjects} />)
        }

        if (Object.keys(this.state.likedProjects).length !== 0) {
            likedCards = (<ShowcaseCards cardsData={this.state.likedProjects} />)
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
                <div>
                    <h1>Your Liked Projects</h1>
                    {likedCards}
                </div>
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