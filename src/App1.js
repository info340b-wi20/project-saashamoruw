import React, { Component } from 'react'; //import React Component
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Takes in the data from properties
export class createCardLayout extends Component{
    render() {
        this.cardsData = this.props.cardsData;
        return (
            <div className="row">
                <createShowcaseCards cardsData={this.cardsData}/>
            </div>
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
        return {cards}
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
            <div className="card">
                <img class="card-img-top" src={this.cardData.img} alt={this.cardData.alt}/>
                <div className="card-body">
                    <p className="card-title">{this.cardData.name}</p>
                    <p className="card-text">{this.cardData.description}</p>
                </div>
                <div className="card-footer">
                    <div className="links">
                        <ul>
                            <li><a href={this.cardData.links[0].github}><i class="fa fa-github" aria-label="github logo"></i></a></li>
                            <li><Link to="saasha05.github.io"> <LinkIcon/> </Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
        return {sideOne};
    }
}

class createSideTwo extends Component {
    render() {
        this.cardData = this.props.cardData;
        let sideOne = (
            <div className="card">
                <div className="card-body">
                    <p className="card-title">{this.cardData.name}</p>
                    <p className="card-text">{"Team Members:" + this.cardData.team}</p>
                    <p className="card-text"><span className="highlighted">{"Skills/Languages" + this.cardData.skills}</span></p>
                    <p className="card-text">{"Purpose: " + this.cardData.purpose}</p>
                </div>
                <div className="card-footer">
                    <div className="links">
                        <ul>
                            <li><Link to={this.cardData.links[0].github}> <FontAwesomeIcon icon="github" /> </Link> </li>
                            <li><Link to="google.com"> <LinkIcon/> </Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
        return {sideOne};
    }
}