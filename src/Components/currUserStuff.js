import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
import {CreateShowcaseCards} from './projectCards';
export class currUserStuff extends Component {
    constructor(props) {
        super(props)
        let user = firebase.auth().currentUser;
        let email = user.email.replace('.', '');
        this.state = {user: user, 
            userData: firebase.database().ref('userData').child(email)};
    }

    render() {
        if(this.state.userData.showcaseProj && this.state.userData.requestedProj) {
            return (
            <div>
                <YourProj cardsData={this.state.userData.showcaseProj}/>
                <RequestedProj cardsData={this.state.userData.requestedProj}/>
            </div>)
        }
        if(this.state.userData.showcaseProj) {
            return <YourProj cardsData={this.state.userData.showcaseProj}/>
        }
        if(this.state.userData.requestedProj) {
            return <RequestedProj cardsData={this.state.userData.requestedProj}/>
        }
        return(
            <div>
                <h2> current user: {this.state.user.email}</h2>
                <h1>You don't have anything here yet</h1>
            </div>
        )
    }
}
class YourProj extends Component {
    render() {
        return (
            <div className="yourProj">
                <h1>Your projects</h1>
                <CreateShowcaseCards cardsData={this.state.userData.showcaseProj}/>
            </div>
            
        )

    }
}

class RequestedProj extends Component {
    render() {
          return (
            <div className="likedProj">
                <h1> Requested Projects</h1>
                <CreateShowcaseCards cardsData={this.state.userData.requestedProj}/>
            </div>
            
        )
    }
}

export default currUserStuff;