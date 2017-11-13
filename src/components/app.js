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
    window.addEventListener("keydown", this.handleKeyPress.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress.bind(this));
  }

  componentDidMount() {
    this.handleGetWord();
  }

  handleGetWord(){
    getWord().then((wordObj) =>
      this.setState({
        wordObj: wordObj,
        word: wordObj.word.toLowerCase()
      })).then(() =>
      this.scrambleWord())
  }

  handleKeyPress(event) {
    event.preventDefault();
    if(event.keyCode === 8){
      this.removeLetter();
    } else {
      let keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
      //console.log(keyPressed);
      this.checkLetter(keyPressed);
    }
  }

  /*
  helper functions
  */
  scrambleWord() {
    let word = this.state.word;
    console.log(word)
    let scrambledWord = word.split('')
    .sort(function(){return 0.5-Math.random()})
    .join('');
    this.setState({
      scrambled: scrambledWord,
      current: null,
      lettersLeft: scrambledWord.split(''),
      lettersChosen: []
    })
  }

  removeLetter() {
    let letterChosen = this.state.lettersChosen.pop();
    this.state.lettersLeft.unshift(letterChosen);
    this.setState(this.state);
  }
  /*
  checks if the key pressed is a letter within the scrambled word, and further, if it is a possible choice left
  */
  checkLetter(char) {
    let letters = this.state.lettersLeft;
    let newLetters = this.state.lettersChosen;
    let index = letters.indexOf(char);
    if(index !== -1){
      let choice = letters.splice(index, 1)[0];
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
      //set timeout
      this.handleGetWord();
    }
  }

  increaseScore() {
   let newScore = this.state.score += 10;
    this.setState({
      score: newScore
    })
  }

  render() {
    return (
      <div id='container'>
        <div id='word'>
          <span id="letterChosen">{this.state.lettersChosen.join("")}</span>
          <span id="lettersLeft">{this.state.lettersLeft.join("")}</span>
        {/*{this.state.current || this.state.scrambled}*/}
        </div>
        <Counter />
         <div id='score'>
          {this.state.score} <span className='label'>points</span>
         </div>

      </div>
      )
  }
}
