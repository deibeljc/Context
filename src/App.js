import React, { Component } from 'react';
import Rebase from 're-base';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.base = Rebase.createClass('https://context-prototype.firebaseio.com/');
        this.state = {
            name: ""
        }
    }

    componentDidMount() {
        this.base.syncState('name', {
            context: this,
            state: 'name'
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.state.name}</h1>
                <input onChange={(event) => {
                        this.setState({
                            name: event.target.value
                        })
                    }} value={this.state.name}></input>
            </div>
        );
    }
}
