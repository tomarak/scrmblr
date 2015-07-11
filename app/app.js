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
    window.addEventListener("keypress", this.handleKeyPress)
  }
  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
  }

  componentDidMount() {
    getWord().then((wordObj) =>
      this.setState({
        wordObj: wordObj,
        scrambled: this.handleScrambleWord(wordObj.word)
      }))
  }

  handleKeyPress(event) {
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(keyPressed);
  }

  checkWord(char){
    var word = this.state.wordObj.word;
    var index = word.indexOf(char);
    console.log(index);
  }

  handleScrambleWord (word) {
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