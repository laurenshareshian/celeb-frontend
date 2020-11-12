import React, {Component} from 'react';
import {sendMessage} from "../Constants";

class LoveNote extends Component {
    constructor(props) {
        super(props)
        this.userId = props.userId;
        this.memberId = props.memberId;
        this.cancel = props.cancel;
        this.state = {
            routeToUserHome: false,
            loveNote: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    sendIt = () => {
        sendMessage(this.userId, this.memberId, this.state.loveNote);
        this.goBack();
    }

    goBack = () => this.setState({routeToUserHome: true})

    render() {
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
                <input type="submit" name="submit" onClick={this.cancel} className="btn btn-info btn-md"
                       value="cancel"/>
                <input type="submit" name="submit" onClick={this.sendIt} className="btn btn-info btn-md"
                       value="Send It"/>
            </div>
        )
    }
}

export default LoveNote