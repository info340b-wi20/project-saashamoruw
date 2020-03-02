import React, { Component } from 'react'; //import React Component

class Form extends Component {
    handleSubmit(event) {

    }
    render() {
        //Forms are a bitch
        let form = (
            <form onSubmit={this.handleSubmit}>

            </form>
        );
        return form;
    }
}