import React, { Component } from 'react'; //import React Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col,
    CardFooter, CardDeck
  } from 'reactstrap';
  
 //  import 'css/style.css'
 // import _ from 'lodash'


// Takes in the data from properties
export class Projects extends Component{
    constructor(cards) {
        super(cards);
        this.cardsData = this.props.cards;
      }


    render() {
        return (
            <Row>
                <CreateShowcaseCards cardsData={this.cardsData}/>
            </Row>
        )
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
            <Col sm="12" md="4">
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
            <Card key={this.cardData.name}>
                <CardImg top width="100%" src={this.cardData.img} alt={this.cardData.alt} />
                <CardBody>
                    <CardTitle>{this.cardData.name} </CardTitle>
                    <CardText>{this.cardData.description}</CardText>
                </CardBody>
                <CardFooter>
                    <div className="links">
                        <ul>
                            <a href={this.cardData.links[0].github}><FontAwesomeIcon icon={['fab', 'github']} /></a>
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
            <Card>
                <CardBody>
                    <CardTitle>{this.cardData.name}</CardTitle>
                    <CardText>{"Team Members: " + this.cardData.team}</CardText>
                    <CardText><span className="highlighted">{"Skills/Languages" + this.cardData.skills}</span></CardText>
                    <CardText>{"Purpose: " + this.cardData.purpose}</CardText>
                </CardBody>
                <CardFooter>
                    <div className="links">
                        <ul>
                        <a href={this.cardData.links[0].github}><FontAwesomeIcon icon={['fab', 'github']} /></a>
                        </ul>
                    </div>
                    </CardFooter>
            </Card>
        )
        return sideTwo;
    }
}