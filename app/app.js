import 'whatwg-fetch';
import React from 'react';
import Counter from './counter'
import Score from './score'
import {getWord} from './api';
var {Component} = React;

export default class MyApp extends Component {
  /*
  instead of getInitialState, es6 uses the constructor() function
  */
  constructor(props) {
    super(props);
    this.state = {
      wordObj: null,
      word: '',
      scrambled: null,
      score: 0,
      current: null,
      lettersLeft: [],
      lettersChosen: []
    };
  }

  componentWillMount() {
    window.addEventListener("keypress", this.handleKeyPress.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress.bind(this));
  }

  componentDidMount() {
    this.handleGetWord();
  }

  handleGetWord(){
    getWord().then((wordObj) =>
      this.setState({
        wordObj: wordObj,
        word: wordObj.word.toLowerCase(),
        current: null
      })).then(() =>
      this.scrambleWord())
  }

  handleKeyPress(event) {
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    this.checkLetter(keyPressed);
  }

  /*
  helper functions
  */
  scrambleWord() {
    var word = this.state.word;
    console.log(word)
    var scrambledWord = word.split('')
    .sort(function(){return 0.5-Math.random()})
    .join('');
    this.setState({
      scrambled: scrambledWord,
      lettersLeft: scrambledWord.split(''),
      lettersChosen: []
    })
  }

  checkLetter(char) {
    var letters = this.state.lettersLeft;
    var newLetters = this.state.lettersChosen;
    var index = letters.indexOf(char);
    if(index !== -1){
      var choice = letters.splice(index, 1);
      newLetters.push(choice);
      this.setState({
        lettersLeft: letters,
        lettersChosen: newLetters,
        current: newLetters.join('') + letters.join('')
      })
      this.checkWord();
    }
  }

  checkWord() {
    if(this.state.current === this.state.word){
      this.increaseScore();
      this.handleGetWord();
    }
  }

  increaseScore(){
   var newScore = this.state.score += 10;
    this.setState({
      score: newScore
    })
  }

  render() {
    return (
      <div id='container'>
        <span id='word'>
        {this.state.current || this.state.scrambled}
        </span>
        <Counter />
        {this.state.score}
        <Score score={this.state.score}/>
      </div>
      )
  }
}