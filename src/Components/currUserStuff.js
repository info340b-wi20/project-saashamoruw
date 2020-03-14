import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
import {ShowcaseCards} from './projectCards';

export class currUserStuff extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user: firebase.auth().currentUser, 
            showcaseProjects: {}, 
            requestedProjects: {}
        });
        // no user for some reason???
        console.log(this.state.user);
    }
    componentDidMount() {
        let email = this.state.user.email.replace('.', '');
        let database = firebase.database().ref('userData').child(email);
    }

    componentWillUnmount() {
        this.database.off()
    }

    handleSignOut = () => {
        this.setState({errorMessage:null}); 
        firebase.auth().signOut();
      }


    render() {
        let email = this.state.user.email.replace('.', '');
        let userData = firebase.database().ref('userData').child(email);
        if (userData === null || userData.length === 0) {
           userData.push(email);
           this.state.showcaseProjects = {};
           this.state.requestedProjects = {};            
        }
    


        let uploaded =  userData.child(email).child('showcaseProj');
        let uploadedCards;
        if (uploaded === null ) {
            uploadedCards = (<div><p>Nothing uploaded yet.</p></div>)
        } else {
            uploaded.on('value', (snapshot) => {
                let data = snapshot.val();
                let projectsArray = Object.keys(data).map( (theKey) => {
                  let projObj = data[theKey];
                  projObj.id = theKey;
                  return projObj;
                })
                this.setState({showcaseProjects: projectsArray});
              });
            uploadedCards = (<ShowcaseCards cardData = {this.state.showcaseProjects}/>)
        }

        // requested is an array of card data for projects the user requested to join
       let requested = this.state.requestedProjects;
        let requestedCards;
        if (requested === null) {
            requestedCards = (<div><p>Nothing requested yet.</p></div>)
        } else {
            requested.on('value', (snapshot) => {
                let data = snapshot.val();
                let requestedArray = Object.keys(data).map( (theKey) => {
                  let projObj = data[theKey];
                  projObj.id = theKey;
                  return projObj;
                })
                this.setState({requestedProjects: requestedArray});
              });
            requestedCards = (<ShowcaseCards cardData = {this.state.requestedProjects}/>)
        }
        
       /*  // messages sent by user
        let messageArray = database.child(email).ref('messages');
        let messages = messageArray.map((i) => {
            return <p>{i}</p>
        });
        */
        let msg = "Welcome, " + this.state.user.displayName + "!"; 

        let content = (
            // log out option
            <div className="sign">
                <h1>{msg}</h1>
                <div className="submit-button">
                    <label for="submitbutton" aria-label="submit button"></label>
                    <button id="button-submit" type="submit" className="btn btn-dark submit" onClick={this.handleSignOut}>Log Out</button>   
                </div>
                <h2>Dashboard</h2>
                {/* <div>
                    <h1>Your Liked Projects</h1>
                    {likedCards}
                </div> */}
                <div>
                    <h1>Your Uploaded Projects</h1>
                    {uploadedCards}
                </div>
                <div>
                    <h1>Your Requested Projects</h1>
                    {requestedCards}
                </div>
                {/* <div>
                        <h1>Your Messages</h1>
                        {messages}
                    </div> */}
            </div>
        )

        return (
            { content }
        );

    }
}

export default currUserStuff;