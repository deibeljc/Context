import React from 'react';
import Rebase from 're-base';
import PubSub from 'pubsub-js';


export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.base = Rebase.createClass('https://context-prototype.firebaseio.com/');
        this.state = {
            messages: {},
            parentMessage: false,
            inputValue: ""
        }
    }

    componentWillMount() {
        this.pubsub = PubSub.subscribe('newMessage', this.setParentMessage.bind(this));
    }

    componentWillUnmount() {
        // Unmount re-base.
        this.base.removeBinding(this.ref);
        // Unsubscribe to a binding
        PubSub.unsubscribe(this.pubsub);
    }

    setParentMessage(message, data) {
        console.log(message);
        console.log(data);
        this.setState({
            parentMessage: data
        });
    }


    handleEnterSend(event) {
        if (event.key === 'Enter') {
            this.handleSending();
        }
    }

    handleSending() {
        // Branch to the correct response
        if (this.state.inputValue.length > 0) {
            this.state.parentMessage
            ? this.sendChildMessage()
            : this.sendRootMessage();
        }
    }

    sendChildMessage() {
        // Push to firebase once you click then clear the state.
        this.base.push('messages', {
            data: {
                sender: "Jon",
                value: this.state.inputValue,
                parentMessage: this.state.parentMessage,
                childMessages: false,
                isChild: true
            },
            then: () => {
                this.setState({
                    inputValue: ""
                });
            }
        });
    }

    sendRootMessage() {
        // Push to firebase once you click then clear the state.
        this.base.push('messages', {
            data: {
                sender: "Jon",
                value: this.state.inputValue,
                parentMessage: false,
                childMessages: false,
                isChild: false
            },
            then: () => {
                this.setState({
                    inputValue: ""
                });
            }
        });
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    render() {
        return (
            <div className="container-fluid fixed-bottom">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon3">
                                {this.state.parentMessage || "Root"}
                            </span>
                            <input type="text"
                                style={{height: "50px"}}
                                id="message-input"
                                className="form-control message-input"
                                placeholder="Message..."
                                onChange={this.handleChange.bind(this)}
                                onKeyPress={this.handleEnterSend.bind(this)}
                                value={this.state.inputValue}>
                            </input>
                            <span className="input-group-btn">
                                <button
                                    onClick={this.handleSending.bind(this)}
                                    style={{height: "50px"}}
                                    className="btn btn-secondary"
                                    type="button">
                                    Send
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
