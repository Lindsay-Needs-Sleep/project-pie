'use strict';

const e = React.createElement;

class MatchingGame extends React.Component {

  render() {
    return e(
      'div'
    );
  }
}

// Render the game on the root element
ReactDOM.render(e(MatchingGame), document.getElementById('root'));