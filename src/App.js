import React, { Component } from 'react'; //import React Component
import {Projects}  from '../stage-2/src/App1';
import {App2}  from '../stage-2/src/App2';

export class App extends Component {
    constructor() {
        constructor(cardsData) {
            super(cardsData); 
            this.state = {
                cardsData : this.props.cardsData
            };
          }
        
          render() {
            this.cardsData = this.props.cardsData;
            <App2 cardsData={this.cardsData}/>
            <Projects cards={this.cardsData}/>
          }
    }
}