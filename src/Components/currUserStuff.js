import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import 'firebase/database';
import { ShowcaseCards } from './projectCards';

export class currUserStuff extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user: firebase.auth().currentUser, 
            showcaseProjects: {}, 
            requestedProjects: {},
        });
        console.log(this.state.user);
    }

    componentDidMount() {
         let email = this.state.user.email.replace('.', '');
         this.database = firebase.database().ref('userData');
         console.log(this.database);
    }

    componentWillUnmount() {
         this.database.off()
    }

    handleSignOut = () => {
        this.setState({errorMessage:null}); 
        firebase.auth() .signOut();  
      }
    

    render() {
        let email = this.state.user.email.replace('.', '');
        let userData = firebase.database().ref('userData').child(email);
        let requestedCards;
        let showcaseCards; 
        if (userData === null || userData.length === 0) {
            this.database.push(email);
            this.state.showcaseProjects = {};
            this.state.requestedProjects = {};            
        } else {   

        let showcase =  firebase.database().ref('userData/' + email + '/showcaseProj');        
        if (showcase) {
            showcase.on('value', (snapshot) => {
                let data = snapshot.val();
                let projectsArray =  Object.keys(data).map((key) => {                    
                let projObj =  data[key]; 
                projObj.id = key;
                  return projObj; 
                });
                   //check if array is correct
                   console.log(projectsArray);
                this.setState({requestedProjects: projectsArray});
            });
                  showcaseCards = (<ShowcaseCards cardData = {this.state.showcaseProjects}/>) 
            } else {
                showcaseCards = (<div><p>Nothing uploaded yet.</p></div>)
            }
            
         let requested =  firebase.database().ref('userData/' + email + '/requestedProj');
            if (requested) { 
                    requested.on('value', (snapshot) => {
                    let data = snapshot.val();
                    let projectsArray =  Object.keys(data).map((key) => {                    
                    let projObj =  data[key]; 
                projObj.id = key;
                  return projObj; 
                });
                //check if array is correct
                console.log(projectsArray);
                
                this.setState({requestedProjects: projectsArray});
            });
                  requestedCards = (<ShowcaseCards cardData = {this.state.requestedProjects}/>) 
            } else {
                requestedCards = (<div><p>Nothing requested yet.</p></div>)
            }
        } // ends if user does exist
        // check state
        console.log(this.state.showcaseProjects);
        


                
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
                        {showcaseCards}
                    </div>
                    <div>
                        <h1>Your Requested Projects</h1>
                        {requestedCards}
                       </ div>
                {/* <div>
                        <h1>Your Messages</h1>
                        {messages}
                    </div>  */}
                    </div>
        )
        
        return (
                    { content}
        );

    }
}


export default currUserStuff;