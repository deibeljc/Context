import React, { Component } from 'react';
import Rebase from 're-base';
import Message from './components/messages/message';
import Input from './components/messages/input';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.base = Rebase.createClass('https://context-prototype.firebaseio.com/');
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.ref = this.base.bindToState('messages', {
            context: this,
            state: 'messages',
            asArray: true
        })
    }

    render() {
        let messages = this.state.messages;
        return (
            <div className="container">
                {messages.map(function(message) {
                    return <Message
                        key={message.key}
                        message={message.value}
                        sender={message.sender} />
                })}
                <Input />
            </div>
        );
    }
}
