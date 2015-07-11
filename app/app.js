import 'whatwg-fetch';
import React from 'react';
import {getWord} from './api';
var {Component} = React;

export default class MyApp extends Component {
  //instead of getInitialState, es6 uses the constructor() function
  constructor(props){
    super(props);
    this.state = { word: '' };
  }

  componentWillMount() {
    window.addEventListener("keypress", this.handleKeyPress.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress.bind(this));
  }

  componentDidMount() {
    getWord().then((wordObj) =>
      this.setState({
        wordObj: wordObj,
        scrambled: this.scrambleWord(wordObj.word)
      }))
  }

  handleKeyPress(event) {
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    this.checkLetter(keyPressed);
  }

  checkLetter(char){
    var word = this.state.scrambled;
    var index = word.indexOf(char);
    if(index !== -1){
      
    }
  }

  scrambleWord (word) {
    var scrambledWord = word.split('')
    .sort(function(){return 0.5-Math.random()})
    .join('');
    return scrambledWord;
  }

  render () {
    return (
      <div >{this.state.scrambled}</div>

      )
  }
}