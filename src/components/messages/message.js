import React from 'react';
import PubSub from 'pubsub-js';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        // Set state here if need be
    }

    onReplyClick(event) {
        PubSub.publish('newMessage', this.props.message.key);
    }

    render() {
        let childrenMessages = "";
        if (this.props.childrenMessages && this.props.childrenMessages[0]) {
            childrenMessages = this.props.childrenMessages.map((message) => {
                return (
                    <Message
                        key={message.key}
                        message={message}
                        sender={message.sender}
                        childrenMessages={message.childMessages} />
                )
            })
        }

        return (
            <div className="message col-sm-12">
                <div className="message-body">
                    <div className="col-xs-1">
                        {this.props.sender}
                    </div>
                    <div className="col-xs-9">
                        {this.props.message.value}
                    </div>
                    <div className="col-xs-2">
                        <button
                            onClick={(event) => this.onReplyClick(event)}
                            data-id={this.props.message.key}
                            className="btn btn-default">
                            Reply
                        </button>
                    </div>
                </div>
                {childrenMessages}
            </div>
        );
    }
}
