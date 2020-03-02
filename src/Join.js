import React, { Component } from 'react'; //import React Component
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {  Card, CardImg, CardText, CardBody,CardTitle, Row, Col, CardFooter, CardDeck } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './index.css';


// Find Projects page 
export class Join extends Component { 

constructor(cards) {
    super(cards);
    this.cardsData = this.props.cards;
}
    
render() { 
    return (
        <Row>
            <CreateShowcaseCards cardsData={this.cardsData}/>
        </Row>
)}
}



class CreateShowcaseCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map(function(oneCard) {
            let currCard = (<CreateCard oneCardData = {oneCard} key={"card" + oneCard.name}/>);
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
            <Col className ="col">
                <div className="cardContainer">
                    <div className="content-area">
                        <div className="side_one">
                            <CreateSideOne cardData={this.cardData} key={"sideone" + this.cardData.name}/>
                        </div>
                        <div className="side_two">
                        <CreateSideTwo cardData={this.cardData} key={"sidetwo" + this.cardData.name}/>
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
                <CardImg top width="100%" src={this.cardData.img} alt={this.cardData.alt} />
                <CardBody>
                    <CardTitle className="cardTitle">{this.cardData.name} </CardTitle>
                    <CardText className = "cardText">{this.cardData.description}</CardText>
                    
                </CardBody>

                <CardFooter>
              <MessageButton/>
              </ CardFooter>

            </Card>
        )
        return sideOne;
    }
}
class CreateSideTwo extends Component {
    render() {
        // shows up as objects
      //  let skills = this.props.cardData.skills.map((i) => {      
     //   let obj = <span className="highlight">{i}</span>;
     //   return obj;
     //   });

        this.cardData = this.props.cardData;    

        let sideTwo = (
            <Card className="card" key={this.cardData.name}>
                <CardBody>
                    <CardTitle>{this.cardData.name}</CardTitle>
                    <CardText><span className="highlight">{"Skills/Languages" + this.cardData.skills}</span></CardText>
                    <CardText>{"Positions Open: " + this.cardData.positions}</CardText>
                    <CardText>{"Members Needed: " + this.cardData.needed}</CardText>
                    <CardText>{"Duration: " + this.cardData.duration}</CardText>
                    <CardText>{"Start Date: " + this.cardData.start}</CardText>
                    <CardText>{"Time Commitement: " + this.cardData.time}</CardText>
                    <CardText>{"Purpose: " + this.cardData.purpose}</CardText>
                    <CardText>{"Experience Level: " + this.cardData.exp}</CardText>
                </CardBody>

              <CardFooter>
              <MessageButton/>
              </ CardFooter>

            </ Card>
        )
        return sideTwo;
    }
}



// Opens a pop up message box when the join project button is clicked
// Documentation from https://material-ui.com/components/dialogs/#form-dialogs followed
export class MessageButton extends Component {
    render() {
         function FormDialog() {
            const [open, setOpen] = React.useState(false);
         
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };


            return (
                <div className="submit-button">
                 <Button className = "btn btn-dark" onClick={handleClickOpen}>Request to Join!</Button>
            
                  <Dialog open={open} onClose={handleClose} aria-label="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Request to Join: Message Project Group</DialogTitle>
                    <DialogContent>
                      <DialogContentText>To join this project, please fill out the following fields.</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                      />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                      />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="letter"
                        label="Cover Letter"
                        type="letter"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">Cancel</Button>
                      <Button onClick={handleClose} color="primary">Send</Button>
                    </DialogActions>
                  </Dialog>
                </div>

            );
    }
    return (FormDialog)
}

}


export default Join;



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