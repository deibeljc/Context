import _ from 'lodash';

export default class MessageBuilder {
    constructor(messages) {
        this.messages = messages;
    }

    getMessageTree() {
        return this._messageBuilder();
    }

    _messageBuilder() {
        // Start the tree with the first message
        this.messages.map((message) => {
            if (message.child) {
                let messageObj = _.find(this.messages, (obj) => {return obj.key === message.child});
                message.child = messageObj;
            }
        });
        return this.messages || [];
    }
}
