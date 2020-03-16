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
        let requestedCards = (<h2>You don't have any requested projects.</h2>);
        let showcaseCards = (<h2>You don't have any showcased projects.</h2>);
        let likedCards = (<h2>You don't have any liked projects.</h2>);

        if (Object.keys(this.state.showcaseProjects).length !== 0) {
            showcaseCards = (<ShowcaseCards cardsData={this.state.showcaseProjects} />)
        }

        if (Object.keys(this.state.requestedProjects).length !== 0) {
            requestedCards = (<JoinCards cardsData={this.state.requestedProjects} />)
        }

        if (Object.keys(this.state.likedProjects).length !== 0) {
            likedCards = (<ShowcaseCards cardsData={this.state.likedProjects} />)
        }

        /*  // messages sent by user
         let messageArray = database.child(email).ref('messages');
         let messages = messageArray.map((i) => {
             return <p>{i}</p>
         });
          
         */
            
        return (
            <div>
                 <Banner/>
                <div className="projects">
                <h1 style = {{color: 'white', margin: '10px 0px 0px 20px'}}>{"Welcome, " + this.state.user.displayName + "!"}</h1>

                    <h1>Your Liked Projects</h1>
                    <div className = "dashBack">
                    {likedCards}
                    </div>
                </div>
                <div className="projects">
                    <h1>Your Uploaded Projects</h1>
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
                {/* <div>
                        <h1>Your Messages</h1>
                        {messages}
                    </div>  */}
            </div>
        );

    }
}

class Signout extends Component {
    constructor(props) {
      super(props)
      firebase.auth().signOut();
      return <Redirect to="/explore" />
    }
    render() {
      return <Route exact path='/explore' component={Projects} />
    }
  }

class Banner extends Component {
    render() {
        return (
          <div className="background-pic">
             <div className="banner-text">
                <h1>Dashboard</h1>
                <p>Check out your activity on ProjectHub!</p>
            </div>
          </div>
        )
    }
}




export default currUserStuff;