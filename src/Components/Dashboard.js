import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
import { ShowcaseCards } from './projectCards';
import {JoinCards} from './Join';
import {Redirect} from 'react-router-dom';

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user: firebase.auth().currentUser,
            likedProjects: {},
            showcaseProjects: {},
            requestedProjects: {},
            teammateProjects: {},
            requestIds: ''
        });
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

            // REQUESTED 
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
            this.requestedProjects = liked.on('value', (snapshot) => {
                let data = snapshot.val();
                if(data === null) { return;}
                let likeArray = Object.keys(data).map((key) => {
                    let projObj = data[key];
                    projObj.id = key;
                    return projObj;
                });
                this.setState({likedProjects: likeArray});
            });

            //TEAMMATE SHOWCASE
            let teammate= firebase.database().ref('userData').child(email).child('findMemProj');
            this.requestedProjects = teammate.on('value', (snapshot) => {
                let data = snapshot.val();
                if(data === null) { return;}
                let teamArray = Object.keys(data).map((key) => {
                    let projObj = data[key];
                    projObj.id = key;
                    this.reqEmail = projObj.requests;
                    // getting multiple email requests for individual projects and storing
                        if(this.reqEmail !== undefined) {
                            let ids;
                            Object.keys(this.reqEmail).map((key) => {
                               ids = this.state.requestIds + this.reqEmail[key] + "   ";
                            });
                            this.setState({requestIds: ids});
                        }

                    return projObj;
                });
                this.setState({teammateProjects: teamArray});
            });
        } // end of if user exists 
        
    }

    handleSignOut = () => {
        this.setState({ errorMessage: null });
        firebase.auth().signOut();
    }


    render() {
        let requestedCards = (<h2>You haven't requested to join any projects yet.</h2>);
        let showcaseCards = (<h2>You haven't uploaded any projects to showcase yet.</h2>);
        let likedCards = (<h2>You haven't liked any projects yet.</h2>);
        let teamCards =  (<h2>You haven't uploaded any projects to requested teammates yet.</h2>);
        let emails =  (<h2>You have no requests yet.</h2>);

        if (Object.keys(this.state.showcaseProjects).length !== 0) {
            showcaseCards = (<ShowcaseCards cardsData={this.state.showcaseProjects} />)
        }

        if (Object.keys(this.state.requestedProjects).length !== 0) {
            requestedCards = (<JoinCards cardsData={this.state.requestedProjects} />)
        }

        if (Object.keys(this.state.likedProjects).length !== 0) {
            likedCards = (<ShowcaseCards cardsData={this.state.likedProjects} />)
        }
        if(this.state.requestIds !== '') {
            emails =(<h2>You have requests from: {this.state.requestIds}to join your project!</h2>);            
    } 

        if (Object.keys(this.state.teammateProjects).length !== 0) {
            teamCards = (
                <div>
                    <JoinCards cardsData={this.state.teammateProjects} />            
                </div>
            )
        }

        
        let banner;
        if(this.state.user === null) {
            banner = <Banner/>
        } else {
            banner =  <Banner username= {this.state.user.displayName}/>
        }
        return (
            <div>
                {banner}
                <div className="projects">

                    <h1>Your Liked Projects</h1>
                    <div className = "dashBack">
                    {likedCards}
                    </div>
                </div>
                <div className="projects">
                    <h1>Your Uploaded Projects to Showcase</h1>
                    <div className = "dashBack">
                    {showcaseCards}
                    </div>
                </div>
                <div className="projects">
                    <h1>Your Requested Projects</h1>
                    <div className = "dashBack">
                    {requestedCards}
                    </div>
                </ div>
                <div className="projects">
                    <h1>Your Uploaded Projects to find Teammates</h1>
                    <div className = "dashBack">
                    {teamCards}
                    {emails}
                    </div>
                </ div>
            </div>
        );

    }
}

class Banner extends Component {
    render() {
        let name;
        if(this.props.username === undefined) {
            name = "";
        } else {
            name = this.props.username
        }
        return (
          <div className="background-pic">
             <div className="banner-text">
                <h1>{"Welcome " + name + "!"}</h1>
                <p>Check out your activity on ProjectHub!</p>
            </div>
          </div>
        )
    }
}




export default Dashboard;