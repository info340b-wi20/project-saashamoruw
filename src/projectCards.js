import React, { Component } from 'react'; //import React Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col,
    CardFooter, CardDeck
  } from 'reactstrap';
import {AddProjMemberCard} from './AddProjCard'  
import './index.css';
import CARDS from './cards'; 

//App that returns all the mock projects in the form of cards
export class Projects extends Component{
    constructor(cards) {
        super(cards);
        this.cardsData = {CARDS}  
    }

    componentDidMount() {
        this.setState({cardsData: {CARDS}});
    }


    render() {
        return (
            <div>
                <section className="newSec">
                    <AddProjMemberCard/>
                </section>
                <div className="projects">
                <Row>
                    <CreateShowcaseCards cardsData={this.cardsData}/>
                </Row>
                </div>
            </div>
        );
    }
}

class CreateShowcaseCards extends Component {
    render() {
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