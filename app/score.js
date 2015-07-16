import React from 'react';
var {Component} = React;

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score
    }
  }


  // increaseScore() {
  //   var newScore = ++this.state.score;
  //   this.setState({
  //     score: newScore
  //   })
  // }

  render() {
    return (
      <div id='score'>
      {this.state.score} <span className='label'>points</span>
      </div>
    )
  }

}
