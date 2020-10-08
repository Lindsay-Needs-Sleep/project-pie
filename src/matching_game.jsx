'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

const e = React.createElement;

class MatchingGame extends Component {
  constructor(props) {
    super(props);
    // Build the set of cards
    this.state = {
      cards: _getCardSet(1, 3),
      victory: false,
      onFaceDownCardClick: this.onFaceDownCardClick.bind(this),
    }
    this.unmatchedCards = this.state.cards.length;
    this.selectedCard = null;
  }

  onFaceDownCardClick (card) {
    // If we don't have a selected card yet
    if (!this.selectedCard) {
      // Remember the first card
      this.selectedCard = card;
      return;
    }

    const self = this;
    const selectedCard = this.selectedCard;
    // Reset the selected card so we can start the next pair
    this.selectedCard = null;

    // Else we have a selectedCard, so compare to 2nd selected card
    const matched = selectedCard.color === card.color && selectedCard.number === card.number;    

    // Delay indicating cards as matched or failed
    setTimeout(function () {

      // Notify the cards about whether they were matched or not    
      selectedCard.foundMatch(matched);
      card.foundMatch(matched);
  
      // If matched we should decrement the unmatched cards
      if (matched) {
        self.unmatchedCards -= 2;
        // And check for the victory condition
        if (self.unmatchedCards <= 0) {
          self.setState({ victory: true });
        }
      }
    }, 2000);

  }

  render() {
    let info;
    if (this.state.victory) {
      info = <h2>You have found all the pairs! Congrats!!</h2>;
    } else {
      info = <div>
          <h2> Find all pairs of cards with the same number and color!</h2>
          Note: Match spades with clubs, and hearts with diamonds.
        </div>;
    }

    return <div>
      <h1>Card Matching Game</h1>
      {info}
      {this.state.cards.map((card, index) => {
        return <Card key={index} number={card.number} suit={card.suit} onFaceDownClick={this.state.onFaceDownCardClick} />;
      })}
    </div>;
  }
}

// Render the game on the root element
ReactDOM.render(e(MatchingGame), document.getElementById('root'));

/**
 * Builds a shuffled set of cards that contains 1 card of each suit for every 
 * number between minNum and maxNum (inclusive).
 * @param {int} minNum - must be in range [1, maxNum]
 * @param {int} maxNum - must be in range [minNum, 13]
 */
function _getCardSet (minNum, maxNum) {
  const cards = [];
  // Build the cards
  for (const suit in Card.SUIT) {
    for (let num = minNum; num <= maxNum; num++) {
      cards.push({
        suit: Card.SUIT[suit],
        number: num,
      });
    }
  }
  return _shuffle(cards);
}

/**
 * Shuffle the cards with Fisher Yates
 * Modified from:
 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
 * @param {array} array - array to be shuffled
 */
function _shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
