import React, { Component } from 'react'; //import React Component
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
import { Redirect } from 'react-router-dom';

// Join Projects page 
export class Join extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cards: []
        });
    }

    componentDidMount() {
        this.projectsRef = firebase.database().ref('joinCards');
        this.projectsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let projectsArray = Object.keys(data).map((theKey) => {
                let projObj = data[theKey];
                projObj.id = theKey;
                return projObj;
            })

            this.setState({ cards: projectsArray });
        });
    }
    componentWillUnmount() {
        this.projectsRef.off();
    }


    render() {
        return (
            <div>
                <Banner />
                <div className="projects">
                    <JoinCards cardsData={this.state.cards} />
                </div>
            </div>
        )
    }
}

class Banner extends Component {
    render() {
        return (
            <div className="background-pic">
                <div className="banner-text">
                    <h1>Discover Opportunities</h1>
                    <p>Find projects to work on and expore your passion!</p>
                </div>
            </div>
        )
    }
}

export class JoinCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map(function (oneCard) {
            let currCard = (<OneCard oneCardData={oneCard} key={"card" + oneCard.name} />);
            return currCard;
        });
        return (
            <Row>
                {cards}
            </Row>
        );
    }
}

class OneCard extends Component {
    render() {
        this.cardData = this.props.oneCardData;
        let card = (
            <Col className="col">
                <div className="cardContainer">
                    <div className="content-area">
                        <div className="side_one">
                            <SideOne cardData={this.cardData} key={"sideone" + this.cardData.name} />
                        </div>
                        <div className="side_two">
                            <SideTwo cardData={this.cardData} key={"sidetwo" + this.cardData.name} />
                        </div>
                    </div>
                </div>
            </Col>
        );
        return card;
    }
}

class SideOne extends Component {
    render() {
        this.cardData = this.props.cardData;
        let sideOne = (
            <Card className="card" key={this.cardData.name}>
                <CardImg top width="100%" height="60%" src={this.cardData.img} alt={this.cardData.alt} />
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

class SideTwo extends Component {
    render() {


        this.cardData = this.props.cardData;
        let sideTwo = (
            <Card className="card" key={this.cardData.name}>
                <CardBody>
                    <CardTitle className="cardTitle">{this.cardData.name}</CardTitle>
                    <CardText>{"Skills/Languages: "}<span className="highlight">{this.cardData.skills.join(', ')}</span></CardText>
                    <CardText>{"Positions Open: " + this.cardData.position.join(', ')}</CardText>
                    <CardText>{"Members Needed: " + this.cardData.needed}</CardText>
                    <CardText>{"Duration: " + this.cardData.duration}</CardText>
                    <CardText>{"Start Date: " + this.cardData.start}</CardText>
                    <CardText>{"Time Commitement: " + this.cardData.time}</CardText>
                    <CardText>{"Purpose: " + this.cardData.purpose}</CardText>
                    <CardText>{"Experience Level: " + this.cardData.exp}</CardText>
                </CardBody>
                <MessageButton cardData={this.cardData} />
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
        this.state = ({
            openDialog: '',
            text: 'Request to Join!',
            // getting user!
            user: firebase.auth().currentUser,
            cardData: this.props.cardData,
            redirect: false
        });
    }


    componentDidMount() {
        if (this.state.user === null) {
            this.setState({ redirect: true })
        }
        // To change state of already requested projects
        if (this.state.user !== null) {
            let email = this.state.user.email.replace('.', ''); // can't have special characters like .
            this.requestedData = firebase.database().ref('userData').child(email).child('requestedProj');
            let cardKey = this.state.cardData.name.replace(' ', '');
            this.requestedProj = this.requestedData.on('value', (snapshot) => {
                let data = snapshot.val();
                if (data === null) { return; }
                Object.keys(data).map((theKey) => {
                    if (theKey === cardKey) {
                        this.setState({
                            text: 'Requested',
                            openDialog: false,
                            redirect: false
                        });
                    }
                });
            });

        }
    }

    handleOpenDialog = (event) => {
        if (this.state.user === null) {
            alert("You must log in");
            return (<Redirect to="/signin" />); //have to redirect in render method i think
        }
        else if (this.state.text === 'Requested.') {
            alert('Your request has already been sent');
        } else {
            this.setState({ openDialog: true });
        }
    }

    handleCloseDialog = (event) => {
        this.setState({
            openDialog: false
        });
        alert('Your message was discarded.');
    }

    handleSubmitDialog = (event) => {
        this.setState({
            openDialog: false,
            text: 'Requested.'
        });
        this.requestedData.child(this.state.cardData.name.replace(' ', '')).set(this.state.cardData);
        alert('Your message to join the project has been sent!');
    }

    render() {
        // if (this.state.redirect) {
        //     return  (<Redirect to="/signin" />)
        // } // redirects but changes entire page from join to switch before rending

        return (
            <CardFooter className="card-footer">
                <div className="submit-button">
                    <button type="submit" className="btn btn-dark submit" aria-label="button to join project" onClick={this.handleOpenDialog}>{this.state.text}</button>
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