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

export class AddProjCard extends Component {
    render() {
        return (
                <Row>
                    <div className="addProj">
                        <Card className="card" style={{ width: '18rem',height:'auto'}}>
                            <CardBody>
                                <CardTitle className="cardTitle">Showcase your own project!</CardTitle>
                                <CardText className="cardText">Do you want the world to see your cool work?</CardText>
                                <AddProjButton/>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
        );
    }
}

class AddProjButton extends Component {
    // this.state = {};
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Click here!',
            proj: {}
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleSubmitDialog = this.handleSubmitDialog.bind(this);

    }

    handleOpenDialog() {
        this.setState({ openDialog: true });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
        alert('Your message was discarded.');
    }

    handleSubmitDialog() {
        this.setState({
            openDialog: false,
            text: 'Requested.',
        });
        let projectsRef = firebase.database().ref('showcaseData');
        projectsRef.push(this.state.proj);
        this.setState({proj:{}}); //empty out post for next time
        alert('Your project has been added to be showcased!');
        
    }

    render() {
        return (
            <CardFooter>
                <div className="submit-button">
                    <label for="submitbutton" aria-label="submit button"></label>
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
                            value={this.state.proj.name}
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
