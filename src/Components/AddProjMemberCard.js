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
import { Redirect } from 'react-router-dom';

export class AddProjMemberCard extends Component {
    render() {
        return (
            <section className="newSec">
                <Row>
                    <div className="addProj">
                        <Card className="card" style={{ width: '18rem',height:'auto'}}>
                            <CardBody>
                                <CardTitle className="cardTitle">Find Teammates!</CardTitle>
                                <CardText className="cardText">Add a listing for projects you need teammates for!</CardText>
                                <AddProjMemberButton />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </section>
        );
    }
}

class AddProjMemberButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Click here!',
            user: firebase.auth().currentUser,
            redirect: false,
            projName: '',
            projDescr:'',
            projImg:'',
            projAlt:'',
            projPurpose:'',
            projSkills:[],
            projTeam:[],
            projNeeded: '',
            projPos:[],
            projDur:'',
            projTime:'',
            projExp:'',
            projStart:'' 
        };

    }

    handleOpenDialog = (event) => {
        if(this.state.user === null) {
            this.setState({redirect: true});
        }
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
            purpose: this.state.projPurpose,
            img: this.state.projImg,
            alt: this.state.projAlt,
            needed: this.state.projNeeded,
            position: this.state.projPos,
            duration: this.state.projDur,
            time: this.state.projTime,
            exp: this.state.projExp,
            start: this.state.projStart,
            user: this.state.user.email
        }
        let cardKey = this.state.projName.replace(' ', '');
        // Update the database for showcase page
        let projectsRef = firebase.database().ref('joinCards');
        projectsRef.child(cardKey).set(newProj);

        // if there exists an object for this.state.user then add to that
        // if it doesn't then create an object for them, and add to that
        let userDataRef = firebase.database().ref('userData');
        let email = this.state.user.email.replace('.', ''); // can't have special characters like .

        // Update the state for the users teammate request projects
        let findMem = userDataRef.child(email).child('findMemProj');
        findMem.child(cardKey).set(newProj);
        
       
        // Update database for user
        this.setState({projName: '',
        projDescr:'',
        projImg:'',
        projAlt:'',
        projPurpose:'',
        projSkills:[],
        projTeam:[],
        projNeeded: '',
        projPos:[],
        projDur:'',
        projTime:'',
        projExp:'',
        projStart:''}); 
        alert('Your project has been added to attract teammates!');
        
    }

    render() {
        if(this.state.redirect) {
            return  (<Redirect to="/signin" />)
        }
        return (
            <CardFooter>
                <div className="submit-button">
                    <label for="submitbutton" aria-label="submit button"></label>
                    <button id="button-submit" type="submit" className="btn btn-dark submit" onClick={this.handleOpenDialog}>{this.state.text}</button>
                </div>
            
                <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog} aria-label="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adding a listing to find team members</DialogTitle>
                    <DialogContent>
                        <DialogContentText>To find members your project, please fill out the following fields.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter Project Name"
                            id="name"
                            label="Name"
                            type="name"
                            fullWidth
                            required="true"
                            onChange = {this.updateName = (event) =>
                            this.setState({projName: event.target.value})}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Project Description"
                            id="desscription"
                            label="Description"
                            type="letter"
                            fullWidth
                            required="false"
                            onChange={this.updateDescr = (event) =>
                                this.setState({projDescr: event.target.value})}
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
                            onChange={this.updateTeam = (event) => {
                                let teamstr = event.target.value.split(",");
                                this.setState({projTeam: teamstr})
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg"
                            id="img"
                            label="Image Link"
                            type="name"
                            fullWidth
                            required="false"
                            onChange={this.updateImg = (event) => {
                                 this.setState({projImg: event.target.value})

                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="e.g. someone typing on a computer"
                            id="alt"
                            label="Describe your Image"
                            type="name"
                            fullWidth
                            required="false"
                            onChange={this.updateAlt = (event) => {
                                this.setState({projAlt: event.target.value})
                            }}
                        />
                            <TextField
                            autoFocus
                            margin="dense"
                            placeholder="e.g. INFO340, Capstone"
                            id="purpose"
                            label="Purpose of Project"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updatePurpose = (event) => {
                                this.setState({projPurpose: event.target.value})}}
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
                            placeholder="Enter number of members needed"
                            id="needed"
                            label="Number of members needed"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateNeeded = (event) => {
                                this.setState({projNeeded: event.target.value})}}
                            />
                           <TextField
                            autoFocus
                            margin="dense"
                            placeholder="e.g. UI/UX Developer, Software Engineer"
                            id="position"
                            label="Positions needed"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updatePos = (event) => {
                                let posstr = event.target.value.split(",");
                                this.setState({projPos: posstr})}}
                            />
                           <TextField
                            autoFocus
                            margin="dense"
                            placeholder="eg 6 weeks"
                            id="duration"
                            label="duration of project"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateDur = (event) => {
                                this.setState({projDur: event.target.value})}}
                            />
                           <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter approximate start date"
                            id="start"
                            label="start date"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateStart = (event) => {
                                this.setState({projStart: event.target.value})}}
                            />
                           <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter time in hours per week"
                            id="time"
                            label="Time Commitment"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateTime = (event) => {
                                this.setState({projTime: event.target.value})}}
                            />
                             <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Experience Level"
                            id="exp"
                            label="Experience Level"
                            type="name"
                            fullWidth
                            required="true"
                            onChange={this.updateExp= (event) => {
                                this.setState({projExp: event.target.value})}}
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
