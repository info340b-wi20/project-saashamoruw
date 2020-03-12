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

export class AddProjMemberCard extends Component {
    render() {
        return (
                <Row>
                    <div className="addProj">
                        <Card className="card" style={{ width: '18rem',height:'auto'}}>
                            <CardBody>
                                <CardTitle className="cardTitle">Find members for your project!</CardTitle>
                                <CardText className="cardText">Need people to work on your next big thing with?</CardText>
                                <AddProjMemberButton/>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
        );
    }
}

class AddProjMemberButton extends Component {
    // this.state = {};
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Click here!',
            name: '',
            description: '',
            skills: '',
            team: '',
            purpose: '',
            img: '',
            alt: '',
            needed: '',
            position: '',
            duration: '',
            start: '',
            time: '',
            exp: ''
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleSubmitDialog = this.handleSubmitDialog.bind(this);
        this.onChange = this.onChange.bind(this);

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
            text: 'Requested.'
        });
        alert('Your project has been added!');
        let newCard = this.state;
    //    <CreateShowcaseCards cardsData={[newCard]}/>

    }


    onChange() {
        this.setState({
//        [event.target.id]: event.target.value,
        })
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
