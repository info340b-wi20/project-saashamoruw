import React from 'react';
import FlipCard from 'react-flipcard';

export class App {
  getInitialState() {
    return {
      isFlipped: false
    };
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  render() {
    return (
      <div>
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <div>
            <div>Front</div>
            <button type="button" onClick={this.showBack}>Show back</button>
            <div><small>(manual flip)</small></div>
          </div>
          <div>
            <div>Back</div>
            <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>
          </div>
        </FlipCard>
      </div>
    );
  }
};