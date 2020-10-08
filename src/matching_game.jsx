'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

const e = React.createElement;

class MatchingGame extends Component {
  constructor(props) {
    super(props);
    // Build the set of cards
    const minNum = props.minNum || 1;
    const maxNum = props.maxNum || 13;
    const cards = _getCardSet(minNum, maxNum);
    this.state = {
      minNum: minNum,
      maxNum: maxNum,
      victory: false,
      cards: cards,
    }
    this.unmatchedCards = cards.length;
    this.selectedCard = null;
    this.cardKeyNum = 0;
    
    this.resetGame = this.resetGame.bind(this);
    this.setMinNum = this.setMinNum.bind(this);
    this.setMaxNum = this.setMaxNum.bind(this);
    this.onFaceDownCardClick = this.onFaceDownCardClick.bind(this);
  }

  resetGame () {
    // Update the cardKeyNum because we want completely new keys for the new cards
    this.cardKeyNum += this.state.cards.length;
    const cards = _getCardSet(this.state.minNum, this.state.maxNum);
    this.setState({
      victory: false,
      cards: cards,
    });
    this.unmatchedCards = cards.length;
    this.selectedCard = null;
  }

  setMinNum(event) {
    this.setState({minNum: parseInt(event.target.value)});
  }

  setMaxNum(event) {
    this.setState({maxNum: parseInt(event.target.value)});
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
    }, matched? 0 : 1200);

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

    let startNum = _createCardNumberOptionList(1, this.state.maxNum);
    let endNum = _createCardNumberOptionList(this.state.minNum, 13);

    return <div>
      <h1>Card Matching Game</h1>
      {info}
      <br />
      <div>
        Select the card start number: 
        <select onChange={this.setMinNum} value={this.state.minNum}>{startNum}</select>; 
        <br />
        Select the card end number: 
        <select onChange={this.setMaxNum} value={this.state.maxNum}>{endNum}</select>; 
        <br />
        <button onClick={this.resetGame}>Reset Game</button>
      </div>
      {this.state.cards.map((card, index) => {
        return <Card key={this.cardKeyNum + index} number={card.number} suit={card.suit} onFaceDownClick={this.onFaceDownCardClick} />;
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

function _createCardNumberOptionList (min, max) {
  let list = [];
  for (let i = min; i <= max; i++) {
    list.push(<option value={i} key={i}>{Card.getCardNumberText(i)}</option>);
  }
  return list;
}
