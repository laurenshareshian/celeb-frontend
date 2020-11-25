import React, {Component} from 'react';
import {sendMessage} from "../Constants";

class LoveNote extends Component {
    constructor(props) {
        super(props)
        this.userId = props.userId;
        this.memberId = props.memberId;
        this.state = {
            shouldOpen: false,
            loveNote: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    sendIt = () => {
        sendMessage(this.userId, this.memberId, this.state.loveNote)
            .then(() => this.setState({shouldOpen: false}))
    }

    render() {
        if (this.state.shouldOpen) {
            return (
                <div>
                <textarea
                    name="loveNote"
                    value={this.state.loveNote}
                    onChange={this.handleChange}
                    placeholder="Send a love note with your deets"
                    required
                />
                    <br/>
                    <input type="submit" name="submit" onClick={() => this.setState({shouldOpen: false})} className="btn btn-info btn-md"
                           value="cancel"/>
                    <input type="submit" name="submit" onClick={this.sendIt} className="btn btn-info btn-md"
                           value="Send It"/>
                </div>
            )
        } else {
            return (
                <button
                    className="btn btn-info btn-md"
                    onClick={() => this.setState({shouldOpen: true})}>
                    Send a message
                </button>
            )
        }
    }
}

export default LoveNote