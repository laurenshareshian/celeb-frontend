import React, {Component} from 'react';
import SuitorInfo from "./SuitorInfo"
import {Relationships, likes} from "../Constants";
import LoveNote from './LoveNote'


class ViewMember extends Component {
    constructor({selectedMember, userData, selectedRelationship, goBack}) {
        super({selectedMember, userData, selectedRelationship});
        this.selectedMember = selectedMember;
        this.userData = userData;
        this.selectedRelationship = selectedRelationship;
        this.message = this.getMessage(selectedRelationship);
        this.action = this.getAction(selectedRelationship);
        this.goBack = goBack;
        this.state = {
            shouldSendMessage: false
        }
    }

    render() {
        const userId = this.userData.profileId;
        const memberId = this.selectedMember.profileId;
        return (
            <div>
                <SuitorInfo userData={this.selectedMember}/>
              {/*<MemberInfo userData={this.selectedMember}/>*/}
                {this.determineAction(userId, memberId)}
                <DisplayAction message={"Back to " + this.selectedRelationship} onClick={this.goBack}/>
            </div>
        )
    }

    closeNote = () => this.setState({shouldSendMessage: false})


    getMessage = (relationship) => {
        if (relationship === Relationships.MATCHES.NAME) {
            return "Send a Message";
        } else if (relationship === Relationships.ADMIRERS.NAME) {
            return "Like them back?";
        } else {
            return "Do ya like 'em ?";
        }
    };

    determineAction(userId, memberId) {
        if (this.state.shouldSendMessage) {
            return <LoveNote userId={userId} memberId={memberId} cancel={this.closeNote}/>;
        }
        return <DisplayAction message={this.message} onClick={this.action}/>;
    }

    getAction(relationship) {
        if (relationship === Relationships.MATCHES.NAME) {
            return () => this.setState({shouldSendMessage: true});
        }
        const userId = this.userData.profileId;
        const memberId = this.selectedMember.profileId;
        return () => likes(userId, memberId);
    }
}


function DisplayAction({message, onClick}) {
    return (
        <button
            className="btn btn-info btn-md"
            onClick={onClick}>
            {message}
        </button>
    )
}


export default ViewMember