import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        // Set state here if need be
    }

    render() {
        return (
            <div className="message col-sm-12">
                <div className="col-xs-2">
                    {this.props.sender}
                </div>
                <div className="col-xs-10">
                    {this.props.message}
                </div>
            </div>
        );
    }
}
