import React from 'react';
import Rebase from 're-base';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.base = Rebase.createClass('https://context-prototype.firebaseio.com/');
        this.state = {
            messages: {},
            inputValue: ""
        }
    }

    componentDidMount() {
        this.ref = this.base.syncState('messages', {
            context: this,
            state: 'messages',
            asArray: true
        });
    }

    componentWillUnmount() {
        this.base.removeBinding(this.ref);
    }

    handleClick(event) {
        this.setState({
            messages: this.state.messages.concat({
                sender: "Jon",
                value: this.state.inputValue
            })
        });
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    render() {
        return (
            <div className="container fixed-bottom">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group">
                            <input type="text"
                                className="form-control message-input"
                                placeholder="Message..."
                                onChange={this.handleChange.bind(this)}
                                value={this.state.inputValue}>
                            </input>
                            <span className="input-group-btn">
                                <button
                                    onClick={this.handleClick.bind(this)}
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
