import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app'
import 'firebase/database';
import {AddProjCard} from './AddProjCard';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col,
    ListGroup, ListGroupItem,
  } from 'reactstrap';

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
                <Banner/>
                <section className="newSec">
                    <AddProjCard/>
                </section>
                <div className="projects">
                    <ShowcaseCards cardsData={this.state.projects}/>
                </div>
            </div>
        );
    }
}
class Banner extends Component {
    render() {
        return (
          <div className="background-pic">
             <div className="banner-text">
                <h1>Browse projects</h1>
                <p>Explore a vast database of innovative projects around the world! </p>
            </div>
          </div>
        )
    }
}
export class ShowcaseCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map(function(oneCard) {
            let currCard = (<OneCard oneCardData = {oneCard} key={"card" + oneCard.name}/>);
            return currCard;
        });
        return (
            <Row>
                {cards}
           </Row>
        );
    }
}

class OneCard extends Component {
    constructor(props) {
        super(props)
        this.cardData = this.props.oneCardData;
    }
    render() {
        return(
            <Col className ="col">
                <Card className="card" key={this.cardData.name}>
                    <CardImg width="100%" src={this.cardData.img} alt={this.cardData.alt} />
                    <CardBody>
                        <CardTitle className="cardTitle">{this.cardData.name} </CardTitle>
                        <CardText>{"Purpose: " } <span className="highlight">{this.cardData.purpose}</span></CardText>
                        <CardText className = "cardText">{this.cardData.description}</CardText>
                    </CardBody>
                    <ListGroup>
                        <ListGroupItem> {"Team Members: " + this.cardData.team.join(', ')} </ListGroupItem>
                        <ListGroupItem> {"Skills/Languages: "} <span className="highlight">{this.cardData.skills.join(', ')}</span> </ListGroupItem>
                        <ListGroupItem>
                            <div className="links">
                                <i className='fa fa-heart 'aria-label="like"></i>
                                <a href={this.cardData.link} target="_blank" rel="noopener noreferrer"><i className="fa fa-link" aria-label="project link"></i> </a>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        );
    }
}