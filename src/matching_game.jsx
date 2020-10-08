'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const e = React.createElement;

class MatchingGame extends Component {

  render() {
    return e(
      'div'
    );
  }
}

// Render the game on the root element
ReactDOM.render(e(MatchingGame), document.getElementById('root'));