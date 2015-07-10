import React from 'react';
import App from './app';
import {getWord} from './api';

React.render(<App/>, document.body);

getWord().then(word => console.log(word));

