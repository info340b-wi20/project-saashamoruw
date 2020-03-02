import React, { Component } from 'react'; //import React Component
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, 
    CardFooter, CardDeck
  } from 'reactstrap';

// Takes in the data from properties
export class createCardLayout extends Component{
    render() {
        this.cardsData = this.props.cardsData;
        return (
            <Row>
                <createShowcaseCards cardsData={this.cardsData}/>
            </Row>
        )
    }
}

class createShowcaseCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map((card) => {
            let oneCard = <createCard oneCardData = {card}/>
            return oneCard;
        });
        return (
            <CardDeck>
            {cards}
            </CardDeck>
        )
    }
}

class createCard extends Component {
    render() {
        this.cardData = this.props.cardData;
        let card = (
            <div className="col-sm-12 col-md-4">
                <div className="cardContainer">
                    <div className="content-area">
                        <div className="side_one">
                            <createSideOne cardData={this.cardData}/>
                        </div>
                        <div className="side_two">
                            <createSideTwo cardData={this.cardData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
        return {card};
    }

}

class createSideOne extends Component {
    render() {
        this.cardData = this.props.cardData;
        let sideOne = (
            <Card>
                <CardImg top width="100%" src={this.cardData.img} alt={this.cardData.alt} />
                <CardBody>
                    <CardTitle>{this.cardData.name} </CardTitle>
                    <CardText>{this.cardData.description}</CardText>
                </CardBody>
                <CardFooter>
                    <div className="links">
                        <ul>
                            <li><Link to ={this.cardData.links[0].github}><FontAwesomeIcon icon="github" /></Link></li>
                            <li><Link to="saasha05.github.io"> <LinkIcon/> </Link> </li>
                        </ul>
                    </div>
                </CardFooter>
            </Card>
        )
        return {sideOne};
    }
}

class createSideTwo extends Component {
    render() {
        this.cardData = this.props.cardData;
        let sideOne = (
            <Card>
                <CardBody>
                    <CardTitle>{this.cardData.name}</CardTitle>
                    <CardText>{"Team Members:" + this.cardData.team}</CardText>
                    <CardText><span className="highlighted">{"Skills/Languages" + this.cardData.skills}</span></CardText>
                    <CardText>{"Purpose: " + this.cardData.purpose}</CardText>
                </CardBody>
                <CardFooter>
                    <div className="links">
                        <ul>
                            <li><Link to={this.cardData.links[0].github}> <FontAwesomeIcon icon="github" /> </Link> </li>
                            <li><Link to="google.com"> <LinkIcon/> </Link> </li>
                        </ul>
                    </div>
                    </CardFooter>
            </Card>
        )
        return {sideOne};
    }
}
