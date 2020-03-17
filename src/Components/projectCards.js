import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app'
import 'firebase/database';
import { AddProjCard } from './AddProjCard';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col,
    ListGroup, ListGroupItem,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

// Explore page
export class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            redirect: false
        }
    }

    componentDidMount() {
        this.projectsRef = firebase.database().ref('showcaseData');
        this.projectsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let projectsArray = Object.keys(data).map((theKey) => {
                let projObj = data[theKey];
                projObj.id = theKey;
                return projObj;
            })
            this.setState({ projects: projectsArray });
        });
    }
    componentWillUnmount() {
        this.projectsRef.off();
    }
    render() {
        return (
            <div>
                <Banner />
                <div className="projects">
                    <AddProjCard />
                </div>
                <div className="projects">
                    <ShowcaseCards cardsData={this.state.projects} />
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
                    <h1>Browse Projects</h1>
                    <p>Explore innovative projects around the world! </p>
                </div>
            </div>
        )
    }
}

export class ShowcaseCards extends Component {
    render() {
        this.cardsData = this.props.cardsData;
        let cards = this.cardsData.map(function (oneCard) {
            let currCard = (<OneCard oneCardData={oneCard} key={"card" + oneCard.name} />);
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
        this.state = {
            cardData: this.props.oneCardData,
            ifLikeProj: false,
            user: firebase.auth().currentUser
        }
    }

    componentDidMount() {
        if (this.state.user === null) {
            return {};
        }
        // to update the colors of the already liked projects depending on the user
        if (firebase.auth().currentUser !== null) {
            let email = firebase.auth().currentUser.email.replace('.', '');
            this.likedData = firebase.database().ref('userData').child(email).child('likedProjects');
            this.key = this.state.cardData.name.replace(' ', '');
            this.likedProj = this.likedData.on('value', (snapshot) => {
                let data = snapshot.val();

                // if there are no liked projects yet
                if (data === null) {
                    return;
                }
                Object.keys(data).map((theKey) => {
                    if (theKey === this.key) {
                        this.setState({ ifLikeProj: true });
                    }
                    return false;
                });
            });
        }
    }


    likeProj = () => {
        if (firebase.auth().currentUser === null) {
            this.setState({ redirect: true })
        } else {
            if (this.state.ifLikeProj) {
                this.likedData.child(this.key).remove();
            } else {
                this.likedData.child(this.key).set(this.state.cardData);
            }
            this.setState({ ifLikeProj: !this.state.ifLikeProj });
        }
    }

    render() {
        if (this.state.redirect) {
            if (this.state.user === null) {
                return (<Redirect to="/signin" />)
            }
        }
        return (
            <Col className="col">
                <Card className="card normal" key={this.state.cardData.name}>
                    <CardImg top width="100%" src={(this.state.cardData.img === "" ? "https://images.pexels.com/photos/2053515/pexels-photo-2053515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" : this.state.cardData.img)}
                        alt={(this.state.cardData.alt === "" ? "Landscape with clouds and grass" : this.state.cardData.img)} />
                    <CardBody>
                        <CardTitle className="cardTitle">{this.state.cardData.name} </CardTitle>
                        <CardText>{"Purpose: "} <span className="highlight">{this.state.cardData.purpose}</span></CardText>
                        <CardText className="cardText">{this.state.cardData.description}</CardText>
                    </CardBody>
                    <ListGroup>
                        <ListGroupItem> {"Team Members: " + (this.state.cardData.team === undefined ? "" : this.state.cardData.team.join(', '))} </ListGroupItem>
                        <ListGroupItem> {"Skills/Languages: "} <span className="highlight">{this.state.cardData.skills === undefined ? "" : this.state.cardData.skills.join(', ')}</span> </ListGroupItem>
                        <ListGroupItem>
                            <div className="links">
                                <i className={'fa fa-heart' + (this.state.ifLikeProj ? ' colorRed' : '')} aria-label="like" onClick={this.likeProj}></i>
                                <a href={this.state.cardData.link} target="_blank" rel="noopener noreferrer"><i className="fa fa-link" aria-label="project link"></i> </a>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        );
    }
}