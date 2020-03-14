import React, { Component } from 'react'; //import React Component
import {
    Card, CardText, CardBody,
    CardTitle, Row, CardFooter
  } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase/app'
import 'firebase/database';
import {Redirect} from 'react-router-dom'

export class AddProjCard extends Component {

    render() {
        return (
                <Row>
                    <div className="addProj">
                        <Card className="card" style={{ width: '18rem',height:'auto'}}>
                            <CardBody>
                                <CardTitle className="cardTitle">Showcase your own project!</CardTitle>
                                <CardText className="cardText">Do you want the world to see your cool work?</CardText>
                                <AddProjButton />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
        );
    }
}

class AddProjButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Click here!',
            projName: '',
            projDescr:'',
            projImg:'',
            projLink:'',
            projPurpose:'',
            projSkills:[],
            projTeam:[],
            user: firebase.auth().currentUser
        };

    }

    handleOpenDialog = (event) => {
        this.setState({ openDialog: true });
        
    }

    handleCloseDialog = (event) => {
        this.setState({
            openDialog: false
        });
        alert('Your project was discarded.');
    }

    

    handleSubmitDialog = (event) => {
        event.preventDefault();
        // add validation stuff
        this.setState({
            openDialog: false,
            text: 'Add another project.'
        });

        // create a new card for project
        let newProj = {
            name: this.state.projName,
            description: this.state.projDescr,
            skills: this.state.projSkills,
            team: this.state.projTeam,
            link: this.state.projLink,
            purpose: this.state.projPurpose,
            img: this.state.projImg,
            alt: this.state.projAlt,
        }
        // Update the database for showcase page
        let projectsRef = firebase.database().ref('showcaseData');
        projectsRef.push(newProj);
        let userDataRef = firebase.database().ref('userData');
         // if there exists an object for this.state.user then add to that
         // if it doesn't then create an object for them, and add to that
        let email = this.state.user.email.replace('.', ''); // can't have special characters like .
        let showcaseProj = userDataRef.child(email).child('showcaseProj');
        showcaseProj.push(newProj);
        
       
        // Update database for user
        this.setState({projName: '',
        projDescr:'',
        projImg:'',
        projLink:'',
        projPurpose:'',
        projSkills:[],
        projTeam:[],
        user: {}}); 
        alert('Your project has been added to be showcased!');
        
    }

    render() {
        return (
            <CardFooter>
                <div className="submit-button">
                    <label htmlFor="submitbutton" aria-label="submit button"></label>
                    <button id="button-submit" type="submit" className="btn btn-dark submit" onClick={this.handleOpenDialog}>{this.state.text}</button>
                </div>
            
                <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog} aria-label="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adding a new showcase project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>To showcase your project, please fill out the following fields.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter Project Name"
                            id="name"
                            label="Name"
                            type="name"
                            fullWidth
                            required="true"
                            value={this.state.projName}
                            onChange={this.updateName = (event) => {
                                this.setState({projName: event.target.value})
                            }}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            placeholder="This project does..."
                            id="name"
                            label="Describe your project"
                            type="name"
                            fullWidth
                            required="true"
                            value={this.state.projDescr}
                            onChange={this.updateDescr = (event) => {
                                this.setState({projDescr: event.target.value})
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Member names separated by commas"
                            id="team"
                            label="Team Members"
                            type="name"
                            fullWidth
                            required="true"
                            value={this.state.projTeam}
                            onChange={this.updateTeam = (event) => {
                                let teamstr = event.target.value.split(",");
                                this.setState({projTeam: teamstr})
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg"
                            id="imgLink"
                            label="Image Link"
                            type="name"
                            fullWidth
                            required="false"
                            value={this.state.projImg}
                            onChange={this.updateImg = (event) => {
                                this.setState({projImg: event.target.value})
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Someone typing on a computer"
                            id="imgAlt"
                            label="Describe your Image"
                            type="name"
                            fullWidth
                            required="false"
                            value={this.state.projAlt}
                            onChange={this.updateAlt = (event) => {
                                this.setState({projAlt: event.target.value})
                            }}
                        />
                            <TextField
                            autoFocus
                            margin="dense"
                            placeholder="e.g. INFO340"
                            id="purpose"
                            label="Purpose of Project"
                            type="name"
                            fullWidth
                            required="true"
                            value={this.state.projPurpose}
                            onChange={this.updatePurpose = (event) => {
                                this.setState({projPurpose: event.target.value})
                            }}
                            />
                            <TextField
                            autoFocus
                            margin="dense"
                            placeholder="e.g. R, Data Analysis, Java"
                            id="skills"
                            label="Skills/Languages:"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateSkills = (event) => {
                                let skillsstr = event.target.value.split(",");
                                this.setState({projSkills: skillsstr})
                            }}
                            />

                            <TextField
                            autoFocus
                            margin="dense"
                            placeholder="github.com/anon"
                            id="suppLink"
                            label="Supplementary link"
                            type="name"
                            fullWidth
                            required="true"
                            value={this.state.projLink}
                            onChange={this.updateLink = (event) => {
                                this.setState({projLink: event.target.value})
                            }}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmitDialog} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>
            </CardFooter>
        );
    }
}
