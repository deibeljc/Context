import React, { Component } from 'react';
import Rebase from 're-base';
import Message from './components/messages/message';
import Input from './components/messages/input';
import MessageBuilder from './utils/message-builder';
import _ from 'lodash';

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
        });
    }

    render() {
        let messages = new MessageBuilder(this.state.messages).getMessageTree();
        return (
            <div>
                <div className="col-sm-3">
                    <div className="fixed-side">
                        Logged in as Jon
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="message-container container-fluid">
                        {messages.map(function(message) {
                            if (!message.isChild) {
                                return <Message
                                    key={message.key}
                                    message={message}
                                    sender={message.sender}
                                    childrenMessages={message.childMessages} />
                            }
                        })}
                    </div>
                    <Input />
                </div>
            </div>
        );
    }
}
