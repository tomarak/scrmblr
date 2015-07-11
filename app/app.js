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

   componentDidMount() {
    getWord().then((wordObj) =>
      this.setState({
        wordObj: wordObj,
        scrambled: this.handleScrambleWord(wordObj.word)
      }))
   }
   handleScrambleWord (word){
    var scrambled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
    return scrambled;
   }

   handleGetWord (){
    return getWord();
   }

    render () {
        return (
            <div>{this.state.scrambled }</div>

        )
    }
}