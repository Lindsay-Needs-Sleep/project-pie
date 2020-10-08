'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './card.css';

const SUIT = {
  SPADES: 'SPADES',
  HEARTS: 'HEARTS',
  CLUBS: 'CLUBS',
  DIAMONDS: 'DIAMONDS',
};

const COLOR = {
  RED: 'RED',
  BLACK: 'BLACK',
};

const STATUS = {
  FACE_DOWN: 'FACE_DOWN',
  FACE_UP: 'FACE_UP',
  MATCHED: 'MATCHED',
}

/**
 * Represents a playing card from a traditional 52 card deck.
 */
class Card extends React.Component {
  constructor(props) {
    super(props);            
    this.state = { 
      number: Card.getCardNumberText(props.number),
      suit: props.suit,
      color: _getCardColor(props.suit),
      status: STATUS.FACE_DOWN,
      onClick: this.handleClick.bind(this),
    };
  }

  handleClick () {
    const self = this;

    // If the card is face down
    if (this.state.status === STATUS.FACE_DOWN) {
      // Flip the card up
      this.setState({ status: STATUS.FACE_UP });
      
      // Notify the listener
      this.props.onFaceDownClick({
        number: this.props.number, 
        color: this.state.color,
        foundMatch: function (isMatched) {
          // Change state based on listener response
          if (isMatched) {
            self.setState({ status: STATUS.MATCHED });
          } else {
            self.setState({ status: STATUS.FACE_DOWN });
          }
        }
      });
    }
  }

  render() {
    const classes = 'card ' + this.state.color + ' ' + this.state.status;
    return <div className={classes} onClick={this.state.onClick}>
      <span className='ok'>OK</span>
      <span className={this.state.suit}>{this.state.number}</span>
    </div>;
  }
}

Card.propTypes = {
  /** number: {int} in range of [1,13] */
  number: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).isRequired,
  /** suit: {string} one of Card.SUIT */
  suit: PropTypes.oneOf(Object.values(SUIT)).isRequired,
  /** 
   * onFaceDownClick: {function(cardInfo, foundMatch)} 
   * Called when the card is clicked if it is faceDown.
   * card {object} - contains:
   *         number {int}
   *         color {Card.COLOR}
   *         foundMatch {function(bool)} - Call with true if the card has been
   *                  matched. Else, call with false to indicate failed match.
   */
  onFaceDownClick: PropTypes.func.isRequired,
};

// Add the enum constants to Card for external use
Card.SUIT = SUIT;
Card.COLOR = COLOR;

export default Card;

Card.getCardNumberText = function (number) {
  switch (number) {
    case 1:
      return 'A';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      return number;
  }
}

function _getCardColor (suit) {
  switch (suit) {
    case SUIT.SPADES:
    case SUIT.CLUBS:
      return COLOR.BLACK;
    case SUIT.HEARTS:
    case SUIT.DIAMONDS:
      return COLOR.RED;
  }
}
