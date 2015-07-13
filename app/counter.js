import React from 'react'
var {Component} = React;

export default class Counter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 30.0
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  
  componentWillUnMount() {
    clearInterval(this.timer);
  }

  tick() {
    if(this.state.count > 0){
      var newCount = --this.state.count;
      this.setState({
        count: newCount
      })
    }
  }

  render() {
    return (
      <div id="counter">
        {this.state.count} <span className="label">left</span>
      </div>
    )
  }

}