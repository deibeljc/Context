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
        _.forEach(this.messages, (message, key) => {
            if (message.child) {
                let messageArr = [];
                _.forEach(message.child, (childKey) => {
                    let foundMessage = _.find(this.messages, (obj) => {
                        return obj.key == childKey
                    });
                    messageArr.push(foundMessage);
                });
                message.child = [];
                message.child = messageArr;
            }
        });
        return this.messages || [];
    }
}
