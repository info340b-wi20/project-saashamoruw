import React, { Component } from 'react'; //import React Component
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, 
    CardFooter, CardDeck
  } from 'reactstrap';
  
 //  import 'css/style.css'
 // import _ from 'lodash'


// Takes in the data from properties
// export class createCardLayout extends Component{
export class App extends Component{
    
    constructor(cardsData) {
        super(cardsData); 
        this.state = {
            cardsData : this.props.cardsData
        };
      }


    render() {
        this.cardsData = this.props.cardsData;
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
        let cards = this.cardsData.map((card) => {
            let oneCard = <CreateCard oneCardData = {card}/>
            return oneCard;
        });
        return (
            <CardDeck>
            {cards}
            </CardDeck>
        )
    }
}

class CreateCard extends Component {
    render() {
        this.cardData = this.props.cardData;
        let card = (
            <div className="col-sm-12 col-md-4">
                <div className="cardContainer">
                    <div className="content-area">
                        <div className="side_one">
                            <CreateSideOne cardData={this.cardData}/>
                        </div>
                        <div className="side_two">
                            <CreateSideTwo cardData={this.cardData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
        return {card};
    }

}

class CreateSideOne extends Component {
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

class CreateSideTwo extends Component {
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


export default App;