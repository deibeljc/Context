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

    componentWillUnmount() {
        this.base.removeBinding(this.ref);
    }

    handleSending() {
        // Push to firebase once you click then clear the state.
        this.base.push('messages', {
            data: {
                sender: "Jon",
                value: this.state.inputValue
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
                                    onClick={this.handleSending.bind(this)}
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
