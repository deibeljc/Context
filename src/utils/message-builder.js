import _ from 'lodash';

export default class MessageBuilder {
    constructor(messages) {
        this.messages = messages;
    }

    getMessageTree() {
        return this._messageBuilder();
    }

    _messageBuilder() {
        _.forEach(this.messages, (message, key) => {
            if (message.parentMessage) {
                let foundParent = _.find(this.messages, (obj) => {
                    return obj.key == message.parentMessage;
                });
                if (foundParent) {
                    // If it has no messages, initialize it to be an empty array.
                    if (typeof foundParent.childMessages === "boolean") {
                        foundParent.childMessages = [];
                    }
                    // Push our message into that array!
                    foundParent.childMessages.push(message);
                }
            }
        });
        return this.messages || [];
    }
}
