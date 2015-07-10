import 'whatwg-fetch';
import React from 'react';
var {Component} = React;

export default class MyApp extends Component {
    static propTypes = {
       flux: React.PropTypes.object.isRequired
   }

    render () {
        return (
            <div>test</div>
        )
    }
}