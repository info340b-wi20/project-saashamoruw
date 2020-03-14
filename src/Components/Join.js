import React, { Component } from 'react'; //import React Component
//import _ from 'lodash'
import { Card, CardImg, CardText, CardBody, CardTitle, Row, Col, CardFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import firebase from 'firebase/app'
import 'firebase/database';


// Join Projects page 
export class Join extends Component {
    constructor(props) {
        super(props);
        this.state =  {cards: []};
    }

    componentDidMount() {
        this.projectsRef = firebase.database().ref('joinCards');
        this.projectsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let projectsArray = Object.keys(data).map( (theKey) => {
              let projObj = data[theKey];
              projObj.id = theKey;
              return projObj;
            })

            this.setState({cards: projectsArray});
          });
    }
    componentWillUnmount() {
        this.projectsRef.off();
    }


    render() {
        return (
            <div className="projects">
            <Row>
                <CreateShowcaseCards cardsData={this.state.cards} />
            </Row>
            </div>
        )
    }
}



class CreateShowcaseCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map(function(oneCard) {
            let currCard = (<CreateCard oneCardData={oneCard} key={"card" + oneCard.name} />);
            return currCard;
        });
        return (
            cards
        );
    }
}

class CreateCard extends Component {
    render() {
        this.cardData = this.props.oneCardData;
        let card = (
            <Col className="col">
                <div className="cardContainer">
                    <div className="content-area">
                        <div className="side_one">
                            <CreateSideOne cardData={this.cardData} key={"sideone" + this.cardData.name} />
                        </div>
                        <div className="side_two">
                            <CreateSideTwo cardData={this.cardData} key={"sidetwo" + this.cardData.name} />
                        </div>
                    </div>
                </div>
            </Col>
        );
        return card;
    }
}

class CreateSideOne extends Component {
    render() {
        this.cardData = this.props.cardData;
        let sideOne = (
            <Card className="card" key={this.cardData.name}>
                <CardImg top width="100%" height= "60%" src={this.cardData.img} alt={this.cardData.alt} />
                <CardBody>
                    <CardTitle className="cardTitle">{this.cardData.name} </CardTitle>
                    <CardText className="cardText">{this.cardData.description}</CardText>
                </CardBody>
                <CardFooter>
                    
                </CardFooter>
            </Card>
        )
        return sideOne;
    }
}

class CreateSideTwo extends Component {
    render() {


        this.cardData = this.props.cardData;
        let sideTwo = (
            <Card className="card" key={this.cardData.name}>
                <CardBody>
                    <CardTitle  className="cardTitle">{this.cardData.name}</CardTitle>
                    <CardText>{"Skills/Languages: "}<span className="highlight">{this.cardData.skills.join(', ')}</span></CardText>
                    <CardText>{"Positions Open: " + this.cardData.position.join(', ')}</CardText>
                    <CardText>{"Members Needed: " + this.cardData.needed}</CardText>
                    <CardText>{"Duration: " + this.cardData.duration}</CardText>
                    <CardText>{"Start Date: " + this.cardData.start}</CardText>
                    <CardText>{"Time Commitement: " + this.cardData.time}</CardText>
                    <CardText>{"Purpose: " + this.cardData.purpose}</CardText>
                    <CardText>{"Experience Level: " + this.cardData.exp}</CardText>
                </CardBody>
                <MessageButton />
            </ Card>
        )
        return sideTwo;
    }
}

// Form to message group!

class MessageButton extends Component {
    // this.state = {};
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Request to Join!',
            // getting user!
            user: firebase.auth().currentUser
        };


        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleSubmitDialog = this.handleSubmitDialog.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);     
    }

    handleOpenDialog() {
        this.setState({ openDialog: true });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
        // checking if user details are coming up
        alert('Your message was discarded.' + this.state.user.email);
    }

    handleSubmitDialog() {
        this.setState({
            openDialog: false,
            text: 'Requested.'
        });
        alert('Your message to join the project has been sent!');
    }

    handleSwitch() {
        this.setState({
            
        })
    }

    render() {
        return (
            <CardFooter className = "card-footer">
                <div className="submit-button">
                    <button type="submit" className="btn btn-dark submit"  aria-label="button to join project" onClick={this.handleOpenDialog}>{this.state.text}</button>
                </ div>
                <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog} aria-label="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Request to Join: Message Project Group</DialogTitle>
                    <DialogContent>
                        <DialogContentText>To join this project, please fill out the following fields.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter Full Name"
                            id="name"
                            label="Name"
                            type="name"
                            fullWidth
                            required="true"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="emailid"
                            label="Email ID"
                            placeholder="Enter Email ID"
                            type="letter"
                            fullWidth
                            required="true"
                        />

                        <TextField
                            margin="dense"
                            id="availability"
                            label="Availability"
                            placeholder="When are you available to work from? How many hours per week?"
                            type="input"
                            required="true"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="contact"
                            label="Contact Information"
                            placeholder="How can we reach you?"
                            type="input"
                            fullWidth
                        />
                        <Typography>Upload Resume:</ Typography>
                        <TextField
                            margin="dense"
                            id="resume"
                            aria-label="Attach Resume"
                            type="file"
                            fullWidth
                            required="true"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="letter"
                            label="Cover Letter"
                            placeholder="Why do you want to join this project?"
                            type="letter"
                            multiline="true"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmitDialog} color="primary">Send</Button>
                    </DialogActions>
                </Dialog>
            </CardFooter>
        );
    }
}






/*

// Banner Text
class Banner extends Component {
   render() {
       return (
          <div className="banner-text">
               <h1>Discover Opportunities</h1>
               <p>Find projects to work on and expore your passion!</p>
           </div>
       )
   }
}


// search bar function if time?
// Search Bar on pages
class SearchBar extends Component {
   render() {
       return (
           <div className="search-bar" role="search" aria-label="search bar">
           <input type="text" placeholder="Search for position..."></input>
           <button className = "btn btn-info">
               <i className="fa fa-search fa-2x" aria-label="search icon"></i>
           </button>
       </div>
       )
   }
}










          <div className="side_two">
        <div className="card">
           <div className="card-body">
              <p className="card-title"> {this.props.card.name} </p>
              <p className="card-text"> {this.props.card.description} </p>
              <p className="card-text">Languages/Skills: {skill} </p>
              <p className="card-text">Positions Open: {positions} </p>
              <p className="card-text">Members Needed: {this.props.card.members-needed} </p>
              <p className="card-text">Duration: {this.props.card.duration} </p>
              <p className="card-text">Start Date: {this.props.card.start} </p>
              <p className="card-text">Time Commitment: {this.props.card.time} </p>
              <p className="card-text">Experience Level: {this.props.card.exp-level} </p>
              <p className="card-text"><a className="highlight"> {this.props.card.purpose} </a></p>
           </div>
*/