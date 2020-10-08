'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

const e = React.createElement;

class MatchingGame extends Component {

  onFaceDownClick (card, isMatched) {
  }

  render() {
    return <Card number={5} suit={Card.SUIT.SPADES} onFaceDownClick={this.onFaceDownClick} />;
  }
}

// Render the game on the root element
ReactDOM.render(e(MatchingGame), document.getElementById('root'));