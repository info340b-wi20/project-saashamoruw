import React, { Component } from 'react'; //import React Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col,
    CardFooter
  } from 'reactstrap';
import {AddProjCard} from './AddProjCard'  
import firebase from 'firebase/app'
import 'firebase/database';

//App that returns all the mock projects in the form of cards
export class Projects extends Component{
    constructor(props) {
        super(props);
        this.state = {projects: []}
    }

    componentDidMount() {
        this.projectsRef = firebase.database().ref('showcaseData');
        this.projectsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let projectsArray = Object.keys(data).map( (theKey) => {
              let projObj = data[theKey];
              projObj.id = theKey;
              return projObj;
            })

            this.setState({projects: projectsArray});
          });
    }
    componentWillUnmount() {
        this.projectsRef.off();
    }
    render() {
        return (
            <div>
                <section className="newSec">
                    <AddProjCard/>
                </section>
                <div className="projects">
                <Row>
                    <CreateShowcaseCards cardsData={this.state.projects}/>
                </Row>
                </div>
            </div>
        );
    }
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
                    <div className="links">
                        <ul>
                            <a href={this.cardData.link}><FontAwesomeIcon icon='faLink'/></a>
                        </ul>
                    </div>
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
                <CardImg top width="100%" src={this.cardData.img} alt={this.cardData.alt} />
                <CardBody>
                    <CardTitle className="cardTitle">{this.cardData.name}</CardTitle>
                    <CardText>{"Team Members: " + this.cardData.team.join(', ')}</CardText>
                    <CardText>{"Skills/Languages" }<span className="highlight">{this.cardData.skills.join(', ')}</span></CardText>
                    <CardText>{"Purpose: " } <span className="highlight">{this.cardData.purpose}</span></CardText>
                </CardBody>
                <CardFooter>
                    <div className="links">
                        <ul>
                        <a href={this.cardData.link}><FontAwesomeIcon icon='faLink' /></a>
                        </ul>
                    </div>
                    </CardFooter>
            </ Card>
        )
        return sideTwo;
    }
}