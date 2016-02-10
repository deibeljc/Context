import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        // Set state here if need be
    }

    render() {
        let childrenMessages = "";
        if (this.props.childrenMessages && this.props.childrenMessages[0]) {
            childrenMessages = this.props.childrenMessages.map((message) => {
                return (
                    <Message
                        key={message.key}
                        message={message}
                        sender={message.sender} />
                )
            })
        }

        return (
            <div data-id={this.props.messageKey} className="message col-sm-12">
                <div className="col-xs-2">
                    {this.props.sender}
                </div>
                <div className="col-xs-10">
                    {this.props.message.value}
                </div>
                {childrenMessages}
            </div>
        );
    }
}
