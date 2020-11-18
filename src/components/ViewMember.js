import React, {Component} from 'react';
import SuitorInfo from "./SuitorInfo"
import {Relationships, likes} from "../Constants";
import LoveNote from './LoveNote'


class ViewMember extends Component {
    constructor(props) {
        super(props)
        this.member = props.location.state.selectedMember;
        this.userData = props.location.state.profileData;
        this.relationship = props.location.state.selectedRelationship;
        this.state = {
            shouldSendMessage: false
        }
    }

    render() {
        const userId = this.userData.profileId;
        const memberId = this.member.profileId;
        const {message, onClick} = this.getMessageAndAction(userId, memberId);
        let Action = this.state.shouldSendMessage
            ? <LoveNote userId={userId} memberId={memberId} cancel={this.closeNote}/>
            :<DisplayAction
                message={message}
                onClick={onClick}
            />
        return (
            <div>
                <SuitorInfo userData={this.member}/>
                {Action}
            </div>
        )
    }

    closeNote = () => this.setState({shouldSendMessage: false})


    getMessageAndAction = (userId, memberId) => {
        if (this.relationship === Relationships.MATCHES.NAME) {
            return {
                message: "Send a Message",
                onClick: () => this.setState({shouldSendMessage: true})
            };
        } else if (this.relationship === Relationships.ADMIRERS.NAME) {
            return {
                message: "Like them back?",
                onClick: () => likes(userId, memberId)
            };
        } else {
            return {
                message: "Do ya like 'em ?",
                onClick: () => likes(userId, memberId)
            };
        }
    };
}


function DisplayAction({message, onClick}) {
    return (
        <button className="btn btn-info btn-md"
            onClick={onClick} >
            {message}
        </button>
    )
}


export default ViewMember