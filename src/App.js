import React, { Component } from 'react'; //import React Component
import {Projects}  from './App1';
//import {App2}  from '../stage-2/src/App2';

export default class App extends Component {
    constructor(cardsData) {
        super(cardsData); 
        this.state = {
            cardsData : this.props.cardsData
        };
    }
    
    render() {
        this.cardsData = this.props.cardsData;
        let content = (
            <div className="main">
                <Projects cards={this.cardsData}/>
            </div>
        );
        return content;
    }
}