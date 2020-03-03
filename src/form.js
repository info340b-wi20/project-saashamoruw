import React, { Component } from 'react'; //import React Component
import {
    Card, CardText, CardBody,
    CardTitle, Row
  } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

const [purpose, setPurpose] = React.useState('EUR');
const purposes = [
    {
      value: 'Personal',
      label: 'Personal',
    },
    {
      value: 'INFO340',
      label: 'INFO340',
    },
    {
      value: 'INFO360',
      label: 'INFO360',
    },
    {
      value: 'CSE373',
      label: 'CSE373',
    },
    {
        value: 'Capstone',
        label: 'Capstone',
    },
    {
        value: 'INFO201',
        label: 'INFO201',
    },
  ];

  const skills = ['R', 'HTML', 'CSS', 'JavaScript', 'React', 'Java', 'Figma'];

export class addProjCard extends Component {
    render() {
        return (
                <Row>
                    <div className="addProj">
                        <Card>
                            <CardBody>
                                <CardTitle>Showcase your own project!</CardTitle>
                                <CardText>Do you want the world to see your cool work?</CardText>
                                <addProjButton/>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
        );
    }
}

class addProjButton extends Component {
    // this.state = {};
    constructor(props) {
        super(props);
        this.state = {
            openDialog: '',
            text: 'Click here!'
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
            text: 'Requested.'
        });
        alert('Your message to join the project has been sent!');
    }
    handleChange(event) {
        setPurpose(event.target.value);
      };

    render() {
        return (
            <CardText>
                <div className="submit-button">
                    <label for="submitbutton" aria-label="submit button"></label>
                    <button id="button-submit" type="submit" className="btn btn-dark submit" onClick={this.handleOpenDialog}>{this.state.text}</button></ div>
               
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
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                placeholder="Team Members: separated by commas"
                                id="team"
                                label="team"
                                type="name"
                                fullWidth
                                required="true"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                placeholder="Image Link"
                                id="imgLink"
                                label="link"
                                type="name"
                                fullWidth
                                required="false"
                            />
                           <TextField
                                autoFocus
                                margin="dense"
                                placeholder="A few words that describe your image"
                                id="imgAlt"
                                label="alt"
                                type="name"
                                fullWidth
                                required="false"
                            />
                             <TextField
                                id="purpose"
                                select
                                label="Select Purpose"
                                value={purposes}
                                onChange={this.handleChange}
                                helperText="Please select the purpose of your project"
                                >
                                {purposes.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                                <TextField
                                autoFocus
                                margin="dense"
                                placeholder="Skills/Languages: separated by commas"
                                id="skills"
                                label="skills"
                                type="name"
                                fullWidth
                                required="true"
                                />

                                <TextField
                                autoFocus
                                margin="dense"
                                placeholder="Link to your work"
                                id="suppLink"
                                label="link"
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
                </CardText>
        );
    }
}
